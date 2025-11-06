'use client';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import Chip from '@mui/material/Chip';

/**
 * The SatisWidget widget.
 */
function SatisWidget() {
	// Mock data - gerçek API'den gelecek
	const satisData = {
		count: 41,
		trend: -2, // -2
		label: 'Satış'
	};

	const getTrendConfig = (trend: number) => {
		if (trend > 0) {
			return {
				color: 'success' as const,
				icon: 'lucide:trending-up',
				text: `+${trend}`
			};
		} else if (trend < 0) {
			return {
				color: 'error' as const,
				icon: 'lucide:trending-down',
				text: `${trend}`
			};
		} else {
			return {
				color: 'default' as const,
				icon: 'lucide:minus',
				text: '0'
			};
		}
	};

	const trendConfig = getTrendConfig(satisData.trend);

	return (
		<Paper className="flex flex-auto flex-col overflow-hidden rounded-xl shadow-sm">
			<div className="flex items-center justify-between px-2 pt-2">
				<Typography
					className="truncate px-3 text-lg leading-6 font-medium tracking-tight"
					color="text.secondary"
				>
					{satisData.label}
				</Typography>
				<IconButton aria-label="daha fazla">
					<FuseSvgIcon>lucide:ellipsis-vertical</FuseSvgIcon>
				</IconButton>
			</div>
			<div className="mt-4 text-center">
				<Typography className="text-7xl leading-none font-bold tracking-tight sm:text-8xl">
					{satisData.count}
				</Typography>
				<Typography
					className="text-lg font-medium"
					color="text.secondary"
				>
					Satış
				</Typography>
			</div>
			<div className="mt-5 mb-6 flex w-full items-center justify-center gap-2">
				<Typography
					className="text-sm font-medium"
					color="text.secondary"
				>
					Dün göre:
				</Typography>
				<Chip
					label={trendConfig.text}
					size="small"
					color={trendConfig.color}
					variant="outlined"
					icon={<FuseSvgIcon size={14}>{trendConfig.icon}</FuseSvgIcon>}
				/>
			</div>
		</Paper>
	);
}

export default memo(SatisWidget);