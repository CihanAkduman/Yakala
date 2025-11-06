'use client';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Chip from '@mui/material/Chip';
import ReactApexChart from 'react-apexcharts';

/**
 * The YillikPerformansWidget widget.
 */
function YillikPerformansWidget() {
	const theme = useTheme();
	const [awaitRender, setAwaitRender] = useState(true);

	// Mock data - yıllık performans
	const performansData = {
		yil: 2025,
		aylikPuanlar: [115, 120, 118, 122, 117, 125],
		aylar: ['Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
		ortalama: 120,
		enYuksek: 125,
		enDusuk: 115,
		rozetler: [
			{
				isim: 'Satış Avcısı',
				aciklama: 'Aylık satış hedefini 3 kez aştı',
				icon: 'lucide:target',
				renk: '#4CAF50',
				tarih: 'Kasım 2024',
				kazanildi: true
			},
			{
				isim: 'Memnuniyet Kralı',
				aciklama: 'Müşteri memnuniyeti %95 üzerinde',
				icon: 'lucide:crown',
				renk: '#FF9800',
				tarih: 'Ekim 2024',
				kazanildi: true
			},
			{
				isim: 'Hız Şampiyonu',
				aciklama: 'AHT hedefini 5 ay üst üste tuttu',
				icon: 'lucide:zap',
				renk: '#2196F3',
				tarih: 'Eylül 2024',
				kazanildi: true
			},
			{
				isim: 'Kalite Ustası',
				aciklama: 'Kalite puanı 6 ay %90 üzerinde',
				icon: 'lucide:award',
				renk: '#9C27B0',
				tarih: 'Ağustos 2024',
				kazanildi: true
			},
			{
				isim: 'Takım Oyuncusu',
				aciklama: 'Meslektaşlarına en çok yardım eden',
				icon: 'lucide:users',
				renk: '#607D8B',
				tarih: '',
				kazanildi: false
			},
			{
				isim: 'Sürekli Gelişim',
				aciklama: '12 ay boyunca artış trendi',
				icon: 'lucide:trending-up',
				renk: '#795548',
				tarih: '',
				kazanildi: false
			}
		]
	};

	// Chart konfigürasyonu
	const chartOptions: ApexOptions = {
		chart: {
			type: 'area',
			height: 280,
			fontFamily: 'inherit',
			foreColor: 'inherit',
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false
			}
		},
		colors: [theme.palette.primary.main],
		dataLabels: {
			enabled: false
		},
		fill: {
			colors: [theme.palette.primary.light],
			opacity: 0.3,
			type: 'solid'
		},
		grid: {
			show: true,
			borderColor: theme.palette.divider,
			padding: {
				top: 10,
				bottom: -10,
				left: 0,
				right: 0
			}
		},
		stroke: {
			curve: 'smooth',
			width: 3
		},
		tooltip: {
			followCursor: true,
			theme: theme.palette.mode,
			x: {
				format: 'MMM yyyy'
			},
			y: {
				formatter: (value) => `${value} puan`
			}
		},
		xaxis: {
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			},
			categories: performansData.aylar,
			labels: {
				style: {
					colors: theme.palette.text.secondary
				}
			}
		},
		yaxis: {
			axisTicks: {
				show: false
			},
			axisBorder: {
				show: false
			},
			labels: {
				style: {
					colors: theme.palette.text.secondary
				},
				formatter: (value) => `${value}`
			},
			min: 110,
			max: 130
		}
	};

	const series = [
		{
			name: 'Performans Puanı',
			data: performansData.aylikPuanlar
		}
	];

	useEffect(() => {
		setAwaitRender(false);
	}, []);

	if (awaitRender) {
		return null;
	}

	return (
		<Paper className="flex flex-auto flex-col overflow-hidden rounded-xl shadow-sm">
			{/* Header */}
			<div className="flex items-center justify-between p-6 pb-4">
				<div>
					<Typography className="text-xl leading-6 font-medium tracking-tight">
						Yıllık Performans Grafiği
					</Typography>
					<Typography
						className="text-sm"
						color="text.secondary"
					>
						{performansData.yil} yılı aylık performans trendi
					</Typography>
				</div>
				<Chip
					label={`Ortalama: ${performansData.ortalama}`}
					size="small"
					color="primary"
					variant="outlined"
				/>
			</div>

			{/* Performans grafiği */}
			<div className="px-6">
				<ReactApexChart
					options={chartOptions}
					series={series}
					type="area"
					height={200}
				/>
			</div>

			{/* İstatistikler */}
			<div className="px-6 py-4">
				<div className="grid grid-cols-3 gap-4 mb-6">
					<div className="text-center">
						<Typography className="text-2xl font-bold" color="primary">
							{performansData.ortalama}
						</Typography>
						<Typography variant="caption" color="text.secondary">
							Yıllık Ortalama
						</Typography>
					</div>
					<div className="text-center">
						<Typography className="text-2xl font-bold text-green-500">
							{performansData.enYuksek}
						</Typography>
						<Typography variant="caption" color="text.secondary">
							En Yüksek
						</Typography>
					</div>
					<div className="text-center">
						<Typography className="text-2xl font-bold text-orange-500">
							{performansData.enDusuk}
						</Typography>
						<Typography variant="caption" color="text.secondary">
							En Düşük
						</Typography>
					</div>
				</div>
			</div>

			{/* Rozetler bölümü */}
			<div className="px-6 pb-6">
				<Typography className="text-lg font-medium mb-4">
					Kazanılan Rozetler
				</Typography>
				
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
					{performansData.rozetler.map((rozet, index) => (
						<Box
							key={index}
							sx={{
								border: `1px solid ${theme.palette.divider}`,
								borderRadius: 2,
								p: 2,
								backgroundColor: rozet.kazanildi 
									? theme.palette.background.paper
									: theme.palette.background.default,
								opacity: rozet.kazanildi ? 1 : 0.5,
								transition: 'all 0.2s ease'
							}}
						>
							<div className="flex items-center gap-3 mb-2">
								<FuseSvgIcon
									size={20}
									style={{ color: rozet.kazanildi ? rozet.renk : theme.palette.text.disabled }}
								>
									{rozet.icon}
								</FuseSvgIcon>
								<Typography
									variant="body2"
									className="font-medium"
									style={{ 
										color: rozet.kazanildi ? theme.palette.text.primary : theme.palette.text.secondary 
									}}
								>
									{rozet.isim}
								</Typography>
							</div>
							
							{rozet.kazanildi && (
								<Typography
									variant="caption"
									className="font-medium"
									style={{ color: rozet.renk }}
								>
									{rozet.tarih}
								</Typography>
							)}
						</Box>
					))}
				</div>
			</div>
		</Paper>
	);
}

export default memo(YillikPerformansWidget);