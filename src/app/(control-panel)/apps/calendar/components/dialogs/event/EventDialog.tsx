import { Controller, useForm } from 'react-hook-form';
import FuseUtils from '@fuse/utils/FuseUtils';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { FormLabel, FormControl, Popover, Tabs, Tab, Box, Radio, RadioGroup, Select, MenuItem } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import EventLabelSelect, { EventLabelSelectProps } from '../../../components/ui/EventLabelSelect';
import EventModel from '../../../api/models/EventModel';
import { useCreateEvent } from '../../../api/hooks/events/useCreateEvent';
import { useDeleteEvent } from '../../../api/hooks/events/useDeleteEvent';
import { useUpdateEvent } from '../../../api/hooks/events/useUpdateEvent';
import { useLabels } from '../../../api/hooks/labels/useLabels';
import { useShifts } from '../../../api/hooks/shifts/useShifts';
import { useCalendarAppContext } from '../../../contexts/CalendarAppContext/useCalendarAppContext';
import { EventType, WorkType, ExpenseStatus } from '../../../api/types';

const defaultValues = EventModel();

/**
 * Form Doğrulama Şeması
 */
const schema = z.object({
	id: z.string().nonempty('ID girmelisiniz'),
	title: z.string().nonempty('Başlık girmelisiniz'),
	start: z.string().nonempty('Başlangıç tarihi girmelisiniz'),
	end: z.string().optional(),
	allDay: z.boolean().optional(),
	extendedProps: z
		.object({
			desc: z.string().optional(),
			label: z.string().optional(),
			type: z.enum(['event', 'work', 'expense']).optional(),
			workType: z.enum(['shift', 'off', 'sick']).optional(),
			shiftId: z.string().optional(),
			expenseStatus: z.enum(['pending', 'approved', 'rejected']).optional(),
			expenseNote: z.string().optional(),
			expenseStartTime: z.string().optional(),
			expenseEndTime: z.string().optional()
		})
		.optional()
});

