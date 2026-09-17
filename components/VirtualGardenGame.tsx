import React, { useState } from 'react';
import { GardenState, Plant } from '../types';
import { ChevronLeftIcon, SparklesIcon, PlusIcon } from './Icons';

interface VirtualGardenGameProps {
    onBack: () => void;
    garden: GardenState;
    onUpdateGarden: (newGarden: GardenState) => void;
    ecoPoints: number;
    onAddPoints: (points: number) => void;
}

const plantOptions = [
    { name: 'Sunflower', icon: '🌻' },
    { name: 'Carrot', icon: '🥕' },
    { name: 'Tomato', icon: '🍅' },
    { name: 'Rose', icon: '🌹' },
];

const PLANT_COST = 50;
const WATER_COST = 5;
const HARVEST_REWARD = 60; // Reduced points

const getGrowthStage = (plant: Plant): { stage: string; icon: string; name: string } => {
    const now = new Date().getTime();
    const lastWatered = new Date(plant.lastWatered).getTime();
    const plantedAt = new Date(plant.plantedAt).getTime();

    if (now - lastWatered > 24 * 60 * 60 * 1000) {
        return { stage: 'wilted', icon: '🥀', name: 'Wilted' };
    }

    const hoursElapsed = (now - plantedAt) / (1000 * 60 * 60);

    if (hoursElapsed < 2) return { stage: 'sprout', icon: '🌱', name: 'Sprout' };
    if (hoursElapsed < 12) return { stage: 'seedling', icon: '🌿', name: 'Seedling' };
    if (hoursElapsed < 24) return { stage: 'growing', icon: '🪴', name: 'Growing Plant' };
    
    const matureIcon = plantOptions.find(p => p.name === plant.name)?.icon || '🌸';
    return { stage: 'mature', icon: matureIcon, name: 'Mature Plant' };
};


