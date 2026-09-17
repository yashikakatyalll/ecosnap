import { Challenge, Badge } from '../types';

export const getChallenges = (): Challenge[] => [
    // One-Time
    { id: 1, title: "First Scan", description: "Scan and properly dispose of your first item.", points: 20, type: 'scan', goal: 1 },
    { id: 2, title: "Scanner Pro", description: "Scan and properly dispose of 5 items.", points: 30, type: 'scan', goal: 5 },
    { id: 11, title: "Super Scanner", description: "Scan a total of 25 items.", points: 50, type: 'scan', goal: 25 },
    { id: 3, title: "Community Starter", description: "Share your first eco-tip in the community.", points: 30, type: 'post', goal: 1 },
    { id: 12, title: "Engaged Citizen", description: "Post 5 times in the community.", points: 50, type: 'post', goal: 5 },
    { id: 4, title: "Game On!", description: "Play any game in the Game Hub.", points: 15, type: 'game', goal: 1 },
    { id: 6, title: "Gaming Streak", description: "Play 3 games in the Game Hub.", points: 25, type: 'game', goal: 3 },
    { id: 13, title: "Game Master", description: "Play 10 games.", points: 50, type: 'game', goal: 10 },
    
    // Daily
    { id: 5, title: "Daily Login", description: "Log in to the app to check on your progress.", points: 10, type: 'login', goal: 1, repeatable: 'daily' },
    { id: 7, title: "Daily Scanner", description: "Scan 3 items in a day.", points: 25, type: 'scan', goal: 3, repeatable: 'daily' },
    
    // Weekly
    { id: 8, title: "Weekly Contributor", description: "Make 3 posts this week.", points: 50, type: 'post', goal: 3, repeatable: 'weekly' },
    { id: 9, title: "Weekly Gamer", description: "Play 5 games this week.", points: 40, type: 'game', goal: 5, repeatable: 'weekly' },
    { id: 10, title: "Weekly Scanner Pro", description: "Scan 15 items this week.", points: 75, type: 'scan', goal: 15, repeatable: 'weekly' },
];


export const getBadges = (): Badge[] => [
    // Points Badges
    { id: 'points1', name: 'Point Novice', description: 'Earn your first 250 EcoPoints!', icon: '🌟', criteria: { type: 'points', value: 250 } },
    { id: 'points2', name: 'Point Adept', description: 'Accumulate 2,500 EcoPoints.', icon: '💫', criteria: { type: 'points', value: 2500 } },
    { id: 'points3', name: 'Point Master', description: 'Reach an impressive 12,000 EcoPoints!', icon: '✨', criteria: { type: 'points', value: 12000 } },
    // Scan Badges
    { id: 'scans1', name: 'First Scan', description: 'You scanned your first item!', icon: '📸', criteria: { type: 'scans', value: 1 } },
    { id: 'scans2', name: 'Scanner', description: 'Scan 30 different items.', icon: '📷', criteria: { type: 'scans', value: 30 } },
    { id: 'scans3', name: 'Super Scanner', description: 'Scan 150 different items.', icon: '📹', criteria: { type: 'scans', value: 150 } },
    // Post Badges
    { id: 'posts1', name: 'First Post', description: 'Share your first post with the community.', icon: '👋', criteria: { type: 'posts', value: 1 } },
    { id: 'posts2', name: 'Contributor', description: 'Make 15 posts in the community.', icon: '✍️', criteria: { type: 'posts', value: 15 } },
    // Challenge Badges
    { id: 'challenges1', name: 'Challenge Seeker', description: 'Complete your first 3 challenges.', icon: '🏅', criteria: { type: 'challenges', value: 3 } },
    { id: 'challenges2', name: 'Challenge Conqueror', description: 'Complete 12 challenges.', icon: '🏆', criteria: { type: 'challenges', value: 12 } },
     // Game Badges
    { id: 'games1', name: 'Gamer', description: 'Play 3 games.', icon: '🎮', criteria: { type: 'games', value: 3 } },
    { id: 'games2', name: 'Game Enthusiast', description: 'Play 20 games.', icon: '🕹️', criteria: { type: 'games', value: 20 } },
];