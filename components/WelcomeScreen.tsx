import React from 'react';
import { View } from '../App';
import { EcoSnapFullLogoIcon } from './Icons';

interface WelcomeScreenProps {
    setView: (view: View) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ setView }) => {
    return (
        <div className="flex flex-col items-center justify-between h-full text-center p-8 bg-gradient-to-br from-brand-primary to-emerald-600">
            <div />
            <div className="flex flex-col items-center">
                 <EcoSnapFullLogoIcon className="h-48 w-auto drop-shadow-lg" textColor="#FFFFFF" />
                 <p className="text-xl text-white/90 font-medium mt-4 drop-shadow-sm">Snap, Sort, Sustain.</p>
            </div>
            
            <div className="w-full max-w-sm">
                <button
                    onClick={() => setView('signup')}
                    className="w-full py-4 px-6 mb-4 bg-white text-brand-dark font-bold rounded-2xl shadow-lg text-lg transition-transform duration-200 active:scale-95"
                >
                    Get Started
                </button>
                 <button
                    onClick={() => setView('login')}
                    className="w-full py-2 text-white/90 font-semibold"
                >
                    I Already Have an Account
                </button>
            </div>
        </div>
    );
};

export default WelcomeScreen;