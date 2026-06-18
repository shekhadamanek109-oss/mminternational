import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useShop } from '../components/Layout';
import Customizer from '../components/Customizer';
import { Heart, Eye, ArrowRight, Star, Sparkles } from 'lucide-react';

export default function Home() {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [prompt, setPrompt] = useState('');
  const [generatedConcept, setGeneratedConcept] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    // Fetch products from serverless API route or fallback
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => {
        // Fallback static products
        setProducts([
          { id: 'ring-signature', category: 'rings', title: 'The Signature Solitaire', price: '$8,500', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600', badge: 'Exclusive' },
          { id: 'necklace-aurora', category: 'necklaces', title: 'Aurora Sapphire Pendant', price: '$12,400', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600', badge: 'Bespoke' },
          { id: 'earrings-emerald', category: 'earrings', title: 'Elysian Emerald Drops', price: '$9,200', img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=600', badge: 'New' },
          { id: 'bracelet-eternity', category: 'bracelets', title: 'Eternity Gold Bangle', price: '$6,800', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600', badge: 'Classic' }
        ]);
      });
  }, []);

  const handleGenerateAI = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setGeneratedConcept({
        title: `Concept: ${prompt}`,
        desc: 'An AI-generated luxury concept curated under the MM International creative vault.',
        img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=600'
      });
      setGenerating(false);
    }, 2000);
  };

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div>
      <Head>
        <title>MM Fine Jewelry | Luxury & Bespoke Atelier</title>
        <meta name="description" content="Discover exquisite hand-crafted diamond rings, luxury necklaces, and custom bridal jewelry at MM Fine Jewelry. Book a private viewing today." />
      </Head>

      {/* Hero Section */}
      <section style={{
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        background: '#020202',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at center, rgba(5, 5, 5, 0.4) 0%, rgba(2, 2, 2, 0.95) 80%), url("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1500")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8
        }} />

        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 40px', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '700px' }}>
            <p style={{ fontSize: '11px', fontWeight: '500', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#d4af37', marginBottom: '20px' }}>
              Bespoke Excellence
            </p>
            <h1 style={{ fontSize: '64px', fontWeight: '200', lineHeight: '1.15', marginBottom: '25px' }}>
              Timeless Elegance, <br /><span className="text-gold">Crafted to Perfection</span>
            </h1>
            <p style={{ fontSize: '16px', color: '#a0a0a0', marginBottom: '40px', lineHeight: '1.8' }}>
              Elevate your stories with our collection of diamonds, emeralds, and fine metals. Designed for those who value absolute distinction and master craftsmanship.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link href="#collections" className="btn btn-primary">The Collections</Link>
              <Link href="#customizer" className="btn btn-secondary">Design Custom</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Collections catalog */}
      <section id="collections" style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4af37', marginBottom: '12px' }}>Exquisite Artistry</p>
            <h2 style={{ fontSize: '40px', fontWeight: '300' }}>Curated Collections</h2>
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '50px', listStyle: 'none' }}>
            {['all', 'rings', 'necklaces', 'earrings', 'bracelets'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  background: 'transparent',
                  border: filter === cat ? '1px solid #d4af37' : '1px solid rgba(212,175,55,0.15)',
                  color: filter === cat ? '#fff' : '#a0a0a0',
                  padding: '10px 24px',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {filteredProducts.map(p => (
              <div key={p.id} className="glass-panel" style={{ position: 'relative', overflow: 'hidden', padding: '15px' }}>
                {p.badge && (
                  <span style={{ position: 'absolute', top: '25px', left: '25px', background: '#d4af37', color: '#000', fontSize: '9px', fontWeight: '600', padding: '4px 8px', textTransform: 'uppercase', zIndex: 5 }}>
                    {p.badge}
                  </span>
                )}
                <img src={p.img} alt={p.title} style={{ width: '100%', height: '320px', objectFit: 'cover', border: '1px solid rgba(212,175,55,0.1)' }} />
                <div style={{ marginTop: '15px', textAlign: 'center' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#d4af37', letterSpacing: '0.2em' }}>{p.category.slice(0, -1)}</span>
                  <h3 style={{ fontSize: '20px', margin: '5px 0' }}>{p.title}</h3>
                  <p style={{ color: '#f5e2b3', fontSize: '14px' }}>{p.price}</p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'center' }}>
                    <Link href={`/product/${p.id}`} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '10px' }}>
                      <Eye size={12} style={{ marginRight: '6px' }} /> View
                    </Link>
                    <button 
                      onClick={() => toggleWishlist(p)}
                      style={{
                        background: 'none',
                        border: '1px solid rgba(212,175,55,0.2)',
                        color: wishlist.some(item => item.id === p.id) ? '#d4af37' : '#fff',
                        padding: '8px 16px',
                        cursor: 'pointer'
                      }}
                    >
                      <Heart size={12} fill={wishlist.some(item => item.id === p.id) ? '#d4af37' : 'none'} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Customizer */}
      <Customizer />

      {/* AI Concept Studio */}
      <section style={{ padding: '100px 0', background: '#020202' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4af37', marginBottom: '12px' }}>AI Design Vault</p>
              <h2 style={{ fontSize: '40px', fontWeight: '300', marginBottom: '20px' }}>AI Jewelry Generator</h2>
              <p style={{ color: '#a0a0a0', lineHeight: '1.8', marginBottom: '30px' }}>
                Describe your dream jewelry piece. Our bespoke AI generator engine will render visual representations of customized concepts instantly.
              </p>
              <form onSubmit={handleGenerateAI} style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Vintage 18k Rose Gold Sapphire Halo Ring..."
                  required
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    padding: '14px 20px',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
                <button type="submit" disabled={generating} className="btn btn-primary" style={{ padding: '0 25px' }}>
                  {generating ? 'Generating...' : <Sparkles size={16} />}
                </button>
              </form>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '1',
                border: '1px solid rgba(212,175,55,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0e0e0e',
                position: 'relative'
              }}>
                {generatedConcept ? (
                  <div style={{ padding: '20px', textAlign: 'center' }}>
                    <img src={generatedConcept.img} alt={generatedConcept.title} style={{ width: '100%', height: '240px', objectFit: 'cover', marginBottom: '15px' }} />
                    <h4>{generatedConcept.title}</h4>
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>{generatedConcept.desc}</p>
                  </div>
                ) : (
                  <div style={{ color: '#666', textAlign: 'center', padding: '40px' }}>
                    <p>Enter a description to generate a design mockup.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '100px 0', borderTop: '1px solid rgba(212, 175, 55, 0.1)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4af37', marginBottom: '12px' }}>Reviews</p>
          <h2 style={{ fontSize: '40px', fontWeight: '300', marginBottom: '50px' }}>Trusted Atelier Reviews</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { name: 'Elizabeth Sterling', text: 'The Signature Solitaire is absolute perfection. The sparkle from the platinum setting exceeds all of my expectations. Exceptional service.' },
              { name: 'Jonathan Thorne', text: 'Bespoke process was highly professional. The team took my concepts and refined them into an stunning custom wedding band.' },
              { name: 'Sophia Lauren', text: 'Excellent customer care. The private viewing showroom experience in Paris was private, luxurious, and completely satisfying.' }
            ].map((r, i) => (
              <div key={i} className="glass-panel" style={{ padding: '40px 30px', textAlign: 'left' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '15px' }}>
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={14} fill="#d4af37" color="#d4af37" />)}
                </div>
                <p style={{ fontStyle: 'italic', color: '#a0a0a0', marginBottom: '20px', fontSize: '14px', lineHeight: '1.7' }}>"{r.text}"</p>
                <h4 style={{ fontSize: '16px' }}>{r.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
