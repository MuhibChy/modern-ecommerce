import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="block card-hover group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.tags?.includes('new') && (
              <span className="px-2 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded">
                NEW
              </span>
            )}
            {product.tags?.includes('sale') && discount > 0 && (
              <span className="px-2 py-1 bg-gradient-to-r from-pink-600 to-red-600 text-white text-xs font-semibold rounded">
                -{discount}%
              </span>
            )}
            {product.tags?.includes('bestseller') && (
              <span className="px-2 py-1 bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xs font-semibold rounded">
                BESTSELLER
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div
            className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={handleToggleFavorite}
              className={`w-9 h-9 glass-strong rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors ${
                isFavorite ? 'text-pink-500' : 'text-white'
              }`}
            >
              <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="w-9 h-9 glass-strong rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Eye size={18} />
            </Link>
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          {/* Category */}
          <p className="text-xs text-white/40 uppercase tracking-wider">
            {product.category}
          </p>

          {/* Name */}
          <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-white/20'
                  }
                />
              ))}
            </div>
            <span className="text-xs text-white/60">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold gradient-text">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-white/40 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          {product.inStock && (
            <button
              onClick={handleAddToCart}
              className={`w-full btn-primary flex items-center justify-center space-x-2 transition-all duration-300 ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
