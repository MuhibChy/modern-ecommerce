import React from 'react';
import { Target, Users, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide cutting-edge technology products with exceptional service and competitive prices.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction and build lasting relationships through trust and quality.',
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Every product is carefully selected and tested to meet our high standards of excellence.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We stay ahead of the curve, bringing you the latest and most innovative tech products.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Products Sold' },
    { number: '99%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Support Available' },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=667eea&color=fff&size=200',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=764ba2&color=fff&size=200',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=f093fb&color=fff&size=200',
    },
    {
      name: 'David Kim',
      role: 'Customer Success',
      image: 'https://ui-avatars.com/api/?name=David+Kim&background=4facfe&color=fff&size=200',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold gradient-text mb-6">
            About ModernShop
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            We're passionate about technology and committed to bringing you the best products 
            at competitive prices. Our journey started with a simple idea: make premium tech 
            accessible to everyone.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="card text-center">
              <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-white/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-white/70">
                <p>
                  Founded in 2020, ModernShop emerged from a vision to revolutionize the way 
                  people shop for technology. We recognized a gap in the market for a platform 
                  that combines premium quality products with exceptional customer service.
                </p>
                <p>
                  What started as a small online store has grown into a trusted destination for 
                  tech enthusiasts and professionals alike. Our commitment to authenticity, 
                  competitive pricing, and customer satisfaction has been the cornerstone of our success.
                </p>
                <p>
                  Today, we serve thousands of customers worldwide, offering a curated selection 
                  of the latest laptops, desktops, components, and accessories. But our mission 
                  remains the same: to make cutting-edge technology accessible to everyone.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden glass-strong">
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚀</div>
                    <p className="text-2xl font-bold">Innovation First</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-display font-bold gradient-text text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="card text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <value.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-white/60 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-display font-bold gradient-text text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="card text-center group">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden glass-strong group-hover:scale-110 transition-transform">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-white/60 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card text-center"
        >
          <h2 className="text-3xl font-display font-bold mb-4">Join Our Journey</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Be part of our growing community and experience the future of tech shopping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/products" className="btn-primary">
              Start Shopping
            </a>
            <a href="/contact" className="btn-secondary">
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
