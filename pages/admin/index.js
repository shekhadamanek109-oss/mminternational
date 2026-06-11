import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { RefreshCw, LayoutDashboard, ShoppingCart, Percent, Sliders, Scroll, Award } from 'lucide-react';

export default function AdminConsole() {
  const [passcode, setPasscode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('analytics');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [authError, setAuthError] = useState(false);

  // Sync session auth state
  useEffect(() => {
    if (sessionStorage.getItem('admin_logged_in') === 'true') {
      setIsAuthorized(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const prodRes = await fetch('/api/products');
      const ordersRes = await fetch('/api/orders');
      const couponsRes = await fetch('/api/discounts');
      
      setProducts(await prodRes.json());
      setOrders(await ordersRes.json());
      setCoupons(await couponsRes.json());
    } catch (e) {
      console.error('Failed to load data in admin console', e);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthorized(true);
      setAuthError(false);
      sessionStorage.setItem('admin_logged_in', 'true');
      fetchData();
    } else {
      setAuthError(true);
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  // Auth gate visual
  if (!isAuthorized) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505' }}>
        <Head><title>Console Access | MM Fine Jewelry</title></Head>
        <div style={{ background: '#0e0e0e', border: '1px solid rgba(212,175,55,0.15)', padding: '50px', maxWidth: '440px', width: '90%', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', color: '#fdfbf7', letterSpacing: '0.15em', marginBottom: '5px' }}>MM FINE JEWELRY</h2>
          <p style={{ fontSize: '9px', letterSpacing: '0.4em', color: '#d4af37', textTransform: 'uppercase', marginBottom: '35px' }}>Atelier Console</p>
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Access Passcode</label>
              <input 
                type="password" 
                value={passcode} 
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••"
                required
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  padding: '14px',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '20px',
                  textAlign: 'center',
                  letterSpacing: '0.5em'
                }}
              />
              {authError && <p style={{ color: '#ff4d4d', fontSize: '12px', marginTop: '10px' }}>Incorrect passcode.</p>}
            </div>
            <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>Enter Console</button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + parseFloat(o.total.replace(/[$,]/g, '')), 0);

  return (
    <div style={{ maxWidth: '1300px', margin: '40px auto 80px', padding: '0 24px' }}>
      <Head><title>Atelier Console | MM Fine Jewelry</title></Head>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.15)', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '26px' }}>Atelier Console</h1>
          <p style={{ fontSize: '11px', color: '#a0a0a0', marginTop: '2px' }}>MM Fine Jewelry · Full Administration Dashboard</p>
        </div>
        <button onClick={fetchData} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <RefreshCw size={12} /> Sync
        </button>
      </div>

      {/* Tabs list */}
      <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.15)', padding: '6px', marginBottom: '30px' }}>
        {[
          { id: 'analytics', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'orders', label: 'Orders Management', icon: ShoppingCart },
          { id: 'discounts', label: 'Promo Codes', icon: Percent },
          { id: 'catalog', label: 'Product Catalog', icon: Award }
        ].map(tab => {
          const IconComp = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: isSelected ? 'linear-gradient(135deg, #f5e2b3 0%, #d4af37 50%, #aa7c11 100%)' : 'transparent',
                border: 'none',
                color: isSelected ? '#000' : '#a0a0a0',
                padding: '10px 18px',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '7px'
              }}
            >
              <IconComp size={14} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Analytics tab */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <div className="glass-panel" style={{ padding: '20px 22px' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#f5e2b3' }}>${totalRevenue.toLocaleString()}</div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a0a0a0', marginTop: '4px' }}>Total Sales Revenue</div>
            </div>
            <div className="glass-panel" style={{ padding: '20px 22px' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#f5e2b3' }}>{orders.length}</div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a0a0a0', marginTop: '4px' }}>Total Orders Placed</div>
            </div>
            <div className="glass-panel" style={{ padding: '20px 22px' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#f5e2b3' }}>{products.length}</div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a0a0a0', marginTop: '4px' }}>Active Products</div>
            </div>
            <div className="glass-panel" style={{ padding: '20px 22px' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#f5e2b3' }}>{coupons.length}</div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a0a0a0', marginTop: '4px' }}>Active Promo Codes</div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h3 style={{ fontSize: '18px', color: '#f5e2b3', marginBottom: '20px' }}>Active Invoices & orders</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '10px' }}>
                <th style={{ color: '#d4af37', padding: '12px 14px', fontSize: '11px', textTransform: 'uppercase' }}>Order ID</th>
                <th style={{ color: '#d4af37', padding: '12px 14px', fontSize: '11px', textTransform: 'uppercase' }}>Client</th>
                <th style={{ color: '#d4af37', padding: '12px 14px', fontSize: '11px', textTransform: 'uppercase' }}>Total</th>
                <th style={{ color: '#d4af37', padding: '12px 14px', fontSize: '11px', textTransform: 'uppercase' }}>Status</th>
                <th style={{ color: '#d4af37', padding: '12px 14px', fontSize: '11px', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#666' }}>No orders recorded.</td>
                </tr>
              ) : (
                orders.map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '12px 14px', fontSize: '13px' }}>{o.id}</td>
                    <td style={{ padding: '12px 14px', fontSize: '13px' }}>{o.shipping.name} ({o.shipping.email})</td>
                    <td style={{ padding: '12px 14px', fontSize: '13px', color: '#f5e2b3' }}>{o.total}</td>
                    <td style={{ padding: '12px 14px', fontSize: '13px' }}>
                      <span style={{
                        padding: '3px 8px',
                        fontSize: '10px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        background: o.status === 'Delivered' ? 'rgba(0,204,122,0.12)' : 'rgba(212,175,55,0.12)',
                        color: o.status === 'Delivered' ? '#00cc7a' : '#d4af37'
                      }}>{o.status}</span>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: '13px', textAlign: 'right' }}>
                      <select 
                        value={o.status}
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                        style={{ background: '#050505', border: '1px solid rgba(212,175,55,0.2)', color: '#fff', padding: '4px 8px' }}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Coupon manager */}
      {activeTab === 'discounts' && (
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h3 style={{ fontSize: '18px', color: '#f5e2b3', marginBottom: '20px' }}>Promo Codes Manager</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {coupons.map(c => (
              <div key={c.code} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.15)', padding: '20px' }}>
                <h4 style={{ color: '#d4af37', fontSize: '18px', letterSpacing: '0.05em' }}>{c.code}</h4>
                <p style={{ fontSize: '12px', color: '#a0a0a0', margin: '5px 0 15px' }}>{c.desc}</p>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#fdfbf7' }}>Rate: {c.rate * 100}% discount</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Catalog lists */}
      {activeTab === 'catalog' && (
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h3 style={{ fontSize: '18px', color: '#f5e2b3', marginBottom: '20px' }}>Product Catalog List</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {products.map(p => (
              <div key={p.id} style={{ display: 'flex', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '12px', border: '1px solid rgba(212,175,55,0.1)' }}>
                <img src={p.img} alt={p.title} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ fontSize: '14px', marginBottom: '4px' }}>{p.title}</h4>
                  <p style={{ fontSize: '12px', color: '#d4af37' }}>{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
