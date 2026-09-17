import React from 'react';
import { View } from '../App';

interface WelcomeScreenProps {
    setView: (view: View) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ setView }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-gradient-to-br from-brand-primary to-emerald-600">
            <div className="flex-grow flex flex-col justify-center">
                 <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">EcoSnap</h1>
                <p className="text-xl text-white/90 mb-12">Your guide to a greener planet.</p>
            </div>
            <div className="w-full max-w-sm pb-8">
                <button
                    onClick={() => setView('login')}
                    className="w-full py-4 px-6 mb-4 bg-white text-brand-dark font-bold rounded-2xl shadow-lg text-lg transition-transform duration-200 active:scale-95"
                >
                    Log In
                </button>
                 <button
                    onClick={() => setView('signup')}
                    className="w-full py-4 px-6 bg-brand-light text-brand-dark font-bold rounded-2xl shadow-lg text-lg transition-transform duration-200 active:scale-95"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default WelcomeScreen;
