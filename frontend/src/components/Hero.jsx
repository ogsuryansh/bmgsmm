import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

// Organic growth data points simulating natural engagement
const organicData = [
  { t: '0m',  v: 0 },
  { t: '10m', v: 22 },
  { t: '20m', v: 38 },
  { t: '30m', v: 54 },
  { t: '45m', v: 91 },
  { t: '1h',  v: 143 },
  { t: '1.5h',v: 198 },
  { t: '2h',  v: 263 },
  { t: '2.5h',v: 341 },
  { t: '3h',  v: 487 },
  { t: '4h',  v: 612 },
  { t: '5h',  v: 798 },
  { t: '6h',  v: 1040 },
  { t: '8h',  v: 1390 },
  { t: '10h', v: 1820 },
  { t: '12h', v: 2460 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: 10,
        padding: '10px 16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        fontSize: '0.85rem',
      }}>
        <div style={{ color: '#6B7280', marginBottom: 4 }}>{label}</div>
        <div style={{ fontWeight: 700, color: '#10B981', fontFamily: 'Sora, sans-serif' }}>
          {payload[0].value.toLocaleString()} views
        </div>
      </div>
    );
  }
  return null;
};

const HeroChart = () => {
  const [visibleData, setVisibleData] = useState(organicData.slice(0, 1));
  const idxRef = useRef(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (idxRef.current < organicData.length) {
        setVisibleData(organicData.slice(0, idxRef.current + 1));
        idxRef.current += 1;
      } else {
        idxRef.current = 1;
        setVisibleData(organicData.slice(0, 1));
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="hero-chart-wrap"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
    >
      <div className="hero-chart-header">
        <div>
          <div className="chart-label">Natural Growth Simulation</div>
          <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: 2 }}>1,000 views order · organic delivery</div>
        </div>
        <div className="chart-live-badge">
          <span className="chart-live-dot" />
          Live Engine
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={visibleData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="gradGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#10B981" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="t" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotoneX"
            dataKey="v"
            stroke="#10B981"
            strokeWidth={2.5}
            fill="url(#gradGreen)"
            dot={false}
            isAnimationActive
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' } }),
};

const Hero = () => (
  <section className="hero">
    <div className="hero-bg" />
    <div className="container hero-inner">
      <motion.div className="tag" initial="hidden" animate="visible" variants={fadeUp} custom={0}>
        <span className="dot" /> Natural Growth Engine · Powered by BMG
      </motion.div>

      <motion.h1 className="hero-title" initial="hidden" animate="visible" variants={fadeUp} custom={1}>
        Growth That Moves<br /><span className="text-gradient">Like Real People.</span>
      </motion.h1>

      <motion.p className="hero-sub" initial="hidden" animate="visible" variants={fadeUp} custom={2}>
        Every delivery follows natural engagement patterns, creating growth that looks authentic, believable, and algorithm-safe.
      </motion.p>

      <motion.div className="hero-actions" initial="hidden" animate="visible" variants={fadeUp} custom={3}>
        <Link to="/dashboard" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 30px', textDecoration: 'none' }}>
          Start Growing Naturally
        </Link>
        <button className="btn btn-ghost" style={{ fontSize: '1rem', padding: '14px 30px' }}>
          See How It Works
        </button>
      </motion.div>

      <motion.div className="trust-row" initial="hidden" animate="visible" variants={fadeUp} custom={4}>
        {[
          { icon: '⚡', label: '50,000+ Orders Delivered' },
          { icon: '🛡️', label: 'Detection-Proof Delivery' },
          { icon: '🌱', label: 'Organic Growth Patterns' },
          { icon: '⭐', label: '4.9 / 5 Rating' },
        ].map((t, i) => (
          <div className="trust-item" key={i}>
            <div className="trust-icon">{t.icon}</div>
            {t.label}
          </div>
        ))}
      </motion.div>

      <HeroChart />
    </div>
  </section>
);

export default Hero;