type FormType = z.infer<typeof schema>;

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`event-tabpanel-${index}`}
			aria-labelledby={`event-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
		</div>
	);
}

/**
 * Etkinlik dialogu.
 */
function EventDialog() {
	const { eventDialog, closeEditEventDialog, closeNewEventDialog } = useCalendarAppContext();
	const { data: labels } = useLabels();
	const { data: shifts } = useShifts();
	const firstLabelId = labels ? labels[0]?.id : null;
	const { mutate: createEvent } = useCreateEvent();
	const { mutate: updateEvent } = useUpdateEvent();
	const { mutate: deleteEvent } = useDeleteEvent();
	const [tabValue, setTabValue] = useState(0);

	const { reset, formState, watch, control, getValues, setValue } = useForm<FormType>({
		defaultValues,
		mode: 'onChange',
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	const start = watch('start');
	const end = watch('end');
	const id = watch('id');
	const eventType = watch('extendedProps.type');
	const workType = watch('extendedProps.workType');

	/**
	 * Initialize Dialog with Data
	 */
	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (eventDialog.type === 'edit' && eventDialog.data) {
			reset({ ...eventDialog.data });
			// Tab'ı event type'a göre ayarla
			const type = eventDialog.data.extendedProps?.type || 'event';
			setTabValue(type === 'event' ? 0 : type === 'work' ? 1 : 2);
		}

		/**
		 * Dialog type: 'new'
		 */
		if (eventDialog.type === 'new') {
			reset({
				...defaultValues,
				...eventDialog.data,
				extendedProps: {
					...defaultValues.extendedProps,
					label: firstLabelId,
					type: 'event'
				},
				id: FuseUtils.generateGUID()
			});
			setTabValue(0);
		}
		// eslint-disable-next-line
	}, [eventDialog.data, eventDialog.type, reset]);

	/**
	 * On Dialog Open
	 */
	useEffect(() => {
		if (eventDialog.props.open) {
			initDialog();
		}
	}, [eventDialog.props.open, initDialog]);

	/**
	 * Close Dialog
	 */
	function closeComposeDialog() {
		return eventDialog.type === 'edit' ? closeEditEventDialog() : closeNewEventDialog();
	}

	/**
	 * Form Submit
	 */
	function onSubmit(ev: MouseEvent<HTMLButtonElement>) {
		ev.preventDefault();
		const data = getValues();

		console.log('🔵 onSubmit called', { type: eventDialog.type, data });

		if (eventDialog.type === 'new') {
			console.log('🔵 Creating new event', data);
			createEvent(data);
		} else {
			// Ensure eventDialog.data exists for update
			if (eventDialog?.data) {
				console.log('🔵 Updating event', data);
				updateEvent({ ...eventDialog.data, ...data });
			} else {
				console.error('Attempted to update event without existing data');
			}
		}

		closeComposeDialog();
	}

	/**
	 * Remove Event
	 */
	function handleRemove() {
		deleteEvent(id);
		closeComposeDialog();
	}

	/**
	 * Tab değişiminde event type'ı güncelle
	 */
	function handleTabChange(event: React.SyntheticEvent, newValue: number) {
		setTabValue(newValue);
		const typeMap: EventType[] = ['event', 'work', 'expense'];
		setValue('extendedProps.type', typeMap[newValue], { shouldDirty: true });
		
		// Tab değiştiğinde title'ı otomatik ayarla
		if (newValue === 1) {
			setValue('title', 'Çalışma Kaydı', { shouldDirty: true });
		} else if (newValue === 2) {
			setValue('title', 'Yol Parası Talebi', { shouldDirty: true });
			setValue('extendedProps.expenseStatus', 'pending', { shouldDirty: true });
		}
	}

	return (
		<Popover
			{...eventDialog.props}
			open={eventDialog.props.open}
			anchorReference="anchorPosition"
			anchorOrigin={{
				vertical: 'center',
				horizontal: 'right'
			}}
			transformOrigin={{
				vertical: 'center',
				horizontal: 'left'
			}}
			onClose={closeComposeDialog}
			component="form"
			slotProps={{
				paper: {
					sx: { zIndex: 9999 }
				}
			}}
			sx={{ zIndex: 9999 }}
		>
			<div className="flex w-120 max-w-full flex-col gap-4 p-6 pt-8 sm:p-8 sm:pt-10">
				<Tabs value={tabValue} onChange={handleTabChange} aria-label="event type tabs">
					<Tab label="Etkinlik" />
					<Tab label="Çalışma Saati" />
					<Tab label="Yol Parası" />
				</Tabs>

				{/* Tab 1: Etkinlik */}
				<TabPanel value={tabValue} index={0}>
					<div className="flex flex-col gap-4">
						<Controller
							name="title"
							control={control}
							render={({ field }) => (
								<FormControl className="w-full">
									<FormLabel htmlFor="title">Başlık</FormLabel>
									<TextField
										{...field}
										id="title"
										error={!!errors.title}
										helperText={errors?.title?.message}
										autoFocus
										required
										fullWidth
										slotProps={{
											input: {
												startAdornment: <FuseSvgIcon color="action">lucide:square-pen</FuseSvgIcon>
											}
										}}
									/>
								</FormControl>
							)}
						/>

						<div className="flex gap-2">
							<div className="flex-column flex w-full min-w-0 flex-auto items-center gap-3 sm:flex-row">
								<Controller
									name="start"
									control={control}
									render={({ field: { onChange, value } }) => (
										<FormControl className="w-full">
											<FormLabel htmlFor="start">Başlangıç</FormLabel>
											<DateTimePicker
												className="flex min-w-0 flex-auto"
												value={new Date(value)}
												onChange={(val) => {
													onChange(val.toISOString());
												}}
												format="dd/MM/yyyy HH:mm"
												ampm={false}
												slotProps={{
													textField: {
														variant: 'outlined',
														size: 'small'
													},
													popper: {
														sx: { zIndex: 10000 }
													},
													desktopPaper: {
														sx: { zIndex: 10000 }
													}
												}}
												maxDate={new Date(end)}
											/>
										</FormControl>
									)}
								/>

								<Controller
									name="end"
									control={control}
									render={({ field: { onChange, value } }) => (
										<FormControl className="w-full">
											<FormLabel htmlFor="end">Bitiş</FormLabel>
											<DateTimePicker
												className="flex min-w-0 flex-auto"
												value={new Date(value)}
												onChange={(val) => {
													onChange(val.toISOString());
												}}
												format="dd/MM/yyyy HH:mm"
												ampm={false}
												slotProps={{
													textField: {
														variant: 'outlined',
														size: 'small'
													},
													popper: {
														sx: { zIndex: 10000 }
													},
													desktopPaper: {
														sx: { zIndex: 10000 }
													}
												}}
												minDate={new Date(start)}
											/>
										</FormControl>
									)}
								/>

								<Controller
									name="allDay"
									control={control}
									render={({ field: { onChange, value } }) => (
										<FormControlLabel
											className="m-0 flex min-w-0 flex-auto flex-shrink-0 whitespace-nowrap"
											label="Tüm Gün"
											labelPlacement="top"
											control={
												<Switch
													onChange={(ev) => {
														onChange(ev.target.checked);
													}}
													checked={value}
													name="allDay"
												/>
											}
										/>
									)}
								/>
							</div>
						</div>

						<Controller
							name="extendedProps.label"
							control={control}
							render={({ field }) => <EventLabelSelect {...(field as unknown as EventLabelSelectProps)} />}
						/>

						<Controller
							name="extendedProps.desc"
							control={control}
							render={({ field }) => (
								<FormControl className="w-full">
									<FormLabel htmlFor="desc">Açıklama</FormLabel>
									<TextField
										{...field}
										id="desc"
										type="text"
										multiline
										rows={5}
										variant="outlined"
										fullWidth
										slotProps={{
											input: {
												className: 'items-start',
												startAdornment: (
													<FuseSvgIcon
														className="mt-1"
														color="action"
													>
														lucide:align-left
													</FuseSvgIcon>
												)
											}
										}}
									/>
								</FormControl>
							)}
						/>
					</div>
				</TabPanel>

				{/* Tab 2: Çalışma Saati */}
				<TabPanel value={tabValue} index={1}>
					<div className="flex flex-col gap-4">
						<div className="flex gap-2">
							<Controller
								name="start"
								control={control}
								render={({ field: { onChange, value } }) => (
									<FormControl className="w-full">
										<FormLabel htmlFor="work-date">Tarih</FormLabel>
										<DateTimePicker
											className="flex min-w-0 flex-auto"
											value={new Date(value)}
											onChange={(val) => {
												onChange(val.toISOString());
											}}
											format="dd/MM/yyyy HH:mm"
											ampm={false}
											slotProps={{
												textField: {
													variant: 'outlined',
													size: 'small'
												},
												popper: {
													sx: { zIndex: 10000 }
												}
											}}
										/>
									</FormControl>
								)}
							/>
						</div>

						<Controller
							name="extendedProps.workType"
							control={control}
							render={({ field }) => (
								<FormControl component="fieldset">
									<FormLabel component="legend">Çalışma Tipi</FormLabel>
									<RadioGroup {...field} row>
										<FormControlLabel value="shift" control={<Radio />} label="Vardiya" />
										<FormControlLabel value="off" control={<Radio />} label="İzin (OFF)" />
										<FormControlLabel value="sick" control={<Radio />} label="Raporlu" />
									</RadioGroup>
								</FormControl>
							)}
						/>

						{workType === 'shift' && (
							<Controller
								name="extendedProps.shiftId"
								control={control}
								render={({ field }) => (
									<FormControl fullWidth>
										<FormLabel htmlFor="shift-select">Vardiya</FormLabel>
										<Select {...field} id="shift-select" displayEmpty>
											<MenuItem value="">
												<em>Vardiya seçin</em>
											</MenuItem>
											{shifts?.map((shift) => (
												<MenuItem value={shift.id} key={shift.id}>
													{shift.title} ({shift.startTime} - {shift.endTime})
												</MenuItem>
											))}
										</Select>
									</FormControl>
								)}
							/>
						)}

						<Controller
							name="extendedProps.desc"
							control={control}
							render={({ field }) => (
								<FormControl className="w-full">
									<FormLabel htmlFor="work-desc">Not</FormLabel>
									<TextField
										{...field}
										id="work-desc"
										type="text"
										multiline
										rows={3}
										variant="outlined"
										fullWidth
									/>
								</FormControl>
							)}
						/>
					</div>
				</TabPanel>

				{/* Tab 3: Yol Parası */}
				<TabPanel value={tabValue} index={2}>
					<div className="flex flex-col gap-4">
						<div className="flex gap-2">
							<Controller
								name="start"
								control={control}
								render={({ field: { onChange, value } }) => (
									<FormControl className="w-full">
										<FormLabel htmlFor="expense-date">Tarih</FormLabel>
										<DateTimePicker
											className="flex min-w-0 flex-auto"
											value={new Date(value)}
											onChange={(val) => {
												onChange(val.toISOString());
											}}
											format="dd/MM/yyyy HH:mm"
											ampm={false}
											slotProps={{
												textField: {
													variant: 'outlined',
													size: 'small'
												},
												popper: {
													sx: { zIndex: 10000 }
												}
											}}
										/>
									</FormControl>
								)}
							/>
						</div>

						<div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
							<div className="flex items-center gap-2">
								<FuseSvgIcon color="primary">lucide:info</FuseSvgIcon>
								<div>
									<div className="font-semibold">Yol Parası Talebi</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">
										Bu talep yöneticinize gönderilecektir.
									</div>
								</div>
							</div>
						</div>

						<div className="flex gap-2">
							<Controller
								name="extendedProps.expenseStartTime"
								control={control}
								render={({ field }) => (
									<FormControl className="w-full">
										<FormLabel htmlFor="expense-start">Başlangıç Saati</FormLabel>
										<TextField
											{...field}
											id="expense-start"
											type="time"
											fullWidth
											slotProps={{
												inputLabel: {
													shrink: true
												}
											}}
										/>
									</FormControl>
								)}
							/>

							<Controller
								name="extendedProps.expenseEndTime"
								control={control}
								render={({ field }) => (
									<FormControl className="w-full">
										<FormLabel htmlFor="expense-end">Bitiş Saati</FormLabel>
										<TextField
											{...field}
											id="expense-end"
											type="time"
											fullWidth
											slotProps={{
												inputLabel: {
													shrink: true
												}
											}}
										/>
									</FormControl>
								)}
							/>
						</div>

						<Controller
							name="extendedProps.expenseNote"
							control={control}
							render={({ field }) => (
								<FormControl className="w-full">
									<FormLabel htmlFor="expense-note">Not</FormLabel>
									<TextField
										{...field}
										id="expense-note"
										type="text"
										multiline
										rows={3}
										variant="outlined"
										fullWidth
										placeholder="İsteğe bağlı açıklama ekleyin..."
									/>
								</FormControl>
							)}
						/>

						{eventDialog.type === 'edit' && (
							<Controller
								name="extendedProps.expenseStatus"
								control={control}
								render={({ field }) => (
									<FormControl fullWidth>
										<FormLabel htmlFor="expense-status">Durum</FormLabel>
										<Select {...field} id="expense-status" disabled>
											<MenuItem value="pending">Beklemede</MenuItem>
											<MenuItem value="approved">Onaylandı</MenuItem>
											<MenuItem value="rejected">Reddedildi</MenuItem>
										</Select>
									</FormControl>
								)}
							/>
						)}
					</div>
				</TabPanel>

				{/* Actions */}
				{eventDialog.type === 'new' ? (
					<div className="flex items-center gap-2">
						<div className="flex flex-1" />
						<Button
							variant="contained"
							color="primary"
							onClick={(ev) => {
								console.log('🟢 BUTON TIKLANDI!');
								onSubmit(ev);
							}}
						>
							Ekle
						</Button>
					</div>
				) : (
					<div className="flex items-center gap-2">
						<div className="flex flex-1" />
						<IconButton onClick={handleRemove}>
							<FuseSvgIcon>lucide:trash</FuseSvgIcon>
						</IconButton>
						<Button
							variant="contained"
							color="primary"
							onClick={(ev) => {
								console.log('🟢 BUTON TIKLANDI!');
								onSubmit(ev);
							}}
						>
							Kaydet
						</Button>
					</div>
				)}
			</div>
		</Popover>
	);
}

export default EventDialog;