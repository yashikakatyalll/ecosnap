import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, SparklesIcon, ClockIcon } from './Icons';

interface EcoMemoryMatchGameProps {
    onAddPoints: (points: number) => void;
    onBack: () => void;
}

type Card = {
    id: number;
    type: string;
    emoji: string;
    isFlipped: boolean;
    isMatched: boolean;
};

const cardTypes = [
    { type: 'recycle', emoji: '♻️' },
    { type: 'leaf', emoji: '🌿' },
    { type: 'sun', emoji: '☀️' },
    { type: 'wind', emoji: '💨' },
    { type: 'bag', emoji: '🛍️' },
    { type: 'lightbulb', emoji: '💡' },
    { type: 'car', emoji: '🚗' },
    { type: 'water', emoji: '💧' },
];

const GAME_TIME_SECONDS = 60;

const createShuffledDeck = (): Card[] => {
    const deck = [...cardTypes, ...cardTypes]
        .map((cardType, index) => ({
            id: index,
            type: cardType.type,
            emoji: cardType.emoji,
            isFlipped: false,
            isMatched: false,
        }))
        .sort(() => Math.random() - 0.5);
    return deck;
};

const EcoMemoryMatchGame: React.FC<EcoMemoryMatchGameProps> = ({ onAddPoints, onBack }) => {
    const [cards, setCards] = useState<Card[]>(createShuffledDeck());
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [score, setScore] = useState(0);
    const [isChecking, setIsChecking] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(GAME_TIME_SECONDS);

    useEffect(() => {
        if (isGameOver) return;
        if (timeLeft <= 0) {
            setIsGameOver(true);
            return;
        }
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, isGameOver]);

    useEffect(() => {
        if (flippedCards.length === 2) {
            setIsChecking(true);
            setMoves(m => m + 1);
            const [firstCardIndex, secondCardIndex] = flippedCards;
            const firstCard = cards[firstCardIndex];
            const secondCard = cards[secondCardIndex];

            if (firstCard.type === secondCard.type) {
                const pointsPerMatch = 5;
                onAddPoints(pointsPerMatch);
                setScore(s => s + pointsPerMatch);

                setCards(prevCards =>
                    prevCards.map(card =>
                        card.type === firstCard.type ? { ...card, isMatched: true, isFlipped: true } : card
                    )
                );
                setFlippedCards([]);
                setIsChecking(false);
            } else {
                setTimeout(() => {
                    setCards(prevCards =>
                        prevCards.map((card, index) =>
                            index === firstCardIndex || index === secondCardIndex ? { ...card, isFlipped: false } : card
                        )
                    );
                    setFlippedCards([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    }, [flippedCards, cards, onAddPoints]);
    
    useEffect(() => {
        if (cards.length > 0 && cards.every(card => card.isMatched)) {
            setIsGameOver(true);
        }
    }, [cards]);


    const handleCardClick = (index: number) => {
        if (isChecking || flippedCards.length === 2 || cards[index].isFlipped) {
            return;
        }

        setCards(prevCards =>
            prevCards.map((card, i) => (i === index ? { ...card, isFlipped: true } : card))
        );
        setFlippedCards(prev => [...prev, index]);
    };

    if (isGameOver) {
        const won = cards.every(card => card.isMatched);
        return (
            <div className="flex flex-col h-full text-center justify-center p-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-8">
                    <h1 className="text-4xl font-bold text-gray-800">{won ? "Congratulations!" : "Time's Up!"}</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        {won ? `You matched them all in ${moves} moves!` : "Better luck next time!"}
                    </p>
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
                    <span className="text-2xl mr-2">🧠</span>
                    <h1 className="text-3xl font-bold text-gray-800">Eco Memory Match</h1>
                </div>
            </header>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-700">Moves: {moves}</h2>
                    <div className="flex items-center font-semibold text-slate-800 bg-slate-200 px-3 py-1 rounded-full">
                        <ClockIcon className="h-5 w-5 mr-1" />
                        <span>{timeLeft}s</span>
                    </div>
                    <div className="flex items-center font-bold text-yellow-800 bg-yellow-100 px-3 py-1 rounded-full">
                        <SparklesIcon className="h-5 w-5 mr-1" />
                        <span>{score}</span>
                    </div>
                </div>

                <div className="my-4 grid grid-cols-4 gap-3">
                    {cards.map((card, index) => (
                        <button
                            key={card.id}
                            onClick={() => handleCardClick(index)}
                            className={`aspect-square rounded-lg flex items-center justify-center text-4xl transition-transform duration-500 transform-style-3d ${card.isFlipped ? 'rotate-y-180' : ''}`}
                            style={{ transformStyle: 'preserve-3d' }}
                            disabled={isChecking || card.isFlipped}
                        >
                            <div className="absolute w-full h-full backface-hidden bg-brand-primary rounded-lg flex items-center justify-center">
                                {/* Back of card */}
                            </div>
                             <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-100 rounded-lg flex items-center justify-center">
                                <span className={card.isMatched ? 'opacity-50' : ''}>{card.emoji}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
             <style>{`
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </div>
    );
};

export default EcoMemoryMatchGame;