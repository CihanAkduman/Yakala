import { useDebounce, useDeepCompareEffect } from '@fuse/hooks';
import _ from 'lodash';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import clsx from 'clsx';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { fromUnixTime } from 'date-fns/fromUnixTime';
import { getUnixTime } from 'date-fns/getUnixTime';
import { format } from 'date-fns/format';
import { Controller, useForm } from 'react-hook-form';
import { SyntheticEvent, useEffect } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import useParams from '@fuse/hooks/useParams';
import FuseLoading from '@fuse/core/FuseLoading';
import CardActivity from './activity/CardActivity';
import CardAttachment from './attachment/CardAttachment';
import CardChecklist from './checklist/CardChecklist';
import CardComment from './comment/CardComment';
import DueMenu from './toolbar/DueMenu';
import LabelsMenu from './toolbar/LabelsMenu';
import MembersMenu from './toolbar/MembersMenu';
import CheckListMenu from './toolbar/CheckListMenu';
import OptionsMenu from './toolbar/OptionsMenu';
import {
	ScrumboardCard,
	ScrumboardChecklist,
	ScrumboardComment,
	ScrumboardLabel,
	ScrumboardMember
} from '../../../../api/types';
import setIn from '@/utils/setIn';
import { useScrumboardAppContext } from '../../../../contexts/ScrumboardAppContext/useScrumboardAppContext';
import { useUpdateScrumboardBoard } from '../../../../api/hooks/boards/useUpdateScrumboardBoard';
import { useGetScrumboardBoard } from '../../../../api/hooks/boards/useGetScrumboardBoard';
import { useGetScrumboardMembers } from '../../../../api/hooks/members/useGetScrumboardMembers';
import { useGetScrumboardBoardLabels } from '../../../../api/hooks/labels/useGetScrumboardBoardLabels';
import { useGetScrumboardBoardLists } from '../../../../api/hooks/lists/useGetScrumboardBoardLists';
import { useUpdateScrumboardBoardCard } from '../../../../api/hooks/cards/useUpdateScrumboardBoardCard';
import { useDeleteScrumboardBoardCard } from '../../../../api/hooks/cards/useDeleteScrumboardBoardCard';
import { useSnackbar } from 'notistack';

/**
 * The board card form component.
 */
