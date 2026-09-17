import { QuizQuestion } from '../types';

const quizzes: { [key: string]: QuizQuestion[] } = {
  recycling: [
    {
        question: "How long does it take for a plastic bottle to decompose?",
        options: ["20 years", "100 years", "450 years", "1000 years"],
        correctAnswer: "450 years",
        explanation: "Plastic bottles can take up to 450 years to break down in a landfill."
    },
    {
        question: "Which of these items is NOT typically compostable in a home bin?",
        options: ["Egg shells", "Coffee grounds", "Meat scraps", "Fruit peels"],
        correctAnswer: "Meat scraps",
        explanation: "Meat and dairy products can attract pests and create odors in a typical home compost bin."
    },
    {
        question: "What does the term 'e-waste' refer to?",
        options: ["Ecological waste", "Expired food", "Electronic waste", "Extra packaging"],
        correctAnswer: "Electronic waste",
        explanation: "E-waste includes discarded electronic devices like phones, computers, and TVs, which often contain hazardous materials."
    },
    {
        question: "Recycling one aluminum can saves enough energy to power a TV for how long?",
        options: ["30 minutes", "1 hour", "3 hours", "5 hours"],
        correctAnswer: "3 hours",
        explanation: "The energy saved by recycling one aluminum can is enough to run a TV for 3 hours."
    },
    {
        question: "What do the numbers inside the recycling symbol on plastics indicate?",
        options: ["How many times it's been recycled", "The type of plastic resin", "The quality of the plastic", "Its decomposition time"],
        correctAnswer: "The type of plastic resin",
        explanation: "The numbers 1-7 identify the type of plastic, which helps sorting facilities process them correctly."
    }
  ],
  climate: [
    {
        question: "Which gas is most responsible for the greenhouse effect?",
        options: ["Oxygen", "Methane", "Carbon Dioxide", "Nitrogen"],
        correctAnswer: "Carbon Dioxide",
        explanation: "While other gases contribute, Carbon Dioxide (CO2) is the primary driver of the greenhouse effect due to its abundance and longevity in the atmosphere."
    },
    {
        question: "What is the main cause of rising sea levels?",
        options: ["Melting sea ice", "More rainfall", "Thermal expansion of water", "Melting glaciers and ice sheets"],
        correctAnswer: "Melting glaciers and ice sheets",
        explanation: "While thermal expansion contributes, the largest factor is the melting of land-based ice, which adds new water to the oceans."
    },
    {
        question: "Which of these is a renewable energy source?",
        options: ["Natural Gas", "Coal", "Solar Power", "Uranium"],
        correctAnswer: "Solar Power",
        explanation: "Solar power is considered renewable because it harnesses energy from the sun, which is a virtually inexhaustible source."
    },
    {
        question: "What is 'carbon sequestration'?",
        options: ["The process of burning fossil fuels", "The capture and storage of carbon dioxide", "A type of renewable energy", "The measurement of a carbon footprint"],
        correctAnswer: "The capture and storage of carbon dioxide",
        explanation: "Carbon sequestration is the process of capturing and storing atmospheric carbon dioxide to mitigate climate change. Forests are a natural example."
    }
  ],
  general: [
    {
        question: "What is a 'carbon footprint'?",
        options: ["A fossil of an ancient plant", "The amount of carbon an item is made of", "The total greenhouse gases emitted by a person or organization", "A type of renewable fuel"],
        correctAnswer: "The total greenhouse gases emitted by a person or organization",
        explanation: "A carbon footprint is a measure of the impact human activities have on the environment in terms of the amount of greenhouse gases produced."
    },
    {
        question: "What does 'biodegradable' mean?",
        options: ["It can be recycled", "It's made from plants", "It can be broken down naturally by microorganisms", "It contains no plastic"],
        correctAnswer: "It can be broken down naturally by microorganisms",
        explanation: "Biodegradable materials can decompose into natural elements, though the time it takes can vary greatly."
    },
    {
        question: "What is the primary benefit of using a reusable water bottle?",
        options: ["It keeps water colder", "It reduces single-use plastic waste", "It filters the water", "It's more stylish"],
        correctAnswer: "It reduces single-use plastic waste",
        explanation: "Using a reusable bottle significantly cuts down on the production and disposal of single-use plastic bottles, a major source of pollution."
    }
  ]
};

quizzes.combined = [...quizzes.recycling, ...quizzes.climate];

export const getQuiz = (category: string): QuizQuestion[] => {
    return quizzes[category] || quizzes.general;
};

export const getQuizCategories = (): string[] => Object.keys(quizzes);
