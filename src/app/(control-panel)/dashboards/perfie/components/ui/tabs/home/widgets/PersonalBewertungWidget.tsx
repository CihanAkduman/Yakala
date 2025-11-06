'use client';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Chip from '@mui/material/Chip';

/**
 * The PersonalBewertungWidget widget.
 */
function PersonalBewertungWidget() {
	const theme = useTheme();

	// Mock data
	const performansData = {
		toplam: 142,
		seviye: 'OB',
		kategoriler: [
			{ isim: 'Kalite', puan: 38, max: 40, icon: 'lucide:shield-check', color: '#2196F3' },
			{ isim: 'Satış', puan: 35, max: 40, icon: 'lucide:trending-up', color: '#4CAF50' },
			{ isim: 'AHT', puan: 34, max: 40, icon: 'lucide:clock', color: '#FF9800' },
			{ isim: 'Müşteri Memnuniyeti', puan: 35, max: 40, icon: 'lucide:heart', color: '#9C27B0' }
		],
		trend: 7
	};

	return (
		<Paper className="flex flex-auto flex-col overflow-hidden rounded-xl shadow-sm">
			{/* Header */}
			<div className="flex items-center justify-between p-6 pb-4">
				<Typography className="text-xl leading-6 font-medium tracking-tight">
					Performans Değerlendirmem
				</Typography>
				<Chip
					label={performansData.seviye}
					size="small"
					color="primary"
					variant="outlined"
				/>
			</div>

			{/* Ana içerik */}
			<div className="px-6 pb-6">
				{/* Toplam skor */}
				<div className="text-center mb-8">
					<Typography className="text-7xl leading-none font-bold tracking-tight">
						{performansData.toplam}
					</Typography>
					<Typography
						className="text-lg font-medium mt-2"
						color="text.secondary"
					>
						Toplam Performans Puanı
					</Typography>
					
					{/* Trend göstergesi */}
					<div className="flex items-center justify-center gap-2 mt-3">
						<FuseSvgIcon
							size={18}
							className="text-green-500"
						>
							lucide:trending-up
						</FuseSvgIcon>
						<Typography
							className="text-sm font-medium text-green-500"
						>
							+{performansData.trend} geçen aya göre
						</Typography>
					</div>
				</div>

				{/* Kategori kartları */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{performansData.kategoriler.map((kategori, index) => {
						const yuzde = Math.round((kategori.puan / kategori.max) * 100);
						
						return (
							<Box
								key={index}
								sx={{
									border: `1px solid ${theme.palette.divider}`,
									borderRadius: 2,
									p: 3,
									backgroundColor: theme.palette.background.paper
								}}
							>
								<div className="flex items-center justify-between mb-3">
									<div className="flex items-center gap-2">
										<FuseSvgIcon
											size={20}
											style={{ color: kategori.color }}
										>
											{kategori.icon}
										</FuseSvgIcon>
										<Typography
											variant="body2"
											className="font-medium"
										>
											{kategori.isim}
										</Typography>
									</div>
									<Typography
										variant="h6"
										className="font-bold"
										style={{ color: kategori.color }}
									>
										{kategori.puan}
									</Typography>
								</div>
								
								{/* Progress bar */}
								<Box
									sx={{
										width: '100%',
										height: 6,
										backgroundColor: theme.palette.background.default,
										borderRadius: 3,
										overflow: 'hidden',
										mb: 1
									}}
								>
									<Box
										sx={{
											width: `${yuzde}%`,
											height: '100%',
											backgroundColor: kategori.color,
											transition: 'width 0.5s ease'
										}}
									/>
								</Box>
								
								<div className="flex justify-between items-center">
									<Typography
										variant="caption"
										color="text.secondary"
									>
										{kategori.max} puan üzerinden
									</Typography>
									<Typography
										variant="caption"
										className="font-medium"
										style={{ color: kategori.color }}
									>
										%{yuzde}
									</Typography>
								</div>
							</Box>
						);
					})}
				</div>

				{/* Alt bilgi */}
				<div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
					<Typography
						variant="body2"
						className="text-center"
						color="primary"
					>
						Hedefinize ulaşmak için Satış ve AHT kategorilerine odaklanın
					</Typography>
				</div>
			</div>
		</Paper>
	);
}

export default memo(PersonalBewertungWidget);