'use client';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import { Tabs, Tab } from '@mui/material';
import Chip from '@mui/material/Chip';

/**
 * The GelistirmeOnerileriWidget widget.
 */
function GelistirmeOnerileriWidget() {
	// Mock data
	const widget = {
		series: {
			'bu-hafta': [
				{
					title: 'Müşteri Dinleme Becerilerini Geliştir',
					description: 'Aktif dinleme teknikleri eğitimi alabilirsin',
					priority: 'high',
					category: 'iletisim',
					estimatedTime: '2 hafta'
				},
				{
					title: 'Satış Tekniklerini Güçlendir', 
					description: 'Cross-selling ve up-selling eğitimlerine katıl',
					priority: 'medium',
					category: 'satis',
					estimatedTime: '3 hafta'
				},
				{
					title: 'Stres Yönetimi Eğitimi',
					description: 'Yoğun çağrı trafiğinde sakin kalma teknikleri',
					priority: 'medium', 
					category: 'kisisel',
					estimatedTime: '1 hafta'
				},
				{
					title: 'Sistem Bilgilerini Güncelle',
					description: 'Yeni rezervasyon sistemi özelliklerini öğren',
					priority: 'low',
					category: 'teknik',
					estimatedTime: '1 hafta'
				},
				{
					title: 'Çoklu Dil Desteği',
					description: 'İngilizce iletişim becerilerini geliştir',
					priority: 'low',
					category: 'dil',
					estimatedTime: '4 hafta'
				}
			],
			'gecen-ay': [
				{
					title: 'Empati Kurma Becerileri',
					description: 'Müşteri şikayetlerini daha iyi yönetme',
					priority: 'high',
					category: 'iletisim',
					estimatedTime: '2 hafta'
				},
				{
					title: 'Ürün Bilgisi Güncelleme',
					description: 'Yeni havayolu politikalarını öğren',
					priority: 'medium',
					category: 'urun',
					estimatedTime: '1 hafta'
				},
				{
					title: 'Zaman Yönetimi',
					description: 'Çağrı sürelerini optimize etme teknikleri',
					priority: 'medium',
					category: 'verimlilik',
					estimatedTime: '2 hafta'
				}
			]
		},
		ranges: {
			'bu-hafta': 'Bu Hafta',
			'gecen-ay': 'Geçen Ay'
		}
	};

	const series = widget?.series || [];
	const ranges = widget?.ranges || [];
	const [tabValue, setTabValue] = useState(0);
	const currentRange = Object.keys(ranges)[tabValue];

	const getPriorityConfig = (priority: string) => {
		switch (priority) {
			case 'high':
				return { color: 'error', label: 'Yüksek' };
			case 'medium':
				return { color: 'warning', label: 'Orta' };
			case 'low':
				return { color: 'info', label: 'Düşük' };
			default:
				return { color: 'default', label: 'Normal' };
		}
	};

	const getCategoryIcon = (category: string) => {
		switch (category) {
			case 'iletisim':
				return 'lucide:message-circle';
			case 'satis':
				return 'lucide:trending-up';
			case 'kisisel':
				return 'lucide:user';
			case 'teknik':
				return 'lucide:settings';
			case 'dil':
				return 'lucide:globe';
			case 'urun':
				return 'lucide:package';
			case 'verimlilik':
				return 'lucide:clock';
			default:
				return 'lucide:lightbulb';
		}
	};

	return (
		<Paper className="flex h-full flex-auto flex-col overflow-hidden rounded-xl p-6 shadow-sm">
			<div className="flex flex-col items-start justify-between sm:flex-row">
				<Typography className="truncate text-lg leading-6 font-medium tracking-tight">
					Geliştirme Önerileri
				</Typography>
				<div className="mt-3 sm:mt-0">
					<Tabs
						value={tabValue}
						onChange={(ev, value: number) => setTabValue(value)}
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
			<List className="mt-2 divide-y py-0">
				{series[currentRange].map((item, index) => {
					const priorityConfig = getPriorityConfig(item.priority);
					
					return (
						<ListItem
							key={index}
							secondaryAction={
								<IconButton aria-label="detaylar">
									<FuseSvgIcon>lucide:chevron-right</FuseSvgIcon>
								</IconButton>
							}
							disableGutters
						>
							<div className="flex items-start gap-3 w-full">
								<div className="mt-1">
									<FuseSvgIcon 
										size={20}
										color="action"
									>
										{getCategoryIcon(item.category)}
									</FuseSvgIcon>
								</div>
								<ListItemText
									classes={{ primary: 'font-medium' }}
									primary={
										<div className="flex items-center gap-2 mb-1">
											<span>{item.title}</span>
											<Chip
												label={priorityConfig.label}
												size="small"
												color={priorityConfig.color as any}
												variant="outlined"
											/>
										</div>
									}
									secondary={
										<div className="flex flex-col gap-2">
											<Typography
												component="span"
												className="text-sm"
												color="text.secondary"
											>
												{item.description}
											</Typography>
											<div className="flex items-center gap-2">
												<span className="flex items-center gap-1">
													<FuseSvgIcon size={14} color="disabled">lucide:clock</FuseSvgIcon>
													<Typography
														component="span"
														className="text-xs"
														color="text.secondary"
													>
														{item.estimatedTime}
													</Typography>
												</span>
											</div>
										</div>
									}
								/>
							</div>
						</ListItem>
					);
				})}
			</List>
		</Paper>
	);
}

export default memo(GelistirmeOnerileriWidget);