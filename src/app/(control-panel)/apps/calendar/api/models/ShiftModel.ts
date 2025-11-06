import _ from 'lodash';
import { PartialDeep } from 'type-fest';
import { CalendarShift } from '../types';

/**
 * Vardiya modeli
 */
function ShiftModel(data?: PartialDeep<CalendarShift>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		title: '',
		startTime: '09:00',
		endTime: '18:00',
		color: '#2196f3'
	});
}

export default ShiftModel;