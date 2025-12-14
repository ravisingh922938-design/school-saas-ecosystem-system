import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

const StudentAI = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi Aryan! 👋 I am your AI Tutor. Ask me any doubt!", sender: "bot" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        // 1. Add User Message
        const userMsg = { id: Date.now(), text: input, sender: "user" };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        // 2. Fake AI Response (Delay 1 sec)
        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                text: "That's a great question! According to Newton's Second Law, Force = Mass x Acceleration (F=ma). Do you want an example?",
                sender: "bot"
            };
            setMessages((prev) => [...prev, botMsg]);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50 animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="bg-white p-4 shadow-sm flex items-center gap-3 sticky top-0 z-10">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Bot size={24} className="text-indigo-600" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">SchoolOS AI</h3>
                    <p className="text-xs text-green-500 flex items-center gap-1">● Online</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'user'
                            ? 'bg-indigo-600 text-white rounded-tr-none'
                            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your doubt here..."
                    className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button onClick={handleSend} className="bg-indigo-600 text-white p-3 rounded-full shadow-lg active:scale-90 transition">
                    <Send size={20} />
                </button>
            </div>

        </div>
    );
};

export default StudentAI;