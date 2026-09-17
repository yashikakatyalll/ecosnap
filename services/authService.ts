import { User, Challenge, Badge } from '../types';
import { getChallenges, getBadges } from './challenges';

const USERS_KEY = 'ecoSnapUsers';
const CURRENT_USER_KEY = 'ecoSnapCurrentUser';

// Helper to get users from localStorage
const getUsersFromStorage = (): User[] => {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
};

// Helper to save users to localStorage
const saveUsersToStorage = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getWeekIdentifier = (date: Date): string => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return `${d.getUTCFullYear()}-${weekNo}`;
};


export const signup = (name: string, email: string, password_provided: string): User => {
    const users = getUsersFromStorage();
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
        throw new Error('An account with this email already exists.');
    }

    const newUser: User = {
        id: email.toLowerCase(),
        name,
        email: email.toLowerCase(),
        password: password_provided, // In a real app, this would be hashed
        avatar: `https://i.pravatar.cc/150?u=${email}`,
        ecoPoints: 0,
        completedChallenges: [],
        challengeProgress: {},
        lastLogin: new Date(0).toISOString().split('T')[0], // Initialize to epoch
        dailyChallengeData: {
            resetDate: '1970-01-01',
            progress: {},
            completedToday: [],
        },
        weeklyChallengeData: {
            resetDate: '1970-01',
            progress: {},
            completedThisWeek: [],
        },
        stats: {
            totalScans: 0,
            totalPosts: 0,
            totalGames: 0,
            totalChallengesCompleted: 0,
        },
        unlockedBadges: [],
    };

    users.push(newUser);
    saveUsersToStorage(users);
    localStorage.setItem(CURRENT_USER_KEY, newUser.id);

    return newUser;
};

export const login = (email: string, password_provided: string): boolean => {
    const users = getUsersFromStorage();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password_provided) {
        throw new Error('Invalid email or password.');
    }

    localStorage.setItem(CURRENT_USER_KEY, user.id);
    return true;
};

export const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
    const userId = localStorage.getItem(CURRENT_USER_KEY);
    if (!userId) return null;

    const users = getUsersFromStorage();
    const user = users.find(u => u.id === userId);
    
    if (user) {
        // Omit password when returning user object for security
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    
    return null;
};

export const getUsers = (): User[] => {
    const users = getUsersFromStorage();
    // Return users without passwords
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
};

export const updateUser = (updatedUser: Partial<User> & { id: string }): User | null => {
    const users = getUsersFromStorage();
    const userIndex = users.findIndex(u => u.id === updatedUser.id);

    if (userIndex === -1) {
        return null;
    }

    // Preserve existing sensitive/unprovided data
    const existingUser = users[userIndex];
    users[userIndex] = {
        ...existingUser,
        ...updatedUser,
        password: existingUser.password, // Always preserve password
    };

    saveUsersToStorage(users);

    const { password, ...userWithoutPassword } = users[userIndex];
    return userWithoutPassword;
};

const checkAndAwardBadges = (user: User): { updatedUser: User, newBadges: Badge[] } => {
    const allBadges = getBadges();
    const newBadges: Badge[] = [];

    const totalChallengesCompleted = user.stats.totalChallengesCompleted || 0;

    for (const badge of allBadges) {
        if (user.unlockedBadges.includes(badge.id)) {
            continue; // Already unlocked
        }

        let criteriaMet = false;
        switch (badge.criteria.type) {
            case 'points':
                if (user.ecoPoints >= badge.criteria.value) criteriaMet = true;
                break;
            case 'scans':
                if (user.stats.totalScans >= badge.criteria.value) criteriaMet = true;
                break;
            case 'posts':
                if (user.stats.totalPosts >= badge.criteria.value) criteriaMet = true;
                break;
            case 'games':
                 if (user.stats.totalGames >= badge.criteria.value) criteriaMet = true;
                break;
            case 'challenges':
                if (totalChallengesCompleted >= badge.criteria.value) criteriaMet = true;
                break;
        }

        if (criteriaMet) {
            user.unlockedBadges.push(badge.id);
            newBadges.push(badge);
        }
    }
    return { updatedUser: user, newBadges };
};

export const addPoints = (userId: string, points: number): { updatedUser: User | null, newBadges: Badge[] } => {
    const users = getUsersFromStorage();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) return { updatedUser: null, newBadges: [] };
    
    let user = users[userIndex];
    user.ecoPoints += points;
    
    const { updatedUser, newBadges } = checkAndAwardBadges(user);
    users[userIndex] = updatedUser;

    saveUsersToStorage(users);
    
    const { password, ...userWithoutPassword } = updatedUser;
    return { updatedUser: userWithoutPassword, newBadges };
}

