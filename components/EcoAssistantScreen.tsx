import React from 'react';
import EcoAssistant from './EcoAssistant';
import { SparklesIcon } from './Icons';
import { View } from '../App';

const EcoAssistantScreen: React.FC = () => {
    return (
        <div className="flex flex-col h-full">
             <header className="p-2 mb-4">
                <div className="flex items-center">
                    <SparklesIcon className="h-8 w-8 text-brand-primary mr-3" />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Eco Assistant</h1>
                        <p className="text-gray-600">Your personal sustainability guide.</p>
                    </div>
                </div>
            </header>
            <div className="flex-grow rounded-2xl overflow-hidden shadow-inner bg-white">
                <EcoAssistant />
            </div>
        </div>
    );
};

export default EcoAssistantScreen;
