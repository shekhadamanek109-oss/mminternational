import React from 'react';
import Link from 'next/link';
import { useShop } from './Layout';
import { ShoppingBag, Heart, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const { cart, wishlist, setIsCartOpen, setIsWishlistOpen, user, logout } = useShop();
  
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: 100 + '%',
      height: '80px',
      zIndex: 1000,
      background: 'rgba(5, 5, 5, 0.85)',
      backdropFilter: 'blur(15px)',
      borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '0 40px',
        width: 100 + '%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '24px',
          letterSpacing: '0.15em',
          color: '#fdfbf7',
          lineHeight: '1'
        }}>
          MM JEWELRY
          <span style={{
            fontSize: '9px',
            fontFamily: 'Montserrat, sans-serif',
            letterSpacing: '0.4em',
            color: '#d4af37',
            marginTop: '4px',
            textTransform: 'uppercase'
          }}>
            International
          </span>
        </Link>

        <nav>
          <ul style={{
            display: 'flex',
            gap: '35px',
            listStyle: 'none'
          }}>
            <li>
              <Link href="/" style={{
                color: '#a0a0a0',
                textDecoration: 'none',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}>Home</Link>
            </li>
            <li>
              <Link href="/#collections" style={{
                color: '#a0a0a0',
                textDecoration: 'none',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}>Collections</Link>
            </li>
            <li>
              <Link href="/#customizer" style={{
                color: '#a0a0a0',
                textDecoration: 'none',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}>Atelier Custom</Link>
            </li>
            <li>
              <Link href="/track" style={{
                color: '#a0a0a0',
                textDecoration: 'none',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}>Track Order</Link>
            </li>
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button 
            onClick={() => setIsWishlistOpen(true)}
            style={{ background: 'none', border: 'none', color: '#fdfbf7', cursor: 'pointer', position: 'relative' }}
          >
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#d4af37',
                color: '#000',
                fontSize: '9px',
                fontWeight: '700',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>{wishlist.length}</span>
            )}
          </button>

          <button 
            onClick={() => setIsCartOpen(true)}
            style={{ background: 'none', border: 'none', color: '#fdfbf7', cursor: 'pointer', position: 'relative' }}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#d4af37',
                color: '#000',
                fontSize: '9px',
                fontWeight: '700',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>{cartCount}</span>
            )}
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12px', color: '#d4af37' }}>{user.name}</span>
              <button 
                onClick={logout}
                style={{ background: 'none', border: 'none', color: '#a0a0a0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link href="/#login" style={{ color: '#fdfbf7' }}>
              <User size={20} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
