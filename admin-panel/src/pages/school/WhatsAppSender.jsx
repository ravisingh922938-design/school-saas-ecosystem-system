import React from 'react';
import { MessageCircle, Send, Image } from 'lucide-react';

const WhatsAppSender = () => {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6 border-b pb-4">
                    <MessageCircle className="text-green-500" size={28} />
                    <h2 className="text-xl font-bold text-gray-800">WhatsApp Broadcast</h2>
                </div>

                <div className="space-y-4">
                    {/* Audience */}
                    <div>
                        <label className="text-sm font-bold text-gray-600">Send To</label>
                        <div className="flex gap-4 mt-2">
                            <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer bg-green-50 border-green-200">
                                <input type="radio" name="to" defaultChecked /> Class 10 Parents
                            </label>
                            <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer">
                                <input type="radio" name="to" /> All Teachers
                            </label>
                            <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer">
                                <input type="radio" name="to" /> Fee Defaulters
                            </label>
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="text-sm font-bold text-gray-600">Message</label>
                        <textarea
                            className="w-full border p-3 rounded-lg mt-2 h-32 bg-gray-50"
                            placeholder="Dear Parent, This is to inform you that..."
                        ></textarea>
                        <p className="text-xs text-gray-400 mt-1 text-right">0 / 1000 characters</p>
                    </div>

                    {/* Attachment */}
                    <div>
                        <label className="text-sm font-bold text-gray-600">Attachment (Optional)</label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center text-gray-500 gap-2 cursor-pointer hover:bg-gray-50">
                            <Image size={20} /> Upload Image / PDF
                        </div>
                    </div>

                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 mt-4">
                        <Send size={20} /> Send WhatsApp Message
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WhatsAppSender;