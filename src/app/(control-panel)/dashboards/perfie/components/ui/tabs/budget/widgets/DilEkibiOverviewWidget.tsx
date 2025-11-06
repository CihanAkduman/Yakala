'use client';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import _ from 'lodash';
import { Tabs, Tab } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

/**
 * The DilEkibiOverviewWidget widget.
 */
function DilEkibiOverviewWidget() {
	const theme = useTheme();
	const [tabValue, setTabValue] = useState(0);

	// Mock data - 3 dil ekibi detaylı KPI'ları
	const widget = {
		teams: ['Almanca Ekip', 'İngilizce Ekip', 'Türkçe Ekip'],
		metrics: {
			'kpi-performans': [
				{
					name: 'Hedef ACHT',
					data: [350, 350, 250]
				},
				{
					name: 'Ortalama ACHT',
					data: [329, 339, 257]
				},
				{
					name: 'Ortalama Çağrı Sayısı',
					data: [525, 447, 798]
				}
			],
			'satis-performans': [
				{
					name: 'Ortalama Satış (€)',
					data: [4595.11, 4892.55, 4234.87]
				},
				{
					name: 'Toplam Satış (k€)',
					data: [183.45, 195.70, 169.39]
				},
				{
					name: 'Range (€)',
					data: [8.75, 9.12, 7.98]
				}
			],
			'genel-metrikler': [
				{
					name: 'Toplam Çağrı (k)',
					data: [21.012, 21.880, 19.920]
				},
				{
					name: 'Ortalama MMA',
					data: [1.52, 1.68, 1.41]
				}
			]
		},
		ranges: {
			'kpi-performans': 'KPI Performansı',
			'satis-performans': 'Satış Performansı',
			'genel-metrikler': 'Genel Metrikler'
		}
	};

	const currentRange = Object.keys(widget.ranges)[tabValue];
	const currentSeries = widget.metrics[currentRange];

	const chartOptions: ApexOptions = {
		chart: {
			fontFamily: 'inherit',
			foreColor: 'inherit',
			height: '100%',
			type: 'bar',
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false
			}
		},
		colors: ['#1976d2', '#388e3c', '#d32f2f', '#f57c00', '#7b1fa2'],
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '60%',
				borderRadius: 4,
				dataLabels: {
					position: 'top'
				}
			}
		},
		dataLabels: {
			enabled: true,
			offsetY: -20,
			style: {
				fontSize: '11px',
				fontWeight: 500
			},
			formatter: (val) => {
				if (currentRange === 'satis-performans' && val > 100) {
					return `€${val.toFixed(0)}`;
				} else if (currentRange === 'genel-metrikler' && val > 10) {
					return `${val.toFixed(1)}k`;
				} else {
					return val.toString();
				}
			}
		},
		legend: {
			show: true,
			position: 'top',
			horizontalAlign: 'left',
			offsetY: -10,
			fontSize: '12px',
			fontWeight: 500
		},
		grid: {
			borderColor: theme.palette.divider,
			strokeDashArray: 3,
			xaxis: {
				lines: {
					show: false
				}
			},
			yaxis: {
				lines: {
					show: true
				}
			}
		},
		stroke: {
			show: true,
			width: 2,
			colors: ['transparent']
		},
		tooltip: {
			theme: 'dark',
			y: {
				formatter: (val) => {
					if (currentRange === 'satis-performans' && val > 100) {
						return `€${val.toLocaleString('de-DE')}`;
					} else if (currentRange === 'genel-metrikler' && val > 10) {
						return `${val.toLocaleString('de-DE')}`;
					} else {
						return val.toString();
					}
				}
			}
		},
		xaxis: {
			categories: widget.teams,
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			},
			labels: {
				style: {
					fontSize: '12px',
					fontWeight: 500
				}
			}
		},
		yaxis: {
			labels: {
				style: {
					fontSize: '11px'
				},
				formatter: (val) => {
					if (currentRange === 'satis-performans' && val > 100) {
						return `€${val.toFixed(0)}`;
					} else if (currentRange === 'genel-metrikler' && val > 10) {
						return `${val.toFixed(0)}k`;
					} else {
						return val.toString();
					}
				}
			}
		}
	};

	return (
		<Paper className="flex flex-auto flex-col overflow-hidden rounded-xl p-6 shadow-sm">
			<div className="flex flex-col items-start justify-between sm:flex-row">
				<div>
					<Typography className="truncate text-lg leading-6 font-medium tracking-tight">
						Dil Ekipleri Detaylı KPI Karşılaştırması
					</Typography>
					<Typography 
						className="mt-1 font-medium"
						color="text.secondary"
					>
						3 dil ekibinin kapsamlı performans göstergeleri
					</Typography>
				</div>
				<div className="mt-3 sm:mt-0">
					<Tabs
						value={tabValue}
						onChange={(_, value: number) => setTabValue(value)}
					>
						{Object.entries(widget.ranges).map(([key, label], index) => (
							<Tab
								key={key}
								value={index}
								label={label}
							/>
						))}
					</Tabs>
				</div>
			</div>

			<div className="mt-6 flex flex-auto flex-col">
				<ReactApexChart
					className="h-96 w-full flex-auto"
					options={chartOptions}
					series={_.cloneDeep(currentSeries)}
					type={chartOptions?.chart?.type}
					height={chartOptions?.chart?.height}
				/>
			</div>
		</Paper>
	);
}

export default memo(DilEkibiOverviewWidget);