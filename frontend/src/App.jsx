import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Demo from './components/Demo';
import Engine from './components/Engine';
import Why from './components/Why';
import Stats from './components/Stats';
import Pricing from './components/Pricing';
import { Testimonials, Services, CTA, Footer } from './components/Sections';
import Auth from './components/Auth';

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
      <Pricing />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
