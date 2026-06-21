import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaFacebook, FaTelegramPlane, FaSpotify, FaTiktok, FaTwitter } from 'react-icons/fa';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const reviews = [
  { name: 'Alex R.', role: 'Digital Agency Owner', text: 'The natural delivery curve is remarkable. Our clients see growth that genuinely looks organic — zero flags, zero drops.', rating: 5 },
  { name: 'Sarah K.', role: 'Content Creator', text: "I've tested a dozen panels. BMG is the only one where the growth actually holds after a week. The timing feels completely real.", rating: 5 },
  { name: 'Michael T.', role: 'Marketing Director', text: 'The intelligent distribution is a game-changer for brand accounts. No more suspicious spikes — just clean, authentic-looking growth.', rating: 5 },
];

const platforms = [
  { name: 'Instagram', icon: <FaInstagram size={22} />, color: '#E1306C', services: ['Followers', 'Likes', 'Views', 'Comments'] },
  { name: 'TikTok',    icon: <FaTiktok size={22} />,    color: '#000000', services: ['Followers', 'Views', 'Likes', 'Shares'] },
  { name: 'YouTube',   icon: <FaYoutube size={22} />,   color: '#FF0000', services: ['Views', 'Subscribers', 'Likes', 'Watch Time'] },
  { name: 'Facebook',  icon: <FaFacebook size={22} />,  color: '#1877F2', services: ['Page Likes', 'Post Likes', 'Followers', 'Views'] },
  { name: 'Telegram',  icon: <FaTelegramPlane size={22} />, color: '#0088CC', services: ['Members', 'Views', 'Reactions', 'Post Boosts'] },
  { name: 'Spotify',   icon: <FaSpotify size={22} />,   color: '#1DB954', services: ['Streams', 'Followers', 'Playlist Adds', 'Monthly Listeners'] },
];

const Testimonials = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" ref={ref}>
      <div className="container">
        <motion.div className="section-head" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>
          <motion.div className="tag" variants={fadeUp}><span className="dot" />Testimonials</motion.div>
          <motion.h2 className="section-title" variants={fadeUp}>Trusted by Creators & Agencies</motion.h2>
          <motion.p className="section-sub" variants={fadeUp}>
            Real users. Real growth. Zero drama.
          </motion.p>
        </motion.div>

        <motion.div className="grid grid-3" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>
          {reviews.map((r, i) => (
            <motion.div key={i} className="card" variants={fadeUp}>
              <div className="review-stars">
                {Array(r.rating).fill(0).map((_, j) => <span key={j}>★</span>)}
              </div>
              <p style={{ fontSize: '0.95rem', color: '#374151', marginBottom: 24, lineHeight: 1.7, fontStyle: 'italic' }}>
                "{r.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 800, fontFamily: 'Sora,sans-serif',
                  fontSize: '1rem',
                }}>
                  {r.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{r.name}</div>
                  <div style={{ color: '#9CA3AF', fontSize: '0.82rem' }}>{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="section section-alt" ref={ref}>
      <div className="container">
        <motion.div className="section-head" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>
          <motion.div className="tag" variants={fadeUp}><span className="dot" />Platforms</motion.div>
          <motion.h2 className="section-title" variants={fadeUp}>Natural Growth, Every Platform</motion.h2>
          <motion.p className="section-sub" variants={fadeUp}>
            Intelligent distribution across all major social networks. Same organic timing. Zero detection risk.
          </motion.p>
        </motion.div>

        <motion.div className="grid grid-3" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>
          {platforms.map((p, i) => (
            <motion.div key={i} className="card" variants={fadeUp}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: `${p.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: p.color,
                }}>
                  {p.icon}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{p.name}</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {p.services.map((s, j) => (
                  <span key={j} style={{
                    fontSize: '0.78rem', fontWeight: 600, color: '#6B7280',
                    background: '#F3F4F6', borderRadius: 100, padding: '4px 10px',
                  }}>{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CTA = () => (
  <div>
    <div className="cta-section">
      <h2 className="cta-title">Ready To Scale Your Social Presence?</h2>
      <p className="cta-sub">
        Join 10,000+ creators and agencies using BMG's Natural Growth Engine to build authentic audiences.
      </p>
      <button className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '16px 36px' }}>
        Get Started Today <ArrowRight size={18} />
      </button>
    </div>
  </div>
);

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <div className="logo" style={{ marginBottom: 16 }}>
            <div className="logo-mark">B</div>
            BMG SMM
          </div>
          <p style={{ color: '#6B7280', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: 260 }}>
            The intelligent growth platform that delivers engagement the way real humans do — naturally.
          </p>
        </div>
        <div>
          <div className="footer-col-title">Platform</div>
          <ul className="footer-links">
            <li>Natural Growth Engine</li>
            <li>API Access</li>
            <li>Reseller Program</li>
            <li>Analytics</li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Company</div>
          <ul className="footer-links">
            <li><Link to="/about">About BMG</Link></li>
            <li>Blog</li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Legal</div>
          <ul className="footer-links">
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/refund">Refund Policy</Link></li>
            <li><Link to="/cookies">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>
          © 2026 BMG SMM. All rights reserved.
        </div>
        <div className="footer-social">
          <a href="#"><FaInstagram size={16} /></a>
          <a href="#"><FaTwitter size={16} /></a>
          <a href="#"><FaTelegramPlane size={16} /></a>
          <a href="#"><FaYoutube size={16} /></a>
        </div>
      </div>
    </div>
  </footer>
);

export { Testimonials, Services, CTA, Footer };
