import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: '#020202',
      borderTop: '1px solid rgba(212, 175, 55, 0.15)',
      padding: '80px 0 40px',
      color: '#a0a0a0',
      fontSize: '13px'
    }}>
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '0 40px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          <div>
            <Link href="/" style={{
              textDecoration: 'none',
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '24px',
              letterSpacing: '0.15em',
              color: '#fdfbf7',
              lineHeight: '1',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '20px'
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
            <p style={{ lineHeight: '1.8', fontSize: '13px' }}>
              Redefining luxury with hand-selected gemstones, immaculate shapes, and premium platinum and gold bands.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#fdfbf7', fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', letterSpacing: '0.1em', marginBottom: '20px', textTransform: 'uppercase' }}>Atelier</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link href="/#collections" style={{ color: 'inherit', textDecoration: 'none' }}>The Collections</Link></li>
              <li><Link href="/#customizer" style={{ color: 'inherit', textDecoration: 'none' }}>Custom Ring Studio</Link></li>
              <li><Link href="/#atelier" style={{ color: 'inherit', textDecoration: 'none' }}>The Craftsmanship</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fdfbf7', fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', letterSpacing: '0.1em', marginBottom: '20px', textTransform: 'uppercase' }}>Showrooms</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>Paris (Place Vendôme)</li>
              <li>New York (Fifth Avenue)</li>
              <li>Geneva (Rue du Rhône)</li>
              <li>London (Bond Street)</li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fdfbf7', fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', letterSpacing: '0.1em', marginBottom: '20px', textTransform: 'uppercase' }}>Newsletter</h4>
            <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>Receive notifications of limited edition collections, invitations to private sales, and seasonal lookbooks.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Atelier Lookbook'); e.target.reset(); }} style={{ display: 'flex' }}>
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  padding: '10px 15px',
                  color: '#fff',
                  fontSize: '12px',
                  flex: 1,
                  outline: 'none'
                }}
              />
              <button type="submit" style={{
                background: '#d4af37',
                border: 'none',
                color: '#000',
                padding: '0 20px',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: '600',
                cursor: 'pointer'
              }}>Join</button>
            </form>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px'
        }}>
          <p>&copy; 2026 MM International Fine Jewelry. All rights reserved.</p>
          <div>
            <Link href="/admin" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.3 }}>
              Console Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
