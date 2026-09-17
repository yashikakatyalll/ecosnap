import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { SparklesIcon, ChevronLeftIcon, ClockIcon } from './Icons';
import { DisposalCategory } from '../types';

interface GameItem {
    name: string;
    emoji: string;
    category: DisposalCategory.RECYCLABLE | DisposalCategory.COMPOSTABLE | DisposalCategory.LANDFILL;
}

const allItems: GameItem[] = [
    { name: 'Plastic Bottle', emoji: '🍾', category: DisposalCategory.RECYCLABLE },
    { name: 'Apple Core', emoji: '🍎', category: DisposalCategory.COMPOSTABLE },
    { name: 'Pizza Box (greasy)', emoji: '🍕', category: DisposalCategory.LANDFILL },
    { name: 'Aluminum Can', emoji: '🥫', category: DisposalCategory.RECYCLABLE },
    { name: 'Banana Peel', emoji: '🍌', category: DisposalCategory.COMPOSTABLE },
    { name: 'Styrofoam Cup', emoji: '🥤', category: DisposalCategory.LANDFILL },
    { name: 'Newspaper', emoji: '📰', category: DisposalCategory.RECYCLABLE },
    { name: 'Coffee Grounds', emoji: '☕', category: DisposalCategory.COMPOSTABLE },
    { name: 'Chip Bag', emoji: '🍟', category: DisposalCategory.LANDFILL },
    { name: 'Glass Jar', emoji: '🫙', category: DisposalCategory.RECYCLABLE },
    { name: 'Egg Shells', emoji: '🥚', category: DisposalCategory.COMPOSTABLE },
    { name: 'Used Napkin', emoji: '🧻', category: DisposalCategory.LANDFILL },
];

const GAME_LENGTH = 8;
const GAME_TIME_SECONDS = 60;

interface RecycleSortGameProps {
    onAddPoints: (points: number) => void;
    onBack: () => void;
}

const RecycleSortGame: React.FC<RecycleSortGameProps> = ({ onAddPoints, onBack }) => {
    const [score, setScore] = useState(0);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(GAME_TIME_SECONDS);
    const [gameOverMessage, setGameOverMessage] = useState("You sorted all the items.");

    const gameItems = useMemo(() => allItems.sort(() => 0.5 - Math.random()).slice(0, GAME_LENGTH), []);
    const currentItem = gameItems[currentItemIndex];

    useEffect(() => {
        if (isGameOver) return;
        if (timeLeft <= 0) {
            setIsGameOver(true);
            setGameOverMessage("Time's up! You scored " + score + " points.");
            return;
        }
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, isGameOver, score]);

    const handleAnswer = useCallback((selectedCategory: DisposalCategory) => {
        if (feedback) return; // Prevent multiple clicks

        if (selectedCategory === currentItem.category) {
            setFeedback('correct');
            const points = 3;
            setScore(s => s + points);
            onAddPoints(points);
        } else {
            setFeedback('incorrect');
        }

        setTimeout(() => {
            setFeedback(null);
            if (currentItemIndex < GAME_LENGTH - 1) {
                setCurrentItemIndex(i => i + 1);
            } else {
                setIsGameOver(true);
                setGameOverMessage("You sorted all the items!");
            }
        }, 1200);
    }, [currentItem, feedback, onAddPoints, currentItemIndex]);
    
    const getFeedbackStyles = () => {
        if (!feedback) return 'border-transparent';
        if (feedback === 'correct') return 'border-green-500 bg-green-100';
        return 'border-red-500 bg-red-100';
    }

    if (isGameOver) {
        return (
            <div className="flex flex-col h-full text-center justify-center p-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-8">
                    <h1 className="text-4xl font-bold text-gray-800">{gameOverMessage.includes("Time") ? "Time's Up!" : "Round Complete!"}</h1>
                    <p className="text-lg text-gray-600 mt-2">{gameOverMessage}</p>
                    <div className="my-6">
                        <p className="text-xl font-semibold text-gray-700">Final Score:</p>
                        <div className="inline-flex items-center font-bold text-yellow-800 bg-yellow-100 px-6 py-3 rounded-full text-3xl mt-2">
                            <SparklesIcon className="h-8 w-8 mr-2" />
                            <span>{score}</span>
                        </div>
                    </div>
                    <button 
                        onClick={onBack}
                        className="w-full py-3 px-6 bg-brand-primary text-white font-semibold rounded-2xl shadow-lg transition-transform duration-200 active:scale-95"
                    >
                        Back to Hub
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full text-center">
            <header className="flex items-center p-2 mb-4">
                 <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
                    <ChevronLeftIcon className="h-7 w-7" />
                </button>
                <div className="flex items-center mx-auto pr-8">
                    <span className="text-2xl mr-2">♻️</span>
                    <h1 className="text-3xl font-bold text-gray-800">Recycle Sort</h1>
                </div>
            </header>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-700">Item {currentItemIndex + 1}/{GAME_LENGTH}</h2>
                    <div className="flex items-center font-semibold text-slate-800 bg-slate-200 px-3 py-1 rounded-full">
                        <ClockIcon className="h-5 w-5 mr-1" />
                        <span>{timeLeft}s</span>
                    </div>
                    <div className="flex items-center font-bold text-yellow-800 bg-yellow-100 px-3 py-1 rounded-full">
                        <SparklesIcon className="h-5 w-5 mr-1" />
                        <span>{score}</span>
                    </div>
                </div>

                <div className={`p-8 my-6 border-4 rounded-2xl transition-colors duration-300 ${getFeedbackStyles()}`}>
                    <h3 className="text-4xl font-bold text-gray-800">{currentItem.emoji} {currentItem.name}</h3>
                     {feedback && (
                        <p className={`mt-2 font-bold text-xl ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                            {feedback === 'correct' ? 'Correct! +3 points' : `Oops! That's ${currentItem.category}.`}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <button onClick={() => handleAnswer(DisposalCategory.RECYCLABLE)} className="flex flex-col items-center justify-center p-4 bg-blue-100 text-blue-800 rounded-2xl shadow-sm hover:scale-105 transition-transform active:scale-95 disabled:opacity-50" disabled={!!feedback}>
                        <span className="text-4xl mb-1">♻️</span>
                        <span className="font-bold">Recycle</span>
                    </button>
                     <button onClick={() => handleAnswer(DisposalCategory.COMPOSTABLE)} className="flex flex-col items-center justify-center p-4 bg-green-100 text-green-800 rounded-2xl shadow-sm hover:scale-105 transition-transform active:scale-95 disabled:opacity-50" disabled={!!feedback}>
                        <span className="text-4xl mb-1">🍂</span>
                        <span className="font-bold">Compost</span>
                    </button>
                     <button onClick={() => handleAnswer(DisposalCategory.LANDFILL)} className="flex flex-col items-center justify-center p-4 bg-gray-200 text-gray-800 rounded-2xl shadow-sm hover:scale-105 transition-transform active:scale-95 disabled:opacity-50" disabled={!!feedback}>
                        <span className="text-4xl mb-1">🗑️</span>
                        <span className="font-bold">Landfill</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecycleSortGame;