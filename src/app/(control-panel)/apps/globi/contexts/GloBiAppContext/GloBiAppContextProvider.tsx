import { useMemo, useState } from 'react';
import GloBiAppContext from './GloBiAppContext';
import { ChatConversation } from '../../api/types/globi-types';

export function GloBiAppContextProvider({ children }: { children: React.ReactNode }) {
	const [apiKey, setApiKey] = useState('');
	const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
	const [configDialogOpen, setConfigDialogOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const contextValue = useMemo(
		() => ({
			apiKey,
			setApiKey,
			configDialogOpen,
			setConfigDialogOpen,
			selectedConversation,
			setSelectedConversation,
			loading,
			setLoading
		}),
		[apiKey, configDialogOpen, selectedConversation, loading]
	);

	return <GloBiAppContext.Provider value={contextValue}>{children}</GloBiAppContext.Provider>;
}