import React from 'react';
import { ChevronLeftIcon, BookOpenIcon, ChevronRightIcon } from './Icons';

interface ResourcesScreenProps {
    onBack: () => void;
}

const resources = {
    "Getting Started": [
        { title: "Beginner's Guide to Reducing Your Carbon Footprint", url: "https://www.youtube.com/watch?v=1-s84QzaI2I" },
        { title: "10 Simple Swaps for a More Sustainable Home", url: "https://www.architecturaldigest.com/story/simple-sustainability-tips-for-your-home" },
    ],
    "Recycling 101": [
        { title: "What Do Recycling Numbers Mean? A Visual Guide", url: "https://www.goodhousekeeping.com/home/g804/recycling-symbols-plastics-460221/" },
        { title: "How Does Recycling Actually Work?", url: "https://www.youtube.com/watch?v=VlRVPum9cp4" },
    ],
    "Composting": [
        { title: "How to Start a Compost Bin (Even in an Apartment)", url: "https://www.epa.gov/recycle/composting-home" },
        { title: "What Can and Can't Be Composted?", url: "https://www.youtube.com/watch?v=mBhT2KjGq3M" },
    ]
};

const ResourceLink: React.FC<{ title: string, url: string }> = ({ title, url }) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center text-left bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]">
        <span className="font-semibold text-gray-700 flex-grow">{title}</span>
        <ChevronRightIcon className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
    </a>
)

const ResourcesScreen: React.FC<ResourcesScreenProps> = ({ onBack }) => {
    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center p-2 mb-4">
                <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
                    <ChevronLeftIcon className="h-7 w-7" />
                </button>
                <div className="flex items-center mx-auto pr-8">
                    <BookOpenIcon className="h-7 w-7 text-emerald-500 mr-2" />
                    <h1 className="text-3xl font-bold text-gray-800">Eco Resources</h1>
                </div>
            </header>

            <div className="flex-grow overflow-y-auto space-y-6 px-1">
                {Object.entries(resources).map(([category, links]) => (
                    <div key={category}>
                        <h2 className="text-xl font-bold text-gray-700 mb-3 px-2">{category}</h2>
                        <div className="space-y-3">
                            {links.map(link => <ResourceLink key={link.title} {...link} />)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcesScreen;
