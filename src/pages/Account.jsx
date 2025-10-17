import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, Heart, Settings, LogOut, Edit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const orders = [
    {
      id: '#ORD-2024-001',
      date: '2024-10-15',
      status: 'Delivered',
      total: 2299,
      items: 2,
    },
    {
      id: '#ORD-2024-002',
      date: '2024-10-10',
      status: 'In Transit',
      total: 1899,
      items: 1,
    },
    {
      id: '#ORD-2024-003',
      date: '2024-10-05',
      status: 'Processing',
      total: 699,
      items: 3,
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold gradient-text mb-2">My Account</h1>
          <p className="text-white/60">Manage your account and view your orders</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card space-y-2">
              {/* User Info */}
              <div className="pb-6 border-b border-white/10 mb-4">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden glass-strong">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-center font-semibold">{user.name}</h3>
                <p className="text-center text-sm text-white/60">{user.email}</p>
              </div>

              {/* Navigation */}
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'hover:bg-white/5 text-white/70'
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-red-400 transition-all"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-bold">Profile Information</h2>
                  <button className="btn-secondary flex items-center space-x-2">
                    <Edit2 size={18} />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">Full Name</label>
                      <p className="text-lg">{user.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                      <p className="text-lg">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">Phone</label>
                      <p className="text-lg">+1 (234) 567-890</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">Member Since</label>
                      <p className="text-lg">October 2024</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                    <p className="text-white/70">
                      123 Tech Street<br />
                      Digital City, TC 12345<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="card">
                  <h2 className="text-2xl font-display font-bold mb-6">Order History</h2>
                </div>

                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{order.id}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-white/60">
                          <span>Date: {order.date}</span>
                          <span>Items: {order.items}</span>
                          <span>Total: ${order.total}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            order.status === 'Delivered'
                              ? 'bg-green-500/20 text-green-400'
                              : order.status === 'In Transit'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {order.status}
                        </span>
                        <button className="btn-secondary">View Details</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="card">
                <h2 className="text-2xl font-display font-bold mb-6">My Wishlist</h2>
                <div className="text-center py-12">
                  <Heart size={64} className="mx-auto mb-4 text-white/20" />
                  <p className="text-white/60 mb-4">Your wishlist is empty</p>
                  <button onClick={() => navigate('/products')} className="btn-primary">
                    Start Shopping
                  </button>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-2xl font-display font-bold mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">Email Preferences</h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                          <span className="text-white/70">Order updates and shipping notifications</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                          <span className="text-white/70">Promotional emails and special offers</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 rounded" />
                          <span className="text-white/70">Newsletter and product updates</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <h3 className="font-semibold mb-4">Security</h3>
                      <button className="btn-secondary">Change Password</button>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <h3 className="font-semibold mb-4 text-red-400">Danger Zone</h3>
                      <button className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Account;
