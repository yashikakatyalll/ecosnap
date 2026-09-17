import React, { useState, useMemo } from 'react';
import { QuizQuestion } from '../types';
import { ChevronLeftIcon, LightbulbIcon, SparklesIcon } from './Icons';
import { getQuiz } from '../services/quizService';


interface EcoQuizGameProps {
    onAddPoints: (points: number) => void;
    onBack: () => void;
    category: string;
}

const EcoQuizGame: React.FC<EcoQuizGameProps> = ({ onAddPoints, onBack, category }) => {
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const shuffledQuestions = useMemo(() => {
        const quizData = getQuiz(category);
        return quizData.sort(() => 0.5 - Math.random());
    }, [category]);
    
    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    const handleAnswerClick = (option: string) => {
        if (showExplanation) return;
        setSelectedAnswer(option);
        setShowExplanation(true);
        if (option === currentQuestion.correctAnswer) {
            const points = 5; // Reduced points
            setScore(s => s + points);
            onAddPoints(points);
        }
    };
    
    const handleNextQuestion = () => {
        setShowExplanation(false);
        setSelectedAnswer(null);
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            setCurrentQuestionIndex(i => i + 1);
        } else {
            // End of quiz, maybe show a summary screen or go back
            onBack();
        }
    };
    
    if (!currentQuestion) {
        return (
            <div className="flex flex-col h-full text-center p-4">
                <p>Loading quiz...</p>
                <button onClick={onBack}>Go Back</button>
            </div>
        )
    }

    const quizTitle = category === 'combined' ? 'Eco Quiz' : `${category.charAt(0).toUpperCase() + category.slice(1)} Quiz`;

    return (
        <div className="flex flex-col h-full text-center">
            <header className="flex items-center p-2 mb-4">
                 <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
                    <ChevronLeftIcon className="h-7 w-7" />
                </button>
                <div className="flex items-center mx-auto pr-8">
                    <LightbulbIcon className="h-7 w-7 text-yellow-500 mr-2" />
                    <h1 className="text-3xl font-bold text-gray-800">{quizTitle}</h1>
                </div>
            </header>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-700">Question {currentQuestionIndex + 1}/{shuffledQuestions.length}</h2>
                    <div className="flex items-center font-bold text-yellow-800 bg-yellow-100 px-3 py-1 rounded-full">
                        <SparklesIcon className="h-5 w-5 mr-1" />
                        <span>{score}</span>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl mb-6">
                    <p className="text-lg font-semibold text-gray-800">{currentQuestion.question}</p>
                </div>

                <div className="space-y-3">
                    {currentQuestion.options.map((option) => {
                        const isCorrect = option === currentQuestion.correctAnswer;
                        const isSelected = selectedAnswer === option;
                        let buttonClass = 'bg-white hover:bg-slate-100';
                        if (showExplanation) {
                            if (isCorrect) buttonClass = 'bg-green-200 border-green-500';
                            else if (isSelected) buttonClass = 'bg-red-200 border-red-500';
                            else buttonClass = 'bg-slate-100 opacity-60';
                        }
                        return (
                            <button
                                key={option}
                                onClick={() => handleAnswerClick(option)}
                                disabled={showExplanation}
                                className={`w-full p-4 text-left font-semibold text-gray-700 rounded-lg border-2 transition-all duration-300 ${buttonClass}`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
                
                {showExplanation && (
                    <div className="mt-6 flex-grow flex flex-col justify-end">
                        <div className="bg-brand-light p-4 rounded-xl text-center">
                            <h3 className="font-bold text-brand-dark">
                                {selectedAnswer === currentQuestion.correctAnswer ? 'Correct! +5 points' : 'Not quite!'}
                            </h3>
                            <p className="text-sm text-brand-dark mt-1">{currentQuestion.explanation}</p>
                        </div>
                        <button 
                            onClick={handleNextQuestion}
                            className="mt-4 w-full py-3 px-6 bg-brand-primary text-white font-semibold rounded-2xl shadow-lg transition-transform duration-200 active:scale-95"
                        >
                            {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EcoQuizGame;