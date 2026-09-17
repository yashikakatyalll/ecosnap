
import { GoogleGenAI, Type, Chat } from "@google/genai";
import { AnalysisResult, DisposalCategory, Geolocation } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error("VITE_GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        isDisposable: {
            type: Type.BOOLEAN,
            description: "Is the item in the image a piece of waste or a disposable item? Exclude living things like people or animals."
        },
        itemName: {
            type: Type.STRING,
            description: "A short, clear name for the identified item (e.g., 'Plastic Water Bottle', 'Apple Core', 'Person')."
        },
        category: {
            type: Type.STRING,
            enum: Object.values(DisposalCategory),
            description: "The disposal category of the item."
        },
        reasoning: {
            type: Type.STRING,
            description: "If not disposable, briefly explain why (e.g., 'The image contains a person'). Otherwise, a brief justification for the category."
        },
        disposalInstructions: {
            type: Type.ARRAY,
            description: "Step-by-step instructions for preparing the item for disposal.",
            items: {
                type: Type.OBJECT,
                properties: {
                    step: { type: Type.INTEGER },
                    description: { type: Type.STRING }
                },
                required: ["step", "description"]
            }
        },
        binType: {
            type: Type.STRING,
            description: "The specific bin the item should go into (e.g., 'Blue Recycling Bin', 'Green Compost Bin', 'Black Landfill Bin')."
        },
        pickupSchedule: {
            type: Type.STRING,
            description: "Information about the local pickup schedule for this type of waste (e.g., 'Every Tuesday morning')."
        },
        notes: {
            type: Type.STRING,
            description: "Any extra important notes, like drop-off locations for hazardous waste or donation centers."
        }
    },
    required: ["isDisposable", "itemName", "category", "disposalInstructions", "binType"]
};


export const analyzeImageForDisposal = async (
    base64ImageData: string,
    location: Geolocation | null
): Promise<AnalysisResult> => {
    try {
        const locationPrompt = location 
            ? `The user is at latitude ${location.latitude} and longitude ${location.longitude}. Rules should be specific to this area.`
            : 'The user has not provided a location. Provide general disposal instructions.';

        const prompt = `
            You are EcoSnap, an expert in waste management and recycling. Your task is to analyze the provided image and give precise, location-based disposal instructions.

            1.  **Identify the main object** in the image.
            2.  **Determine if it's a disposable item.** If it's a person, animal, or non-waste item, mark 'isDisposable' as false and provide a reason.
            3.  **If it is disposable, classify it** into one of these categories: ${Object.values(DisposalCategory).join(', ')}.
            4.  **Provide detailed, actionable instructions** for disposal, considering the user's location. ${locationPrompt}
            5.  **Follow the JSON schema exactly.** Be helpful, clear, and eco-conscious in your responses.
        `;

        const imagePart = {
            inlineData: {
                mimeType: 'image/jpeg',
                data: base64ImageData,
            },
        };

        const textPart = {
            text: prompt
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResult = JSON.parse(jsonText) as AnalysisResult;
        
        const categoryValue = parsedResult.category as string;
        if (!Object.values(DisposalCategory).includes(categoryValue as DisposalCategory)) {
            parsedResult.category = DisposalCategory.UNKNOWN;
        }

        return parsedResult;

    } catch (error) {
        console.error("Error analyzing image with Gemini:", error);
        return {
            isDisposable: false,
            itemName: 'Error',
            category: DisposalCategory.UNKNOWN,
            reasoning: 'An error occurred while analyzing the image. Please try again.',
            disposalInstructions: [],
            binType: 'N/A',
        };
    }
};

export const findDisposalLocations = async (
    query: string,
    location: Geolocation | null
): Promise<{ text: string; locations: any[] }> => {
    try {
        const fullQuery = `Find locations for: "${query}". Provide a friendly response summarizing what you found.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: fullQuery,
            config: {
                tools: [{ googleMaps: {} }],
                toolConfig: location ? {
                    retrievalConfig: {
                        latLng: {
                            latitude: location.latitude,
                            longitude: location.longitude
                        }
                    }
                } : undefined,
            },
        });

        const locations = response.candidates?.[0]?.groundingMetadata?.groundingChunks
            ?.filter(c => c.maps)
            .map(c => c.maps) ?? [];

        return {
            text: response.text,
            locations: locations
        };

    } catch (error) {
        console.error("Error finding locations with Gemini:", error);
        return {
            text: "Sorry, I couldn't find any locations right now. Please check your query and try again.",
            locations: []
        };
    }
};


let chat: Chat | null = null;

export const startChat = () => {
    if (!chat) {
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: 'You are Eco Assistant, a friendly and knowledgeable guide to sustainability. Your goal is to provide clear, accurate, and actionable advice. Structure your answers for easy readability on a mobile screen. Use markdown formatting, such as bold text for key terms, bullet points for lists, and numbered lists for steps. Be encouraging and helpful. Keep responses concise but comprehensive.',
            },
        });
    }
};

export const sendMessageToChatStream = async (message: string) => {
    if (!chat) {
        startChat();
    }
    return chat!.sendMessageStream({ message });
};
