import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Search, Package, MapPin, Truck, CheckCircle } from 'lucide-react';

export default function TrackOrder() {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (router.query.id) {
      setOrderId(router.query.id);
      fetchOrder(router.query.id);
    }
  }, [router.query.id]);

  const fetchOrder = (id) => {
    // In actual implementation this checks the database
    // For visual simulation, we mock checking for ID
    if (id.startsWith('MM-')) {
      setOrder({
        id: id,
        date: new Date().toLocaleDateString(),
        status: 'Processing',
        shippingAddress: '123 Atelier Way, Paris',
        total: '$9,200',
        items: ['The Signature Solitaire (1)']
      });
    } else {
      setOrder(null);
    }
    setSearched(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    fetchOrder(orderId.trim());
  };

  const getStatusIndex = (status) => {
    const statuses = ['Ordered', 'Processing', 'Shipped', 'Delivered'];
    return statuses.indexOf(status);
  };

  const currentStep = order ? getStatusIndex(order.status) : -1;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto 80px', padding: '40px' }}>
      <Head>
        <title>Track Order | MM Fine Jewelry</title>
      </Head>

      <h1 style={{ fontSize: '42px', marginBottom: '10px', textAlign: 'center' }}>Atelier Order Tracker</h1>
      <p style={{ color: '#a0a0a0', textAlign: 'center', marginBottom: '40px' }}>Enter your unique 8-character MM Order ID below to verify your shipment status.</p>

      {/* Search form */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '60px' }}>
        <input 
          type="text" 
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID (e.g. MM-482910)"
          required
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(212,175,55,0.2)',
            padding: '14px 20px',
            color: '#fff',
            outline: 'none',
            fontSize: '14px'
          }}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '0 25px' }}>
          <Search size={16} style={{ marginRight: '8px' }} /> Locate
        </button>
      </form>

      {searched && (
        order ? (
          <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase' }}>Order ID</span>
                <h4 style={{ color: '#d4af37', fontSize: '18px', marginTop: '4px' }}>{order.id}</h4>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase' }}>Registered Date</span>
                <p style={{ marginTop: '4px' }}>{order.date}</p>
              </div>
            </div>

            {/* Tracking visual progression */}
            <div>
              <span style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '25px' }}>Delivery Progress</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', margin: '0 20px' }}>
                {/* Connecting lines */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '0',
                  right: '0',
                  height: '2px',
                  background: 'rgba(255,255,255,0.05)',
                  zIndex: 1
                }} />
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '0',
                  width: `${(currentStep / 3) * 100}%`,
                  height: '2px',
                  background: '#d4af37',
                  zIndex: 2,
                  transition: 'all 0.5s ease'
                }} />

                {/* Steps */}
                {[
                  { label: 'Ordered', icon: Package },
                  { label: 'Processing', icon: MapPin },
                  { label: 'Shipped', icon: Truck },
                  { label: 'Delivered', icon: CheckCircle }
                ].map((step, idx) => {
                  const IconComp = step.icon;
                  const isActive = idx <= currentStep;
                  return (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3, position: 'relative' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: isActive ? 'linear-gradient(135deg, #f5e2b3 0%, #d4af37 50%, #aa7c11 100%)' : '#111',
                        border: isActive ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        color: isActive ? '#000' : '#666',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.5s ease'
                      }}>
                        <IconComp size={18} />
                      </div>
                      <span style={{
                        marginTop: '10px',
                        fontSize: '11px',
                        fontWeight: '500',
                        color: isActive ? '#d4af37' : '#666',
                        letterSpacing: '0.05em'
                      }}>{step.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p><strong>Shipping To:</strong> {order.shippingAddress}</p>
              <p><strong>Items:</strong> {order.items.join(', ')}</p>
              <p><strong>Total Value:</strong> {order.total}</p>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#ff4d4d', padding: '30px' }} className="glass-panel">
            <p>Order ID not found. Please verify the registration number and try again.</p>
          </div>
        )
      )}
    </div>
  );
}
