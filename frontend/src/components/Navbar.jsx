import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <div className="logo-mark">B</div>
          BMG SMM
        </Link>

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
      </div>
    </nav>
  );
};

export default Navbar;
