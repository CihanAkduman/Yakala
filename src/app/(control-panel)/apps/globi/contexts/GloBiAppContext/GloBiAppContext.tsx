import { createContext } from 'react';
import { ChatConversation } from '../../api/types/globi-types';

export type GloBiAppContextType = {
	apiKey: string;
	setApiKey: (key: string) => void;
	configDialogOpen: boolean;
	setConfigDialogOpen: (open: boolean) => void;
	selectedConversation: ChatConversation | null;
	setSelectedConversation: (conversation: ChatConversation | null) => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
};

const GloBiAppContext = createContext<GloBiAppContextType | undefined>(undefined);

export default GloBiAppContext;