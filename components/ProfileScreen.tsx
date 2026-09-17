import React from 'react';
import { View } from '../App';
import { User } from '../types';
import { SparklesIcon, ArrowRightOnRectangleIcon, ChevronRightIcon, UserCircleIcon } from './Icons';
import { getBadges } from '../services/challenges';


interface ProfileScreenProps {
    user: User;
    setView: (view: View) => void;
    onLogout: () => void;
}

const ProfileMenuItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center text-left p-4 bg-white/70 backdrop-blur-lg hover:bg-slate-50/80 rounded-xl transition-colors shadow-md border border-white/20">
        {icon}
        <span className="font-semibold text-gray-700 flex-grow">{label}</span>
        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
    </button>
);

const StatCard: React.FC<{ icon: string; value: number; label: string; }> = ({ icon, value, label }) => (
    <div className="bg-white/60 backdrop-blur-lg p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg border border-white/20">
        <span className="text-3xl drop-shadow-sm">{icon}</span>
        <p className="text-2xl font-bold text-brand-text mt-1">{value.toLocaleString()}</p>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
);


const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, setView, onLogout }) => {
    const allBadges = getBadges();
    const userBadges = allBadges.filter(b => user.unlockedBadges?.includes(b.id));

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex flex-col items-center text-center space-y-2 pt-4">
                <div className="relative">
                    <img src={user.avatar} alt={user.name} className="h-28 w-28 rounded-full shadow-lg border-4 border-white" />
                    <div className="absolute -bottom-2 w-full flex justify-center">
                        <div className="inline-flex items-center font-semibold text-yellow-800 bg-yellow-100 px-4 py-1.5 rounded-full shadow-md">
                            <SparklesIcon className="h-5 w-5 mr-1.5" />
                            <span>{user.ecoPoints.toLocaleString()} EcoPoints</span>
                        </div>
                    </div>
                </div>
                <div className="pt-4">
                    <h1 className="text-3xl font-bold text-brand-text">{user.name}</h1>
                    <p className="text-slate-500">{user.email}</p>
                </div>
            </div>

             {/* Stats Section */}
            <div className="grid grid-cols-3 gap-3 px-2">
                <StatCard icon="📸" value={user.stats.totalScans} label="Scans" />
                <StatCard icon="✍🏼" value={user.stats.totalPosts} label="Posts" />
                <StatCard icon="🎮" value={user.stats.totalGames} label="Games" />
            </div>

            <div className="bg-white/40 backdrop-blur-lg p-4 rounded-3xl space-y-3 shadow-lg border border-white/20">
                 <ProfileMenuItem 
                    icon={<UserCircleIcon className="h-6 w-6 text-sky-500 mr-4" />} 
                    label="Edit Profile" 
                    onClick={() => setView('editProfile')} 
                />
                 <button onClick={onLogout} className="w-full flex items-center text-left p-4 bg-red-500/10 backdrop-blur-lg hover:bg-red-500/20 rounded-xl transition-colors shadow-md border border-red-500/20">
                    <ArrowRightOnRectangleIcon className="h-6 w-6 text-red-500 mr-4" />
                    <span className="font-semibold text-red-600 flex-grow">Log Out</span>
                </button>
            </div>
            
            {userBadges.length > 0 && (
                <div className="bg-white/40 backdrop-blur-lg p-4 rounded-3xl shadow-lg border border-white/20">
                    <h2 className="text-xl font-bold text-brand-text mb-3">My Badges</h2>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                        {userBadges.map(badge => (
                            <div key={badge.id} className="flex flex-col items-center text-center transition-transform hover:scale-110" title={`${badge.name}: ${badge.description}`}>
                                <span className="text-4xl drop-shadow-md">{badge.icon}</span>
                                <span className="text-xs font-semibold text-slate-600 mt-1 truncate">{badge.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="flex-grow" />

        </div>
    );
};

export default ProfileScreen;