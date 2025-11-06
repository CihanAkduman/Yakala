// GloBi Chat System Types

export type MessageRole = 'user' | 'assistant';

export type ChatMessage = {
	id: string;
	role: MessageRole;
	content: string;
	timestamp: number;
};

export type ChatConversation = {
	id: string;
	title: string;
	messages: ChatMessage[];
	createdAt: number;
	updatedAt: number;
	favorite?: boolean;
};

export type GloBiSettings = {
	apiKey?: string;
	language?: string;
	model?: string;
};