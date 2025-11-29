import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import ProductCustomizationModal from './ProductCustomizationModal';

// Mock data - in a real app, this would come from an API
const categoryProducts = {
  marketing: [
    {
      id: 1,
      name: 'Flex Banners',
      description: 'High-quality flex banners for school events',
      price: 299,
      unit: 'sq.ft',
      image: 'https://via.placeholder.com/300x200?text=Flex+Banner'
    },
    // Add more marketing products...
  ],
  stationery: [
    {
      id: 2,
      name: 'Custom Notebooks',
      description: 'Personalized notebooks with school logo',
      price: 120,
      unit: 'piece',
      image: 'https://via.placeholder.com/300x200?text=Custom+Notebook'
    },
    // Add more stationery products...
  ],
  // Add other categories...
};

const ProductList = () => {
  const { category } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = categoryProducts[category] || [];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="h-48 bg-gray-100 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-indigo-600">
                  ₹{product.price} / {product.unit}
                </span>
                <button 
                  onClick={() => handleProductClick(product)}
                  className="bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center hover:bg-indigo-700"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductCustomizationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductList;
