import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine
} from 'recharts';

// Traditional: instant flat line
const traditionalData = [
  { t: '0s', v: 0 },
  { t: '1s', v: 10000 },
  { t: '2s', v: 10000 },
  { t: '5m', v: 10000 },
  { t: '1h', v: 10000 },
  { t: '6h', v: 10000 },
];

// BMG: organic curve
const bmgData = [
  { t: '0m',   v: 0 },
  { t: '30m',  v: 120 },
  { t: '1h',   v: 280 },
  { t: '1.5h', v: 450 },
  { t: '2h',   v: 620 },
  { t: '3h',   v: 950 },
  { t: '4h',   v: 1400 },
  { t: '5h',   v: 2100 },
  { t: '6h',   v: 2980 },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const MiniChart = ({ data, color, gradId, label, sub, bad }) => (
  <div className={`demo-card ${bad ? 'demo-card-bad' : 'demo-card-good'}`}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
      <span style={{ fontSize: '1.1rem' }}>{bad ? '❌' : '✅'}</span>
      <div className="demo-card-title" style={{ color: bad ? '#6B7280' : '#111827' }}>{label}</div>
    </div>
    <div className="demo-card-sub">{sub}</div>
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.2} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
        <XAxis dataKey="t" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
        <Line
          type={bad ? 'stepAfter' : 'monotoneX'}
          dataKey="v"
          stroke={color}
          strokeWidth={2.5}
          dot={false}
          isAnimationActive
          animationDuration={1600}
        />
      </LineChart>
    </ResponsiveContainer>
    {bad ? (
      <div style={{ marginTop: 16, padding: '10px 14px', background: '#FEF2F2', borderRadius: 10, fontSize: '0.82rem', color: '#EF4444', fontWeight: 600 }}>
        ⚠️ Instant spike — triggers spam detection
      </div>
    ) : (
      <div style={{ marginTop: 16, padding: '10px 14px', background: 'rgba(16,185,129,0.08)', borderRadius: 10, fontSize: '0.82rem', color: '#10B981', fontWeight: 600 }}>
        ✓ Natural curve — looks like real virality
      </div>
    )}
  </div>
);

const Demo = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="demo" className="section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-head"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.div className="tag" variants={fadeUp}><span className="dot" />Interactive Demo</motion.div>
          <motion.h2 className="section-title" variants={fadeUp}>Watch Delivery Happen Naturally</motion.h2>
          <motion.p className="section-sub" variants={fadeUp}>
            See exactly why traditional panels get flagged — and how BMG's intelligent distribution stays under the radar every time.
          </motion.p>
        </motion.div>

        <motion.div
          className="demo-grid"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <MiniChart
            data={traditionalData}
            color="#EF4444"
            gradId="gradRed"
            label="Traditional Panel"
            sub="0 → 10,000 views in seconds"
            bad
          />
          <MiniChart
            data={bmgData}
            color="#10B981"
            gradId="gradGreen"
            label="BMG Natural Engine"
            sub="0 → 120 → 450 → 950 → 2,100 views"
            bad={false}
          />
        </motion.div>

        {/* Timing breakdown */}
        <motion.div
          style={{ marginTop: 40, background: '#F8FAFC', borderRadius: 20, padding: '32px 36px', border: '1px solid #E5E7EB' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>
            Example: 1,000 Views Order Delivery Schedule
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { time: '0 – 30 min',  count: '50 views',   pct: 5 },
              { time: '30 – 60 min', count: '90 views',   pct: 9 },
              { time: '1 – 2 hrs',   count: '120 views',  pct: 12 },
              { time: '2 – 4 hrs',   count: '180 views',  pct: 18 },
              { time: '4 – 8 hrs',   count: '300 views',  pct: 30 },
              { time: '8 – 12 hrs',  count: '260 views',  pct: 26 },
            ].map((item, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', border: '1px solid #E5E7EB' }}>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: 6 }}>{item.time}</div>
                <div style={{ fontWeight: 700, color: '#111827', marginBottom: 10, fontFamily: 'Sora,sans-serif' }}>{item.count}</div>
                <div style={{ height: 6, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden' }}>
                  <motion.div
                    style={{ height: '100%', background: '#10B981', borderRadius: 3 }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${item.pct * 3.33}%` } : { width: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Demo;
