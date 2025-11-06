import { useContext } from 'react';
import GloBiAppContext from './GloBiAppContext';

function useGloBiAppContext() {
	const context = useContext(GloBiAppContext);

	if (!context) {
		throw new Error('useGloBiAppContext must be used within GloBiAppContextProvider');
	}

	return context;
}

export default useGloBiAppContext;