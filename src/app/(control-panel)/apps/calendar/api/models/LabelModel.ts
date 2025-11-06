import _ from 'lodash';
import { PartialDeep } from 'type-fest';
import { CalendarLabel } from '../types';

/**
 * Etiket modeli.
 */
function LabelModel(data?: PartialDeep<CalendarLabel>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		title: '',
		color: '#e75931'
	});
}

export default LabelModel;