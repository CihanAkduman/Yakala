import mockApi from 'src/@mock-utils/mockApi';
import { CalendarShift } from '@/app/(control-panel)/apps/calendar/api/types';

/**
 * PUT api/mock/calendar/shifts/{id}
 */
export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const api = mockApi('calendar_shifts');
	const data = (await req.json()) as CalendarShift;
	const updatedItem = await api.update<CalendarShift>(id, data);

	if (!updatedItem) {
		return new Response(JSON.stringify({ message: 'Öğe bulunamadı' }), { status: 404 });
	}

	return new Response(JSON.stringify(updatedItem), { status: 200 });
}

/**
 * DELETE api/mock/calendar/shifts/{id}
 */
export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const api = mockApi('calendar_shifts');

	const result = await api.delete([id]);

	if (!result.success) {
		return new Response(JSON.stringify({ message: 'Öğe bulunamadı' }), { status: 404 });
	}

	return new Response(JSON.stringify({ message: 'Başarıyla silindi' }), { status: 200 });
}