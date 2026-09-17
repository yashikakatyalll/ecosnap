import React, { useState, useRef } from 'react';
import { User } from '../types';
import { ChevronLeftIcon, CameraIcon } from './Icons';

interface EditProfileScreenProps {
    user: User;
    onSave: (name: string, avatar: string) => void;
    onBack: () => void;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ user, onSave, onBack }) => {
    const [name, setName] = useState(user.name);
    const [avatar, setAvatar] = useState(user.avatar);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelect = () => fileInputRef.current?.click();

    const handleSave = () => {
        onSave(name, avatar);
    };

    return (
        <div className="flex flex-col h-full">
             <header className="flex items-center justify-between p-2 mb-6">
                <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
                    <ChevronLeftIcon className="h-7 w-7" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
                <button
                    onClick={handleSave}
                    className="px-5 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-dark disabled:bg-gray-300 transition-all"
                >
                    Save
                </button>
            </header>

            <div className="flex flex-col items-center space-y-6 px-2">
                <div className="relative">
                    <img src={avatar} alt="Avatar" className="h-32 w-32 rounded-full shadow-lg object-cover" />
                    <button 
                        onClick={triggerFileSelect}
                        className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition-colors"
                        aria-label="Change profile picture"
                    >
                        <CameraIcon className="h-6 w-6 text-gray-600" />
                    </button>
                    <input 
                        type="file" 
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleAvatarChange} 
                        className="hidden" 
                    />
                </div>

                <div className="w-full max-w-sm">
                    <label htmlFor="name-input" className="block text-sm font-semibold text-gray-700 mb-1">
                        Display Name
                    </label>
                    <input
                        id="name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    />
                </div>
                 <div className="w-full max-w-sm">
                    <label htmlFor="email-input" className="block text-sm font-semibold text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        id="email-input"
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                    />
                </div>
            </div>
        </div>
    );
};

export default EditProfileScreen;
