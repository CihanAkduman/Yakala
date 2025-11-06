import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { IconButton } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useState } from 'react';
import NewShiftForm from './NewShiftForm';
import ShiftItemForm from './ShiftItemForm';
import { useShifts } from '../../../api/hooks/shifts/useShifts';

/**
 * Vardiya düzenleme dialogu.
 */
function ShiftsDialog() {
	const [openDialog, setOpenDialog] = useState(false);
	const { data: shifts } = useShifts();

	function handleOpenDialog() {
		setOpenDialog(true);
	}

	function handleCloseDialog() {
		setOpenDialog(false);
	}

	return (
		<>
			<IconButton
				onClick={handleOpenDialog}
				size="small"
			>
				<FuseSvgIcon color="secondary">lucide:square-pen</FuseSvgIcon>
			</IconButton>
			<Dialog
				classes={{
					paper: 'w-full max-w-80 p-6 md:p-10 m-6'
				}}
				onClose={handleCloseDialog}
				open={openDialog}
				disableRestoreFocus
			>
				<Typography className="mb-4 text-2xl font-semibold">Vardiyaları Düzenle</Typography>

				<List dense>
					<NewShiftForm />

					{shifts?.map((item) => (
						<ShiftItemForm
							shift={item}
							key={item.id}
							isLast={shifts.length === 1}
						/>
					))}
				</List>
			</Dialog>
		</>
	);
}

export default ShiftsDialog;