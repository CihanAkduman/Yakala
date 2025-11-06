import { redirect } from 'next/navigation';

function ScrumboardApp() {
	redirect(`/apps/loop/boards`);
	return null;
}

export default ScrumboardApp;
