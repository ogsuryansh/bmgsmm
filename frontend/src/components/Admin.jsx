import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Settings as SettingsIcon, LogOut, Search, Loader2, Save, Key, Link as LinkIcon, UserCircle, DollarSign } from 'lucide-react';

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Dashboard State
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [settings, setSettings] = useState({ smmApiUrl: '', smmApiKey: '', profitMargin: 20 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, settingsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/settings`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      const usersData = await usersRes.json();
      const settingsData = await settingsRes.json();

      if (usersRes.ok) setUsers(usersData.users);
      else if (usersRes.status === 401 || usersRes.status === 403) handleLogout();

      if (settingsRes.ok) setSettings(settingsData.settings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (res.ok) alert('Settings saved successfully!');
      else alert('Failed to save settings');
    } catch (err) {
      alert('Error saving settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSyncServices = async () => {
    if (!settings.smmApiUrl || !settings.smmApiKey) {
      return alert('Please configure and save SMM API URL and Key first.');
    }
    setSyncing(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/sync-services`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      alert(data.message || 'Sync complete');
    } catch (err) {
      alert('Error connecting to backend');
    } finally {
      setSyncing(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);


  // ---------------- LOGIN VIEW ----------------
  if (!token) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: 20 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: 400, background: '#fff', borderRadius: 24, padding: 40, boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Sora' }}>B</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', fontFamily: 'Sora' }}>Admin Portal</h1>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: 8 }}>Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {error && <div style={{ padding: 12, background: '#FEF2F2', color: '#EF4444', borderRadius: 8, fontSize: '0.85rem', textAlign: 'center' }}>{error}</div>}
            
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: 8 }}>Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} required style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #E2E8F0', outline: 'none', background: '#F8FAFC' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: 8 }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #E2E8F0', outline: 'none', background: '#F8FAFC' }} />
            </div>

            <button type="submit" disabled={loading} style={{ marginTop: 8, padding: '14px', background: '#10B981', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: 8 }}>
              {loading ? <Loader2 size={20} className="spin" /> : 'Login to Dashboard'}
            </button>
          </form>
        </motion.div>
        <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ---------------- DASHBOARD VIEW ----------------
  return (
    <div style={{ display: 'flex', height: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Sidebar - Desktop */}
      <div className="admin-sidebar" style={{ width: 260, background: '#0F172A', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#10B981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>B</div>
          <span style={{ fontWeight: 600, letterSpacing: '0.5px' }}>Admin Panel</span>
        </div>
        
        <div style={{ padding: '24px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={() => setActiveTab('users')} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px 16px', borderRadius: 10, border: 'none', background: activeTab === 'users' ? 'rgba(16,185,129,0.1)' : 'transparent', color: activeTab === 'users' ? '#10B981' : '#94A3B8', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', fontWeight: 500 }}>
            <Users size={18} /> Users List
          </button>
          <button onClick={() => setActiveTab('settings')} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px 16px', borderRadius: 10, border: 'none', background: activeTab === 'settings' ? 'rgba(16,185,129,0.1)' : 'transparent', color: activeTab === 'settings' ? '#10B981' : '#94A3B8', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', fontWeight: 500 }}>
            <SettingsIcon size={18} /> API Settings
          </button>
        </div>

        <div style={{ padding: 24, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px 16px', borderRadius: 10, border: 'none', background: 'rgba(239,68,68,0.1)', color: '#EF4444', cursor: 'pointer', fontWeight: 500 }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Mobile Header */}
        <div className="admin-mobile-header" style={{ background: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ fontWeight: 700, color: '#0F172A' }}>Admin Panel</div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: 'none', border: 'none', fontSize: 24 }}>☰</button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ overflow: 'hidden', background: '#fff', borderBottom: '1px solid #E2E8F0' }} className="admin-mobile-menu">
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button onClick={() => { setActiveTab('users'); setIsMobileMenuOpen(false); }} style={{ padding: 12, background: activeTab === 'users' ? '#F1F5F9' : 'transparent', border: 'none', textAlign: 'left', borderRadius: 8, display: 'flex', gap: 10, color: activeTab === 'users' ? '#10B981' : '#334155' }}><Users size={18}/> Users</button>
                <button onClick={() => { setActiveTab('settings'); setIsMobileMenuOpen(false); }} style={{ padding: 12, background: activeTab === 'settings' ? '#F1F5F9' : 'transparent', border: 'none', textAlign: 'left', borderRadius: 8, display: 'flex', gap: 10, color: activeTab === 'settings' ? '#10B981' : '#334155' }}><SettingsIcon size={18}/> Settings</button>
                <button onClick={handleLogout} style={{ padding: 12, background: '#FEF2F2', color: '#EF4444', border: 'none', textAlign: 'left', borderRadius: 8, display: 'flex', gap: 10 }}><LogOut size={18}/> Logout</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          
          {loading && !users.length ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}><Loader2 size={32} className="spin" color="#10B981"/></div>
          ) : (
            <AnimatePresence mode="wait">
              
              {/* USERS TAB */}
              {activeTab === 'users' && (
                <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A' }}>Users Management</h2>
                    
                    <div style={{ position: 'relative', width: '100%', maxWidth: 300 }}>
                      <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                      <input 
                        type="text" 
                        placeholder="Search users..." 
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        style={{ width: '100%', padding: '10px 16px 10px 40px', borderRadius: 100, border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.9rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                          <tr>
                            <th style={{ padding: '16px 24px', fontSize: '0.8rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>User</th>
                            <th style={{ padding: '16px 24px', fontSize: '0.8rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Email</th>
                            <th style={{ padding: '16px 24px', fontSize: '0.8rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Balance</th>
                            <th style={{ padding: '16px 24px', fontSize: '0.8rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Joined</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.length === 0 ? (
                            <tr><td colSpan="4" style={{ padding: 30, textAlign: 'center', color: '#94A3B8' }}>No users found.</td></tr>
                          ) : filteredUsers.map(u => (
                            <tr key={u._id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                              <td style={{ padding: '16px 24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                  {u.picture ? <img src={u.picture} alt="" style={{ width: 36, height: 36, borderRadius: '50%' }} /> : <UserCircle size={36} color="#CBD5E1" />}
                                  <span style={{ fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>{u.name}</span>
                                </div>
                              </td>
                              <td style={{ padding: '16px 24px', color: '#64748B', fontSize: '0.9rem' }}>{u.email}</td>
                              <td style={{ padding: '16px 24px' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#ECFDF5', color: '#10B981', padding: '4px 10px', borderRadius: 100, fontWeight: 700, fontSize: '0.85rem' }}>
                                  <DollarSign size={14}/> {u.balance.toFixed(2)}
                                </div>
                              </td>
                              <td style={{ padding: '16px 24px', color: '#94A3B8', fontSize: '0.85rem' }}>
                                {new Date(u.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === 'settings' && (
                <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ maxWidth: 600 }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: 24 }}>SMM API Integration</h2>
                  
                  <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', padding: 32 }}>
                    <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      
                      <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', fontWeight: 600, color: '#334155', marginBottom: 8 }}>
                          <LinkIcon size={16} color="#10B981" /> SMM Provider URL
                        </label>
                        <input 
                          type="url" 
                          placeholder="https://provider.com/api/v2" 
                          value={settings.smmApiUrl}
                          onChange={e => setSettings({...settings, smmApiUrl: e.target.value})}
                          style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid #E2E8F0', outline: 'none', background: '#F8FAFC', fontSize: '0.95rem' }} 
                        />
                        <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: 6 }}>The base URL of the SMM panel API you are connecting to.</p>
                      </div>

                      <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', fontWeight: 600, color: '#334155', marginBottom: 8 }}>
                          <Key size={16} color="#10B981" /> Provider API Key
                        </label>
                        <input 
                          type="password" 
                          placeholder="Enter your secret API key" 
                          value={settings.smmApiKey}
                          onChange={e => setSettings({...settings, smmApiKey: e.target.value})}
                          style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid #E2E8F0', outline: 'none', background: '#F8FAFC', fontSize: '0.95rem' }} 
                        />
                      </div>

                      <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', fontWeight: 600, color: '#334155', marginBottom: 8 }}>
                          <DollarSign size={16} color="#10B981" /> Global Profit Margin (%)
                        </label>
                        <input 
                          type="number" 
                          min="0"
                          placeholder="e.g. 20" 
                          value={settings.profitMargin}
                          onChange={e => setSettings({...settings, profitMargin: parseFloat(e.target.value)})}
                          style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid #E2E8F0', outline: 'none', background: '#F8FAFC', fontSize: '0.95rem' }} 
                        />
                        <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: 6 }}>This percentage is automatically added to the provider's cost. (e.g. 20 means adding 20% to cost)</p>
                      </div>

                      <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '10px 0' }} />

                      <div style={{ display: 'flex', gap: 16 }}>
                        <button type="submit" disabled={loading} style={{ flex: 1, padding: '14px', background: '#10B981', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, transition: 'background 0.2s' }}>
                          {loading ? <Loader2 size={18} className="spin" /> : <Save size={18} />} Save Config
                        </button>

                        <button type="button" onClick={handleSyncServices} disabled={syncing} style={{ flex: 1, padding: '14px', background: '#0F172A', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, transition: 'background 0.2s' }}>
                          {syncing ? <Loader2 size={18} className="spin" /> : '🔄'} {syncing ? 'Syncing...' : 'Sync Services'}
                        </button>
                      </div>

                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

        </div>
      </div>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .admin-mobile-header { display: none !important; }
        .admin-mobile-menu { display: none !important; }

        @media (max-width: 768px) {
          .admin-sidebar { display: none !important; }
          .admin-mobile-header { display: flex !important; }
          .admin-mobile-menu { display: block !important; }
        }
      `}</style>
    </div>
  );
};

export default Admin;