export const trackAction = (userId: string, actionType: Challenge['type'], count: number = 1): { updatedUser: User | null, completedChallenge: Challenge | null, newBadges: Badge[] } => {
    const users = getUsersFromStorage();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) return { updatedUser: null, completedChallenge: null, newBadges: [] };

    let user = users[userIndex];
    const challenges = getChallenges();
    let completedChallenge: Challenge | null = null;
    
    // --- Daily Challenge Reset Logic ---
    const today = new Date().toISOString().split('T')[0];
    if (!user.dailyChallengeData || user.dailyChallengeData.resetDate !== today) {
        user.dailyChallengeData = { resetDate: today, progress: {}, completedToday: [] };
    }
    
    // --- Weekly Challenge Reset Logic ---
    const thisWeek = getWeekIdentifier(new Date());
    if (!user.weeklyChallengeData || user.weeklyChallengeData.resetDate !== thisWeek) {
        user.weeklyChallengeData = { resetDate: thisWeek, progress: {}, completedThisWeek: [] };
    }


    // --- Update Stats ---
    if (!user.stats) user.stats = { totalScans: 0, totalPosts: 0, totalGames: 0, totalChallengesCompleted: 0 };
    if (user.stats.totalChallengesCompleted === undefined) user.stats.totalChallengesCompleted = user.completedChallenges.length; // Backwards compatibility
    
    switch (actionType) {
        case 'scan': user.stats.totalScans += count; break;
        case 'post': user.stats.totalPosts += count; break;
        case 'game': user.stats.totalGames += count; break;
    }

    // --- Handle Login Separately for LastLogin Tracking ---
    if (actionType === 'login') {
        if (user.lastLogin === today) {
            const { password, ...userWithoutPassword } = user;
            return { updatedUser: userWithoutPassword, completedChallenge: null, newBadges: [] };
        }
        user.lastLogin = today;
    }
    
    // --- Challenge Progress Logic ---
    const relevantChallenges = challenges.filter(c => c.type === actionType);

    for (const challenge of relevantChallenges) {
        if (challenge.repeatable === 'daily') {
            if (!user.dailyChallengeData.completedToday.includes(challenge.id)) {
                const currentProgress = user.dailyChallengeData.progress[challenge.id] || 0;
                const newProgress = currentProgress + count;
                user.dailyChallengeData.progress[challenge.id] = newProgress;

                if (newProgress >= challenge.goal) {
                    user.dailyChallengeData.completedToday.push(challenge.id);
                    user.ecoPoints += challenge.points;
                    completedChallenge = challenge;
                    user.stats.totalChallengesCompleted++;
                }
            }
        } else if (challenge.repeatable === 'weekly') {
            if (!user.weeklyChallengeData.completedThisWeek.includes(challenge.id)) {
                const currentProgress = user.weeklyChallengeData.progress[challenge.id] || 0;
                const newProgress = currentProgress + count;
                user.weeklyChallengeData.progress[challenge.id] = newProgress;

                if (newProgress >= challenge.goal) {
                    user.weeklyChallengeData.completedThisWeek.push(challenge.id);
                    user.ecoPoints += challenge.points;
                    completedChallenge = challenge;
                    user.stats.totalChallengesCompleted++;
                }
            }
        } else {
            // Handle One-Time Challenge
            if (!user.completedChallenges.includes(challenge.id)) {
                const currentProgress = user.challengeProgress[challenge.id] || 0;
                const newProgress = currentProgress + count;
                user.challengeProgress[challenge.id] = newProgress;

                if (newProgress >= challenge.goal) {
                    user.completedChallenges.push(challenge.id);
                    user.ecoPoints += challenge.points;
                    completedChallenge = challenge;
                    user.stats.totalChallengesCompleted++;
                }
            }
        }
    }

    // --- Check for Badges ---
    const { updatedUser: userWithBadges, newBadges } = checkAndAwardBadges(user);
    user = userWithBadges;

    // --- Save and Return ---
    users[userIndex] = user;
    saveUsersToStorage(users);
    
    const { password, ...userWithoutPassword } = user;
    return { updatedUser: userWithoutPassword, completedChallenge, newBadges };
};

export const decrementUserStat = (userId: string, stat: keyof User['stats']): User | null => {
    const users = getUsersFromStorage();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) return null;

    let user = users[userIndex];
    if (user.stats && user.stats[stat] > 0) {
        user.stats[stat]--;
    }
    
    users[userIndex] = user;
    saveUsersToStorage(users);
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};