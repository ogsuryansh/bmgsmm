import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className="navbar" style={{
      boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.06)' : 'none',
      transition: 'box-shadow 0.3s',
    }}>
      <div className="container nav-inner">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
          <div className="logo-mark">B</div>
          BMG SMM
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          <a href="/#engine">Engine</a>
          <a href="/#demo">Demo</a>
          <a href="/#why">Why Us</a>
          <a href="/#pricing">Pricing</a>
          <a href="/#contact">Contact</a>
        </div>

        <div className="nav-right">
          <Link to="/auth" className="btn btn-ghost" style={{ fontSize: '0.9rem', padding: '10px 20px' }}>
            Login
          </Link>
          <Link to="/auth" className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '10px 20px' }}>
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '8px' }}>
          <motion.div animate={mobileOpen ? "open" : "closed"} style={{ width: 24, height: 16, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
            <motion.span
              style={{ width: '100%', height: '2px', background: 'currentColor', borderRadius: '2px', transformOrigin: 'center' }}
              variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 7 } }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <motion.span
              style={{ width: '100%', height: '2px', background: 'currentColor', borderRadius: '2px', transformOrigin: 'center' }}
              variants={{ closed: { opacity: 1, x: 0 }, open: { opacity: 0, x: 20 } }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <motion.span
              style={{ width: '100%', height: '2px', background: 'currentColor', borderRadius: '2px', transformOrigin: 'center' }}
              variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -7 } }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
          </motion.div>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="mobile-sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            >
              <div className="mobile-links">
                <a href="/#engine" onClick={() => setMobileOpen(false)}>Engine</a>
                <a href="/#demo" onClick={() => setMobileOpen(false)}>Demo</a>
                <a href="/#why" onClick={() => setMobileOpen(false)}>Why Us</a>
                <a href="/#pricing" onClick={() => setMobileOpen(false)}>Pricing</a>
                <a href="/#contact" onClick={() => setMobileOpen(false)}>Contact</a>
              </div>
              <div className="mobile-actions">
                <Link to="/auth" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
                <Link to="/auth" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
                  Get Started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
