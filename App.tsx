import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomeScreen from './components/HomeScreen';
import ResultsScreen from './components/ResultsScreen';
import MapScreen from './components/MapScreen';
import CommunityScreen from './components/CommunityScreen';
import ProfileScreen from './components/ProfileScreen';
import NewPostScreen from './components/NewPostScreen';
import GameHubScreen from './components/GameHubScreen';
import ResourcesScreen from './components/ResourcesScreen';
import RecycleSortGame from './components/RecycleSortGame';
import EcoQuizGame from './components/EcoQuizGame';
import VirtualGardenGame from './components/VirtualGardenGame';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import EditProfileScreen from './components/EditProfileScreen';
import EcoAssistantScreen from './components/EcoAssistantScreen';
import HubScreen from './components/HubScreen';
import EcoMemoryMatchGame from './components/EcoMemoryMatchGame';
import { AnalysisResult, User, Post, GardenState, Challenge, Comment, Badge, PostCategory } from './types';
import useGeolocation from './hooks/useGeolocation';
import * as authService from './services/authService';
import * as dataService from './services/dataService';
import { SparklesIcon } from './components/Icons';

export type View =
    | 'welcome'
    | 'login'
    | 'signup'
    | 'home'
    | 'results'
    | 'map'
    | 'community'
    | 'ecoAssistant'
    | 'hub'
    | 'gameHub'
    | 'resources'
    | 'newPost'
    | 'profile'
    | 'editProfile'
    | 'recycleSort'
    | 'ecoQuiz'
    | 'virtualGarden'
    | 'ecoMemoryMatch';

const BadgeNotification: React.FC<{ badge: Badge, onClose: () => void }> = ({ badge, onClose }) => (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-6 text-center w-full max-w-sm transform transition-all scale-100 animate-in-pop" onClick={(e) => e.stopPropagation()}>
            <p className="text-5xl mb-4 drop-shadow-lg">{badge.icon}</p>
            <h2 className="text-sm font-bold text-yellow-600 uppercase tracking-wider">Badge Unlocked!</h2>
            <h3 className="text-2xl font-bold text-brand-text mt-1">{badge.name}</h3>
            <p className="text-slate-600 mt-2">{badge.description}</p>
            <button
                onClick={onClose}
                className="mt-6 w-full py-3 px-6 bg-brand-primary text-white font-semibold rounded-2xl shadow-lg shadow-brand-primary/40 transition-transform duration-200 active:scale-95"
            >
                Awesome!
            </button>
        </div>
        <style>{`
            @keyframes pop-in {
                0% { opacity: 0; transform: scale(0.8); }
                100% { opacity: 1; transform: scale(1); }
            }
            .animate-in-pop { animation: pop-in 0.3s ease-out forwards; }
        `}</style>
    </div>
);


