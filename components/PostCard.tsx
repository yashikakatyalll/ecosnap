import React, { useState } from 'react';
import { Post, User, Comment, PostCategory } from '../types';
import { HeartIcon, ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon, TrashIcon } from './Icons';

interface PostCardProps {
    post: Post;
    currentUser: User;
    onDeletePost: (postId: string) => void;
    onDeleteComment: (postId: string, commentId: string) => void;
    onToggleLike: (postId: string) => void;
    onAddComment: (postId: string, commentText: string) => void;
}

const categoryStyles: { [key in PostCategory]: { bg: string; text: string; icon: string } } = {
    [PostCategory.TIP]: { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: '💡' },
    [PostCategory.QUESTION]: { bg: 'bg-sky-100', text: 'text-sky-800', icon: '❓' },
    [PostCategory.DISCUSSION]: { bg: 'bg-indigo-100', text: 'text-indigo-800', icon: '💬' },
    [PostCategory.ACHIEVEMENT]: { bg: 'bg-amber-100', text: 'text-amber-800', icon: '🎉' },
};

const PostCard: React.FC<PostCardProps> = ({ 
    post, 
    currentUser, 
    onDeletePost, 
    onDeleteComment,
    onToggleLike,
    onAddComment
}) => {
    const [commentText, setCommentText] = useState('');
    const hasLiked = post.likes.includes(currentUser.id);

    const handleLike = () => {
        onToggleLike(post.id);
    };

    const handleAddComment = () => {
        if (commentText.trim()) {
            onAddComment(post.id, commentText.trim());
            setCommentText('');
        }
    };

    const canDeleteComment = (comment: Comment) => {
        return comment.author.id === currentUser.id || post.author.id === currentUser.id;
    }

    const categoryInfo = categoryStyles[post.category] || categoryStyles[PostCategory.DISCUSSION];

    return (
        <div className="bg-white/60 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-white/20">
            <div className="flex items-start mb-3">
                <img src={post.author.avatar} alt={post.author.name} className="h-10 w-10 rounded-full mr-3" />
                <div className="flex-grow">
                    <p className="font-bold text-gray-800">{post.author.name}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-0.5">
                        <span>{new Date(post.timestamp).toLocaleString()}</span>
                        <span className="mx-1.5">&middot;</span>
                         <div className={`inline-flex items-center px-2 py-0.5 rounded-full ${categoryInfo.bg} ${categoryInfo.text} font-semibold`}>
                           <span className="mr-1">{categoryInfo.icon}</span>
                           <span>{post.category}</span>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap mb-3">{post.content}</p>
            
            <div className="flex items-center space-x-4 border-b border-slate-300/40 pb-3 mb-3">
                <button onClick={handleLike} className="flex items-center space-x-1.5 text-gray-500 hover:text-red-500 transition-colors">
                    <HeartIcon filled={hasLiked} className={`h-6 w-6 ${hasLiked ? 'text-red-500' : ''}`} />
                    <span className="font-semibold text-sm">{post.likes.length}</span>
                </button>
                 <div className="flex items-center space-x-1.5 text-gray-500">
                    <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
                    <span className="font-semibold text-sm">{post.comments.length}</span>
                </div>
                <div className="flex-grow" />
                {post.author.id === currentUser.id && (
                    <button
                        onClick={() => onDeletePost(post.id)}
                        className="flex items-center space-x-1.5 text-gray-500 hover:text-red-500 transition-colors"
                        aria-label="Delete post"
                    >
                        <TrashIcon className="h-6 w-6" />
                    </button>
                )}
            </div>

            {/* Comments Section */}
            <div className="space-y-3">
                {post.comments.map((comment: Comment) => (
                    <div key={comment.id} className="flex items-start space-x-2.5 group">
                         <img src={comment.author.avatar} alt={comment.author.name} className="h-8 w-8 rounded-full mt-1 flex-shrink-0" />
                         <div className="flex-grow bg-slate-100/70 rounded-xl p-2.5">
                            <p className="font-bold text-gray-800 text-sm">{comment.author.name}</p>
                            <p className="text-gray-700 text-sm whitespace-pre-wrap mt-1">{comment.content}</p>
                         </div>
                         {canDeleteComment(comment) && (
                            <button
                                onClick={() => onDeleteComment(post.id, comment.id)}
                                className="p-2 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-100/50 transition-colors flex-shrink-0"
                                aria-label="Delete comment"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

             {/* Add Comment Input */}
            <div className="flex items-center space-x-2 mt-3">
                 <img src={currentUser.avatar} alt={currentUser.name} className="h-8 w-8 rounded-full" />
                 <div className="flex-grow flex items-center">
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full px-3 py-2 bg-slate-100/70 border border-slate-200/80 rounded-l-lg focus:ring-2 focus:ring-brand-primary focus:outline-none text-sm"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                    />
                    <button onClick={handleAddComment} className="p-2 bg-slate-200/80 rounded-r-lg hover:bg-slate-300/80">
                        <PaperAirplaneIcon className="h-5 w-5 text-slate-600"/>
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default PostCard;