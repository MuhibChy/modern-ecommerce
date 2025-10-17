import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Truck, Shield, RotateCcw, ChevronLeft, Minus, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductById, products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-white/60 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-white/60 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-white transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn-ghost flex items-center space-x-2 mb-8"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden glass-strong">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.tags?.includes('new') && (
                <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded">
                  NEW
                </span>
              )}
              {product.tags?.includes('sale') && discount > 0 && (
                <span className="px-3 py-1 bg-gradient-to-r from-pink-600 to-red-600 text-white text-sm font-semibold rounded">
                  SAVE {discount}%
                </span>
              )}
              {product.tags?.includes('bestseller') && (
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-sm font-semibold rounded">
                  BESTSELLER
                </span>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category */}
            <Link
              to={`/products?category=${product.category}`}
              className="inline-block text-sm text-blue-400 hover:text-blue-300 uppercase tracking-wider"
            >
              {product.category}
            </Link>

            {/* Name */}
            <h1 className="text-4xl font-display font-bold">{product.name}</h1>

            {/* Rating & Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-white/20'
                    }
                  />
                ))}
              </div>
              <span className="text-white/60">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold gradient-text">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-2xl text-white/40 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-white/70 text-lg">{product.description}</p>

            {/* Specifications */}
            {product.specs && (
              <div className="card">
                <h3 className="font-semibold mb-3">Key Specifications</h3>
                <ul className="space-y-2">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="flex items-center space-x-2 text-white/70">
                      <Check size={16} className="text-green-400" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.inStock ? (
                <>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-400 rounded-full" />
                  <span className="text-red-400 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            {product.inStock && (
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {product.inStock && (
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2 relative"
                >
                  {addedToCart ? (
                    <>
                      <Check size={20} />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 btn-secondary"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`w-12 h-12 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors ${
                    isFavorite ? 'text-pink-500' : ''
                  }`}
                >
                  <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
                  <Truck size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Free Shipping</p>
                  <p className="text-xs text-white/60">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
                  <Shield size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Warranty</p>
                  <p className="text-xs text-white/60">1 Year Coverage</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
                  <RotateCcw size={20} className="text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-xs text-white/60">30 Day Policy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-display font-bold gradient-text mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
