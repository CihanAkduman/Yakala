import _ from 'lodash';
import { PartialDeep } from 'type-fest';
import { NotesNote } from '../types';

/**
 * Not modeli.
 */
function NoteModel(data: PartialDeep<NotesNote>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		title: '',
		content: '',
		tasks: [],
		image: '',
		reminder: null,
		labels: [],
		archived: false,
		createdAt: '',
		updatedAt: ''
	});
}

export default NoteModel;