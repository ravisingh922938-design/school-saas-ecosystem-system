import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const categories = [
  {
    id: 1,
    name: 'Marketing Material',
    description: 'Flex Banners, Handbills, Hoardings',
    icon: '📢',
    path: '/school/store/marketing'
  },
  {
    id: 2,
    name: 'Stationery',
    description: 'Customized Notebooks, PDF, Books, Diaries, Pens',
    icon: '📚',
    path: '/school/store/stationery'
  },
  {
    id: 3,
    name: 'Uniforms & Accessories',
    description: 'Ties, Belts, ID Cards, Bags, T-Shirts',
    icon: '👔',
    path: '/school/store/uniforms'
  },
  {
    id: 4,
    name: 'Footwear',
    description: 'School Shoes, Socks',
    icon: '👞',
    path: '/school/store/footwear'
  }
];

const featuredProducts = [
  {
    id: 1,
    title: 'Bulk ID Card Printing',
    description: 'Get 20% off on Bulk ID Card Printing',
    image: 'https://via.placeholder.com/300x150?text=ID+Card+Printing'
  },
  {
    id: 2,
    title: 'Custom School Diaries',
    description: 'Personalized diaries with your school logo',
    image: 'https://via.placeholder.com/300x150?text=School+Diaries'
  }
];

const StoreDashboard = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Categories Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div 
              key={category.id}
              onClick={() => navigate(category.path)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="text-lg font-medium">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Carousel */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Special Offers</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Carousel 
            showArrows={true} 
            showStatus={false} 
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={5000}
          >
            {featuredProducts.map((product) => (
              <div key={product.id} className="relative h-64">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
                  <h3 className="text-xl font-bold">{product.title}</h3>
                  <p>{product.description}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;
