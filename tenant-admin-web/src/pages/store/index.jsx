import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import StoreDashboard from './StoreDashboard';

const StorePage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <ShoppingBag className="h-6 w-6 mr-2 text-indigo-600" />
        <h1 className="text-2xl font-bold">School Mart</h1>
      </div>
      
      <StoreDashboard />
    </div>
  );
};

export default StorePage;
