import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    desc: 'Test our Natural Engine risk-free',
    features: ['Access to standard services', 'Basic organic timing', 'Standard API access', 'Email support'],
    featured: false,
  },
  {
    name: 'Growth',
    price: 49,
    desc: 'For creators serious about authentic growth',
    features: ['All premium services', 'Full Natural Growth Engine', 'Priority API access', 'Dedicated account manager', 'Real-time delivery analytics'],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'High-volume intelligence at scale',
    features: ['White-label panel option', 'Custom timing algorithms', 'SLA guarantee', 'Custom integrations', 'Bulk pricing'],
    featured: false,
  },
];

const Pricing = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pricing" className="section section-alt" ref={ref}>
      <div className="container">
        <motion.div
          className="section-head"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.div className="tag" variants={fadeUp}><span className="dot" />Pricing</motion.div>
          <motion.h2 className="section-title" variants={fadeUp}>Simple, Transparent Pricing</motion.h2>
          <motion.p className="section-sub" variants={fadeUp}>
            Start free. Scale with intelligence. Every plan includes the Natural Growth Engine.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-3"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {plans.map((p, i) => (
            <motion.div
              key={i}
              className={`card ${p.featured ? 'price-card-featured' : ''}`}
              variants={fadeUp}
              style={{ padding: '40px 32px' }}
            >
              {p.featured && <div className="price-badge">Most Popular</div>}
              <h3 style={{ fontSize: '1.4rem', marginBottom: 8 }}>{p.name}</h3>
              <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: 24 }}>{p.desc}</p>
              <div style={{ marginBottom: 32 }}>
                <span className="price-val">
                  {typeof p.price === 'number' ? `$${p.price}` : p.price}
                </span>
                {typeof p.price === 'number' && (
                  <span className="price-per">/month</span>
                )}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                {p.features.map((f, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem' }}>
                    <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'}`} style={{ width: '100%' }}>
                {p.price === 'Free' ? 'Get Started Free' : p.price === 'Custom' ? 'Contact Sales' : 'Start Growing'}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
