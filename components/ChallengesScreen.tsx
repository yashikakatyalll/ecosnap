import React from 'react';
import { getChallenges } from '../services/challenges';
import { Challenge } from '../types';

const ChallengesScreen: React.FC = () => {
    // FIX: Mock the completion status of challenges because this component is not connected to user data.
    // FIX: Corrected the type of `challenges` to include the mocked `isCompleted` property.
    const challenges: (Challenge & { isCompleted: boolean })[] = getChallenges().map((challenge, index) => ({
        ...challenge,
        isCompleted: index % 2 === 0,
    }));
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Challenges</h1>
            <ul className="space-y-2 mt-4">
                {challenges.map(c => (
                    <li key={c.id} className={`p-2 rounded ${c.isCompleted ? 'bg-green-100' : 'bg-white'}`}>
                        <span className="font-semibold">{c.title}</span> - {c.isCompleted ? 'Completed' : 'To-Do'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChallengesScreen;