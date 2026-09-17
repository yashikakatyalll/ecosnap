import React from 'react';
import { View } from '../App';
import { ChevronRightIcon, BookOpenIcon, Squares2x2Icon } from './Icons';

interface HubScreenProps {
    setView: (view: View) => void;
    onSelectQuiz: (category: string) => void;
}

const NavCard: React.FC<{ title: string; description: string; icon: string; onClick: () => void; }> = ({ title, description, icon, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center text-left bg-white/60 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
        <div className="mr-4 text-4xl w-12 h-12 flex items-center justify-center drop-shadow-sm">{icon}</div>
        <div className="flex-grow">
            <h3 className="text-lg font-bold text-brand-text">{title}</h3>
            <p className="text-sm text-slate-600">{description}</p>
        </div>
        <ChevronRightIcon className="h-6 w-6 text-slate-400 flex-shrink-0 ml-2" />
    </button>
);

const resources = [
    { title: "Climate Change: How Do We Know?", url: "https://climate.nasa.gov/evidence/" },
    { title: "Recycling Basics", url: "https://www.epa.gov/recycle/how-do-i-recycle-common-recyclables" },
    { title: "Plastic Pollution Explained", url: "https://www.nationalgeographic.com/environment/article/plastic-pollution" },
    { title: "Your Guide to a More Sustainable Life", url: "https://www.worldwildlife.org/pages/your-guide-to-a-more-sustainable-life" },
];

const HubScreen: React.FC<HubScreenProps> = ({ setView, onSelectQuiz }) => {
    return (
        <div className="flex flex-col h-full">
            <header className="mb-4">
                 <div className="flex items-center">
                    <Squares2x2Icon className="h-8 w-8 text-brand-primary mr-3" />
                    <div>
                        <h1 className="text-3xl font-bold text-brand-text">Hub</h1>
                        <p className="text-slate-600">Play, learn, and grow your eco-knowledge.</p>
                    </div>
                </div>
            </header>

            <div className="flex-grow overflow-y-auto space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-brand-text mb-3 px-2 flex items-center">
                        <span className="text-2xl mr-2">🎮</span> Game Zone
                    </h2>
                    <div className="space-y-3">
                        <NavCard 
                            title="Recycle Sort"
                            description="Test your knowledge of what goes where."
                            icon="♻️"
                            onClick={() => setView('recycleSort')}
                        />
                         <NavCard 
                            title="Eco Memory Match"
                            description="Match pairs of eco-friendly items."
                            icon="🧠"
                            onClick={() => setView('ecoMemoryMatch')}
                        />
                        <NavCard 
                            title="Eco Quiz"
                            description="Test your knowledge on recycling & climate."
                            icon="💡"
                            onClick={() => onSelectQuiz('combined')}
                        />
                        <NavCard 
                            title="Virtual Garden"
                            description="Use your points to grow a beautiful garden."
                            icon="🪴"
                            onClick={() => setView('virtualGarden')}
                        />
                    </div>
                </div>
                 <div>
                    <h2 className="text-xl font-bold text-brand-text mb-3 px-2 flex items-center"><BookOpenIcon className="h-6 w-6 mr-2 text-emerald-500" /> Learning Resources</h2>
                    <div className="space-y-3">
                        {resources.map(link => (
                             <a href={link.url} key={link.title} target="_blank" rel="noopener noreferrer" className="w-full flex items-center text-left bg-white/60 backdrop-blur-lg p-4 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                                <span className="font-semibold text-brand-text flex-grow">{link.title}</span>
                                <ChevronRightIcon className="h-5 w-5 text-slate-400 flex-shrink-0 ml-2" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HubScreen;