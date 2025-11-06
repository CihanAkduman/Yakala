import { Dictionary } from '@fullcalendar/core/internal';

export type EventType = 'event' | 'work' | 'expense';
export type WorkType = 'shift' | 'off' | 'sick';
export type ExpenseStatus = 'pending' | 'approved' | 'rejected';

export type CalendarEventExtendedProps = {
	desc?: string;
	label?: string;
	type?: EventType;
	
	// Çalışma saati için
	workType?: WorkType;
	shiftId?: string;
	
	// Yol parası için
	expenseStatus?: ExpenseStatus;
	expenseNote?: string;
	expenseStartTime?: string;
	expenseEndTime?: string;
};

export type CalendarEvent = {
	id?: string;
	title?: string;
	allDay?: boolean;
	start?: string;
	end?: string;
	extendedProps?: CalendarEventExtendedProps;
};

export type CalendarLabel = {
	id: string;
	title: string;
	color: string;
};

export type CalendarShift = {
	id: string;
	title: string;
	startTime: string;
	endTime: string;
	color: string;
};