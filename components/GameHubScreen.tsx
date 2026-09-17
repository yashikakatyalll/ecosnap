import React from 'react';
import { View } from '../App';
import { ChevronLeftIcon, PuzzlePieceIcon, RecycleIcon, LightbulbIcon, FlowerIcon, ChevronRightIcon } from './Icons';

interface GameHubScreenProps {
    setView: (view: View) => void;
    onBack: () => void;
}

const GameNavCard: React.FC<{ title: string; description: string; icon: React.ReactNode; onClick: () => void; }> = ({ title, description, icon, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center text-left bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
        <div className="mr-4">{icon}</div>
        <div className="flex-grow">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
        <ChevronRightIcon className="h-6 w-6 text-gray-400 flex-shrink-0 ml-2" />
    </button>
)

const GameHubScreen: React.FC<GameHubScreenProps> = ({ setView, onBack }) => {
    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center p-2 mb-4">
                <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
                    <ChevronLeftIcon className="h-7 w-7" />
                </button>
                <div className="flex items-center mx-auto pr-8">
                    <PuzzlePieceIcon className="h-7 w-7 text-fuchsia-500 mr-2" />
                    <h1 className="text-3xl font-bold text-gray-800">Game Hub</h1>
                </div>
            </header>

            <div className="flex-grow overflow-y-auto space-y-4 px-1">
                <GameNavCard 
                    title="Recycle Sort"
                    description="Test your knowledge of what goes where."
                    icon={<RecycleIcon className="h-10 w-10 text-blue-500"/>}
                    onClick={() => setView('recycleSort')}
                />
                <GameNavCard 
                    title="EcoQuiz"
                    description="Answer trivia to prove you're an eco-whiz."
                    icon={<LightbulbIcon className="h-10 w-10 text-yellow-500"/>}
                    onClick={() => setView('ecoQuiz')}
                />
                <GameNavCard 
                    title="Virtual Garden"
                    description="Use your points to grow a beautiful garden."
                    icon={<FlowerIcon className="h-10 w-10 text-pink-500"/>}
                    onClick={() => setView('virtualGarden')}
                />
            </div>
        </div>
    );
};

export default GameHubScreen;