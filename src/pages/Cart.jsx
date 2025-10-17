import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-32 h-32 mx-auto mb-6 glass rounded-full flex items-center justify-center">
              <ShoppingBag size={64} className="text-white/40" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-white/60 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
              <span>Start Shopping</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-display font-bold gradient-text">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="btn-ghost text-red-400 hover:text-red-300"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <Link
                    to={`/product/${item.id}`}
                    className="w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden glass"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="font-semibold text-lg hover:text-blue-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-white/60 capitalize">{item.category}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-4">
                        <span className="text-xl font-bold gradient-text">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card sticky top-32"
            >
              <h2 className="text-2xl font-display font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-blue-400">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="flex justify-between text-white/70">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="gradient-text">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Promo Code</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 input"
                  />
                  <button className="btn-secondary whitespace-nowrap">Apply</button>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={20} />
              </button>

              {/* Continue Shopping */}
              <Link
                to="/products"
                className="block text-center text-white/60 hover:text-white transition-colors mt-4"
              >
                Continue Shopping
              </Link>

              {/* Security Badges */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-center space-x-4 text-xs text-white/60">
                  <span>🔒 Secure Checkout</span>
                  <span>✓ SSL Encrypted</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="card text-center">
            <div className="text-3xl mb-2">🚚</div>
            <h3 className="font-semibold mb-1">Free Shipping</h3>
            <p className="text-sm text-white/60">On orders over $100</p>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-semibold mb-1">Easy Returns</h3>
            <p className="text-sm text-white/60">30-day return policy</p>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-2">💳</div>
            <h3 className="font-semibold mb-1">Secure Payment</h3>
            <p className="text-sm text-white/60">100% secure transactions</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
