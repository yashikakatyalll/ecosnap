import React, { useState } from 'react';
import { ChevronLeftIcon } from './Icons';
import { PostCategory } from '../types';

interface NewPostScreenProps {
    onAddPost: (postText: string, category: PostCategory) => void;
    onBack: () => void;
}

const categoryOptions = [
    { id: PostCategory.TIP, label: 'Tip', icon: '💡' },
    { id: PostCategory.QUESTION, label: 'Question', icon: '❓' },
    { id: PostCategory.DISCUSSION, label: 'Discussion', icon: '💬' },
    { id: PostCategory.ACHIEVEMENT, label: 'Achievement', icon: '🎉' },
];

const NewPostScreen: React.FC<NewPostScreenProps> = ({ onAddPost, onBack }) => {
    const [postText, setPostText] = useState('');
    const [category, setCategory] = useState<PostCategory>(PostCategory.TIP);

    const handlePost = () => {
        if (postText.trim()) {
            onAddPost(postText.trim(), category);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center justify-between p-2 mb-4">
                <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
                    <ChevronLeftIcon className="h-7 w-7" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">New Post</h1>
                <button
                    onClick={handlePost}
                    disabled={!postText.trim()}
                    className="px-5 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                >
                    Post
                </button>
            </header>

            <div className="flex-grow p-2 flex flex-col space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 px-2">Select a Category</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {categoryOptions.map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => setCategory(opt.id)}
                                className={`flex items-center justify-center p-3 rounded-xl font-semibold transition-all duration-200 ${
                                    category === opt.id
                                        ? 'bg-brand-primary text-white shadow-lg'
                                        : 'bg-white hover:bg-slate-100 text-gray-700'
                                }`}
                            >
                                <span className="mr-2 text-lg">{opt.icon}</span>
                                <span>{opt.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="Share your eco-tips or ask a question..."
                    className="w-full flex-grow p-4 bg-white border border-gray-200 rounded-2xl shadow-inner focus:ring-2 focus:ring-brand-primary focus:outline-none resize-none"
                />
            </div>
        </div>
    );
};

export default NewPostScreen;