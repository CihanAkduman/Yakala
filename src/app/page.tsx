import { redirect } from 'next/navigation';

function MainPage() {
	redirect(`/dashboards/perfie`);
	return null;
}

export default MainPage;
