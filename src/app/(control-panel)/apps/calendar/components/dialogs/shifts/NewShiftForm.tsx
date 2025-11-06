import { Controller, useForm } from 'react-hook-form';
import _ from 'lodash';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import clsx from 'clsx';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import { PartialDeep } from 'type-fest';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ShiftModel from '../../../api/models/ShiftModel';
import { CalendarShift } from '../../../api/types';
import { useCreateShift } from '../../../api/hooks/shifts/useCreateShift';

const defaultValues = ShiftModel();

/**
 * Form Doğrulama Şeması
 */
const schema = z.object({
	title: z.string().nonempty('Vardiya adı girmelisiniz'),
	startTime: z.string().nonempty('Başlangıç saati girmelisiniz'),
	endTime: z.string().nonempty('Bitiş saati girmelisiniz'),
	color: z.string().optional()
});

/**
 * Yeni vardiya formu.
 */
function NewShiftForm() {
	const { mutate: createShift } = useCreateShift();

	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	function onSubmit(data: PartialDeep<CalendarShift>) {
		const newShift = ShiftModel(data);

		createShift(newShift);

		reset(defaultValues);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<ListItem
				className="mb-2 p-0"
				dense
			>
				<Controller
					name="title"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className={clsx('flex flex-1')}
							error={!!errors.title}
							helperText={errors?.title?.message}
							placeholder="Yeni vardiya oluştur"
							variant="outlined"
							slotProps={{
								input: {
									startAdornment: (
										<Controller
											name="color"
											control={control}
											render={({ field: { onChange: _onChange, value: _value } }) => (
												<FormLabel className="flex items-center">
													<FuseSvgIcon>lucide:clock</FuseSvgIcon>
													<Input
														value={_value}
														onChange={(ev) => {
															_onChange(ev.target.value);
														}}
														type="color"
														className="opacity-0"
													/>
												</FormLabel>
											)}
										/>
									),
									endAdornment: (
										<IconButton
											className="p-0"
											aria-label="Ekle"
											disabled={_.isEmpty(dirtyFields) || !isValid}
											type="submit"
											size="small"
										>
											<FuseSvgIcon color="action">lucide:check</FuseSvgIcon>
										</IconButton>
									)
								}
							}}
						/>
					)}
				/>
			</ListItem>
			<div className="flex gap-2 mb-2">
				<Controller
					name="startTime"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Başlangıç"
							type="time"
							size="small"
							error={!!errors.startTime}
							helperText={errors?.startTime?.message}
							className="flex-1"
						/>
					)}
				/>
				<Controller
					name="endTime"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Bitiş"
							type="time"
							size="small"
							error={!!errors.endTime}
							helperText={errors?.endTime?.message}
							className="flex-1"
						/>
					)}
				/>
			</div>
		</form>
	);
}

export default NewShiftForm;