import React, { useState } from 'react';
import { Geolocation } from '../types';
import { findDisposalLocations } from '../services/geminiService';
import { MapPinIcon, SpinnerIcon, SearchIcon } from './Icons';

interface MapScreenProps {
    location: Geolocation | null;
    geoError: string | null;
    geoLoading: boolean;
}

const SearchSuggestion: React.FC<{ text: string, onClick: (text: string) => void }> = ({ text, onClick }) => (
    <button 
        onClick={() => onClick(text)}
        className="px-4 py-2 bg-white/80 text-brand-dark font-semibold rounded-full shadow-sm hover:bg-brand-light/70 transition-all backdrop-blur-sm"
    >
        {text}
    </button>
);

const MapScreen: React.FC<MapScreenProps> = ({ location }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<{ text: string; locations: any[] } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const performSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setError(null);
        setResults(null);
        setQuery(searchQuery);

        try {
            const response = await findDisposalLocations(searchQuery, location);
            setResults(response);
        } catch (err) {
            setError('An error occurred during the search. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        performSearch(query);
    };

    const handleSuggestionClick = (suggestion: string) => {
        performSearch(suggestion);
    };

    return (
        <div className="flex flex-col h-full space-y-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Disposal Map</h1>
                <p className="text-gray-600">Find local recycling, compost, and disposal centers.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="bg-white/60 backdrop-blur-lg border border-white/20 p-4 rounded-2xl shadow-xl">
                <label htmlFor="location-search" className="block font-semibold text-gray-700 mb-2">
                    What are you looking for?
                </label>
                <div className="flex gap-2">
                    <div className="relative flex-grow">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            id="location-search"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g., 'E-waste drop-off'"
                            className="w-full pl-11 pr-4 py-3 bg-slate-100/80 border-2 border-slate-200/50 rounded-xl focus:ring-2 focus:ring-brand-primary focus:outline-none focus:border-brand-primary"
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !query.trim()}
                        className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-xl shadow-md shadow-brand-primary/30 hover:bg-brand-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                    >
                        Search
                    </button>
                </div>
            </form>

            <div className="flex-grow overflow-y-auto space-y-4">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center text-center p-8">
                        <SpinnerIcon className="h-12 w-12 text-brand-primary" />
                        <p className="mt-4 font-semibold text-gray-700">Searching for locations...</p>
                    </div>
                )}
                {error && <p className="text-red-500 text-center p-4">{error}</p>}
                
                {!isLoading && !results && (
                     <div className="text-center p-6 bg-white/60 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg">
                        <MapPinIcon className="h-16 w-16 text-brand-primary mx-auto opacity-50" />
                        <h3 className="mt-4 text-xl font-bold text-gray-700">Find What's Near You</h3>
                        <p className="mt-1 text-gray-500">Search for battery recycling, donation centers, and more.</p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            <SearchSuggestion text="Battery Recycling" onClick={handleSuggestionClick} />
                            <SearchSuggestion text="Compost Bins" onClick={handleSuggestionClick} />
                            <SearchSuggestion text="Goodwill" onClick={handleSuggestionClick} />
                        </div>
                    </div>
                )}

                {results && (
                    <div className="space-y-4">
                        {results.locations.length > 0 ? (
                             <div className="space-y-3">
                                {results.locations.map((loc, index) => (
                                    <a 
                                        key={index}
                                        href={loc.uri} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="block bg-white/60 backdrop-blur-lg border border-white/20 p-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="bg-brand-primary/10 p-3 rounded-full mt-1">
                                                <MapPinIcon className="h-6 w-6 text-brand-primary flex-shrink-0" />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="font-bold text-gray-800 text-lg">{loc.title}</h3>
                                                {loc.placeAnswerSources?.reviewSnippets?.[0] && (
                                                    <p className="text-sm text-gray-500 mt-1 italic border-l-4 border-slate-200/70 pl-2">
                                                        "{loc.placeAnswerSources.reviewSnippets[0]}"
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        ) : (
                           !isLoading && <p className="text-center text-gray-500 p-4">No specific locations found in the response.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MapScreen;