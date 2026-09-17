import React, { useState } from 'react';
import { AnalysisResult, DisposalCategory } from '../types';
import { CheckCircleIcon, RecycleIcon, TrashIcon, LeafIcon, BiohazardIcon, GiftIcon, QuestionMarkCircleIcon, SparklesIcon } from './Icons';

interface ResultsScreenProps {
  result: AnalysisResult;
  onReset: () => void;
  onAddPoints: (points: number) => void;
  onAction: () => void;
}

const categoryStyles: { [key in DisposalCategory]: { bg: string; text: string; icon: React.ReactNode } } = {
  [DisposalCategory.RECYCLABLE]: { bg: 'bg-blue-100', text: 'text-blue-800', icon: <RecycleIcon className="h-5 w-5" /> },
  [DisposalCategory.COMPOSTABLE]: { bg: 'bg-green-100', text: 'text-green-800', icon: <LeafIcon className="h-5 w-5" /> },
  [DisposalCategory.LANDFILL]: { bg: 'bg-gray-200', text: 'text-gray-800', icon: <TrashIcon className="h-5 w-5" /> },
  [DisposalCategory.HAZARDOUS]: { bg: 'bg-red-100', text: 'text-red-800', icon: <BiohazardIcon className="h-5 w-5" /> },
  [DisposalCategory.EWASTE]: { bg: 'bg-indigo-100', text: 'text-indigo-800', icon: <RecycleIcon className="h-5 w-5" /> },
  [DisposalCategory.DONATION]: { bg: 'bg-purple-100', text: 'text-purple-800', icon: <GiftIcon className="h-5 w-5" /> },
  [DisposalCategory.UNKNOWN]: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <QuestionMarkCircleIcon className="h-5 w-5" /> },
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, onReset, onAddPoints, onAction }) => {
    const [confirmed, setConfirmed] = useState(false);

    const handleConfirm = () => {
        setConfirmed(true);
        onAddPoints(10); // Award 10 points
        onAction(); // Track the 'scan' action for challenges
        setTimeout(() => {
            onReset();
        }, 1500);
    }
    
    if (!result.isDisposable) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                 <div className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full border border-white/20">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{result.itemName}</h2>
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-800 font-semibold text-sm mb-4">
                        Not a Disposable Item
                    </div>
                    <p className="text-gray-600 mb-6">{result.reasoning || "This doesn't seem to be a waste item. Please try another image."}</p>
                    <button onClick={onReset} className="w-full py-3 px-6 bg-brand-primary text-white font-semibold rounded-2xl shadow-md transition-transform duration-200 active:scale-95">
                        Scan Another Item
                    </button>
                </div>
            </div>
        )
    }

    const styles = categoryStyles[result.category] || categoryStyles[DisposalCategory.UNKNOWN];

    return (
        <div className="flex flex-col p-2 space-y-4">
            <div className="bg-white/60 backdrop-blur-lg border border-white/20 p-6 rounded-3xl shadow-xl text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{result.itemName}</h2>
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${styles.bg} ${styles.text} font-semibold`}>
                    {styles.icon}
                    <span>{result.category}</span>
                </div>
            </div>

            <div className="bg-white/60 backdrop-blur-lg border border-white/20 p-6 rounded-3xl shadow-xl">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Disposal Instructions</h3>
                <ul className="space-y-3">
                    {result.disposalInstructions.map(instr => (
                        <li key={instr.step} className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 bg-brand-primary text-white font-bold text-sm rounded-full flex items-center justify-center mr-3 mt-0.5">{instr.step}</div>
                            <span className="text-gray-600">{instr.description}</span>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 backdrop-blur-lg border border-white/20 p-4 rounded-3xl shadow-xl">
                    <h4 className="font-bold text-gray-700">Bin Type</h4>
                    <p className="text-gray-600">{result.binType}</p>
                </div>
                 <div className="bg-white/60 backdrop-blur-lg border border-white/20 p-4 rounded-3xl shadow-xl">
                    <h4 className="font-bold text-gray-700">Pickup</h4>
                    <p className="text-gray-600">{result.pickupSchedule || 'N/A'}</p>
                </div>
            </div>

            {result.notes && (
                 <div className="bg-brand-primary/10 backdrop-blur-lg border border-brand-primary/20 p-4 rounded-3xl shadow-md">
                    <h4 className="font-bold text-brand-dark">Important Notes</h4>
                    <p className="text-brand-dark">{result.notes}</p>
                </div>
            )}
            
            <div className="pt-4 flex flex-col space-y-3">
                <button
                    onClick={handleConfirm}
                    disabled={confirmed}
                    className={`w-full flex items-center justify-center py-4 px-6 font-semibold rounded-2xl shadow-lg transition-all duration-300 active:scale-95
                    ${confirmed ? 'bg-green-500 text-white scale-105' : 'bg-brand-primary text-white shadow-brand-primary/30'}`}
                >
                    {confirmed ? (
                        <>
                            <SparklesIcon className="h-6 w-6 mr-2 animate-ping absolute" />
                            <SparklesIcon className="h-6 w-6 mr-2" />
                            <span>+10 EcoPoints!</span>
                        </>
                    ) : (
                        <>
                            <CheckCircleIcon className="h-6 w-6 mr-2"/>
                            <span>I've Disposed It!</span>
                        </>
                    )}
                </button>
                 <button onClick={onReset} className="w-full py-3 text-center text-gray-600 font-medium rounded-2xl hover:bg-white/50 transition-colors">
                    Scan Another Item
                </button>
            </div>
        </div>
    );
};

export default ResultsScreen;