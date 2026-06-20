import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const engines = [
  { icon: '🧠', title: 'Human Timing Simulation', desc: 'Our algorithm models real user behavior — peak hours, scroll patterns, and dwell time — to distribute engagement realistically.' },
  { icon: '⏱️', title: 'Smart Pacing', desc: 'Orders never deliver at fixed intervals. Each wave is randomized within safe variance bands to eliminate pattern detection.' },
  { icon: '🌙', title: 'Night Slowdowns', desc: 'Delivery automatically slows at night hours matching your audience\'s timezone, then accelerates during peak activity windows.' },
  { icon: '📈', title: 'Peak-Hour Boosts', desc: 'Engagement surges naturally during platform peak hours, creating realistic viral-looking growth curves that pass algorithmic review.' },
  { icon: '🎲', title: 'Randomized Intervals', desc: 'No two orders ever share the same timing signature. Every delivery is uniquely fingerprinted with organic variation.' },
  { icon: '🛡️', title: 'Detection-Proof Delivery', desc: 'Designed from the ground up to be invisible to spam detection systems used by Instagram, TikTok, YouTube, and other platforms.' },
];

const Engine = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="engine" className="section section-alt" ref={ref}>
      <div className="container">
        <motion.div
          className="section-head"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.div className="tag" variants={fadeUp}><span className="dot" />Natural Growth Engine</motion.div>
          <motion.h2 className="section-title" variants={fadeUp}>Intelligence Behind Every Delivery</motion.h2>
          <motion.p className="section-sub" variants={fadeUp}>
            BMG doesn't just deliver numbers. It delivers them the way real humans would — unpredictably, naturally, and convincingly.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-3"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {engines.map((e, i) => (
            <motion.div key={i} className="card" variants={fadeUp}>
              <div className="engine-icon">{e.icon}</div>
              <h3 className="engine-title">{e.title}</h3>
              <p className="engine-desc">{e.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Engine;
