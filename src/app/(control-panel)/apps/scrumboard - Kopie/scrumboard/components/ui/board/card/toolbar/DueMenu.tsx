import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { format } from 'date-fns/format';
import { fromUnixTime } from 'date-fns/fromUnixTime';
import { getUnixTime } from 'date-fns/getUnixTime';
import { useState, MouseEvent } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import ToolbarMenu from './ToolbarMenu';

type DueMenuProps = {
	dueDate: number;
	onDueChange: (dueDate: number) => void;
	onRemoveDue: () => void;
};

/**
 * The due menu component.
 */
function DueMenu(props: DueMenuProps) {
	const { dueDate, onDueChange, onRemoveDue } = props;

	const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);

	const formatteddueDate = dueDate ? format(fromUnixTime(dueDate), 'Pp') : format(new Date(), 'Pp');

	function handleMenuOpen(event: MouseEvent<HTMLButtonElement>) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}

	return (
		<div>
			<IconButton
				className="rounded-none"
				onClick={handleMenuOpen}
				size="large"
			>
				<FuseSvgIcon>lucide:calendar</FuseSvgIcon>
			</IconButton>
			<ToolbarMenu
				state={anchorEl}
				onClose={handleMenuClose}
			>
				<div className="max-w-48 p-4">
					{dueDate ? (
						<MenuItem
							onClick={() => {
								onRemoveDue();
								handleMenuClose();
							}}
						>
							Bitiş Tarihini Kaldır
						</MenuItem>
					) : (
						<DateTimePicker
							value={new Date(formatteddueDate)}
							format="dd/MM/yyyy, HH:mm"
							onChange={(val) => {
								onDueChange(getUnixTime(val));
								handleMenuClose();
							}}
							slotProps={{
								popper: {
									sx: { 
										zIndex: 10000,
										'& .MuiPaper-root': {
											zIndex: 10000
										},
										'& .MuiPickersPopper-root': {
											zIndex: 10000
										}
									}
								},
								desktopPaper: {
									sx: { zIndex: 10000 }
								},
								mobilePaper: {
									sx: { zIndex: 10000 }
								},
								textField: {
									label: 'Bitiş tarihi',
									placeholder: 'gg/aa/yyyy, ss:dd',
									InputLabelProps: {
										shrink: true
									},
									fullWidth: true,
									variant: 'outlined'
								}
							}}
						/>
					)}
				</div>
			</ToolbarMenu>
		</div>
	);
}

export default DueMenu;