import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, searchProducts, getProductsByCategory } from '../data/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [minRating, setMinRating] = useState(0);

  // Get URL parameters
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const tagParam = searchParams.get('tag');

  useEffect(() => {
    let result = [...products];

    // Apply search
    if (searchParam) {
      result = searchProducts(searchParam);
    }

    // Apply category filter from URL or selected categories
    if (categoryParam) {
      result = result.filter(p => p.category === categoryParam);
    } else if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Apply tag filter from URL or selected tags
    if (tagParam) {
      result = result.filter(p => p.tags?.includes(tagParam));
    } else if (selectedTags.length > 0) {
      result = result.filter(p => 
        p.tags?.some(tag => selectedTags.includes(tag))
      );
    }

    // Apply price range filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Apply rating filter
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured: prioritize featured products
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(result);
  }, [searchParam, categoryParam, tagParam, selectedCategories, selectedTags, priceRange, minRating, sortBy]);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setPriceRange([0, 5000]);
    setMinRating(0);
    setSearchParams({});
  };

  const allTags = ['new', 'sale', 'bestseller', 'gaming', 'professional', 'business', 'creator'];

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold gradient-text mb-4">
            {searchParam ? `Search Results for "${searchParam}"` : 
             categoryParam ? categories.find(c => c.id === categoryParam)?.name : 
             tagParam ? `${tagParam.charAt(0).toUpperCase() + tagParam.slice(1)} Products` :
             'All Products'}
          </h1>
          <p className="text-white/60">
            Showing {filteredProducts.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full btn-secondary flex items-center justify-center space-x-2 mb-4"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>

            {/* Filters */}
            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Clear Filters */}
              {(selectedCategories.length > 0 || selectedTags.length > 0 || minRating > 0 || priceRange[0] > 0 || priceRange[1] < 5000) && (
                <button
                  onClick={clearFilters}
                  className="w-full btn-ghost flex items-center justify-center space-x-2 text-pink-400"
                >
                  <X size={18} />
                  <span>Clear All Filters</span>
                </button>
              )}

              {/* Categories */}
              <div className="card">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id) || categoryParam === category.id}
                        onChange={() => handleCategoryToggle(category.id)}
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="card">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="card">
                <h3 className="font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        selectedTags.includes(tag) || tagParam === tag
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'glass hover:bg-white/10'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="card">
                <h3 className="font-semibold mb-4">Minimum Rating</h3>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="w-4 h-4 border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{rating}+ ⭐</span>
                    </label>
                  ))}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === 0}
                      onChange={() => setMinRating(0)}
                      className="w-4 h-4 border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">All Ratings</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-white/60">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input pr-10 appearance-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" size={20} />
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No products found</h3>
                <p className="text-white/60 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
