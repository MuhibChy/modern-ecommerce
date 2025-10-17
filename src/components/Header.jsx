import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/products';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const { getCartCount } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const cartCount = getCartCount();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-strong shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-display font-bold gradient-text hidden sm:block">
              ModernShop
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="input pr-12"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* User Account */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="hidden sm:flex items-center space-x-2 btn-ghost"
            >
              <User size={20} />
              <span className="hidden lg:inline">
                {isAuthenticated ? user.name : 'Login'}
              </span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative btn-ghost">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden btn-ghost"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation Bar - Desktop */}
        <nav className="hidden md:flex items-center space-x-1 pb-4 border-t border-white/10 pt-4">
          <Link to="/" className="btn-ghost">
            Home
          </Link>
          
          {/* Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <button className="btn-ghost flex items-center space-x-1">
              <span>Categories</span>
              <ChevronDown size={16} className={`transition-transform ${showCategories ? 'rotate-180' : ''}`} />
            </button>
            
            {showCategories && (
              <div className="absolute top-full left-0 mt-2 w-64 glass-strong rounded-lg shadow-xl py-2 animate-fade-in">
                <Link
                  to="/products"
                  className="block px-4 py-2 hover:bg-white/10 transition-colors"
                >
                  All Products
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/products?category=${category.id}`}
                    className="block px-4 py-2 hover:bg-white/10 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/products?tag=new" className="btn-ghost">
            New Arrivals
          </Link>
          <Link to="/products?tag=sale" className="btn-ghost">
            <span className="text-pink-400">Sale</span>
          </Link>
          <Link to="/about" className="btn-ghost">
            About
          </Link>
          <Link to="/contact" className="btn-ghost">
            Contact
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-strong border-t border-white/10">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="input pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-ghost text-left"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-ghost text-left"
              >
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-ghost text-left pl-8"
                >
                  {category.name}
                </Link>
              ))}
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-ghost text-left"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-ghost text-left"
              >
                Contact
              </Link>
              <Link
                to={isAuthenticated ? '/account' : '/login'}
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-ghost text-left"
              >
                {isAuthenticated ? 'My Account' : 'Login / Register'}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
