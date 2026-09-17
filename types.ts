export enum DisposalCategory {
    RECYCLABLE = 'Recyclable',
    COMPOSTABLE = 'Compostable',
    LANDFILL = 'Landfill',
    HAZARDOUS = 'Hazardous Waste',
    EWASTE = 'E-Waste',
    DONATION = 'Donation',
    UNKNOWN = 'Unknown',
}

export interface DisposalInstruction {
    step: number;
    description: string;
}

export interface AnalysisResult {
    isDisposable: boolean;
    itemName: string;
    category: DisposalCategory;
    reasoning?: string;
    disposalInstructions: DisposalInstruction[];
    binType: string;
    pickupSchedule?: string;
    notes?: string;
}

export interface Geolocation {
    latitude: number;
    longitude: number;
}

export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

export interface User {
    id: string; // email
    name: string;
    email: string;
    password?: string;
    avatar: string;
    ecoPoints: number;
    completedChallenges: number[];
    challengeProgress: { [challengeId: number]: number };
    lastLogin: string; // ISO string date part: 'YYYY-MM-DD'
    dailyChallengeData: {
        resetDate: string; // 'YYYY-MM-DD'
        progress: { [challengeId: number]: number };
        completedToday: number[];
    };
    weeklyChallengeData: {
        resetDate: string; // 'YYYY-WW'
        progress: { [challengeId: number]: number };
        completedThisWeek: number[];
    };
    stats: {
        totalScans: number;
        totalPosts: number;
        totalGames: number;
        totalChallengesCompleted: number;
    };
    unlockedBadges: string[];
}

export interface Comment {
    id: string;
    author: User;
    authorId: string;
    content: string;
    timestamp: string;
}

export enum PostCategory {
    TIP = 'Tip',
    QUESTION = 'Question',
    DISCUSSION = 'Discussion',
    ACHIEVEMENT = 'Achievement',
}

export interface Post {
    id: string;
    author: User;
    authorId: string;
    content: string;
    category: PostCategory;
    timestamp: string;
    likes: string[]; // Array of user IDs
    comments: Comment[];
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

export interface Plant {
    name: string;
    plantedAt: string; // ISO string
    lastWatered: string; // ISO string
}

export interface GardenPlot {
    id: number;
    plant: Plant | null;
}

export interface GardenState {
    plots: GardenPlot[];
}

export interface Challenge {
    id: number;
    title: string;
    description: string;
    points: number;
    type: 'scan' | 'post' | 'game' | 'login';
    goal: number;
    repeatable?: 'daily' | 'weekly';
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string; // emoji
    criteria: {
        type: 'points' | 'challenges' | 'scans' | 'posts' | 'games';
        value: number;
    };
}