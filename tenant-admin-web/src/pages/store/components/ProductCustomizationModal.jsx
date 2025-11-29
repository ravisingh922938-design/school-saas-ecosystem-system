import React, { useState, useRef } from 'react';
import { X, Upload, Plus, Minus } from 'lucide-react';

const ProductCustomizationModal = ({ isOpen, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [schoolName, setSchoolName] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const fileInputRef = useRef(null);

  const sizes = ['S', 'M', 'L', 'XL'];
  const isApparel = product?.name.toLowerCase().includes('shirt') || 
                   product?.name.toLowerCase().includes('uniform');

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSizeChange = (size, change) => {
    setSelectedSizes(prev => ({
      ...prev,
      [size]: Math.max(0, (prev[size] || 0) + change)
    }));
  };

  const calculateTotal = () => {
    if (isApparel) {
      return Object.values(selectedSizes).reduce((sum, qty) => sum + qty, 0) * product.price;
    }
    return quantity * product.price;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the order to your backend
    const orderDetails = {
      productId: product.id,
      productName: product.name,
      quantity: isApparel ? selectedSizes : quantity,
      schoolName,
      logoFile: logoFile ? logoFile.name : null,
      total: calculateTotal(),
      timestamp: new Date().toISOString()
    };
    
    console.log('Order submitted:', orderDetails);
    // Here you would typically make an API call to submit the order
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Customize & Order</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="h-48 bg-gray-100 rounded-md overflow-hidden mb-4">
                {logoPreview ? (
                  <img 
                    src={logoPreview} 
                    alt="School Logo Preview" 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Logo Preview
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    School Name for Printing
                  </label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter school name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload School Logo
                  </label>
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-500 transition-colors"
                  >
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <span className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                          Upload a file
                        </span>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, SVG up to 5MB</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-lg mb-2">{product.name}</h4>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              {isApparel ? (
                <div className="space-y-4">
                  <p className="font-medium">Select Sizes and Quantities:</p>
                  {sizes.map(size => (
                    <div key={size} className="flex items-center justify-between">
                      <span className="w-8">Size {size}:</span>
                      <div className="flex items-center">
                        <button 
                          onClick={() => handleSizeChange(size, -1)}
                          className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2 w-8 text-center">
                          {selectedSizes[size] || 0}
                        </span>
                        <button 
                          onClick={() => handleSizeChange(size, 1)}
                          className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <span>Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <button 
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">{product.unit}</span>
                </div>
              )}
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span>Unit Price:</span>
                  <span>₹{product.price}</span>
                </div>
                <div className="flex justify-between font-medium text-lg">
                  <span>Total:</span>
                  <span className="text-indigo-600">₹{calculateTotal()}</span>
                </div>
                
                <button
                  onClick={handleSubmit}
                  className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomizationModal;
