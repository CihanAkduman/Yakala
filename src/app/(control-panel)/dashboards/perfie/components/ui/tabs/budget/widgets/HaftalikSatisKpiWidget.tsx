'use client';
import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ApexOptions } from 'apexcharts';
import _ from 'lodash';
import ReactApexChart from 'react-apexcharts';

/**
 * The HaftalikSatisKpiWidget widget.
 */
function HaftalikSatisKpiWidget() {
	const theme = useTheme();

	// Mock data - haftalık satış
	const widget = {
		amount: 125000, // 125k €
		series: [
			{
				name: 'Haftalık Satış',
				data: [18000, 22000, 19000, 25000, 21000, 23000, 17000]
			}
		],
		labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
	};

	const amount = widget?.amount;
	const series = widget?.series || [];
	const labels = widget?.labels;

	const chartOptions: ApexOptions = {
		chart: {
			animations: {
				enabled: false
			},
			fontFamily: 'inherit',
			foreColor: 'inherit',
			height: '100%',
			type: 'line',
			sparkline: {
				enabled: true
			}
		},
		colors: [theme.palette.secondary.main],
		stroke: {
			curve: 'smooth',
			width: 2
		},
		tooltip: {
			theme: 'dark'
		},
		xaxis: {
			type: 'category',
			categories: labels
		},
		yaxis: {
			show: false,
			labels: {
				formatter: (val) => `€${val}`
			}
		}
	};

	return (
		<Paper className="flex flex-auto flex-col overflow-hidden rounded-xl shadow-sm">
			<div className="flex items-center justify-between px-2 pt-2">
				<Typography
					className="truncate px-2 text-lg leading-6 font-medium tracking-tight"
					color="text.secondary"
				>
					Haftalık Satış
				</Typography>
				<div className="">
					<IconButton>
						<FuseSvgIcon>lucide:ellipsis-vertical</FuseSvgIcon>
					</IconButton>
				</div>
			</div>
			<div className="flex items-center p-4 pt-0">
				<div className="flex flex-col">
					<div className="text-3xl leading-[1.25] font-semibold tracking-tight">
						{amount.toLocaleString('de-DE', {
							style: 'currency',
							currency: 'EUR'
						})}
					</div>
					<div className="flex items-center">
						<FuseSvgIcon
							className="mr-1 text-green-500"
							size={20}
						>
							lucide:trending-up
						</FuseSvgIcon>
						<Typography className="text-secondary text-sm leading-none font-medium whitespace-nowrap">
							<span className="text-green-500">8%</span>
							<span> hedefin üzerinde</span>
						</Typography>
					</div>
				</div>
				<div className="ml-8 flex min-w-0 flex-auto flex-col">
					<ReactApexChart
						className="h-16 w-full"
						options={chartOptions}
						series={_.cloneDeep(series)}
						type={chartOptions?.chart?.type}
						height={chartOptions?.chart?.height}
					/>
				</div>
			</div>
		</Paper>
	);
}

export default HaftalikSatisKpiWidget;