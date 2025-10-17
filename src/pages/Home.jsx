import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Zap, Shield, Truck, HeadphonesIcon, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts, categories } from '../data/products';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredProducts = getFeaturedProducts();

  const heroSlides = [
    {
      title: 'Experience the Future',
      subtitle: 'AI-Powered Shopping',
      description: 'Discover cutting-edge technology with our intelligent product recommendations',
      cta: 'Shop Now',
      link: '/products',
      gradient: 'from-blue-600 to-purple-600',
    },
    {
      title: 'Premium Quality',
      subtitle: 'Unbeatable Prices',
      description: 'Get the best deals on top-tier products with our exclusive offers',
      cta: 'View Deals',
      link: '/products?tag=sale',
      gradient: 'from-pink-600 to-red-600',
    },
    {
      title: 'New Arrivals',
      subtitle: 'Latest Technology',
      description: 'Be the first to experience the newest innovations in tech',
      cta: 'Explore New',
      link: '/products?tag=new',
      gradient: 'from-green-600 to-teal-600',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Lightning-fast shipping on all orders',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Your transactions are always protected',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on orders over $100',
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Always here to help you',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 flex items-center justify-center ${
              currentSlide === index ? 'z-10' : 'z-0'
            }`}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`inline-block px-4 py-2 glass-strong rounded-full text-sm font-semibold bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}
                >
                  {slide.subtitle}
                </motion.div>
                
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl font-display font-bold gradient-text"
                >
                  {slide.title}
                </motion.h1>
                
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-white/70"
                >
                  {slide.description}
                </motion.p>
                
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to={slide.link}
                    className={`inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r ${slide.gradient} text-white font-semibold rounded-lg hover:scale-105 transition-transform shadow-lg hover:shadow-xl`}
                  >
                    <span>{slide.cta}</span>
                    <ArrowRight size={20} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? 'w-8 bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <feature.icon size={28} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold gradient-text mb-4">
            Shop by Category
          </h2>
          <p className="text-white/60 text-lg">
            Explore our wide range of premium products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/products?category=${category.id}`}
                className="card-hover text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-600 transition-all">
                  <span className="text-3xl">
                    {category.id === 'laptops' && '💻'}
                    {category.id === 'desktops' && '🖥️'}
                    {category.id === 'components' && '⚙️'}
                    {category.id === 'peripherals' && '🖱️'}
                    {category.id === 'networking' && '📡'}
                    {category.id === 'accessories' && '🎧'}
                  </span>
                </div>
                <h3 className="font-semibold group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-display font-bold gradient-text mb-4">
              Featured Products
            </h2>
            <p className="text-white/60 text-lg">
              Handpicked selection of our best products
            </p>
          </div>
          <Link
            to="/products"
            className="hidden md:flex items-center space-x-2 btn-secondary"
          >
            <span>View All</span>
            <ChevronRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
            <span>View All Products</span>
            <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl glass-strong p-12 md:p-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Special Offer
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Get up to 50% off on selected items. Limited time only!
            </p>
            <Link
              to="/products?tag=sale"
              className="inline-flex items-center space-x-2 btn-primary"
            >
              <span>Shop Sale</span>
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 text-[300px] font-bold">
            50%
          </div>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-display font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-white/60 mb-6">
            Subscribe to our newsletter for exclusive deals and updates
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input flex-1"
              required
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
