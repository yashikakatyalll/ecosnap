import React, { useState } from 'react';
import { View } from '../App';
import { ChevronLeftIcon, EyeIcon, EyeSlashIcon } from './Icons';
import * as authService from '../services/authService';

interface LoginScreenProps {
    onLoginSuccess: () => void;
    setView: (view: View) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, setView }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const success = authService.login(email, password);
            if (success) {
                onLoginSuccess();
            }
        } catch (err: any) {
            setError(err.message);
        }
    };
    
    return (
        <div className="flex flex-col h-full p-4 bg-slate-50">
             <header className="flex items-center">
                <button onClick={() => setView('welcome')} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
                    <ChevronLeftIcon className="h-7 w-7" />
                </button>
            </header>
            <div className="flex-grow flex flex-col justify-center">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Welcome Back!</h1>
                    <p className="text-gray-600">Log in to continue your eco journey.</p>
                </div>
                
                <form onSubmit={handleLogin} className="w-full max-w-sm mx-auto space-y-4">
                     <div>
                        <label htmlFor="email-login" className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input id="email-login" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none" />
                    </div>
                    <div>
                        <label htmlFor="password-login" className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input id="password-login" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none pr-10" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                     {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                     <button type="submit" className="w-full py-4 px-6 bg-brand-primary text-white font-bold rounded-xl shadow-lg shadow-brand-primary/30 text-lg transition-transform duration-200 active:scale-95">
                        Log In
                    </button>
                </form>
            </div>

            <div className="text-center pb-4">
                <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button onClick={() => setView('signup')} className="font-bold text-brand-primary hover:underline">
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;