const VirtualGardenGame: React.FC<VirtualGardenGameProps> = ({ onBack, garden, onUpdateGarden, ecoPoints, onAddPoints }) => {
    const [selectedSeed, setSelectedSeed] = useState(plantOptions[0]);
    const [selectedPlotId, setSelectedPlotId] = useState<number | null>(null);

    const handlePlant = (plotId: number) => {
        if (ecoPoints < PLANT_COST) {
            alert("Not enough points to plant!");
            return;
        }

        const now = new Date().toISOString();
        const newPlots = garden.plots.map(plot => {
            if (plot.id === plotId && !plot.plant) {
                return { 
                    ...plot, 
                    plant: { 
                        name: selectedSeed.name, 
                        plantedAt: now,
                        lastWatered: now,
                    } 
                };
            }
            return plot;
        });
        
        onUpdateGarden({ plots: newPlots });
        onAddPoints(-PLANT_COST);
        setSelectedPlotId(plotId); // Select the new plant
    };
    
    const handleWater = (plotId: number) => {
        if (ecoPoints < WATER_COST) {
            alert("Not enough points to water!");
            return;
        }
        const newPlots = garden.plots.map(plot => {
            if (plot.id === plotId) {
                return { ...plot, plant: { ...plot.plant!, lastWatered: new Date().toISOString() } };
            }
            return plot;
        });
        onUpdateGarden({ plots: newPlots });
        onAddPoints(-WATER_COST);
    };
    
    const handleHarvest = (plotId: number) => {
        const newPlots = garden.plots.map(plot => {
            if (plot.id === plotId) {
                return { ...plot, plant: null };
            }
            return plot;
        });
        onUpdateGarden({ plots: newPlots });
        onAddPoints(HARVEST_REWARD);
        setSelectedPlotId(null); // Deselect after harvesting
    };

    const selectedPlot = garden.plots.find(p => p.id === selectedPlotId);
    const plant = selectedPlot?.plant;
    const growthInfo = plant ? getGrowthStage(plant) : null;
    const isWatered = plant && (new Date().getTime() - new Date(plant.lastWatered).getTime()) < 24 * 60 * 60 * 1000;

    return (
        <div className="flex flex-col h-full text-center">
            <header className="flex items-center p-2 mb-4">
                 <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
                    <ChevronLeftIcon className="h-7 w-7" />
                </button>
                <div className="flex items-center mx-auto pr-8">
                    <span className="text-3xl mr-2">🪴</span>
                    <h1 className="text-3xl font-bold text-gray-800">Virtual Garden</h1>
                </div>
            </header>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-600 font-medium">Tend to your garden daily!</p>
                     <div className="flex items-center font-bold text-yellow-800 bg-yellow-100 px-3 py-1 rounded-full">
                        <SparklesIcon className="h-5 w-5 mr-1" />
                        <span>{ecoPoints}</span>
                    </div>
                </div>

                {/* Garden Grid */}
                <div className="grid grid-cols-3 gap-3 my-4 bg-yellow-900/20 p-3 rounded-2xl">
                    {garden.plots.map(plot => (
                        <button 
                            key={plot.id} 
                            onClick={() => setSelectedPlotId(plot.id)}
                            className={`aspect-square bg-yellow-800/40 rounded-xl flex items-center justify-center transition-all duration-200 ${selectedPlotId === plot.id ? 'scale-105 ring-4 ring-brand-primary' : 'hover:bg-yellow-800/60'}`}
                        >
                            {plot.plant ? (
                                <div className="text-center">
                                    <span className="text-4xl">{getGrowthStage(plot.plant).icon}</span>
                                    <p className="text-xs font-bold text-white/90 -mt-1">{plot.plant.name}</p>
                                </div>
                            ) : (
                                <PlusIcon className="h-8 w-8 text-white/50" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Action Panel */}
                <div className="mt-auto bg-slate-100 p-4 rounded-2xl h-44 flex flex-col justify-center">
                    {!selectedPlot && (
                         <div className="text-center text-gray-500">
                            <p>Select a plot to see its status or plant something new.</p>
                        </div>
                    )}
                    {selectedPlot && !plant && (
                        <div>
                             <h3 className="font-bold text-gray-700 mb-2">Plant a new seed:</h3>
                             <div className="flex justify-center gap-3">
                                {plantOptions.map(seed => (
                                    <button
                                        key={seed.name}
                                        onClick={() => setSelectedSeed(seed)}
                                        className={`p-2 rounded-lg transition-all ${selectedSeed.name === seed.name ? 'bg-brand-primary text-white scale-110 shadow-lg' : 'hover:bg-slate-200'}`}
                                    >
                                        <span className="text-2xl">{seed.icon}</span>
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => handlePlant(selectedPlot.id)} className="w-full mt-3 py-2 px-4 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 disabled:bg-gray-400" disabled={ecoPoints < PLANT_COST}>
                                Plant {selectedSeed.name} ({PLANT_COST} pts)
                            </button>
                        </div>
                    )}
                    {selectedPlot && plant && growthInfo && (
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-800">{growthInfo.icon} {plant.name}</h3>
                            <p className="font-semibold text-gray-600">{growthInfo.name}</p>
                            
                            <div className="mt-3 grid grid-cols-2 gap-3">
                                {growthInfo.stage === 'mature' ? (
                                     <button onClick={() => handleHarvest(selectedPlot.id)} className="w-full col-span-2 py-2 px-4 bg-yellow-400 text-yellow-900 font-bold rounded-lg shadow-md hover:bg-yellow-500">
                                        Harvest (+{HARVEST_REWARD} pts)
                                    </button>
                                ) : (
                                    <button onClick={() => handleWater(selectedPlot.id)} disabled={isWatered || ecoPoints < WATER_COST} className="w-full py-2 px-4 bg-sky-500 text-white font-bold rounded-lg shadow-md hover:bg-sky-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                        {isWatered ? 'Watered' : `Water (${WATER_COST} pts)`}
                                    </button>
                                )}
                                 <button onClick={() => setSelectedPlotId(null)} className="w-full py-2 px-4 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300">
                                     Deselect
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VirtualGardenGame;