import React from 'react';
import { useShop } from './Layout';
import { X, Heart, ShoppingBag } from 'lucide-react';

export default function WishlistDrawer() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useShop();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product) => {
    addToCart(product);
    toggleWishlist(product); // Remove from wishlist after moving to cart
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
    }} onClick={() => setIsWishlistOpen(false)}>
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
            <Heart size={20} color="#d4af37" /> Saved Pieces
          </h3>
          <button onClick={() => setIsWishlistOpen(false)} style={{ background: 'none', border: 'none', color: '#a0a0a0', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 0', color: '#666' }}>
              <p>Your wishlist is empty.</p>
            </div>
          ) : (
            wishlist.map(p => (
              <div key={p.id} style={{ display: 'flex', gap: '15px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <img src={p.img} alt={p.title} style={{ width: '80px', height: '80px', objectFit: 'cover', border: '1px solid rgba(212, 175, 55, 0.15)' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '15px', color: '#fdfbf7', marginBottom: '5px' }}>{p.title}</h4>
                  <span style={{ color: '#d4af37', fontWeight: '500', fontSize: '13px' }}>{p.price}</span>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button 
                      onClick={() => handleMoveToCart(p)}
                      style={{
                        background: 'none',
                        border: '1px solid #d4af37',
                        color: '#d4af37',
                        padding: '6px 12px',
                        fontSize: '10px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <ShoppingBag size={12} /> Add To Cart
                    </button>
                    <button 
                      onClick={() => toggleWishlist(p)}
                      style={{
                        background: 'none',
                        border: '1px solid rgba(255,77,77,0.3)',
                        color: '#ff4d4d',
                        padding: '6px 12px',
                        fontSize: '10px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
