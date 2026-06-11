import React from 'react';
import { useRouter } from 'next/router';
import { useShop } from './Layout';
import { X, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, addToCart } = useShop();
  const router = useRouter();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => {
    const priceNum = parseFloat(item.product.price.replace(/[$,]/g, ''));
    return sum + (priceNum * item.quantity);
  }, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'flex-end'
    }} onClick={() => setIsCartOpen(false)}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        height: '100%',
        background: '#0e0e0e',
        borderLeft: '1px solid rgba(212, 175, 55, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        padding: '30px'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px' }}>
            <ShoppingBag size={20} color="#d4af37" /> Shopping Bag
          </h3>
          <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: '#a0a0a0', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 0', color: '#666' }}>
              <p>Your shopping bag is empty.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.key} style={{ display: 'flex', gap: '15px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <img src={item.product.img} alt={item.product.title} style={{ width: '80px', height: '80px', objectFit: 'cover', border: '1px solid rgba(212, 175, 55, 0.15)' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '15px', color: '#fdfbf7', marginBottom: '5px' }}>{item.product.title}</h4>
                  {item.variant && Object.keys(item.variant).length > 0 && (
                    <div style={{ fontSize: '11px', color: '#666', marginBottom: '5px' }}>
                      {Object.entries(item.variant).map(([k, v]) => `${k}: ${v}`).join(' / ')}
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <span style={{ color: '#d4af37', fontWeight: '500', fontSize: '13px' }}>{item.product.price} × {item.quantity}</span>
                    <button onClick={() => removeFromCart(item.key)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Subtotal</span>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', color: '#f5e2b3' }}>${subtotal.toLocaleString()}</span>
            </div>
            <button onClick={handleCheckout} style={{
              width: '100%',
              background: 'linear-gradient(135deg, #f5e2b3 0%, #d4af37 50%, #aa7c11 100%)',
              color: '#000',
              border: 'none',
              padding: '14px 0',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
