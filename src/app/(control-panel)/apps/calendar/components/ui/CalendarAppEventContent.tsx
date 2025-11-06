import { useTheme } from '@mui/material/styles';
import _ from 'lodash';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { EventContentArg } from '@fullcalendar/core';
import { useLabels } from '../../api/hooks/labels/useLabels';
import { useShifts } from '../../api/hooks/shifts/useShifts';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

type CalendarAppEventContentProps = {
	eventInfo: EventContentArg & { event: Event };
};

/**
 * Takvim etkinliği içeriği.
 */
function CalendarAppEventContent(props: CalendarAppEventContentProps) {
	const { eventInfo } = props;
	const theme = useTheme();

	const { data: labels } = useLabels();
	const { data: shifts } = useShifts();
	
	const eventType = eventInfo.event.extendedProps.type || 'event';
	const workType = eventInfo.event.extendedProps.workType;
	const shiftId = eventInfo.event.extendedProps.shiftId;
	const labelId = eventInfo.event.extendedProps.label as string;
	
	const label = _.find(labels, { id: labelId });
	const shift = _.find(shifts, { id: shiftId });

	// Event tipine göre renk ve ikon
	let backgroundColor = label?.color || '#2196f3';
	let icon = 'lucide:calendar';
	let displayTitle = eventInfo.event.title;

	if (eventType === 'work') {
		if (workType === 'shift') {
			backgroundColor = '#10b981'; // Yeşil - Vardiya
			icon = 'lucide:briefcase';
			displayTitle = shift?.title || 'Vardiya';
		} else if (workType === 'off') {
			backgroundColor = '#f97316'; // Turuncu - İzin
			icon = 'lucide:palmtree';
			displayTitle = 'İzin (OFF)';
		} else if (workType === 'sick') {
			backgroundColor = '#ef4444'; // Kırmızı - Raporlu
			icon = 'lucide:heart-pulse';
			displayTitle = 'Raporlu';
		}
	} else if (eventType === 'expense') {
		backgroundColor = '#eab308'; // Sarı - Yol Parası
		icon = 'lucide:banknote';
		displayTitle = 'Yol Parası';
	}

	return (
		<Box
			sx={{
				backgroundColor: backgroundColor,
				color: theme.palette.getContrastText(backgroundColor)
			}}
			className={clsx('flex h-5.5 w-full items-center rounded-sm px-2 py-0.5 text-white gap-1')}
		>
			<FuseSvgIcon size={14}>{icon}</FuseSvgIcon>
			<Typography className="text-md font-semibold">{eventInfo.timeText}</Typography>
			<Typography className="text-md truncate">{displayTitle}</Typography>
		</Box>
	);
}

export default CalendarAppEventContent;