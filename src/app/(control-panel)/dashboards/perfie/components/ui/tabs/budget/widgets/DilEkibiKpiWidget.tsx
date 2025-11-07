'use client';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { ApexOptions } from 'apexcharts';
import _ from 'lodash';
import ReactApexChart from 'react-apexcharts';

/**
 * The DilEkibiKpiWidget widget.
 */
function DilEkibiKpiWidget() {
	const theme = useTheme();

	// Mock data - 3 dil ekibi KPI'ları
	const widget = {
		categories: [
			'Satış Hedefi',
			'Müşteri Memnuniyeti', 
			'Çağrı Süresi',
			'Dönüşüm Oranı',
			'SSR Satışı',
			'Müşteri Sadakati'
		],
		series: [
			{
				name: 'Almanca Ekip',
				data: [75, 92, 78, 88, 95, 82]
			},
			{
				name: 'Türkçe Ekip', 
				data: [68, 85, 85, 82, 88, 79]
			},
			{
				name: 'İngilizce Ekip',
				data: [78, 88, 75, 91, 92, 87]
			}
		]
	};

	const categories = widget?.categories;
	const series = widget?.series || [];

	const chartOptions: ApexOptions = {
		chart: {
			fontFamily: 'inherit',
			foreColor: 'inherit',
			height: '100%',
			type: 'radar',
			sparkline: {
				enabled: true
			}
		},
		colors: [
			'#1976d2', // Mavi - Almanca
			'#d32f2f', // Kırmızı - Türkçe  
			'#388e3c'  // Yeşil - İngilizce
		],
		dataLabels: {
			enabled: true,
			formatter: (val: string) => `${val}%`,
			textAnchor: 'start',
			style: {
				fontSize: '10px',
				fontWeight: 500
			},
			background: {
				borderWidth: 0,
				padding: 4
			},
			offsetY: -15
		},
		legend: {
			show: true,
			position: 'bottom',
			horizontalAlign: 'center',
			fontSize: '13px',
			fontWeight: 500,
			markers: {
				size: 12
			}
		},
		markers: {
			size: 4,
			strokeWidth: 2
		},
		plotOptions: {
			radar: {
				polygons: {
					strokeColors: theme.palette.divider,
					connectorColors: theme.palette.divider
				}
			}
		},
		stroke: {
			width: 2
		},
		tooltip: {
			theme: 'dark',
			y: {
formatter: (val) => {
    const numVal = Array.isArray(val) ? val[0] : Number(val); // string veya array'i number'a çevir

    if (currentRange === 'satis-performans' && numVal > 100) {
        return `€${numVal.toFixed(0)}`;
    } else if (currentRange === 'genel-metrikler' && numVal > 10) {
        return `${numVal.toFixed(1)}k`;
    }

    return `${numVal}`;
}
}
		},
		xaxis: {
			labels: {
				show: true,
				style: {
					fontSize: '11px',
					fontWeight: '500'
				}
			},
			categories
		},
		yaxis: {
			show: false, // Bu satırı ekle - yüzde değerlerini gizler
			max: 100,
			min: 0,
			tickAmount: 5,
			labels: {
				formatter: (val) => `${val}%`
			}
		}
	};

	return (
		<Paper className="flex h-full flex-auto flex-col overflow-hidden rounded-xl p-6 shadow-sm">
			<Typography className="truncate text-lg leading-6 font-medium tracking-tight">
				Dil Ekibi KPI Karşılaştırması
			</Typography>
			<Typography 
				className="mt-1 text-sm"
				color="text.secondary"
			>
				3 dil ekibinin performans göstergeleri
			</Typography>

			<div className="flex flex-auto flex-col mt-4">
				<ReactApexChart
					className="h-80 w-full flex-auto"
					options={chartOptions}
					series={_.cloneDeep(series)}
					type={chartOptions?.chart?.type}
					height={chartOptions?.chart?.height}
				/>
			</div>

			{/* KPI Özet */}
			<div className="mt-4 grid grid-cols-3 gap-4 text-center">
				<div className="p-3 rounded-lg" style={{ backgroundColor: '#1976d220' }}>
					<Typography variant="h6" className="font-bold" style={{ color: '#1976d2' }}>
						167.787,14 €
					</Typography>
					<Typography variant="caption" color="text.secondary">
						Almanca Ekip
					</Typography>
				</div>
				<div className="p-3 rounded-lg" style={{ backgroundColor: '#d32f2f20' }}>
					<Typography variant="h6" className="font-bold" style={{ color: '#d32f2f' }}>
						156.784,25 €
					</Typography>
					<Typography variant="caption" color="text.secondary">
						Türkçe Ekip
					</Typography>
				</div>
				<div className="p-3 rounded-lg" style={{ backgroundColor: '#388e3c20' }}>
					<Typography variant="h6" className="font-bold" style={{ color: '#388e3c' }}>
						177.133,35 €
					</Typography>
					<Typography variant="caption" color="text.secondary">
						İngilizce Ekip
					</Typography>
				</div>
			</div>
		</Paper>
	);
}

export default memo(DilEkibiKpiWidget);
