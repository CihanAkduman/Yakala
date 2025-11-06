import _ from 'lodash';
import { DeepPartial } from 'react-hook-form';
import { formatISO } from 'date-fns/formatISO';
import { CalendarEvent } from '../types';

/**
 * Etkinlik modeli.
 */
const EventModel = (data?: DeepPartial<CalendarEvent>): CalendarEvent =>
	_.defaults(data || {}, {
		id: _.uniqueId(),
		title: '',
		allDay: true,
		start: formatISO(new Date()),
		end: formatISO(new Date()),
		extendedProps: { 
			desc: '', 
			label: '',
			type: 'event' as const
		}
	});

export default EventModel;