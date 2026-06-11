import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useShop } from '../../components/Layout';
import { Heart, ShoppingBag, ArrowLeft, RefreshCw, Play } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart, toggleWishlist, wishlist } = useShop();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [metalVariant, setMetalVariant] = useState('Platinum 950');
  const [sizeVariant, setSizeVariant] = useState('6');
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const [activeMedia, setActiveMedia] = useState(null);
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const item = data.find(p => p.id === id);
        setProduct(item);
        if (item) {
          if (item.specs && item.specs.metal) {
            setMetalVariant(item.specs.metal);
          }
          const allMedia = [];
          if (item.images && item.images.length > 0) {
            item.images.forEach(url => allMedia.push({ type: 'image', url }));
          } else if (item.img) {
            allMedia.push({ type: 'image', url: item.img });
          }
          if (item.videos && item.videos.length > 0) {
            item.videos.forEach(url => allMedia.push({ type: 'video', url }));
          }
          setMediaList(allMedia);
          setActiveMedia(allMedia[0] || null);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '100px 0', textCenter: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <RefreshCw size={24} className="animate-spin" color="#d4af37" />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Item not found</h2>
        <Link href="/" style={{ color: '#d4af37' }}>Return Home</Link>
      </div>
    );
  }

  // Magnifying Glass Zoom Effect
  const handleMouseMove = (e) => {
    if (activeMedia && activeMedia.type === 'video') return;
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    const currentImgUrl = activeMedia ? activeMedia.url : product.img;
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${currentImgUrl})`,
      backgroundPosition: `${x}% ${y}%`,
      left: `${e.nativeEvent.offsetX}px`,
      top: `${e.nativeEvent.offsetY}px`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleAddToCart = () => {
    addToCart(product, { Metal: metalVariant, Size: sizeVariant });
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '40px' }}>
      <Head>
        <title>{product.title} | MM Fine Jewelry</title>
      </Head>

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#a0a0a0', textDecoration: 'none', marginBottom: '40px', fontSize: '12px' }}>
        <ArrowLeft size={16} /> Back to Catalog
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'flex-start' }}>
        {/* Gallery with zoom & thumbnails */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {activeMedia && activeMedia.type === 'video' ? (
            <div style={{ position: 'relative', border: '1px solid rgba(212,175,55,0.15)', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <video 
                src={activeMedia.url} 
                controls 
                autoPlay 
                muted 
                playsInline
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            </div>
          ) : (
            <div 
              style={{ position: 'relative', overflow: 'hidden', cursor: 'zoom-in', border: '1px solid rgba(212,175,55,0.15)' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src={activeMedia ? activeMedia.url : product.img} 
                alt={product.title} 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
              {/* Zoom lens */}
              <div style={{
                position: 'absolute',
                width: '150px',
                height: '150px',
                border: '2px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '50%',
                pointerEvents: 'none',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '300%',
                transform: 'translate(-50%, -50%)',
                ...zoomStyle
              }} />
            </div>
          )}

          {/* Thumbnails Row */}
          {mediaList.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
              {mediaList.map((media, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveMedia(media);
                    setZoomStyle({ display: 'none' });
                  }}
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                    border: activeMedia && activeMedia.url === media.url ? '2px solid #d4af37' : '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    background: '#0a0a0a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}
                >
                  {media.type === 'video' ? (
                    <>
                      <video 
                        src={media.url} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        muted 
                        playsInline
                      />
                      <div style={{ position: 'absolute', background: 'rgba(0,0,0,0.6)', borderRadius: '50%', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Play size={16} color="#d4af37" fill="#d4af37" />
                      </div>
                    </>
                  ) : (
                    <img src={media.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Specifications and variants */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#d4af37', letterSpacing: '0.2em' }}>{product.category}</span>
            <h1 style={{ fontSize: '42px', margin: '10px 0' }}>{product.title}</h1>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', color: '#f5e2b3' }}>{product.price}</p>
          </div>

          <p style={{ color: '#a0a0a0', lineHeight: '1.8', fontSize: '15px' }}>{product.desc}</p>

          {/* Metal selection */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: '500', color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Gold type / Metal</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['Platinum 950', '18K Yellow Gold', '18K White Gold', '18K Rose Gold'].map(m => (
                <button 
                  key={m}
                  onClick={() => setMetalVariant(m)}
                  style={{
                    background: metalVariant === m ? 'rgba(212,175,55,0.08)' : 'transparent',
                    border: metalVariant === m ? '1px solid #d4af37' : '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    padding: '8px 16px',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Size selection */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: '500', color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Ring Size</span>
            <select 
              value={sizeVariant} 
              onChange={(e) => setSizeVariant(e.target.value)}
              style={{
                background: '#0e0e0e',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                padding: '10px 15px',
                width: '120px',
                outline: 'none'
              }}
            >
              {['5', '6', '7', '8', '9'].map(s => <option key={s} value={s}>US {s}</option>)}
            </select>
          </div>

          {/* Specs list */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '15px', color: '#f5e2b3' }}>Specifications</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {product.specs && Object.entries(product.specs).map(([key, val]) => (
                  <tr key={key} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '8px 0', textTransform: 'capitalize', color: '#666', fontSize: '13px' }}>{key}</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', color: '#fff', fontSize: '13px' }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <button 
              onClick={handleAddToCart}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #f5e2b3 0%, #d4af37 50%, #aa7c11 100%)',
                color: '#000',
                border: 'none',
                padding: '15px 0',
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <ShoppingBag size={14} /> Add To Cart
            </button>
            <button 
              onClick={() => toggleWishlist(product)}
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'transparent',
                color: wishlist.some(item => item.id === product.id) ? '#d4af37' : '#fff',
                padding: '0 20px',
                cursor: 'pointer'
              }}
            >
              <Heart size={16} fill={wishlist.some(item => item.id === product.id) ? '#d4af37' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
