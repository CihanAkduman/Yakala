'use client';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { ApexOptions } from 'apexcharts';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from 'lodash';
import { Tabs, Tab } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

/**
 * The PerformansWidget widget.
 */
function PerformansWidget() {
	const theme = useTheme();
	const [awaitRender, setAwaitRender] = useState(true);
	const [tabValue, setTabValue] = useState(0);

	// Mock data
	const widget = {
		overview: {
			'bu-hafta': {
				'new-issues': 214,
				'closed-issues': 75,
				fixed: 28,
				'wont-fix': 12,
				're-opened': 8,
				'needs-triage': 15
			},
			'gecen-hafta': {
				'new-issues': 198,
				'closed-issues': 68,
				fixed: 25,
				'wont-fix': 10,
				're-opened': 6,
				'needs-triage': 12
			}
		},
		series: {
			'bu-hafta': [
				{
					name: 'Haftalık Çağrı Sayısı',
					type: 'line',
					data: [42, 28, 43, 34, 20, 25, 22]
				}
			],
			'gecen-hafta': [
				{
					name: 'Haftalık Çağrı Sayısı', 
					type: 'line',
					data: [38, 25, 40, 30, 18, 22, 20]
				}
			]
		},
		ranges: {
			'bu-hafta': 'Bu Hafta',
			'gecen-hafta': 'Geçen Hafta'
		},
		labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
	};

	const overview = widget?.overview;
	const series = widget?.series || [];
	const ranges = widget?.ranges || [];
	const labels = widget?.labels;
	const currentRange = Object.keys(ranges || {})[tabValue];

	const chartOptions: ApexOptions = {
		chart: {
			fontFamily: 'inherit',
			foreColor: 'inherit',
			height: '100%',
			type: 'line',
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false
			}
		},
		colors: [theme.palette.primary.main, theme.palette.secondary.main],
		labels,
		dataLabels: {
			enabled: true,
			enabledOnSeries: [0],
			background: {
				borderWidth: 0
			}
		},
		grid: {
			borderColor: theme.palette.divider
		},
		legend: {
			show: false
		},
		plotOptions: {
			bar: {
				columnWidth: '50%'
			}
		},
		states: {
			hover: {
				filter: {
					type: 'darken'
				}
			}
		},
		stroke: {
			width: [3, 0]
		},
		tooltip: {
			followCursor: true,
			theme: theme.palette.mode
		},
		xaxis: {
			axisBorder: {
				show: false
			},
			axisTicks: {
				color: theme.palette.divider
			},
			labels: {
				style: {
					colors: theme.palette.text.secondary
				}
			},
			tooltip: {
				enabled: false
			}
		},
		yaxis: {
			labels: {
				offsetX: -16,
				style: {
					colors: theme.palette.text.secondary
				}
			}
		}
	};

	useEffect(() => {
		setAwaitRender(false);
	}, []);

	if (awaitRender) {
		return null;
	}

	return (
		<Paper className="flex flex-auto flex-col overflow-hidden rounded-xl p-6 shadow-sm">
			<div className="flex flex-col items-start justify-between sm:flex-row">
				<Typography className="truncate text-xl leading-6 font-medium tracking-tight">
					Performansım
				</Typography>
				<div className="mt-3 sm:mt-0">
					<Tabs
						value={tabValue}
						onChange={(_ev, value: number) => setTabValue(value)}
					>
						{Object.entries(ranges).map(([key, label], index) => (
							<Tab
								key={key}
								value={index}
								label={label}
							/>
						))}
					</Tabs>
				</div>
			</div>
			<div className="mt-8 grid w-full grid-flow-row grid-cols-1 gap-6 sm:mt-4 lg:grid-cols-2">
		<div className="flex flex-auto flex-col">
			<Typography
				className="font-medium"
				color="text.secondary"
			>
				Haftalık Performansım  {/* Bu satırı değiştir */}
			</Typography>
			<div className="flex flex-auto flex-col">
				<ReactApexChart
					className="w-full flex-auto"
					options={chartOptions}
					series={_.cloneDeep(series[currentRange])}
					height={320}
				/>
			</div>
		</div>			
			<div className="flex flex-col">
					<Typography
						className="font-medium"
						color="text.secondary"
					>
						Genel Bakış
					</Typography>
					<div className="mt-6 grid flex-auto grid-cols-4 gap-3">
						<Box
							sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
							className="col-span-2 flex flex-col items-center justify-center rounded-xl border px-1 py-8"
						>
							<Typography
								className="text-5xl leading-none font-semibold tracking-tight sm:text-7xl"
								color="secondary"
							>
								{overview[currentRange]['new-issues']}
							</Typography>
							<Typography
								className="mt-1 text-sm font-medium sm:text-lg"
								color="secondary"
							>
								Çağrı Sayısı
							</Typography>
						</Box>
						<Box
							sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
							className="col-span-2 flex flex-col items-center justify-center rounded-xl border px-1 py-8"
						>
							<Typography
								className="text-5xl leading-none font-semibold tracking-tight sm:text-7xl"
								color="secondary"
							>
								{overview[currentRange]['closed-issues']}
							</Typography>
							<Typography
								className="mt-1 text-sm font-medium sm:text-lg"
								color="secondary"
							>
								Satış
							</Typography>
						</Box>
						<Box
							sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
							className="col-span-2 flex flex-col items-center justify-center rounded-xl border px-1 py-8 sm:col-span-1"
						>
							<Typography
								className="text-5xl leading-none font-semibold tracking-tight"
								color="text.secondary"
							>
								{overview[currentRange].fixed}
							</Typography>
							<Typography
								className="mt-1 text-center text-sm font-medium"
								color="text.secondary"
							>
								Çözülen
							</Typography>
						</Box>
						<Box
							sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
							className="col-span-2 flex flex-col items-center justify-center rounded-xl border px-1 py-8 sm:col-span-1"
						>
							<Typography
								className="text-5xl leading-none font-semibold tracking-tight"
								color="text.secondary"
							>
								{overview[currentRange]['wont-fix']}
							</Typography>
							<Typography
								className="mt-1 text-center text-sm font-medium"
								color="text.secondary"
							>
								Çözülmedi
							</Typography>
						</Box>
						<Box
							sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
							className="col-span-2 flex flex-col items-center justify-center rounded-xl border px-1 py-8 sm:col-span-1"
						>
							<Typography
								className="text-5xl leading-none font-semibold tracking-tight"
								color="text.secondary"
							>
								{overview[currentRange]['re-opened']}
							</Typography>
							<Typography
								className="mt-1 text-center text-sm font-medium"
								color="text.secondary"
							>
								Yeniden Açılan
							</Typography>
						</Box>
						<Box
							sx={{ backgroundColor: 'var(--mui-palette-background-default)' }}
							className="col-span-2 flex flex-col items-center justify-center rounded-xl border px-1 py-8 sm:col-span-1"
						>
							<Typography
								className="text-5xl leading-none font-semibold tracking-tight"
								color="text.secondary"
							>
								{overview[currentRange]['needs-triage']}
							</Typography>
							<Typography
								className="mt-1 text-center text-sm font-medium"
								color="text.secondary"
							>
								Bekleyen
							</Typography>
						</Box>
					</div>
				</div>
			</div>
		</Paper>
	);
}

export default memo(PerformansWidget);