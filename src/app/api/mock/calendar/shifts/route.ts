 import mockApi from 'src/@mock-utils/mockApi';
import { CalendarShift } from '@/app/(control-panel)/apps/calendar/api/types';

/**
 * GET api/mock/calendar/shifts
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('calendar_shifts');
	const items = await api.findAll<CalendarShift>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}

/**
 * POST api/mock/calendar/shifts
 */
export async function POST(req: Request) {
	const api = mockApi('calendar_shifts');
	const requestData = (await req.json()) as CalendarShift;
	const newItem = await api.create<CalendarShift>(requestData);

	return new Response(JSON.stringify(newItem), { status: 201 });
}