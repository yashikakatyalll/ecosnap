import { Post, User, Comment, PostCategory } from '../types';
import * as authService from './authService';

const POSTS_KEY = 'ecoSnapPosts';

type StoredComment = Omit<Comment, 'author'>;

// Keep the stored shape small; full author objects are rebuilt when posts are read.
interface StoredPost {
    id: string;
    authorId: string;
    content: string;
    category?: PostCategory;
    timestamp: string;
    likes: string[];
    comments: StoredComment[];
}

const getPostsFromStorage = (): StoredPost[] => {
    const postsJson = localStorage.getItem(POSTS_KEY);
    return postsJson ? JSON.parse(postsJson) : [];
};

const savePostsToStorage = (posts: StoredPost[]) => {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

export const getPosts = (): Post[] => {
    const storedPosts = getPostsFromStorage();
    const users = authService.getUsers();
    
    const userMap = new Map(users.map(user => [user.id, user]));

    const enrichComments = (comments: StoredComment[]): Comment[] => {
        return comments.map(comment => {
            const author = userMap.get(comment.authorId);
            return author ? { ...comment, author } : null;
        }).filter((c): c is Comment => c !== null);
    };

    // Older posts may not have a category, so give them the original discussion default.
    const enrichedPosts = storedPosts.map(post => {
        const author = userMap.get(post.authorId);
        if (!author) return null;
        
        const completePost: Post = {
            id: post.id,
            author,
            authorId: post.authorId,
            content: post.content,
            category: post.category || PostCategory.DISCUSSION, // Default for old posts
            timestamp: post.timestamp,
            likes: post.likes,
            comments: enrichComments(post.comments || [])
        };
        return completePost;
    }).filter((p): p is Post => p !== null);

    return enrichedPosts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const addPost = (content: string, author: User, category: PostCategory): void => {
    const posts = getPostsFromStorage();
    const newPost: StoredPost = {
        id: crypto.randomUUID(),
        authorId: author.id,
        content,
        category,
        timestamp: new Date().toISOString(),
        likes: [],
        comments: []
    };
    posts.push(newPost);
    savePostsToStorage(posts);
};

export const deletePost = (postId: string, currentUserId: string): void => {
    const currentPosts = getPostsFromStorage();
    const postToDelete = currentPosts.find(p => p.id === postId);

    if (!postToDelete) {
        // Post might have been deleted in another session.
        console.warn(`Post with ID ${postId} not found for deletion.`);
        return; 
    }

    if (postToDelete.authorId !== currentUserId) {
        throw new Error("Permission denied: User cannot delete another user's post.");
    }
    
    const updatedPosts = currentPosts.filter(p => p.id !== postId);
    savePostsToStorage(updatedPosts);
};


export const toggleLikePost = (postId: string, userId: string): void => {
    const posts = getPostsFromStorage();
    const post = posts.find(p => p.id === postId);
    if (post) {
        const likeIndex = post.likes.indexOf(userId);
        if (likeIndex > -1) {
            post.likes.splice(likeIndex, 1); // Unlike
        } else {
            post.likes.push(userId); // Like
        }
        savePostsToStorage(posts);
    }
};

export const addComment = (postId: string, content: string, author: User): Comment | null => {
    const posts = getPostsFromStorage();
    const post = posts.find(p => p.id === postId);
    if (post) {
        const newComment: StoredComment = {
            id: crypto.randomUUID(),
            authorId: author.id,
            content,
            timestamp: new Date().toISOString()
        };
        // Ensure comments array exists
        if (!post.comments) {
            post.comments = [];
        }
        post.comments.push(newComment);
        savePostsToStorage(posts);
        
        // Return the complete comment so the UI can update without another read.
        return {
            ...newComment,
            author
        };
    }
    return null;
};


export const deleteComment = (postId: string, commentId: string, currentUserId: string): void => {
    const currentPosts = getPostsFromStorage();
    
    const postToUpdate = currentPosts.find(p => p.id === postId);
    if (!postToUpdate) {
        console.warn(`Post with ID ${postId} not found for comment deletion.`);
        return;
    }

    const commentToDelete = postToUpdate.comments.find(c => c.id === commentId);
    if (!commentToDelete) {
        console.warn(`Comment with ID ${commentId} not found in post ${postId}.`);
        return;
    }

    const isPostOwner = postToUpdate.authorId === currentUserId;
    const isCommentOwner = commentToDelete.authorId === currentUserId;
    if (!isPostOwner && !isCommentOwner) {
        throw new Error("Permission denied: User cannot delete this comment.");
    }

    const updatedPosts = currentPosts.map(post => {
        if (post.id !== postId) {
            return post;
        }
        return {
            ...post,
            comments: post.comments.filter(comment => comment.id !== commentId)
        };
    });

    savePostsToStorage(updatedPosts);
};