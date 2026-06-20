import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlusCircle, List, Wallet, Key, Loader2, IndianRupee, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('deposit'); // Start on deposit to show them
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      window.location.href = '/auth'; // Redirect if not logged in
      return;
    }
    setUser(JSON.parse(storedUser));
  }, []);

  if (!user) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 className="spin" size={32} color="#10B981" /></div>;

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Sidebar - Desktop */}
      <div className="dash-sidebar" style={{ width: 260, background: '#fff', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #F1F5F9' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, color: '#0F172A' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>B</div>
            <span style={{ fontWeight: 700, letterSpacing: '0.5px' }}>BMG SMM</span>
          </Link>
        </div>
        
        <div style={{ padding: '24px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={() => setActiveTab('new_order')} style={tabStyle(activeTab === 'new_order')}>
            <PlusCircle size={18} /> New Order
          </button>
          <button onClick={() => setActiveTab('orders')} style={tabStyle(activeTab === 'orders')}>
            <List size={18} /> Order History
          </button>
          <button onClick={() => setActiveTab('deposit')} style={tabStyle(activeTab === 'deposit')}>
            <Wallet size={18} /> Add Funds
          </button>
          <button onClick={() => setActiveTab('api')} style={tabStyle(activeTab === 'api')}>
            <Key size={18} /> API Details
          </button>
        </div>

        <div style={{ padding: '24px', borderTop: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user.picture ? (
              <img src={user.picture} alt="" style={{ width: 40, height: 40, borderRadius: '50%' }} />
            ) : (
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#10B981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{user.name.charAt(0)}</div>
            )}
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0F172A', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748B' }}>User</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        <div style={{ padding: '24px 40px', background: '#fff', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', textTransform: 'capitalize' }}>
            {activeTab.replace('_', ' ')}
          </h1>

          {/* Top Balance Widget */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#F8FAFC', padding: '8px 16px', borderRadius: 100, border: '1px solid #E2E8F0' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500 }}>Balance:</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>₹{(user.balance || 0).toFixed(2)}</span>
          </div>
        </div>

        <div style={{ padding: '40px', maxWidth: 1000, margin: '0 auto', width: '100%' }}>
          <AnimatePresence mode="wait">
            
            {/* DEPOSIT TAB */}
            {activeTab === 'deposit' && (
              <motion.div key="deposit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
                  
                  {/* Wallet Card */}
                  <div style={{ background: 'linear-gradient(135deg, #0F172A, #1e293b)', borderRadius: 24, padding: 32, color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(15,23,42,0.15)' }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{ fontSize: '0.9rem', color: '#94A3B8', fontWeight: 500, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Wallet size={16} color="#10B981" /> Current Balance
                      </div>
                      <div style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'Sora', display: 'flex', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '1.5rem', marginTop: 8, marginRight: 4, color: '#10B981' }}>₹</span>
                        {(user.balance || 0).toFixed(2)}
                      </div>
                      <div style={{ marginTop: 32, fontSize: '0.85rem', color: '#64748B', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Account ID: {user.googleId.substring(0, 8)}</span>
                        <span>Active</span>
                      </div>
                    </div>
                    {/* Background blob */}
                    <div style={{ position: 'absolute', top: '-50%', right: '-20%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
                  </div>

                  {/* Add Funds Form */}
                  <div style={{ background: '#fff', borderRadius: 24, padding: 32, border: '1px solid #E2E8F0', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', marginBottom: 24 }}>Add Funds</h2>
                    
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: 8 }}>Amount (₹)</label>
                    <div style={{ position: 'relative', marginBottom: 24 }}>
                      <IndianRupee size={18} color="#94A3B8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                      <input 
                        type="number" 
                        min="1"
                        placeholder="100.00" 
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: 12, border: '1.5px solid #E2E8F0', outline: 'none', background: '#F8FAFC', fontSize: '1.05rem', fontWeight: 600, color: '#0F172A', transition: 'border-color 0.2s' }} 
                        onFocus={e => e.target.style.borderColor = '#10B981'}
                        onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                      />
                    </div>

                    <div style={{ padding: 16, background: '#F8FAFC', borderRadius: 12, border: '1px dashed #CBD5E1', textAlign: 'center', marginBottom: 24 }}>
                      <p style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500 }}>
                        We are waiting for you to select a payment gateway! Once configured, clicking the button below will open the checkout.
                      </p>
                    </div>

                    <button 
                      disabled={!amount || amount <= 0}
                      style={{ width: '100%', padding: '16px', background: (!amount || amount <= 0) ? '#94A3B8' : '#10B981', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: '1rem', cursor: (!amount || amount <= 0) ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, transition: 'all 0.2s', boxShadow: (!amount || amount <= 0) ? 'none' : '0 10px 25px rgba(16,185,129,0.3)' }}
                    >
                      Proceed to Pay <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

              </motion.div>
            )}

            {/* PLACEHOLDERS FOR OTHER TABS */}
            {activeTab !== 'deposit' && (
              <motion.div key="other" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: 100 }}>
                <h2 style={{ fontSize: '1.5rem', color: '#94A3B8' }}>UI coming soon!</h2>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
      
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .dash-sidebar { display: none !important; } }
      `}</style>
    </div>
  );
};

const tabStyle = (active) => ({
  display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '14px 16px', 
  borderRadius: 12, border: 'none', 
  background: active ? '#10B981' : 'transparent', 
  color: active ? '#fff' : '#64748B', 
  cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', fontWeight: 600,
  boxShadow: active ? '0 4px 14px rgba(16,185,129,0.2)' : 'none'
});

export default Dashboard;
