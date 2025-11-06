import { useContext } from 'react';
import { NotesAppContext } from './NotesAppContext';

export function useNotesAppContext() {
	const context = useContext(NotesAppContext);

	if (context === undefined) {
		throw new Error('useNotes bir NotesProvider içinde kullanılmalıdır');
	}

	return context;
}