import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Check, Loader2 } from 'lucide-react';

/* ---------- Google SVG Icon ---------- */
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

/* ---------- Floating background blobs ---------- */
const Blobs = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    <motion.div
      style={{
        position: 'absolute', top: '-20%', right: '-15%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.13) 0%, transparent 70%)',
      }}
      animate={{ scale: [1, 1.08, 1], x: [0, 20, 0], y: [0, -20, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      style={{
        position: 'absolute', bottom: '-10%', left: '-10%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
      }}
      animate={{ scale: [1, 1.12, 1], x: [0, -16, 0], y: [0, 16, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
    />
  </div>
);

/* ---------- Left Branding Panel ---------- */
const BrandPanel = ({ mode }) => (
  <div style={{
    width: '100%',
    height: '100%',
    background: 'linear-gradient(145deg, #0F172A 0%, #1a2744 60%, #0d2b1e 100%)',
    padding: '48px 44px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  }}>
    <Blobs />

    {/* Logo */}
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: 'linear-gradient(135deg, #16C784, #059669)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 900, fontFamily: 'Sora,sans-serif',
          fontSize: '1.1rem', boxShadow: '0 4px 16px rgba(16,185,129,0.4)',
        }}>B</div>
        <span style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: '1.15rem', color: 'white' }}>
          BMG SMM
        </span>
      </Link>
    </div>

    {/* Center message */}
    <div style={{ position: 'relative', zIndex: 1 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: 100, padding: '5px 14px', marginBottom: 24,
          }}>
            <span style={{ width: 6, height: 6, background: '#10B981', borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {mode === 'signin' ? 'Welcome Back' : 'Join BMG Today'}
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Sora,sans-serif', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            color: 'white', lineHeight: 1.2, marginBottom: 20,
          }}>
            {mode === 'signin'
              ? <>Growth That<br /><span style={{ color: '#10B981' }}>Never Sleeps.</span></>
              : <>Start Your<br /><span style={{ color: '#10B981' }}>Natural Growth.</span></>}
          </h2>

          <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.75, maxWidth: 320 }}>
            {mode === 'signin'
              ? 'Sign in to access your dashboard and watch your organic growth unfold in real-time.'
              : 'Create your account and experience the only SMM platform that delivers engagement like real humans do.'}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Feature pills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 40 }}>
        {[
          'Natural delivery algorithm',
          'Detection-proof engagement',
          'Real-time growth analytics',
        ].map((f, i) => (
          <motion.div
            key={f}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              background: 'rgba(16,185,129,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Check size={12} color="#10B981" />
            </div>
            <span style={{ color: '#CBD5E1', fontSize: '0.88rem', fontWeight: 500 }}>{f}</span>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Bottom testimonial quote */}
    <div style={{
      position: 'relative', zIndex: 1,
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16, padding: '20px 24px',
    }}>
      <p style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 12 }}>
        "BMG's natural timing made our client's growth look completely organic. Zero flags, perfect retention."
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, #10B981, #059669)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: '0.85rem', fontFamily: 'Sora,sans-serif',
        }}>A</div>
        <div>
          <div style={{ color: 'white', fontWeight: 600, fontSize: '0.85rem' }}>Alex R.</div>
          <div style={{ color: '#64748B', fontSize: '0.75rem' }}>Agency Owner · 50K+ orders</div>
        </div>
        <div style={{ marginLeft: 'auto', color: '#F59E0B', fontSize: '0.8rem' }}>★★★★★</div>
      </div>
    </div>
  </div>
);

/* ---------- Input Field ---------- */
const Field = ({ label, type = 'text', placeholder, value, onChange, icon: Icon }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{
        display: 'block', fontSize: '0.85rem', fontWeight: 600,
        color: '#374151', marginBottom: 7,
      }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type={isPassword ? (show ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: '100%', padding: '12px 16px',
            paddingRight: isPassword ? 44 : 16,
            border: '1.5px solid #E5E7EB',
            borderRadius: 12, fontSize: '0.95rem',
            fontFamily: 'Inter,sans-serif', color: '#111827',
            background: '#FAFAFA',
            outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={e => {
            e.target.style.borderColor = '#10B981';
            e.target.style.boxShadow = '0 0 0 3px rgba(16,185,129,0.12)';
            e.target.style.background = '#fff';
          }}
          onBlur={e => {
            e.target.style.borderColor = '#E5E7EB';
            e.target.style.boxShadow = 'none';
            e.target.style.background = '#FAFAFA';
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            style={{
              position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF',
              display: 'flex', alignItems: 'center',
            }}
          >
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </div>
    </div>
  );
};

/* ---------- Main Auth Component ---------- */
const formVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.42, ease: [0.4, 0, 0.2, 1] } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }),
};

