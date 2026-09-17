import React, { useState } from 'react';
import { ChevronLeftIcon, TrophyIcon, SparklesIcon } from './Icons';
import { getChallenges } from '../services/challenges';
import { Challenge, User } from '../types';

interface LeaderboardScreenProps {
    onBack: () => void;
}

// FIX: Added missing properties to mock users to conform to the User type.
const mockUsers: User[] = [
    { id: 'user-3', name: 'RecycleQueen', email: '', avatar: `https://i.pravatar.cc/150?u=user-3`, ecoPoints: 5280, completedChallenges: [1, 2, 4, 5], challengeProgress: {}, lastLogin: '2024-01-01', dailyChallengeData: { resetDate: '1970-01-01', progress: {}, completedToday: [] }, weeklyChallengeData: { resetDate: '1970-01', progress: {}, completedThisWeek: [] }, stats: { totalScans: 50, totalPosts: 10, totalGames: 15, totalChallengesCompleted: 4 }, unlockedBadges: ['points1', 'scans1'] },
    { id: 'user-1', name: 'Eco Warrior', email: '', avatar: `https://i.pravatar.cc/150?u=user-1`, ecoPoints: 4150, completedChallenges: [1, 3, 6], challengeProgress: {}, lastLogin: '2024-01-01', dailyChallengeData: { resetDate: '1970-01-01', progress: {}, completedToday: [] }, weeklyChallengeData: { resetDate: '1970-01', progress: {}, completedThisWeek: [] }, stats: { totalScans: 30, totalPosts: 5, totalGames: 10, totalChallengesCompleted: 3 }, unlockedBadges: ['points1'] },
    { id: 'user-2', name: 'GreenThumb', email: '', avatar: `https://i.pravatar.cc/150?u=user-2`, ecoPoints: 3800, completedChallenges: [2, 4], challengeProgress: {}, lastLogin: '2024-01-01', dailyChallengeData: { resetDate: '1970-01-01', progress: {}, completedToday: [] }, weeklyChallengeData: { resetDate: '1970-01', progress: {}, completedThisWeek: [] }, stats: { totalScans: 20, totalPosts: 3, totalGames: 8, totalChallengesCompleted: 2 }, unlockedBadges: [] },
    { id: 'user-4', name: 'Captain Planet', email: '', avatar: `https://i.pravatar.cc/150?u=user-4`, ecoPoints: 2500, completedChallenges: [1], challengeProgress: {}, lastLogin: '2024-01-01', dailyChallengeData: { resetDate: '1970-01-01', progress: {}, completedToday: [] }, weeklyChallengeData: { resetDate: '1970-01', progress: {}, completedThisWeek: [] }, stats: { totalScans: 10, totalPosts: 2, totalGames: 4, totalChallengesCompleted: 1 }, unlockedBadges: [] },
    { id: 'user-5', name: 'Solaris', email: '', avatar: `https://i.pravatar.cc/150?u=user-5`, ecoPoints: 1200, completedChallenges: [], challengeProgress: {}, lastLogin: '2024-01-01', dailyChallengeData: { resetDate: '1970-01-01', progress: {}, completedToday: [] }, weeklyChallengeData: { resetDate: '1970-01', progress: {}, completedThisWeek: [] }, stats: { totalScans: 5, totalPosts: 1, totalGames: 1, totalChallengesCompleted: 0 }, unlockedBadges: [] },
].sort((a, b) => b.ecoPoints - a.ecoPoints);


const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'leaderboard' | 'challenges'>('leaderboard');
    // FIX: Mock `isCompleted` status for challenges as this component is disconnected from user state.
    // FIX: Corrected the type of `challenges` to include the mocked `isCompleted` property.
    const challenges: (Challenge & { isCompleted: boolean })[] = getChallenges().map((challenge, index) => ({
        ...challenge,
        isCompleted: index % 2 === 0,
    }));

    const renderLeaderboard = () => (
        <div className="space-y-3">
            {mockUsers.map((user, index) => (
                <div key={user.id} className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-md flex items-center">
                    <span className="font-bold text-lg w-8 text-gray-600">{index + 1}</span>
                    <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full mx-2" />
                    <span className="font-bold text-gray-800 flex-grow">{user.name}</span>
                    <div className="flex items-center font-semibold text-yellow-800 bg-yellow-100 px-3 py-1 rounded-full text-sm">
                        <SparklesIcon className="h-4 w-4 mr-1" />
                        <span>{user.ecoPoints.toLocaleString()}</span>
                    </div>
                </div>
            ))}
        </div>
    );
    
    const renderChallenges = () => (
        <div className="space-y-3">
            {/* FIX: Removed explicit type annotation on `challenge` to allow access to the inferred `isCompleted` property. */}
            {challenges.map((challenge) => (
                 <div key={challenge.id} className={`p-4 rounded-2xl shadow-md transition-all ${challenge.isCompleted ? 'bg-green-100/70' : 'bg-white/80'}`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-gray-800">{challenge.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                        </div>
                        <div className={`flex items-center font-semibold px-3 py-1 rounded-full text-sm ${challenge.isCompleted ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            <SparklesIcon className="h-4 w-4 mr-1" />
                            <span>{challenge.points}</span>
                        </div>
                    </div>
                     {challenge.isCompleted && <p className="text-right mt-2 text-sm font-bold text-green-700">Completed!</p>}
                </div>
            ))}
        </div>
    );


    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center p-2 mb-4">
                <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
                    <ChevronLeftIcon className="h-7 w-7" />
                </button>
                <div className="flex items-center mx-auto pr-8">
                    <TrophyIcon className="h-7 w-7 text-amber-500 mr-2" />
                    <h1 className="text-3xl font-bold text-gray-800">Leaderboard</h1>
                </div>
            </header>

            <div className="px-1">
                 <div className="flex bg-slate-200/80 p-1 rounded-xl mb-4">
                    <button onClick={() => setActiveTab('leaderboard')} className={`w-1/2 py-2 text-center font-semibold rounded-lg transition-all ${activeTab === 'leaderboard' ? 'bg-white shadow' : 'text-gray-600'}`}>Leaderboard</button>
                    <button onClick={() => setActiveTab('challenges')} className={`w-1/2 py-2 text-center font-semibold rounded-lg transition-all ${activeTab === 'challenges' ? 'bg-white shadow' : 'text-gray-600'}`}>Challenges</button>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto px-1">
                {activeTab === 'leaderboard' ? renderLeaderboard() : renderChallenges()}
            </div>
        </div>
    );
};

export default LeaderboardScreen;