function App() {
    const [view, setView] = useState<View>('home');
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [garden, setGarden] = useState<GardenState>({
        plots: Array.from({ length: 9 }, (_, i) => ({ id: i, plant: null })),
    });
    const [selectedQuiz, setSelectedQuiz] = useState<string>('recycling');
    const [newlyAwardedBadge, setNewlyAwardedBadge] = useState<Badge | null>(null);

    const { location, error: geoError, loading: geoLoading } = useGeolocation();
    
    useEffect(() => {
        // Pick up an existing session before deciding which screen to show.
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
            setPosts(dataService.getPosts());
            setUsers(authService.getUsers());
            setView('home');
        } else {
            setView('welcome');
        }
    }, []);

    const refreshUsers = () => {
        setUsers(authService.getUsers());
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
    };

    const handleAction = (actionType: Challenge['type'], count: number = 1) => {
        if (user) {
            const { updatedUser, completedChallenge, newBadges } = authService.trackAction(user.id, actionType, count);
            if (updatedUser) {
                setUser(updatedUser);
                refreshUsers();
                if (completedChallenge) {
                    console.log(`Challenge completed: ${completedChallenge.title}! +${completedChallenge.points} points.`);
                }
                if (newBadges && newBadges.length > 0) {
                    setNewlyAwardedBadge(newBadges[0]);
                }
            }
        }
    };
    
    const handleLoginSuccess = () => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
            setPosts(dataService.getPosts());
            setUsers(authService.getUsers());
            handleAction('login');
            setView('home');
        } else {
            setView('login');
        }
    };

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        setPosts([]);
        setUsers([]);
        setView('welcome');
    };

    const handleUpdateProfile = (name: string, avatar: string) => {
        if (user) {
            const updatedUser = authService.updateUser({ ...user, name, avatar });
            if (updatedUser) {
                setUser(updatedUser);
                refreshUsers();
            }
            setView('profile');
        }
    };

    const handleAnalysisComplete = (analysisResult: AnalysisResult) => {
        setResult(analysisResult);
        setView('results');
    };

    const handleReset = () => {
        setResult(null);
        setView('home');
    };

    const handleAddPoints = (points: number) => {
        if (user) {
            const { updatedUser, newBadges } = authService.addPoints(user.id, points);
            if (updatedUser) {
                setUser(updatedUser);
                refreshUsers();
                 if (newBadges && newBadges.length > 0) {
                    setNewlyAwardedBadge(newBadges[0]);
                }
            }
        }
    };

    const handleAddPost = (postText: string, category: PostCategory) => {
        if (user) {
            dataService.addPost(postText, user, category);
            handleAction('post');
            setPosts(dataService.getPosts());
            setView('community');
        }
    };

    const handleDeletePost = (postId: string) => {
        if (!user) return;
        try {
            dataService.deletePost(postId, user.id);
            authService.decrementUserStat(user.id, 'totalPosts');
            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
            refreshUsers();
        } catch (error) {
            console.error("Failed to delete post:", error);
            alert((error as Error).message || "Error deleting post.");
        }
    };

    const handleDeleteComment = (postId: string, commentId: string) => {
        if (!user) return;
        try {
            dataService.deleteComment(postId, commentId, user.id);
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId
                        ? {
                              ...post,
                              comments: post.comments.filter(
                                  comment => comment.id !== commentId
                              )
                          }
                        : post
                )
            );
        } catch (error) {
            console.error("Failed to delete comment:", error);
            alert((error as Error).message || "Error deleting comment.");
        }
    };
    
    const handleToggleLike = (postId: string) => {
        if (!user) return;
        dataService.toggleLikePost(postId, user.id);
        setPosts(prevPosts =>
            prevPosts.map(p => {
                if (p.id !== postId) return p;
                
                const hasLiked = p.likes.includes(user.id);
                const newLikes = hasLiked
                    ? p.likes.filter(id => id !== user.id)
                    : [...p.likes, user.id];
                
                return { ...p, likes: newLikes };
            })
        );
    };

    const handleAddComment = (postId: string, commentText: string) => {
        if (!user) return;
        const newComment = dataService.addComment(postId, commentText, user);
        if (!newComment) return;

        setPosts(prevPosts =>
            prevPosts.map(p => 
                p.id === postId 
                ? { ...p, comments: [...p.comments, newComment] }
                : p
            )
        );
    };


    const handleUpdateGarden = (newGarden: GardenState) => {
        setGarden(newGarden);
    };
    
    const handleGameEnd = () => {
        handleAction('game');
        setView('hub'); // Go back to hub after a game
    };

    const handleSelectQuiz = (category: string) => {
        setSelectedQuiz(category);
        setView('ecoQuiz');
    };

    const renderContent = () => {
        if (!user) return null;
        
        // Keeping the screen switch here makes navigation state easy to follow.
        switch (view) {
            case 'home':
                return <HomeScreen onAnalysisComplete={handleAnalysisComplete} location={location} />;
            case 'results':
                return result ? <ResultsScreen result={result} onReset={handleReset} onAddPoints={handleAddPoints} onAction={() => handleAction('scan')} /> : <HomeScreen onAnalysisComplete={handleAnalysisComplete} location={location} />;
            case 'map':
                return <MapScreen location={location} geoError={geoError} geoLoading={geoLoading} />;
            case 'community':
                return <CommunityScreen 
                            posts={posts} 
                            setView={setView} 
                            currentUser={user} 
                            allUsers={users} 
                            onDeletePost={handleDeletePost}
                            onDeleteComment={handleDeleteComment}
                            onToggleLike={handleToggleLike}
                            onAddComment={handleAddComment}
                        />;
            case 'ecoAssistant':
                return <EcoAssistantScreen />;
            case 'hub':
                return <HubScreen setView={setView} onSelectQuiz={handleSelectQuiz} />;
            case 'gameHub':
                return <GameHubScreen setView={setView} onBack={() => setView('hub')} />;
            case 'resources':
                return <ResourcesScreen onBack={() => setView('hub')} />;
            case 'newPost':
                return <NewPostScreen onAddPost={handleAddPost} onBack={() => setView('community')} />;
            case 'profile':
                return <ProfileScreen user={user} setView={setView} onLogout={handleLogout} />;
            case 'editProfile':
                return <EditProfileScreen user={user} onSave={handleUpdateProfile} onBack={() => setView('profile')} />;
            case 'recycleSort':
                return <RecycleSortGame onAddPoints={handleAddPoints} onBack={handleGameEnd} />;
            case 'ecoQuiz':
                return <EcoQuizGame category={selectedQuiz} onAddPoints={handleAddPoints} onBack={handleGameEnd} />;
            case 'virtualGarden':
                return <VirtualGardenGame onBack={handleGameEnd} garden={garden} onUpdateGarden={handleUpdateGarden} ecoPoints={user.ecoPoints} onAddPoints={handleAddPoints} />;
            case 'ecoMemoryMatch':
                return <EcoMemoryMatchGame onAddPoints={handleAddPoints} onBack={handleGameEnd} />;
            default:
                return <HomeScreen onAnalysisComplete={handleAnalysisComplete} location={location} />;
        }
    };
    
    if (!user) {
        switch (view) {
            case 'login':
                return <LoginScreen onLoginSuccess={handleLoginSuccess} setView={setView} />;
            case 'signup':
                return <SignupScreen onSignupSuccess={handleLoginSuccess} setView={setView} />;
            default:
                 return <WelcomeScreen setView={setView} />;
        }
    }

    return (
        <>
            {/* This stays outside the screen content so it can appear after any action. */}
            {newlyAwardedBadge && <BadgeNotification badge={newlyAwardedBadge} onClose={() => setNewlyAwardedBadge(null)} />}
            <Layout currentView={view} setView={setView}>
                {renderContent()}
            </Layout>
        </>
    );
}

export default App;