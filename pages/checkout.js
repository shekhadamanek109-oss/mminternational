import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useShop } from '../components/Layout';
import { CreditCard, CheckCircle } from 'lucide-react';

export default function Checkout() {
  const { cart, removeFromCart } = useShop();
  const router = useRouter();

  const [shipping, setShipping] = useState({ name: '', email: '', address: '', city: '', zip: '' });
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' });
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const subtotal = cart.reduce((sum, item) => {
    const priceNum = parseFloat(item.product.price.replace(/[$,]/g, ''));
    return sum + (priceNum * item.quantity);
  }, 0);

  const tax = subtotal * 0.08; // 8% luxury tax
  const discountAmount = subtotal * discount;
  const total = subtotal + tax - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'LUXURY10') {
      setDiscount(0.1); // 10% off
      alert('Promo code applied: 10% discount');
    } else {
      alert('Invalid promo code');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setPlacingOrder(true);
    
    // Simulate API request to submit order
    setTimeout(() => {
      const orderId = `MM-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const orderDetails = {
        id: orderId,
        date: new Date().toLocaleDateString(),
        items: cart,
        total: `$${total.toLocaleString()}`,
        shipping,
        status: 'Processing'
      };

      // In real NextJS we would post to /api/orders, let's trigger success local view
      setOrderSuccess(orderDetails);
      setPlacingOrder(false);
      
      // Clear cart
      cart.forEach(item => removeFromCart(item.key));
    }, 2000);
  };

  if (orderSuccess) {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', padding: '40px', textAlign: 'center' }} className="glass-panel">
        <CheckCircle size={60} color="#d4af37" style={{ marginBottom: '20px', display: 'inline-block' }} />
        <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Order Confirmed</h2>
        <p style={{ color: '#a0a0a0', marginBottom: '30px' }}>Thank you for your purchase. Your order has been registered in the MM Atelier.</p>
        
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.15)', padding: '20px', textAlign: 'left', marginBottom: '30px' }}>
          <p style={{ marginBottom: '10px' }}><strong>Order ID:</strong> <span style={{ color: '#d4af37' }}>{orderSuccess.id}</span></p>
          <p style={{ marginBottom: '10px' }}><strong>Ship To:</strong> {orderSuccess.shipping.name}</p>
          <p style={{ marginBottom: '10px' }}><strong>Total:</strong> {orderSuccess.total}</p>
          <p style={{ marginBottom: '10px' }}><strong>Estimated Delivery:</strong> 5-7 business days</p>
        </div>

        <button onClick={() => router.push(`/track?id=${orderSuccess.id}`)} className="btn btn-primary" style={{ width: '100%' }}>
          Track Order Status
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '40px' }}>
      <Head>
        <title>Checkout | MM Fine Jewelry</title>
      </Head>

      <h1 style={{ fontSize: '42px', marginBottom: '40px', textAlign: 'center' }}>Secure Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'flex-start' }}>
        {/* Forms */}
        <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Shipping */}
          <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', color: '#f5e2b3' }}>Shipping Address</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Full Name</label>
                <input type="text" required value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.2)', padding: '12px', color: '#fff', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Email Address</label>
                <input type="email" required value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.2)', padding: '12px', color: '#fff', outline: 'none' }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Street Address</label>
              <input type="text" required value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.2)', padding: '12px', color: '#fff', outline: 'none' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>City</label>
                <input type="text" required value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.2)', padding: '12px', color: '#fff', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>ZIP / Postal Code</label>
                <input type="text" required value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.2)', padding: '12px', color: '#fff', outline: 'none' }} />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', color: '#f5e2b3', display: 'flex', alignItems: 'center', gap: '10px' }}><CreditCard size={20} /> Credit Card Payment</h3>
            <div>
              <label style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Card Number</label>
              <input type="text" required placeholder="•••• •••• •••• ••••" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.2)', padding: '12px', color: '#fff', outline: 'none' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Expiration Date</label>
                <input type="text" required placeholder="MM/YY" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.2)', padding: '12px', color: '#fff', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>CVC Security Code</label>
                <input type="text" required placeholder="•••" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.2)', padding: '12px', color: '#fff', outline: 'none' }} />
              </div>
            </div>
          </div>

          <button type="submit" disabled={placingOrder} style={{
            background: 'linear-gradient(135deg, #f5e2b3 0%, #d4af37 50%, #aa7c11 100%)',
            color: '#000',
            border: 'none',
            padding: '16px 0',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer'
          }}>
            {placingOrder ? 'Processing Authorization...' : `Authorize Payment ($${total.toLocaleString()})`}
          </button>
        </form>

        {/* Sidebar Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px', marginBottom: '20px', color: '#f5e2b3' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px', maxHeight: '200px', overflowY: 'auto' }}>
              {cart.map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span>{item.product.title} × {item.quantity}</span>
                  <span style={{ color: '#f5e2b3' }}>{item.product.price}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Luxury Tax (8%)</span>
                <span>${tax.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00cc7a' }}>
                  <span>Discount Applied</span>
                  <span>-${discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px', fontSize: '16px', fontWeight: '500' }}>
                <span style={{ color: '#d4af37' }}>Total</span>
                <span style={{ color: '#f5e2b3' }}>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Promo code form */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Promo Code (e.g. LUXURY10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  padding: '10px 15px',
                  color: '#fff',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
              <button type="submit" style={{
                background: 'transparent',
                border: '1px solid #d4af37',
                color: '#d4af37',
                padding: '0 20px',
                fontSize: '11px',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}>Apply</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