const Auth = () => {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [dir, setDir] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });

  const switchMode = (next) => {
    setDir(next === 'signup' ? 1 : -1);
    setMode(next);
    setForm({ name: '', email: '', password: '', confirm: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      fontFamily: 'Inter,sans-serif',
      overflow: 'hidden',
    }}>
      {/* Left brand panel */}
      <div style={{ width: '42%', flexShrink: 0 }} className="auth-brand-panel">
        <BrandPanel mode={mode} />
      </div>

      {/* Right form panel */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#F8FAFC',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>
        {/* Back to home — in normal flow at top */}
        <div style={{ padding: '20px 32px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: '#6B7280', fontSize: '0.85rem', fontWeight: 500,
              textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#111827'}
            onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
          >
            <ArrowLeft size={15} /> Back to home
          </Link>
        </div>

        {/* Form — centered horizontally, starts near top */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 40px 48px' }}>

        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Page heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode + '-head'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ marginBottom: 28, textAlign: 'center' }}
            >
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'Sora,sans-serif', color: '#0F172A', marginBottom: 6 }}>
                {mode === 'signin' ? 'Welcome back' : 'Create your account'}
              </h1>
              <p style={{ fontSize: '0.88rem', color: '#6B7280' }}>
                {mode === 'signin'
                  ? 'Sign in to access your growth dashboard'
                  : 'Join 10,000+ creators using BMG SMM'}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Tab switcher */}
          <div style={{
            display: 'flex',
            background: '#F1F5F9',
            borderRadius: 14,
            padding: 4,
            marginBottom: 36,
            position: 'relative',
          }}>
            {['signin', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                style={{
                  flex: 1, padding: '10px 0',
                  borderRadius: 11, border: 'none',
                  fontFamily: 'Inter,sans-serif',
                  fontWeight: 600, fontSize: '0.9rem',
                  cursor: 'pointer', position: 'relative', zIndex: 1,
                  transition: 'color 0.25s',
                  color: mode === m ? '#111827' : '#6B7280',
                  background: 'transparent',
                }}
              >
                {mode === m && (
                  <motion.div
                    layoutId="tab-bg"
                    style={{
                      position: 'absolute', inset: 0,
                      background: '#fff',
                      borderRadius: 11,
                      boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>
                  {m === 'signin' ? 'Sign In' : 'Sign Up'}
                </span>
              </button>
            ))}
          </div>

          {/* Animated form */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={mode}
              custom={dir}
              variants={formVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <form onSubmit={handleSubmit}>
                {mode === 'signup' && (
                  <Field
                    label="Full Name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={update('name')}
                  />
                )}
                <Field
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={update('email')}
                />
                <Field
                  label="Password"
                  type="password"
                  placeholder={mode === 'signup' ? 'Create a strong password' : 'Enter your password'}
                  value={form.password}
                  onChange={update('password')}
                />
                {mode === 'signup' && (
                  <Field
                    label="Confirm Password"
                    type="password"
                    placeholder="Repeat your password"
                    value={form.confirm}
                    onChange={update('confirm')}
                  />
                )}

                {mode === 'signin' && (
                  <div style={{ textAlign: 'right', marginBottom: 20, marginTop: -8 }}>
                    <a href="#" style={{ fontSize: '0.83rem', color: '#10B981', fontWeight: 600 }}>
                      Forgot password?
                    </a>
                  </div>
                )}

                {mode === 'signup' && (
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                      <input type="checkbox" style={{ marginTop: 3, accentColor: '#10B981' }} />
                      <span style={{ fontSize: '0.82rem', color: '#6B7280', lineHeight: 1.6 }}>
                        I agree to the{' '}
                        <a href="#" style={{ color: '#10B981', fontWeight: 600 }}>Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" style={{ color: '#10B981', fontWeight: 600 }}>Privacy Policy</a>
                      </span>
                    </label>
                  </div>
                )}

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  style={{
                    width: '100%', padding: '13px 0',
                    background: loading ? '#6EE7B7' : '#10B981',
                    color: 'white', border: 'none', borderRadius: 13,
                    fontFamily: 'Inter,sans-serif', fontWeight: 700,
                    fontSize: '0.97rem', cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'background 0.2s',
                    boxShadow: '0 4px 18px rgba(16,185,129,0.32)',
                    marginBottom: 18,
                  }}
                >
                  {loading
                    ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</>
                    : mode === 'signin' ? 'Sign In to Dashboard' : 'Create My Account'}
                </motion.button>
              </form>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
                <span style={{ fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 500 }}>or continue with</span>
                <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
              </div>

              {/* Google button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.01, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%', padding: '12px 0',
                  background: '#fff', border: '1.5px solid #E5E7EB',
                  borderRadius: 13, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 10,
                  fontFamily: 'Inter,sans-serif', fontWeight: 600,
                  fontSize: '0.92rem', cursor: 'pointer', color: '#111827',
                  transition: 'all 0.2s',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                <GoogleIcon />
                Continue with Google
              </motion.button>

              {/* Switch link */}
              <p style={{ textAlign: 'center', marginTop: 28, fontSize: '0.88rem', color: '#6B7280' }}>
                {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#10B981', fontWeight: 700, fontSize: '0.88rem',
                    fontFamily: 'Inter,sans-serif', padding: 0,
                  }}
                >
                  {mode === 'signin' ? 'Create one free' : 'Sign in instead'}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        </div>
      </div>

      {/* Mobile-only: hide brand panel via inline style override */}
      <style>{`
        @media (max-width: 768px) {
          .auth-brand-panel { display: none !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Auth;
