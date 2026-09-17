import React, { useState, useMemo } from 'react';
import { View } from '../App';
import { Post, User, Challenge, Comment } from '../types';
import PostCard from './PostCard';
import { PencilSquareIcon, SparklesIcon, CheckBadgeIcon } from './Icons';
import { getChallenges, getBadges } from '../services/challenges';

interface CommunityScreenProps {
    posts: Post[];
    allUsers: User[];
    setView: (view: View) => void;
    currentUser: User;
    onDeletePost: (postId: string) => void;
    onDeleteComment: (postId: string, commentId: string) => void;
    onToggleLike: (postId: string) => void;
    onAddComment: (postId: string, commentText: string) => void;
}

const getWeekIdentifier = (date: Date): string => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return `${d.getUTCFullYear()}-${weekNo}`;
};

const CommunityScreen: React.FC<CommunityScreenProps> = ({ 
    posts, 
    allUsers, 
    setView, 
    currentUser, 
    onDeletePost, 
    onDeleteComment,
    onToggleLike,
    onAddComment
}) => {
    const [activeTab, setActiveTab] = useState<'feed' | 'leaderboard' | 'challenges'>('feed');
    const [sortBy, setSortBy] = useState<'newest' | 'mostLiked' | 'mostCommented'>('newest');
    const challenges = getChallenges();

    const leaderboardUsers = [...allUsers].sort((a, b) => b.ecoPoints - a.ecoPoints);

    const sortedPosts = useMemo(() => {
        const postsCopy = [...posts]; // Create a shallow copy to avoid mutating the original prop
        switch (sortBy) {
            case 'mostLiked':
                return postsCopy.sort((a, b) => b.likes.length - a.likes.length);
            case 'mostCommented':
                return postsCopy.sort((a, b) => b.comments.length - a.comments.length);
            case 'newest':
            default:
                return postsCopy.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        }
    }, [posts, sortBy]);

    const getRankClass = (rank: number) => {
        if (rank === 1) return 'border-4 border-yellow-400 shadow-yellow-400/30';
        if (rank === 2) return 'border-4 border-slate-400 shadow-slate-400/30';
        if (rank === 3) return 'border-4 border-orange-400 shadow-orange-400/30';
        return 'border border-white/20';
    };

    const renderLeaderboard = () => (
        <div className="space-y-3">
            {leaderboardUsers.map((user, index) => (
                <div 
                    key={user.id} 
                    className={`p-3 rounded-2xl flex items-center shadow-lg bg-white/60 backdrop-blur-lg transition-all hover:scale-[1.02] ${getRankClass(index + 1)} ${user.id === currentUser.id ? 'ring-4 ring-brand-primary' : ''}`}
                >
                    <span className="font-bold text-lg w-8 text-center text-slate-700">{index + 1}</span>
                    <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full mx-2 border-2 border-white/50" />
                    <span className="font-bold text-slate-800 flex-grow">{user.name}</span>
                    <div className="flex items-center font-semibold text-yellow-800 bg-yellow-100 px-3 py-1 rounded-full text-sm">
                        <SparklesIcon className="h-4 w-4 mr-1" />
                        <span>{user.ecoPoints.toLocaleString()}</span>
                    </div>
                </div>
            ))}
        </div>
    );
    
    const renderChallenges = () => {
        const allBadges = getBadges();
        const nextChallengeBadge = allBadges
            .filter(b => b.criteria.type === 'challenges' && !(currentUser.unlockedBadges || []).includes(b.id))
            .sort((a, b) => a.criteria.value - b.criteria.value)[0];

        const totalChallengesCompleted = currentUser.stats.totalChallengesCompleted || 0;
        const willUnlockBadge = nextChallengeBadge && totalChallengesCompleted === nextChallengeBadge.criteria.value - 1;
        
        return (
            <>
                {/* Add pulsing animation for the next badge icon */}
                <style>{`
                    @keyframes pulse-badge {
                      0%, 100% {
                        transform: scale(1);
                        opacity: 0.8;
                      }
                      50% {
                        transform: scale(1.3);
                        opacity: 1;
                      }
                    }
                    .animate-pulse-badge {
                      animation: pulse-badge 1.5s ease-in-out infinite;
                    }
                `}</style>
                <div className="space-y-3">
                    {challenges.map((challenge: Challenge) => {
                        let isCompleted = false;
                        let progress = 0;

                        if (challenge.repeatable === 'daily') {
                            const dailyData = currentUser.dailyChallengeData;
                            const today = new Date().toISOString().split('T')[0];
                            if (dailyData && dailyData.resetDate === today) {
                                isCompleted = dailyData.completedToday.includes(challenge.id);
                                progress = dailyData.progress[challenge.id] || 0;
                            }
                        } else if (challenge.repeatable === 'weekly') {
                            const weeklyData = currentUser.weeklyChallengeData;
                            const thisWeek = getWeekIdentifier(new Date());
                            if (weeklyData && weeklyData.resetDate === thisWeek) {
                                isCompleted = weeklyData.completedThisWeek.includes(challenge.id);
                                progress = weeklyData.progress[challenge.id] || 0;
                            }
                        } else {
                            isCompleted = currentUser.completedChallenges.includes(challenge.id);
                            progress = currentUser.challengeProgress[challenge.id] || 0;
                        }
                        
                        const progressPercent = challenge.goal > 0 ? Math.min((progress / challenge.goal) * 100, 100) : 0;
                        const canUnlockBadge = willUnlockBadge && !isCompleted;

                        return (
                         <div key={challenge.id} className={`p-4 rounded-2xl shadow-lg transition-all border border-white/20 ${isCompleted ? 'bg-green-400/20 backdrop-blur-lg' : 'bg-white/60 backdrop-blur-lg'}`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center">
                                        {canUnlockBadge && (
                                            <span 
                                                className="text-lg mr-2 animate-pulse-badge" 
                                                title={`Complete this to earn the ${nextChallengeBadge.name} badge!`}
                                            >
                                                {nextChallengeBadge.icon}
                                            </span>
                                        )}
                                        <h3 className="font-bold text-slate-800">{challenge.title}</h3>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-1">{challenge.description}</p>
                                </div>
                                <div className={`flex items-center font-semibold px-3 py-1 rounded-full text-sm shrink-0 ml-2 ${isCompleted ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    <SparklesIcon className="h-4 w-4 mr-1" />
                                    <span>{challenge.points}</span>
                                </div>
                            </div>
                            {isCompleted ? (
                                <div className="flex items-center justify-end mt-3 text-sm font-bold text-green-700">
                                   <CheckBadgeIcon className="h-5 w-5 mr-1" />
                                   <span>Completed{challenge.repeatable ? ` This ${challenge.repeatable === 'daily' ? 'Day' : 'Week'}` : ''}!</span>
                                </div>
                            ) : (
                                <div className="mt-3">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-semibold text-brand-dark">Progress</span>
                                        <span className="text-xs font-semibold text-brand-dark">{Math.min(progress, challenge.goal)} / {challenge.goal}</span>
                                    </div>
                                    <div className="w-full bg-slate-200/70 rounded-full h-2.5">
                                        <div className="bg-gradient-to-r from-emerald-400 to-brand-primary h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                                    </div>
                                </div>
                            )}
                        </div>
                        );
                    })}
                </div>
            </>
        );
    };
    
    const renderFeed = () => (
        <>
            <div className="flex justify-end items-center mb-4">
                <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-full">
                    <button onClick={() => setSortBy('newest')} className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${sortBy === 'newest' ? 'bg-white shadow' : 'text-slate-600'}`}>Newest</button>
                    <button onClick={() => setSortBy('mostLiked')} className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${sortBy === 'mostLiked' ? 'bg-white shadow' : 'text-slate-600'}`}>Likes</button>
                    <button onClick={() => setSortBy('mostCommented')} className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${sortBy === 'mostCommented' ? 'bg-white shadow' : 'text-slate-600'}`}>Comments</button>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto space-y-4">
                {sortedPosts.length > 0 ? (
                    sortedPosts.map(post => 
                        <PostCard 
                            key={post.id} 
                            post={post} 
                            currentUser={currentUser} 
                            onDeletePost={onDeletePost}
                            onDeleteComment={onDeleteComment}
                            onToggleLike={onToggleLike}
                            onAddComment={onAddComment}
                        />)
                ) : (
                    <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl mt-10">
                        <p className="text-slate-500">No posts yet. Be the first to share something!</p>
                    </div>
                )}
            </div>
             <div className="pt-4">
                <button
                    onClick={() => setView('newPost')}
                    className="w-full flex items-center justify-center py-4 px-6 bg-brand-primary text-white font-semibold rounded-2xl shadow-lg shadow-brand-primary/30 transition-transform duration-200 active:scale-95"
                >
                    <PencilSquareIcon className="h-6 w-6 mr-2" />
                    Create a Post
                </button>
            </div>
        </>
    );

    return (
        <div className="flex flex-col h-full">
            <header className="mb-4">
                <h1 className="text-3xl font-bold text-brand-text">Community</h1>
                <p className="text-slate-600">Connect with fellow eco-warriors.</p>
            </header>
            
            <div className="flex bg-slate-100/80 backdrop-blur-sm p-1 rounded-xl mb-4">
                <button onClick={() => setActiveTab('feed')} className={`w-1/3 py-2 text-center font-semibold rounded-lg transition-all ${activeTab === 'feed' ? 'bg-white shadow' : 'text-slate-600'}`}>Feed</button>
                <button onClick={() => setActiveTab('leaderboard')} className={`w-1/3 py-2 text-center font-semibold rounded-lg transition-all ${activeTab === 'leaderboard' ? 'bg-white shadow' : 'text-slate-600'}`}>Leaderboard</button>
                <button onClick={() => setActiveTab('challenges')} className={`w-1/3 py-2 text-center font-semibold rounded-lg transition-all ${activeTab === 'challenges' ? 'bg-white shadow' : 'text-slate-600'}`}>Challenges</button>
            </div>
            
            <div className="flex-grow flex flex-col overflow-y-auto">
                {activeTab === 'feed' && renderFeed()}
                {activeTab === 'leaderboard' && renderLeaderboard()}
                {activeTab === 'challenges' && renderChallenges()}
            </div>
        </div>
    );
};

export default CommunityScreen;