function BoardCardForm() {
	const routeParams = useParams<{ boardId: string }>();
	const { boardId } = routeParams;
	const { enqueueSnackbar } = useSnackbar();
	const { cardDialog, closeCardDialog } = useScrumboardAppContext();
	const card = cardDialog?.data;

	const { data: board, isLoading: isBoardLoading } = useGetScrumboardBoard(boardId);
	const { data: members, isLoading: isMembersLoading } = useGetScrumboardMembers();
	const { data: labels, isLoading: isLabelsLoading } = useGetScrumboardBoardLabels(boardId);
	const { data: listItems, isLoading: isListItemsLoading } = useGetScrumboardBoardLists(boardId);
	const loading = isBoardLoading || isMembersLoading || isLabelsLoading || isListItemsLoading;

	const { mutateAsync: updateCard } = useUpdateScrumboardBoardCard();
	const { mutateAsync: removeCard } = useDeleteScrumboardBoardCard();
	const { mutate: updateBoard } = useUpdateScrumboardBoard();

	const list = _.find(listItems, { id: card?.listId });

	const { register, watch, control, setValue, formState } = useForm<ScrumboardCard>({
		mode: 'onChange',
		defaultValues: card
	});

	const { isValid } = formState;
	const cardForm = watch();

	const updateCardData = useDebounce((newCard: ScrumboardCard) => {
		updateCard(newCard).then(() => {
			enqueueSnackbar('Kayıt Güncellendi', {
				variant: 'success'
			});
		});
	}, 600);

	/**
	 * Update Card
	 */
	useDeepCompareEffect(() => {
		if (!(!isValid || _.isEmpty(cardForm) || !card) && !_.isEqual(card, cardForm)) {
			updateCardData(cardForm);
		}
	}, [cardForm, isValid]);

	useEffect(() => {
		register('attachmentCoverId');
	}, [register]);

	if (loading) {
		return <FuseLoading />;
	}

	return (
		<DialogContent className="flex flex-col p-2 sm:flex-row">
			<div className="flex flex-auto flex-col px-0 py-4 sm:px-4">
				<div className="mb-6 flex flex-col items-center justify-center sm:flex-row sm:justify-between">
					<div className="mb-4 flex items-center sm:mb-0">
						<Typography>{board.title}</Typography>

						<FuseSvgIcon>lucide:chevron-right</FuseSvgIcon>

						<Typography>{list && list.title}</Typography>
					</div>

					{cardForm.dueDate && (
						<DateTimePicker
							value={new Date(format(fromUnixTime(cardForm.dueDate), 'Pp'))}
							format="Pp"
							onChange={(val) => setValue('dueDate', getUnixTime(val))}
							className="w-full sm:w-auto"
							slotProps={{
								textField: {
									label: 'Bitiş tarihi',
									placeholder: 'Bitiş tarihi seçin',
									InputLabelProps: {
										shrink: true
									},
									size: 'small',
									fullWidth: true,
									variant: 'outlined'
								}
							}}
						/>
					)}
				</div>

				<div className="mb-6 flex items-center">
					<Controller
						name="title"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Başlık"
								type="text"
								variant="outlined"
								fullWidth
								required
								slotProps={{
									input: {
										endAdornment: (
											<InputAdornment position="end">
												{card?.subscribed && (
													<FuseSvgIcon
														size={20}
														color="action"
													>
														lucide:eye
													</FuseSvgIcon>
												)}
											</InputAdornment>
										)
									}
								}}
							/>
						)}
					/>
				</div>

				<div className="mb-6 w-full">
					<Controller
						name="description"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Açıklama"
								multiline
								rows="4"
								variant="outlined"
								fullWidth
							/>
						)}
					/>
				</div>

				{/* LOOP Özel Alanları */}
				{(board?.title?.toLowerCase().includes('loop') || 
				  cardForm.labels?.some(labelId => {
					const label = _.find(labels, { id: labelId });
					return label?.title?.toLowerCase().includes('loop');
				  })) && (
					<div className="mb-6">
						<Box
							className="p-4 rounded-lg border"
							sx={{ 
								borderColor: 'divider',
								backgroundColor: (theme) => theme.palette.background.paper 
							}}
						>
							<div className="mb-4 flex items-center">
								<FuseSvgIcon>lucide:refresh-ccw</FuseSvgIcon>
								<Typography className="mx-2 text-lg font-semibold">LOOP - Hata Analizi</Typography>
							</div>
							
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<Controller
									name="errorRepeatCount"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											type="number"
											label="Hata Tekrar Sayısı"
											variant="outlined"
											fullWidth
											size="small"
											slotProps={{
												input: {
													inputProps: { min: 0 }
												}
											}}
											helperText="Bu hatanın kaç kez tekrarlandığı"
										/>
									)}
								/>

								<Controller
									name="affectedRepresentatives"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											type="number"
											label="Etkilenen Temsilci Sayısı"
											variant="outlined"
											fullWidth
											size="small"
											slotProps={{
												input: {
													inputProps: { min: 0 }
												}
											}}
											helperText="Kaç temsilci bu hatayı yaptı"
										/>
									)}
								/>
							</div>

							<Controller
								name="rootCauseAnalysis"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mt-4"
										label="Kök Neden Analizi"
										multiline
										rows="3"
										variant="outlined"
										fullWidth
										size="small"
										helperText="Hatanın asıl nedeni nedir? Sistematik bir sorun mu?"
									/>
								)}
							/>

							<Controller
								name="corpixTrainingLink"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mt-4"
										label="Corpix Eğitim Linki"
										variant="outlined"
										fullWidth
										size="small"
										placeholder="www.globalbilgi.com.tr"
										slotProps={{
											input: {
												startAdornment: (
													<InputAdornment position="start">
														<FuseSvgIcon size={20}>lucide:graduation-cap</FuseSvgIcon>
													</InputAdornment>
												)
											}
										}}
										helperText="Bu hata için oluşturulan Corpix eğitim içeriği"
									/>
								)}
							/>
						</Box>
					</div>
				)}

				{/* QM Özel Alanları */}
				{(board?.title?.toLowerCase().includes('qm') || board?.title?.toLowerCase().includes('kalite') ||
				  cardForm.labels?.some(labelId => {
					const label = _.find(labels, { id: labelId });
					return label?.title?.toLowerCase().includes('qm') || label?.title?.toLowerCase().includes('kalite');
				  })) && (
					<div className="mb-6">
						<Box
							className="p-4 rounded-lg border"
							sx={{ 
								borderColor: 'divider',
								backgroundColor: (theme) => theme.palette.background.paper 
							}}
						>
							<div className="mb-4 flex items-center">
								<FuseSvgIcon>lucide:shield-check</FuseSvgIcon>
								<Typography className="mx-2 text-lg font-semibold">QM - Kalite Analizi</Typography>
							</div>

							<Controller
								name="affectedCustomerSegments"
								control={control}
								render={({ field }) => (
									<Autocomplete
										{...field}
										multiple
										size="small"
										options={['Bireysel', 'Kurumsal', 'Premium', 'Economy']}
										value={field.value || []}
										onChange={(_, newValue) => field.onChange(newValue)}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Etkilenen Müşteri Segmentleri"
												variant="outlined"
												placeholder="Segment seçin"
											/>
										)}
									/>
								)}
							/>

							<div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
								<Controller
									name="frequencyRating"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											select
											label="Geçmişe Sıklığı"
											variant="outlined"
											fullWidth
											size="small"
											SelectProps={{
												native: true
											}}
										>
											<option value="">Seçiniz</option>
											<option value="rare">Nadir (İlk kez)</option>
											<option value="occasional">Ara sıra (2-5 kez)</option>
											<option value="frequent">Sık (5+ kez)</option>
											<option value="systematic">Sistematik</option>
										</TextField>
									)}
								/>

								<Controller
									name="customerImpactLevel"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											select
											label="Müşteri Deneyimine Etkisi"
											variant="outlined"
											fullWidth
											size="small"
											SelectProps={{
												native: true
											}}
										>
											<option value="">Seçiniz</option>
											<option value="low">Düşük</option>
											<option value="medium">Orta</option>
											<option value="high">Yüksek</option>
											<option value="critical">Kritik</option>
										</TextField>
									)}
								/>
							</div>

							<Controller
								name="rootCauseAnalysisQM"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mt-6"
										label="Kök Neden Analizi"
										multiline
										rows="3"
										variant="outlined"
										fullWidth
										size="small"
										helperText="Kalite sorunun asıl nedeni nedir?"
									/>
								)}
							/>
						</Box>
					</div>
				)}

				{/* Corpix Entegrasyonu */}
				<div className="mb-6">
					<Box
						className="p-4 rounded-lg border-2 border-dashed"
						sx={{ 
							borderColor: 'divider',
							backgroundColor: (theme) => theme.palette.action.hover 
						}}
					>
						<div className="mb-3 flex items-center">
							<FuseSvgIcon>lucide:graduation-cap</FuseSvgIcon>
							<Typography className="mx-2 text-lg font-semibold">Corpix Entegrasyonu</Typography>
						</div>
						<Typography className="text-sm mb-3" color="text.secondary">
							Bu kayıt için otomatik eğitim ataması yapılabilir. Corpix entegrasyonu aktif olduğunda,
							tekrarlayan hatalar için otomatik olarak eğitim içerikleri oluşturulacak ve ilgili 
							personele atanacaktır.
						</Typography>
						<Button
							variant="outlined"
							size="small"
							disabled
							startIcon={<FuseSvgIcon>lucide:link</FuseSvgIcon>}
						>
							Corpix Eğitimi Ekle (Yakında)
						</Button>
					</Box>
				</div>

				{cardForm.labels && cardForm.labels.length > 0 && (
					<div className="mb-6">
						<div className="mt-4 mb-3 flex items-center">
							<FuseSvgIcon>lucide:tag</FuseSvgIcon>
							<Typography className="mx-2 text-lg font-semibold">Etiketler</Typography>
						</div>
						<Autocomplete
							className="mt-2 mb-4"
							multiple
							freeSolo
							size="small"
							options={labels}
							getOptionLabel={(option: string | ScrumboardLabel) => {
								if (typeof option === 'string') {
									return option;
								}

								return option?.title;
							}}
							value={cardForm.labels.map((id) => _.find(labels, { id }))}
							onChange={(_event: SyntheticEvent<Element, Event>, value: (string | ScrumboardLabel)[]) => {
								const ids = value
									.filter((item): item is ScrumboardLabel => typeof item !== 'string')
									.map((item) => item.id);
								setValue('labels', ids);
							}}
							renderTags={(value, getTagProps) =>
								value.map((option, index) => {
									const { key, ...rest } = getTagProps({ index });
									return (
										<Chip
											key={key}
											label={typeof option === 'string' ? option : option?.title}
											className="m-0.75"
											size="small"
											{...rest}
										/>
									);
								})
							}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Çoklu Etiket Seçin"
									label="Etiketler"
									variant="outlined"
									InputLabelProps={{
										shrink: true
									}}
								/>
							)}
						/>
					</div>
				)}

				{cardForm.memberIds && cardForm.memberIds.length > 0 && (
					<div className="mb-6">
						<div className="mt-4 mb-3 flex items-center">
							<FuseSvgIcon>lucide:users</FuseSvgIcon>
							<Typography className="mx-2 text-lg font-semibold">Üyeler</Typography>
						</div>
						<Autocomplete
							className="mt-2 mb-4"
							multiple
							freeSolo
							size="small"
							options={members}
							getOptionLabel={(member: string | ScrumboardMember) => {
								return typeof member === 'string' ? member : member?.name;
							}}
							value={cardForm.memberIds.map((id) => _.find(members, { id }))}
							onChange={(
								_event: SyntheticEvent<Element, Event>,
								value: (string | ScrumboardMember)[]
							) => {
								const ids = value
									.filter((item): item is ScrumboardMember => typeof item !== 'string')
									.map((item) => item.id);
								setValue('memberIds', ids);
							}}
							renderTags={(value, getTagProps) =>
								value.map((option, index) => {
									if (typeof option === 'string') {
										// eslint-disable-next-line react/jsx-key
										return <span />;
									}

									const { key, ...rest } = getTagProps({ index });
									return (
										<Chip
											key={key}
											label={option.name}
											className={clsx('m-0.75', option?.class)}
											size="small"
											{...rest}
											avatar={
												<Tooltip title={option.name}>
													<Avatar src={option.avatar} />
												</Tooltip>
											}
										/>
									);
								})
							}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Çoklu Üye Seçin"
									label="Üyeler"
									variant="outlined"
									InputLabelProps={{
										shrink: true
									}}
								/>
							)}
						/>
					</div>
				)}

				{cardForm.attachments && cardForm.attachments.length > 0 && (
					<div className="mb-6">
						<div className="mt-4 mb-3 flex items-center">
							<FuseSvgIcon>lucide:paperclip</FuseSvgIcon>
							<Typography className="mx-2 text-lg font-semibold">Ekler</Typography>
						</div>
						<div className="-mx-4 flex flex-col flex-wrap sm:flex-row">
							{cardForm.attachments.map((item) => (
								<CardAttachment
									item={item}
									card={cardForm}
									makeCover={() => {
										setValue('attachmentCoverId', item.id);
									}}
									removeCover={() => {
										setValue('attachmentCoverId', '');
									}}
									removeAttachment={() => {
										setValue('attachments', _.reject(cardForm.attachments, { id: item.id }));
									}}
									key={item.id}
								/>
							))}
						</div>
					</div>
				)}

				{cardForm.checklists &&
					cardForm.checklists.map((checklist, index) => (
						<CardChecklist
							key={checklist.id}
							checklist={checklist}
							index={index}
							onCheckListChange={(item, itemIndex) => {
								setValue(
									'checklists',
									setIn(cardForm.checklists, `[${itemIndex}]`, item) as ScrumboardChecklist[]
								);
							}}
							onRemoveCheckList={() => {
								setValue('checklists', _.reject(cardForm.checklists, { id: checklist.id }));
							}}
						/>
					))}

				<div className="mb-6">
					<div className="mt-4 mb-3 flex items-center">
						<FuseSvgIcon>lucide:message-square-text</FuseSvgIcon>
						<Typography className="mx-2 text-lg font-semibold">Yorum</Typography>
					</div>
					<div>
						<CardComment
							onCommentAdd={(comment) =>
								setValue('activities', [comment, ...cardForm.activities] as ScrumboardComment[])
							}
						/>
					</div>
				</div>

				<Controller
					name="activities"
					control={control}
					defaultValue={[]}
					render={({ field: { value } }) => (
						<div>
							{value.length > 0 && (
								<div className="mb-6">
									<div className="mt-4 flex items-center">
										<FuseSvgIcon>lucide:clipboard-list</FuseSvgIcon>
										<Typography className="mx-2 text-lg font-semibold">Aktivite</Typography>
									</div>
									<List>
										{value.map((item) => (
											<CardActivity
												item={item}
												key={item.id}
											/>
										))}
									</List>
								</div>
							)}
						</div>
					)}
				/>
			</div>

			<div className="sticky top-0 order-first flex items-start sm:order-last">
				<Box
					className="flex w-full flex-row items-center overflow-hidden rounded-lg border-1 sm:flex-col"
					sx={{ backgroundColor: 'background.default' }}
				>
					<IconButton
						className="order-last rounded-none sm:order-first"
						color="inherit"
						onClick={() => closeCardDialog()}
						size="large"
					>
						<FuseSvgIcon>lucide:x</FuseSvgIcon>
					</IconButton>
					<div className="flex flex-1 flex-row items-center sm:flex-col sm:items-start">
						<Controller
							name="dueDate"
							control={control}
							render={({ field: { onChange, value } }) => (
								<DueMenu
									onDueChange={onChange}
									onRemoveDue={() => onChange(null)}
									dueDate={value}
								/>
							)}
						/>

						<Controller
							name="labels"
							control={control}
							defaultValue={[]}
							render={({ field: { onChange, value } }) => (
								<LabelsMenu
									onToggleLabel={(labelId) => onChange(_.xor(value, [labelId]))}
									labels={value}
								/>
							)}
						/>

						<Controller
							name="memberIds"
							control={control}
							defaultValue={[]}
							render={({ field: { onChange, value } }) => (
								<MembersMenu
									onToggleMember={(memberId) => onChange(_.xor(value, [memberId]))}
									memberIds={value}
								/>
							)}
						/>

						<Controller
							name="attachments"
							control={control}
							defaultValue={[]}
							render={() => (
								<IconButton
									size="large"
									className="rounded-none"
								>
									<FuseSvgIcon>lucide:paperclip</FuseSvgIcon>
								</IconButton>
							)}
						/>

						<Controller
							name="checklists"
							control={control}
							defaultValue={[]}
							render={({ field: { onChange } }) => (
								<CheckListMenu
									onAddCheckList={(newList) => onChange([...cardForm.checklists, newList])}
								/>
							)}
						/>

						<OptionsMenu
							onRemoveCard={() => {
								removeCard(card.id).then(() => {
									updateBoard({
										...board,
										lists: board.lists.map((list) =>
											list.id === card.listId
												? {
														...list,
														cards: list.cards.filter((id) => id !== card.id)
													}
												: list
										)
									});
									closeCardDialog();
									enqueueSnackbar('Kayıt Silindi', {
										variant: 'success'
									});
								});
							}}
						/>
					</div>
				</Box>
			</div>
		</DialogContent>
	);
}

export default BoardCardForm;
