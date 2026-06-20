import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const Why = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="why" className="section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-head"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.div className="tag" variants={fadeUp}><span className="dot" />Why Detection Happens</motion.div>
          <motion.h2 className="section-title" variants={fadeUp}>The BMG Advantage</motion.h2>
          <motion.p className="section-sub" variants={fadeUp}>
            Most panels get caught because they ignore the way humans actually behave online. BMG is built differently.
          </motion.p>
        </motion.div>

        <motion.div
          className="compare-wrap"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Bad */}
          <div className="compare-card compare-bad">
            <h3 className="compare-title" style={{ color: '#6B7280' }}>❌ Traditional Panels</h3>
            <ul className="compare-list">
              {[
                ['Instant spikes', 'Thousands of interactions in under a second'],
                ['Fixed intervals', 'Identical batches delivered every N minutes'],
                ['Identical batches', 'Every order uses the same timing pattern'],
                ['No timezone logic', 'Delivers at 3AM in your audience\'s timezone'],
                ['Obvious bot behaviour', 'Zero variance in pacing or volume'],
              ].map(([title, desc], i) => (
                <li key={i}>
                  <span className="check-icon">❌</span>
                  <div>
                    <div style={{ fontWeight: 600, color: '#374151', marginBottom: 2 }}>{title}</div>
                    <div style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>{desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Good */}
          <div className="compare-card compare-good">
            <h3 className="compare-title" style={{ color: '#10B981' }}>✅ BMG SMM</h3>
            <ul className="compare-list">
              {[
                ['Variable delivery', 'Every wave has unique volume and timing variance'],
                ['Realistic timing', 'Delivery mirrors how real virality looks on-platform'],
                ['Organic growth curves', 'Natural acceleration, plateaus, and micro-bursts'],
                ['Human behavior patterns', 'Peak-hour logic, night slowdowns, timezone awareness'],
                ['Authentic engagement flow', 'Indistinguishable from real audience growth'],
              ].map(([title, desc], i) => (
                <li key={i}>
                  <span className="check-icon">✅</span>
                  <div>
                    <div style={{ fontWeight: 600, color: '#111827', marginBottom: 2 }}>{title}</div>
                    <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>{desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Why;
