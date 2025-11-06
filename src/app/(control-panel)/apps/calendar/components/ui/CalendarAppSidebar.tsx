import { motion } from 'motion/react';
import { Checkbox, FormLabel } from '@mui/material';
import Typography from '@mui/material/Typography';
import PageBreadcrumb from 'src/components/PageBreadcrumb';
import LabelsDialog from '../dialogs/labels/LabelsDialog';
import ShiftsDialog from '../dialogs/shifts/ShiftsDialog';
import { useLabels } from '../../api/hooks/labels/useLabels';
import { useShifts } from '../../api/hooks/shifts/useShifts';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useCalendarAppContext } from '../../contexts/CalendarAppContext/useCalendarAppContext';
import { useState, useEffect } from 'react';

/**
 * Takvim uygulaması kenar çubuğu.
 */
function CalendarAppSidebar() {
	const { selectedLabels, toggleSelectedLabels } = useCalendarAppContext();
	const { data: labels } = useLabels();
	const { data: shifts } = useShifts();
	const [selectedShifts, setSelectedShifts] = useState<string[]>([]);

	// Tüm vardiyaları başlangıçta seçili yap
	useEffect(() => {
		if (shifts) {
			setSelectedShifts(shifts.map((s) => s.id));
		}
	}, [shifts]);

	const toggleShift = (shiftId: string) => {
		setSelectedShifts((prev) =>
			prev.includes(shiftId) ? prev.filter((id) => id !== shiftId) : [...prev, shiftId]
		);
	};

	return (
		<div className="flex min-h-full flex-auto flex-col px-4 py-2">
			<PageBreadcrumb className="mb-2" />

			<motion.span
				initial={{ x: -20 }}
				animate={{ x: 0, transition: { delay: 0.2 } }}
				className="mb-4 text-3xl font-semibold tracking-tight"
			>
				Takvim
			</motion.span>

			<div className="group flex items-center justify-between mb-2">
				<Typography
					className="text-lg leading-none font-semibold"
					color="secondary.main"
				>
					Etiketler
				</Typography>

				<LabelsDialog />
			</div>

			{labels?.map((label) => (
				<FormLabel
					htmlFor={label.id}
					key={label.id}
					className="group mt-2 flex h-6 w-full cursor-pointer items-center gap-2"
				>
					<Checkbox
						id={label.id}
						color="secondary"
						className="p-0"
						checked={selectedLabels.includes(label.id)}
						onChange={() => {
							toggleSelectedLabels(label.id);
						}}
					/>

					<FuseSvgIcon sx={{ color: label.color }}>lucide:tag</FuseSvgIcon>

					<Typography className="flex flex-1 leading-none">{label.title}</Typography>
				</FormLabel>
			))}

			<div className="group flex items-center justify-between mt-6 mb-2">
				<Typography
					className="text-lg leading-none font-semibold"
					color="secondary.main"
				>
					Vardiyalar
				</Typography>

				<ShiftsDialog />
			</div>

			{shifts?.map((shift) => (
				<FormLabel
					htmlFor={shift.id}
					key={shift.id}
					className="group mt-2 flex h-6 w-full cursor-pointer items-center gap-2"
				>
					<Checkbox
						id={shift.id}
						color="secondary"
						className="p-0"
						checked={selectedShifts.includes(shift.id)}
						onChange={() => {
							toggleShift(shift.id);
						}}
					/>

					<FuseSvgIcon sx={{ color: shift.color }}>lucide:clock</FuseSvgIcon>

					<Typography className="flex flex-1 leading-none">
						{shift.title} ({shift.startTime} - {shift.endTime})
					</Typography>
				</FormLabel>
			))}
		</div>
	);
}

export default CalendarAppSidebar;