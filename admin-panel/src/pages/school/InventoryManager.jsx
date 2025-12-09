import React from 'react';
import { Package, ShoppingCart, Archive } from 'lucide-react';

const InventoryManager = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Stock Summary */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg flex items-center gap-2"><Package size={20} /> Stock Inventory</h3>
                    <button className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm">+ Add Item</button>
                </div>
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50">
                        <tr><th className="p-3">Item Name</th><th className="p-3">Category</th><th className="p-3">Available</th><th className="p-3">Status</th></tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-3 font-medium">Whiteboard Markers</td><td className="p-3">Stationery</td><td className="p-3">150 Pcs</td>
                            <td className="p-3"><span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs">In Stock</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-3 font-medium">A4 Paper Bundles</td><td className="p-3">Office</td><td className="p-3 text-red-600 font-bold">5 Pcs</td>
                            <td className="p-3"><span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs">Low Stock</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Suppliers / Purchase */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-6">
                <div>
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><ShoppingCart size={20} /> Issue Item</h3>
                    <div className="space-y-3">
                        <input type="text" placeholder="Select Staff / Department" className="w-full border p-2 rounded-lg text-sm" />
                        <select className="w-full border p-2 rounded-lg text-sm"><option>Whiteboard Markers</option></select>
                        <input type="number" placeholder="Quantity" className="w-full border p-2 rounded-lg text-sm" />
                        <button className="w-full bg-gray-800 text-white py-2 rounded-lg text-sm">Issue Stock</button>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Archive size={20} /> Suppliers</h3>
                    <div className="text-sm bg-gray-50 p-3 rounded-lg">
                        <p className="font-bold">Gupta Stationery Mart</p>
                        <p className="text-gray-500">Ph: 9811223344</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default InventoryManager;