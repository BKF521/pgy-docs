import React, { useState, useEffect } from 'react';
import Layout from '@theme-original/DocRoot/Layout';
import { useLocation } from '@docusaurus/router';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { 
  auth, 
  loginWithGoogle, 
  logout, 
  onAuthStateChanged,
  isDevAuthorized
} from '@site/src/firebase';

function FullscreenAuthGate({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (!isDevAuthorized(currentUser)) {
          const unauthorizedEmail = currentUser.email || '该账号';
          await logout();
          setUser(null);
          setError(`未授权账号 (${unauthorizedEmail})。此模块仅限指定开发者访问。`);
        } else {
          setUser(currentUser);
          setError('');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setError('');
    setSubmitting(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Google 登录失败');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        width: '100%'
      }}>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>正在验证开发者身份...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '440px',
          padding: '40px 32px',
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          backgroundColor: 'var(--ifm-background-surface-color, #fff)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
          <h2 style={{ marginBottom: '8px', fontSize: '1.5rem' }}>开发者笔记访问受限</h2>
          <p style={{ color: 'var(--ifm-color-emphasis-700)', fontSize: '0.92rem', marginBottom: '28px', lineHeight: '1.6' }}>
            此模块仅限指定系统开发人员查阅。<br />请使用已授权的 Google 账号登录。
          </p>

          {error && (
            <div style={{
              padding: '12px 14px',
              marginBottom: '20px',
              borderRadius: '6px',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              fontSize: '0.88rem',
              textAlign: 'left',
              lineHeight: '1.4'
            }}>
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={submitting}
            style={{
              width: '100%',
              padding: '13px 20px',
              fontSize: '15px',
              fontWeight: '600',
              backgroundColor: '#4285F4',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: submitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 2px 6px rgba(66, 133, 244, 0.3)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#fff" d="M21.35 11.1h-9.17v2.98h5.27c-.23 1.2-1.35 3.51-5.27 3.51-3.17 0-5.76-2.62-5.76-5.85s2.59-5.85 5.76-5.85c1.81 0 3.02.77 3.71 1.44l2.36-2.28C22.01 3.58 19.34 2.5 15.43 2.5 9.77 2.5 5.17 7.1 5.17 12.76s4.6 10.26 10.26 10.26c5.92 0 9.85-4.16 9.85-10.02 0-.68-.07-1.35-.18-1.9z"/>
            </svg>
            {submitting ? '正在连接 Google...' : '使用 Google 账号登录'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{
        position: 'sticky',
        top: 'var(--ifm-navbar-height, 60px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 24px',
        backgroundColor: 'var(--ifm-color-emphasis-100)',
        borderBottom: '1px solid var(--ifm-color-emphasis-200)',
        fontSize: '0.85rem'
      }}>
        <span>
          🟢 已认证开发者：<strong>{user.email || user.displayName || 'Dev User'}</strong>
        </span>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--ifm-color-danger, #dc2626)',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.85rem'
          }}
        >
          退出登录
        </button>
      </div>
      {children}
    </>
  );
}

export default function LayoutWrapper(props) {
  const location = useLocation();
  const isDevNotes = location.pathname.includes('/dev-notes');

  if (!isDevNotes) {
    return <Layout {...props} />;
  }

  return (
    <BrowserOnly fallback={<Layout {...props} />}>
      {() => (
        <FullscreenAuthGate>
          <Layout {...props} />
        </FullscreenAuthGate>
      )}
    </BrowserOnly>
  );
}
