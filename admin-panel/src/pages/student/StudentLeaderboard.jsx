import React from 'react';
import { Crown, Medal, TrendingUp } from 'lucide-react';

const StudentLeaderboard = () => {
    const students = [
        { name: "Rohan", points: 2400, rank: 1, img: "https://ui-avatars.com/api/?name=Rohan" },
        { name: "Priya", points: 2350, rank: 2, img: "https://ui-avatars.com/api/?name=Priya" },
        { name: "Aryan", points: 2100, rank: 3, img: "https://ui-avatars.com/api/?name=Aryan" }, // Current User
        { name: "Sita", points: 1900, rank: 4, img: "https://ui-avatars.com/api/?name=Sita" },
        { name: "Amit", points: 1850, rank: 5, img: "https://ui-avatars.com/api/?name=Amit" },
    ];

    return (
        <div className="pb-24 p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-800">Class Rank 🏆</h2>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Crown size={14} /> Top 10
                </span>
            </div>

            {/* TOP 3 PODIUM */}
            <div className="flex justify-center items-end gap-4 mb-8">
                {/* Rank 2 */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-4 border-gray-300 overflow-hidden shadow-lg mb-2">
                        <img src={students[1].img} className="w-full h-full" />
                    </div>
                    <div className="bg-gray-300 text-gray-700 w-20 h-24 rounded-t-xl flex flex-col items-center justify-center shadow-md">
                        <span className="font-bold text-2xl">2</span>
                        <span className="text-xs font-medium">{students[1].name}</span>
                    </div>
                </div>

                {/* Rank 1 */}
                <div className="flex flex-col items-center">
                    <Crown size={32} className="text-yellow-500 mb-1 animate-bounce" />
                    <div className="w-20 h-20 rounded-full border-4 border-yellow-400 overflow-hidden shadow-xl mb-2">
                        <img src={students[0].img} className="w-full h-full" />
                    </div>
                    <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 text-white w-24 h-32 rounded-t-xl flex flex-col items-center justify-center shadow-lg relative">
                        <span className="font-black text-4xl">1</span>
                        <span className="text-sm font-medium">{students[0].name}</span>
                        <div className="absolute top-0 w-full h-full bg-white opacity-10 rounded-t-xl"></div>
                    </div>
                </div>

                {/* Rank 3 */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-4 border-orange-300 overflow-hidden shadow-lg mb-2">
                        <img src={students[2].img} className="w-full h-full" />
                    </div>
                    <div className="bg-orange-300 text-orange-800 w-20 h-16 rounded-t-xl flex flex-col items-center justify-center shadow-md">
                        <span className="font-bold text-2xl">3</span>
                        <span className="text-xs font-medium">{students[2].name}</span>
                    </div>
                </div>
            </div>

            {/* Rest List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {students.slice(3).map((std, i) => (
                    <div key={i} className="flex items-center p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50">
                        <span className="text-gray-400 font-bold w-8">{std.rank}</span>
                        <img src={std.img} className="w-10 h-10 rounded-full mr-4" />
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800">{std.name}</h4>
                            <p className="text-xs text-gray-400">Class 10-A</p>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-indigo-600">{std.points}</span>
                            <span className="text-[10px] text-gray-400">Points</span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default StudentLeaderboard;