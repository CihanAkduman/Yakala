import { ChatConversation, ChatMessage } from '../types/globi-types';
import mockConversations from '../lib/constants/mockConversations';

// Simulate API with localStorage
const STORAGE_KEY = 'globi_conversations';

const getStoredConversations = (): ChatConversation[] => {
	if (typeof window === 'undefined') return mockConversations;
	
	const stored = localStorage.getItem(STORAGE_KEY);
	
	// Wenn nichts gespeichert ist, initialisiere mit Mock-Daten
	if (!stored) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(mockConversations));
		return mockConversations;
	}
	
	return JSON.parse(stored);
};

const setStoredConversations = (conversations: ChatConversation[]) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
	}
};

export const globiApiService = {
	// Conversations
	getConversations: async (): Promise<ChatConversation[]> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(getStoredConversations());
			}, 100);
		});
	},

	getConversation: async (id: string): Promise<ChatConversation> => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const conversations = getStoredConversations();
				const conversation = conversations.find((c) => c.id === id);
				if (conversation) {
					resolve(conversation);
				} else {
					reject(new Error('Conversation not found'));
				}
			}, 100);
		});
	},

	createConversation: async (conversation: ChatConversation): Promise<ChatConversation> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const conversations = getStoredConversations();
				const newConversation = {
					...conversation,
					id: conversation.id || `conv-${Date.now()}`,
					createdAt: conversation.createdAt || Date.now(),
					updatedAt: conversation.updatedAt || Date.now()
				};
				const updated = [newConversation, ...conversations];
				setStoredConversations(updated);
				resolve(newConversation);
			}, 100);
		});
	},

	updateConversation: async (conversation: ChatConversation): Promise<ChatConversation> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const conversations = getStoredConversations();
				const updated = conversations.map((c) =>
					c.id === conversation.id ? { ...conversation, updatedAt: Date.now() } : c
				);
				setStoredConversations(updated);
				resolve({ ...conversation, updatedAt: Date.now() });
			}, 100);
		});
	},

	deleteConversation: async (id: string): Promise<void> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const conversations = getStoredConversations();
				const updated = conversations.filter((c) => c.id !== id);
				setStoredConversations(updated);
				resolve();
			}, 100);
		});
	},

	// Send message - for future real AI integration
	sendMessage: async (conversationId: string, message: string, apiKey?: string): Promise<ChatMessage> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const response: ChatMessage = {
					id: `msg-${Date.now()}`,
					role: 'assistant',
					content: 'Mock response - integrate real AI here',
					timestamp: Date.now()
				};
				resolve(response);
			}, 1000);
		});
	}
};