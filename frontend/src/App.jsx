import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Demo from './components/Demo';
import Engine from './components/Engine';
import Why from './components/Why';
import Stats from './components/Stats';
import { Testimonials, Services, CTA, Footer } from './components/Sections';
import Auth from './components/Auth';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import { About, Contact, Terms, RefundPolicy, PrivacyPolicy, CookiePolicy } from './components/LegalPages';

const Landing = () => (
  <>
    <Navbar />
    <div style={{ paddingTop: 72 }}>
      <Hero />
      <Demo />
      <Engine />
      <Why />
      <Stats />
      <Services />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<RefundPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
