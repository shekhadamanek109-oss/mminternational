import React, { useState, createContext, useContext, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';

export const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export default function Layout({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Sync state with localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('mm_cart');
    const savedWish = localStorage.getItem('mm_wishlist');
    const savedUser = localStorage.getItem('mm_user');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWish) setWishlist(JSON.parse(savedWish));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('mm_cart', JSON.stringify(newCart));
  };

  const saveWishlist = (newWish) => {
    setWishlist(newWish);
    localStorage.setItem('mm_wishlist', JSON.stringify(newWish));
  };

  const addToCart = (product, variant = {}) => {
    const itemKey = `${product.id}-${JSON.stringify(variant)}`;
    const existingIndex = cart.findIndex(item => item.key === itemKey);
    let newCart = [...cart];
    
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += 1;
    } else {
      newCart.push({
        key: itemKey,
        product,
        variant,
        quantity: 1
      });
    }
    saveCart(newCart);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    const newCart = cart.filter(item => item.key !== itemKey);
    saveCart(newCart);
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    let newWish = [];
    if (exists) {
      newWish = wishlist.filter(item => item.id !== product.id);
    } else {
      newWish = [...wishlist, product];
    }
    saveWishlist(newWish);
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('mm_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mm_user');
  };

  return (
    <ShopContext.Provider value={{
      cart,
      wishlist,
      isCartOpen,
      setIsCartOpen,
      isWishlistOpen,
      setIsWishlistOpen,
      addToCart,
      removeFromCart,
      toggleWishlist,
      user,
      login,
      logout
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#050505' }}>
        <Navbar />
        <main style={{ flex: 1, paddingTop: '80px' }}>
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <WishlistDrawer />
      </div>
    </ShopContext.Provider>
  );
}
