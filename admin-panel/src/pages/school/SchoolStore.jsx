import React from 'react';
import { ShoppingBag, Printer, Shirt, Book } from 'lucide-react';

const SchoolStore = () => {
    const products = [
        { name: 'Custom ID Cards', price: '₹ 15/card', cat: 'Printing', icon: <Printer />, color: 'bg-blue-100 text-blue-600' },
        { name: 'School Uniform Set', price: '₹ 850/set', cat: 'Uniform', icon: <Shirt />, color: 'bg-orange-100 text-orange-600' },
        { name: 'Printed Diaries', price: '₹ 120/pc', cat: 'Stationery', icon: <Book />, color: 'bg-green-100 text-green-600' },
        { name: 'Flex Banner (6x4)', price: '₹ 400', cat: 'Marketing', icon: <Printer />, color: 'bg-purple-100 text-purple-600' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">School Mart & Printing</h2>
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
                    <ShoppingBag size={18} /> Cart: 2 Items
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((item, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
                        <div className={`h-32 rounded-xl flex items-center justify-center text-4xl mb-4 ${item.color}`}>
                            {item.icon}
                        </div>
                        <div className="mb-4">
                            <span className="text-xs font-bold text-gray-400 uppercase">{item.cat}</span>
                            <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                            <p className="text-blue-600 font-bold">{item.price}</p>
                        </div>
                        <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg font-bold">
                            Customize & Order
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SchoolStore;