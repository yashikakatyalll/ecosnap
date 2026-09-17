import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { startChat, sendMessageToChatStream } from '../services/geminiService';
import { PaperAirplaneIcon, SpinnerIcon } from './Icons';

const EcoAssistant: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        startChat();
        setMessages([
            { role: 'model', content: "Hello! I'm your Eco Assistant. How can I help you with your sustainability questions today?" }
        ]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage, { role: 'model', content: '' }]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = await sendMessageToChatStream(userMessage.content);
            let text = '';
            for await (const chunk of stream) {
                text += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'model', content: text };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { role: 'model', content: 'Sorry, I encountered an error. Please try again.' };
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-100 overflow-hidden">
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md p-3 rounded-2xl whitespace-pre-wrap ${msg.role === 'user' ? 'bg-brand-primary text-white' : 'bg-white text-gray-800 shadow-sm'}`}>
                           {msg.content}
                           {isLoading && msg.role === 'model' && index === messages.length -1 && <span className="inline-block w-2 h-4 bg-gray-600 animate-ping ml-1"></span>}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </main>

            <footer className="p-4 bg-white/80 backdrop-blur-xl border-t">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask a question..."
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-3 bg-brand-primary text-white rounded-lg shadow-md hover:bg-brand-dark disabled:bg-gray-300 transition-colors">
                        {isLoading ? <SpinnerIcon className="h-6 w-6" /> : <PaperAirplaneIcon className="h-6 w-6" />}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default EcoAssistant;