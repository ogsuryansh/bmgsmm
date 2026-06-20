import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const useCounter = (target, active) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);
  return count;
};

const Stat = ({ value, label, suffix, active }) => {
  const count = useCounter(value, active);
  return (
    <div className="card" style={{ textAlign: 'center', padding: '36px 24px' }}>
      <div className="stat-val">{count.toLocaleString()}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const Stats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: 50000, label: 'Orders Delivered', suffix: '+' },
    { value: 10000, label: 'Happy Clients', suffix: '+' },
    { value: 99,    label: 'Success Rate', suffix: '.9%' },
    { value: 24,    label: 'Support Hours', suffix: '/7' },
  ];

  return (
    <section className="section section-alt" ref={ref}>
      <div className="container">
        <motion.div
          className="grid grid-4"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Stat {...s} active={inView} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
