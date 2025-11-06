import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import clsx from 'clsx';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useEffect } from 'react';
import { useDebounce } from '@fuse/hooks';
import _ from 'lodash';
import FormLabel from '@mui/material/FormLabel';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalendarShift } from '../../../api/types';
import { useDeleteShift } from '../../../api/hooks/shifts/useDeleteShift';
import { useUpdateShift } from '../../../api/hooks/shifts/useUpdateShift';
import { useFuseDialogContext } from '@fuse/core/FuseDialog/contexts/FuseDialogContext/useFuseDialogContext';

/**
 * Form Doğrulama Şeması
 */
const schema = z.object({
	id: z.string().optional(),
	title: z.string().nonempty('Vardiya adı girmelisiniz'),
	startTime: z.string().nonempty('Başlangıç saati girmelisiniz'),
	endTime: z.string().nonempty('Bitiş saati girmelisiniz'),
	color: z.string().optional()
});

type FormType = z.infer<typeof schema>;

type ShiftItemFormProps = {
	shift: CalendarShift;
	isLast: boolean;
};

/**
 * Vardiya düzenleme formu.
 */
function ShiftItemForm(props: ShiftItemFormProps) {
	const { shift, isLast } = props;
	const { openDialog } = useFuseDialogContext();
	const { mutate: deleteShift } = useDeleteShift();
	const { mutate: updateShift } = useUpdateShift();

	const { control, formState, reset, watch } = useForm<FormType>({
		mode: 'onChange',
		defaultValues: shift,
		resolver: zodResolver(schema)
	});

	const { errors } = formState;
	const form = watch();

	useEffect(() => {
		reset(shift);
	}, [shift, reset]);

	const debouncedUpdateShift = useDebounce((_form: FormType) => {
		if (!_.isEqual(_form, shift)) {
			const { title, startTime, endTime, color } = _form;
			updateShift({ id: shift.id, title, startTime, endTime, color });
		}
	}, 300);

	useEffect(() => {
		debouncedUpdateShift(form);
	}, [debouncedUpdateShift, form]);

	function handleOnRemove() {
		openDialog({
			id: 'confirm-delete-shift',
			content: ({ handleClose }) => (
				<>
					<DialogTitle id="alert-dialog-title">Emin misiniz?</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Bu vardiya ile ilişkili tüm etkinlikler kaldırılacaktır.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handleClose}
							color="primary"
						>
							İptal
						</Button>
						<Button
							onClick={async () => {
								await deleteShift(shift.id);
								handleClose();
							}}
							color="primary"
							autoFocus
						>
							Sil
						</Button>
					</DialogActions>
				</>
			)
		});
	}

	return (
		<>
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
							placeholder="Vardiya adı"
							variant="outlined"
							slotProps={{
								input: {
									startAdornment: (
										<Controller
											name="color"
											control={control}
											render={({ field: { onChange: _onChange, value: _value } }) => (
												<FormLabel
													className="flex items-center"
													sx={{ color: _value }}
												>
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
									endAdornment: !isLast && (
										<IconButton
											onClick={handleOnRemove}
											className="p-0"
											aria-label="Sil"
											size="small"
										>
											<FuseSvgIcon color="action">lucide:trash</FuseSvgIcon>
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
		</>
	);
}

export default ShiftItemForm;