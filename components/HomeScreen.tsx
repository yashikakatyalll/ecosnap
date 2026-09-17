import React, { useState, useRef } from 'react';
import { AnalysisResult, Geolocation } from '../types';
import { analyzeImageForDisposal } from '../services/geminiService';
import { ViewfinderIcon, SpinnerIcon, CameraIcon, EcoSnapFullLogoIcon } from './Icons';

interface HomeScreenProps {
    onAnalysisComplete: (result: AnalysisResult) => void;
    location: Geolocation | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onAnalysisComplete, location }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsLoading(true);
            setError(null);

            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = (reader.result as string).split(',')[1];
                setImagePreview(reader.result as string);
                try {
                    const result = await analyzeImageForDisposal(base64String, location);
                    onAnalysisComplete(result);
                } catch (err) {
                    console.error(err);
                    setError('Could not analyze the image. Please try again.');
                    setIsLoading(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 w-full max-w-sm">
                <EcoSnapFullLogoIcon className="h-24 w-auto mx-auto mb-4" />
                <p className="text-gray-600 mb-6">Snap a photo to learn how to dispose of it responsibly.</p>
                
                <div className="aspect-square bg-slate-100/70 rounded-2xl mb-6 flex items-center justify-center overflow-hidden border-2 border-slate-200/80">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Item preview" className="object-cover h-full w-full" />
                    ) : (
                        <ViewfinderIcon className="h-16 w-16 text-slate-400" />
                    )}
                </div>

                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isLoading}
                />
                
                <button
                    onClick={triggerFileInput}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center py-4 px-6 bg-gradient-to-br from-brand-primary to-emerald-600 text-white font-semibold rounded-2xl shadow-lg shadow-brand-primary/40 transition-all duration-300 hover:shadow-2xl active:scale-95 disabled:bg-slate-400 disabled:shadow-none"
                >
                    {isLoading ? (
                        <>
                            <SpinnerIcon className="h-6 w-6 mr-2" />
                            <span>Analyzing...</span>
                        </>
                    ) : (
                        <>
                           <CameraIcon className="h-6 w-6 mr-2" />
                           <span>Scan Item</span>
                        </>
                    )}
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default HomeScreen;