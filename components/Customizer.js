import React, { useState } from 'react';
import { useShop } from './Layout';

const PRICING = {
  metal: { platinum: 2200, 'yellow-gold': 1500, 'white-gold': 1600, 'rose-gold': 1550 },
  gem: { diamond: 5500, emerald: 4200, sapphire: 3800, ruby: 4800 },
  design: { solitaire: 1200, halo: 1800, threestone: 2500 }
};

const METAL_COLORS = {
  platinum: '#c0c0c0',
  'yellow-gold': '#d4af37',
  'white-gold': '#e5e5e5',
  'rose-gold': '#e0a98b'
};

const GEM_COLORS = {
  diamond: { color: '#ffffff', glow: 'rgba(255,255,255,0.7)', label: 'Diamond' },
  emerald: { color: '#00cc7a', glow: 'rgba(0,204,122,0.7)', label: 'Emerald' },
  sapphire: { color: '#1a75ff', glow: 'rgba(26,117,255,0.7)', label: 'Sapphire' },
  ruby: { color: '#ff1a40', glow: 'rgba(255,26,64,0.7)', label: 'Ruby' }
};

export default function Customizer() {
  const { addToCart } = useShop();
  const [metal, setMetal] = useState('platinum');
  const [gem, setGem] = useState('diamond');
  const [design, setDesign] = useState('solitaire');

  const price = PRICING.metal[metal] + PRICING.gem[gem] + PRICING.design[design];

  const handleAddCustomRing = () => {
    const customProduct = {
      id: `custom-ring-${Date.now()}`,
      title: 'Bespoke Atelier Ring',
      price: `$${price.toLocaleString()}`,
      img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600',
      category: 'rings',
      desc: `A custom-designed luxury ring. Metal: ${metal}, Gemstone: ${gem}, Style: ${design}.`
    };
    addToCart(customProduct, { Metal: metal, Gemstone: gem, Style: design });
  };

  return (
    <section id="customizer" style={{ padding: '100px 0', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4af37', marginBottom: '12px' }}>Bespoke Studio</p>
          <h2 style={{ fontSize: '40px', fontWeight: '300' }}>Live Atelier Customizer</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, #111111 0%, #050505 100%)',
            border: '1px solid rgba(212, 175, 55, 0.15)',
            aspectRatio: '1',
            position: 'relative'
          }}>
            {/* Ring SVG Shank */}
            <svg style={{ width: '220px', height: '220px', transition: 'all 0.5s ease' }} viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="58" r="26" stroke={METAL_COLORS[metal]} strokeWidth="4.5" />
              <path d="M43 34.5 C43 34.5, 45 31, 50 31 C55 31, 57 34.5, 57 34.5" stroke={METAL_COLORS[metal]} strokeWidth="3" strokeLinecap="round" />
            </svg>

            {/* Floating Gem */}
            <div style={{
              position: 'absolute',
              top: '28%',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: GEM_COLORS[gem].color,
              boxShadow: `0 0 25px ${GEM_COLORS[gem].glow}`,
              transform: design === 'halo' ? 'scale(1.15)' : design === 'threestone' ? 'scale(0.9)' : 'scale(1)',
              transition: 'all 0.5s ease'
            }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div>
              <h3 style={{ fontSize: '28px', marginBottom: '10px' }}>Configure Your Piece</h3>
              <p style={{ color: '#a0a0a0', fontSize: '14px' }}>Select your precious metals, center gemstones, and design profiles below to receive an instant bespoke estimate.</p>
            </div>

            {/* Metals */}
            <div>
              <span style={{ fontSize: '11px', fontWeight: '500', color: '#a0a0a0', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Precious Metal</span>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {Object.keys(PRICING.metal).map(m => (
                  <button 
                    key={m}
                    onClick={() => setMetal(m)}
                    style={{
                      background: metal === m ? 'rgba(212,175,55,0.08)' : 'transparent',
                      border: metal === m ? '1px solid #d4af37' : '1px solid rgba(212,175,55,0.15)',
                      color: '#fdfbf7',
                      padding: '10px 18px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {m.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Gems */}
            <div>
              <span style={{ fontSize: '11px', fontWeight: '500', color: '#a0a0a0', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Gemstone Type</span>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {Object.keys(PRICING.gem).map(g => (
                  <button 
                    key={g}
                    onClick={() => setGem(g)}
                    style={{
                      background: gem === g ? 'rgba(212,175,55,0.08)' : 'transparent',
                      border: gem === g ? '1px solid #d4af37' : '1px solid rgba(212,175,55,0.15)',
                      color: '#fdfbf7',
                      padding: '10px 18px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Design Styles */}
            <div>
              <span style={{ fontSize: '11px', fontWeight: '500', color: '#a0a0a0', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Setting Style</span>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {Object.keys(PRICING.design).map(d => (
                  <button 
                    key={d}
                    onClick={() => setDesign(d)}
                    style={{
                      background: design === d ? 'rgba(212,175,55,0.08)' : 'transparent',
                      border: design === d ? '1px solid #d4af37' : '1px solid rgba(212,175,55,0.15)',
                      color: '#fdfbf7',
                      padding: '10px 18px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.15)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', display: 'block' }}>Bespoke Estimate</span>
                <span style={{ fontSize: '13px', color: '#d4af37', textTransform: 'capitalize' }}>{metal} / {gem} / {design}</span>
              </div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', color: '#f5e2b3' }}>
                ${price.toLocaleString()}
              </div>
            </div>

            <button onClick={handleAddCustomRing} style={{
              background: 'linear-gradient(135deg, #f5e2b3 0%, #d4af37 50%, #aa7c11 100%)',
              border: 'none',
              color: '#000',
              padding: '15px 0',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'center'
            }}>
              Order Custom Piece
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
