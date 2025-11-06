import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { ApexOptions } from 'apexcharts';
import _ from 'lodash';
import GloBiLoadBalancingWidgetType from '../../../api/types/GloBiLoadBalancingWidgetType';
import { useGetWidget } from '../../../api/hooks/widgets/useGetWidget';
import ReactApexChart from 'react-apexcharts';

/**
 * GloBi hat yoğunluk yönetimi widget'ı.
 */
function GloBiLoadBalancingWidget() {
	const theme = useTheme();
	const { data: widget } = useGetWidget<GloBiLoadBalancingWidgetType>('globi');

	const series = widget?.series || [];
	const amount = widget?.amount || 0;
	const labels = widget?.labels || [];
	const efficiency = widget?.efficiency || 0;

	const chartOptions: ApexOptions = {
		chart: {
			animations: {
				enabled: false
			},
			fontFamily: 'inherit',
			foreColor: 'inherit',
			height: '100%',
			type: 'area',
			sparkline: {
				enabled: true
			}
		},
		colors: [theme.palette.success.main],
		fill: {
			colors: [theme.palette.success.light],
			opacity: 0.5
		},
		stroke: {
			curve: 'smooth',
			width: 2
		},
		tooltip: {
			followCursor: true,
			theme: 'dark'
		},
		xaxis: {
			type: 'category',
			categories: labels
		}
	};

	if (!widget) {
		return null;
	}

	return (
		<Paper className="flex flex-auto flex-col overflow-hidden rounded-xl shadow-sm">
			<div className="m-4 mb-0 flex items-start justify-between">
				<Typography className="truncate text-lg leading-6 font-medium tracking-tight">
					GloBi Yönetimi
				</Typography>
				<div className="ml-2">
					<Chip
						size="small"
						className="text-sm font-medium"
						label="30 gün"
					/>
				</div>
			</div>
			<div className="mx-4 mt-3 flex flex-col gap-3 lg:flex-row lg:items-center">
				<Typography className="text-6xl leading-none font-bold tracking-tighter">
					{amount?.toLocaleString('tr-TR')}
				</Typography>
				<div className="flex lg:flex-col">
					<FuseSvgIcon
						size={20}
						className="text-green-500"
					>
						lucide:zap
					</FuseSvgIcon>
					<Typography
						className="text-md ml-1 flex items-center leading-none whitespace-nowrap lg:mt-0.5 lg:ml-0"
						color="text.secondary"
					>
						<span className="font-medium text-green-500">
							%{efficiency}
						</span>
						<span className="ml-1">verimlilik</span>
					</Typography>
				</div>
			</div>
			<Typography
				className="mx-4 mt-2 text-sm"
				color="text.secondary"
			>
				Yoğunlukta yönetilen çağrı sayısı
			</Typography>
			<div className="-mb-2 flex h-20 flex-auto flex-col">
				<ReactApexChart
					options={chartOptions}
					series={_.cloneDeep(series)}
					type={chartOptions?.chart?.type}
					height={chartOptions?.chart?.height}
				/>
			</div>
		</Paper>
	);
}

export default GloBiLoadBalancingWidget;