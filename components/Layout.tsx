import React from 'react';
import { View } from '../App';
import { CameraIcon, MapPinIcon, UsersIcon, UserCircleIcon, SparklesIcon, Squares2x2Icon } from './Icons';

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-full h-14 transition-all duration-300 transform scale-100 active:scale-90
            ${isActive ? 'text-brand-primary' : 'text-slate-500 hover:text-brand-dark'
            }`}
    >
        <div className={`flex items-center justify-center h-full w-full rounded-2xl transition-all duration-300 ${isActive ? 'bg-brand-primary/10' : ''}`}>
             <div className="flex flex-col items-center justify-center">
                {icon}
                <span className={`text-xs font-semibold mt-1 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-90'}`}>{label}</span>
            </div>
        </div>
    </button>
);

interface LayoutProps {
    children: React.ReactNode;
    currentView: View;
    setView: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
    
    const navItems: { view: View; label: string; icon: React.ReactNode }[] = [
        { view: 'home', label: 'Scan', icon: <CameraIcon className="h-6 w-6" /> },
        { view: 'map', label: 'Map', icon: <MapPinIcon className="h-6 w-6" /> },
        { view: 'community', label: 'Community', icon: <UsersIcon className="h-6 w-6" /> },
        { view: 'ecoAssistant', label: 'AI Bot', icon: <SparklesIcon className="h-6 w-6" /> },
        { view: 'hub', label: 'Hub', icon: <Squares2x2Icon className="h-6 w-6" /> },
        { view: 'profile', label: 'Profile', icon: <UserCircleIcon className="h-6 w-6" /> },
    ];
    
    const mainViews: View[] = ['home', 'map', 'community', 'ecoAssistant', 'hub', 'profile'];
    const isNavVisible = mainViews.includes(currentView);

    return (
        <div className="h-full w-full flex flex-col font-sans relative overflow-hidden">
            {/* The extra bottom padding leaves room for the floating navigation on small screens. */}
            <main className="flex-grow overflow-y-auto p-4 pb-28">
                {children}
            </main>
            
            {isNavVisible && (
                <footer className="absolute bottom-4 left-4 right-4 z-30">
                    <nav className="flex justify-around items-center h-20 bg-white/60 backdrop-blur-xl border border-white/30 shadow-2xl shadow-slate-300/20 rounded-3xl p-2 gap-1">
                        {navItems.map(item => (
                            <NavItem
                                key={item.view}
                                icon={item.icon}
                                label={item.label}
                                isActive={currentView === item.view}
                                onClick={() => setView(item.view)}
                            />
                        ))}
                    </nav>
                </footer>
            )}
        </div>
    );
};

export default Layout;