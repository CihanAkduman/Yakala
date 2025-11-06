'use client';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import IconButton from '@mui/material/IconButton';
import { Tabs, Tab } from '@mui/material';

interface TeamMember {
	id: string;
	sicilNo: string;
	name: string;
	dilGrubu: 'Almanca' | 'İngilizce' | 'Türkçe';
	acht: number;
	achtSapma: number;
	ssrAdet: number;
	ssrTutar: number;
	tscTutar: number;
	tscSsr: number;
	cagriSayisi: number;
	range: number;
	hedef: number;
	mma: number;
	mmaTuslama: number;
	aylikMolaOrani: number;
	performansSkoru: number;
	trend: 'up' | 'down' | 'stable';
}

/**
 * The TeamPerformansWidget widget.
 */
function TeamPerformansWidget() {
	const [tabValue, setTabValue] = useState(0);
	const [sortBy, setSortBy] = useState<keyof TeamMember>('performansSkoru');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

	// Mock data - takım üyeleri (30 kişi toplam)
	const allMembers: TeamMember[] = [
		// ALMANCA EKIP - En iyiler ilk 3'te
		{
			id: '1',
			sicilNo: '91234567',
			name: 'Ahmet Yılmaz',
			dilGrubu: 'Almanca',
			acht: 318,
			achtSapma: -32,
			ssrAdet: 52,
			ssrTutar: 3640,
			tscTutar: 14200,
			tscSsr: 17840,
			cagriSayisi: 567,
			range: 9.1,
			hedef: 350,
			mma: 1.78,
			mmaTuslama: 8,
			aylikMolaOrani: 7.2,
			performansSkoru: 96,
			trend: 'up'
		},
		{
			id: '2',
			sicilNo: '91234568',
			name: 'Ayşe Demir',
			dilGrubu: 'Almanca',
			acht: 325,
			achtSapma: -25,
			ssrAdet: 48,
			ssrTutar: 3360,
			tscTutar: 13800,
			tscSsr: 17160,
			cagriSayisi: 545,
			range: 8.7,
			hedef: 350,
			mma: 1.72,
			mmaTuslama: 9,
			aylikMolaOrani: 7.8,
			performansSkoru: 94,
			trend: 'up'
		},
		{
			id: '3',
			sicilNo: '91234569',
			name: 'Mehmet Özkan',
			dilGrubu: 'Almanca',
			acht: 330,
			achtSapma: -20,
			ssrAdet: 45,
			ssrTutar: 3150,
			tscTutar: 13200,
			tscSsr: 16350,
			cagriSayisi: 523,
			range: 8.4,
			hedef: 350,
			mma: 1.68,
			mmaTuslama: 10,
			aylikMolaOrani: 8.1,
			performansSkoru: 92,
			trend: 'stable'
		},
		{
			id: '4',
			sicilNo: '91234570',
			name: 'Fatma Kaya',
			dilGrubu: 'Almanca',
			acht: 335,
			achtSapma: -15,
			ssrAdet: 41,
			ssrTutar: 2870,
			tscTutar: 13100,
			tscSsr: 15970,
			cagriSayisi: 512,
			range: 8.7,
			hedef: 350,
			mma: 1.62,
			mmaTuslama: 11,
			aylikMolaOrani: 8.3,
			performansSkoru: 88,
			trend: 'stable'
		},
		{
			id: '5',
			sicilNo: '91234571',
			name: 'Mustafa Arslan',
			dilGrubu: 'Almanca',
			acht: 342,
			achtSapma: -8,
			ssrAdet: 38,
			ssrTutar: 2660,
			tscTutar: 12600,
			tscSsr: 15260,
			cagriSayisi: 498,
			range: 8.2,
			hedef: 350,
			mma: 1.58,
			mmaTuslama: 12,
			aylikMolaOrani: 8.6,
			performansSkoru: 85,
			trend: 'down'
		},
		{
			id: '6',
			sicilNo: '91234572',
			name: 'Zeynep Şahin',
			dilGrubu: 'Almanca',
			acht: 348,
			achtSapma: -2,
			ssrAdet: 35,
			ssrTutar: 2450,
			tscTutar: 12100,
			tscSsr: 14550,
			cagriSayisi: 476,
			range: 7.9,
			hedef: 350,
			mma: 1.54,
			mmaTuslama: 13,
			aylikMolaOrani: 8.9,
			performansSkoru: 82,
			trend: 'stable'
		},
		{
			id: '7',
			sicilNo: '91234573',
			name: 'Can Polat',
			dilGrubu: 'Almanca',
			acht: 352,
			achtSapma: 2,
			ssrAdet: 32,
			ssrTutar: 2240,
			tscTutar: 11800,
			tscSsr: 14040,
			cagriSayisi: 465,
			range: 7.6,
			hedef: 350,
			mma: 1.48,
			mmaTuslama: 15,
			aylikMolaOrani: 9.2,
			performansSkoru: 79,
			trend: 'down'
		},
		{
			id: '8',
			sicilNo: '91234574',
			name: 'Elif Tuncer',
			dilGrubu: 'Almanca',
			acht: 356,
			achtSapma: 6,
			ssrAdet: 29,
			ssrTutar: 2030,
			tscTutar: 11200,
			tscSsr: 13230,
			cagriSayisi: 445,
			range: 7.3,
			hedef: 350,
			mma: 1.42,
			mmaTuslama: 16,
			aylikMolaOrani: 9.5,
			performansSkoru: 76,
			trend: 'down'
		},
		{
			id: '9',
			sicilNo: '91234575',
			name: 'Oğuz Eren',
			dilGrubu: 'Almanca',
			acht: 360,
			achtSapma: 10,
			ssrAdet: 26,
			ssrTutar: 1820,
			tscTutar: 10900,
			tscSsr: 12720,
			cagriSayisi: 432,
			range: 7.0,
			hedef: 350,
			mma: 1.38,
			mmaTuslama: 18,
			aylikMolaOrani: 9.8,
			performansSkoru: 73,
			trend: 'down'
		},
		{
			id: '10',
			sicilNo: '91234576',
			name: 'Selin Aydın',
			dilGrubu: 'Almanca',
			acht: 365,
			achtSapma: 15,
			ssrAdet: 23,
			ssrTutar: 1610,
			tscTutar: 10400,
			tscSsr: 12010,
			cagriSayisi: 418,
			range: 6.7,
			hedef: 350,
			mma: 1.32,
			mmaTuslama: 20,
			aylikMolaOrani: 10.1,
			performansSkoru: 70,
			trend: 'stable'
		},
		// İNGİLİZCE EKIP - En iyiler ilk 3'te
		{
			id: '11',
			sicilNo: '91234577',
			name: 'Burak Çelik',
			dilGrubu: 'İngilizce',
			acht: 312,
			achtSapma: -28,
			ssrAdet: 55,
			ssrTutar: 3850,
			tscTutar: 14800,
			tscSsr: 18650,
			cagriSayisi: 582,
			range: 9.4,
			hedef: 340,
			mma: 1.82,
			mmaTuslama: 7,
			aylikMolaOrani: 6.9,
			performansSkoru: 98,
			trend: 'up'
		},
		{
			id: '12',
			sicilNo: '91234578',
			name: 'Deniz Koç',
			dilGrubu: 'İngilizce',
			acht: 318,
			achtSapma: -22,
			ssrAdet: 51,
			ssrTutar: 3570,
			tscTutar: 14300,
			tscSsr: 17870,
			cagriSayisi: 568,
			range: 9.1,
			hedef: 340,
			mma: 1.76,
			mmaTuslama: 8,
			aylikMolaOrani: 7.4,
			performansSkoru: 95,
			trend: 'up'
		},
		{
			id: '13',
			sicilNo: '91234579',
			name: 'Gizem Aktaş',
			dilGrubu: 'İngilizce',
			acht: 324,
			achtSapma: -16,
			ssrAdet: 47,
			ssrTutar: 3290,
			tscTutar: 13900,
			tscSsr: 17190,
			cagriSayisi: 551,
			range: 8.8,
			hedef: 340,
			mma: 1.71,
			mmaTuslama: 9,
			aylikMolaOrani: 7.7,
			performansSkoru: 93,
			trend: 'up'
		},
		{
			id: '14',
			sicilNo: '91234580',
			name: 'Emre Gür',
			dilGrubu: 'İngilizce',
			acht: 330,
			achtSapma: -10,
			ssrAdet: 43,
			ssrTutar: 3010,
			tscTutar: 13400,
			tscSsr: 16410,
			cagriSayisi: 534,
			range: 8.5,
			hedef: 340,
			mma: 1.65,
			mmaTuslama: 10,
			aylikMolaOrani: 8.0,
			performansSkoru: 89,
			trend: 'stable'
		},
		{
			id: '15',
			sicilNo: '91234581',
			name: 'Pınar Uçar',
			dilGrubu: 'İngilizce',
			acht: 336,
			achtSapma: -4,
			ssrAdet: 39,
			ssrTutar: 2730,
			tscTutar: 12900,
			tscSsr: 15630,
			cagriSayisi: 518,
			range: 8.2,
			hedef: 340,
			mma: 1.59,
			mmaTuslama: 12,
			aylikMolaOrani: 8.4,
			performansSkoru: 86,
			trend: 'stable'
		},
		{
			id: '16',
			sicilNo: '91234582',
			name: 'Kemal Yurt',
			dilGrubu: 'İngilizce',
			acht: 342,
			achtSapma: 2,
			ssrAdet: 36,
			ssrTutar: 2520,
			tscTutar: 12400,
			tscSsr: 14920,
			cagriSayisi: 501,
			range: 7.9,
			hedef: 340,
			mma: 1.53,
			mmaTuslama: 14,
			aylikMolaOrani: 8.7,
			performansSkoru: 83,
			trend: 'down'
		},
		{
			id: '17',
			sicilNo: '91234583',
			name: 'Ceren Bal',
			dilGrubu: 'İngilizce',
			acht: 347,
			achtSapma: 7,
			ssrAdet: 33,
			ssrTutar: 2310,
			tscTutar: 11900,
			tscSsr: 14210,
			cagriSayisi: 485,
			range: 7.6,
			hedef: 340,
			mma: 1.47,
			mmaTuslama: 16,
			aylikMolaOrani: 9.0,
			performansSkoru: 80,
			trend: 'down'
		},
		{
			id: '18',
			sicilNo: '91234584',
			name: 'Hakan İpek',
			dilGrubu: 'İngilizce',
			acht: 352,
			achtSapma: 12,
			ssrAdet: 30,
			ssrTutar: 2100,
			tscTutar: 11500,
			tscSsr: 13600,
			cagriSayisi: 468,
			range: 7.3,
			hedef: 340,
			mma: 1.41,
			mmaTuslama: 17,
			aylikMolaOrani: 9.3,
			performansSkoru: 77,
			trend: 'stable'
		},
		{
			id: '19',
			sicilNo: '91234585',
			name: 'Merve Tan',
			dilGrubu: 'İngilizce',
			acht: 358,
			achtSapma: 18,
			ssrAdet: 27,
			ssrTutar: 1890,
			tscTutar: 11000,
			tscSsr: 12890,
			cagriSayisi: 452,
			range: 7.0,
			hedef: 340,
			mma: 1.35,
			mmaTuslama: 19,
			aylikMolaOrani: 9.6,
			performansSkoru: 74,
			trend: 'down'
		},
		{
			id: '20',
			sicilNo: '91234586',
			name: 'Serkan Öz',
			dilGrubu: 'İngilizce',
			acht: 363,
			achtSapma: 23,
			ssrAdet: 24,
			ssrTutar: 1680,
			tscTutar: 10600,
			tscSsr: 12280,
			cagriSayisi: 436,
			range: 6.7,
			hedef: 340,
			mma: 1.29,
			mmaTuslama: 21,
			aylikMolaOrani: 9.9,
			performansSkoru: 71,
			trend: 'stable'
		},
		// TÜRKÇE EKIP - En iyiler ilk 3'te
		{
			id: '21',
			sicilNo: '91234587',
			name: 'Tolga Kara',
			dilGrubu: 'Türkçe',
			acht: 340,
			achtSapma: -20,
			ssrAdet: 49,
			ssrTutar: 3430,
			tscTutar: 13600,
			tscSsr: 17030,
			cagriSayisi: 548,
			range: 8.9,
			hedef: 360,
			mma: 1.74,
			mmaTuslama: 9,
			aylikMolaOrani: 7.5,
			performansSkoru: 97,
			trend: 'up'
		},
		{
			id: '22',
			sicilNo: '91234588',
			name: 'Neslihan Oral',
			dilGrubu: 'Türkçe',
			acht: 345,
			achtSapma: -15,
			ssrAdet: 45,
			ssrTutar: 3150,
			tscTutar: 13200,
			tscSsr: 16350,
			cagriSayisi: 532,
			range: 8.6,
			hedef: 360,
			mma: 1.69,
			mmaTuslama: 10,
			aylikMolaOrani: 7.9,
			performansSkoru: 94,
			trend: 'up'
		},
		{
			id: '23',
			sicilNo: '91234589',
			name: 'Volkan Ulu',
			dilGrubu: 'Türkçe',
			acht: 350,
			achtSapma: -10,
			ssrAdet: 42,
			ssrTutar: 2940,
			tscTutar: 12800,
			tscSsr: 15740,
			cagriSayisi: 516,
			range: 8.3,
			hedef: 360,
			mma: 1.63,
			mmaTuslama: 11,
			aylikMolaOrani: 8.2,
			performansSkoru: 91,
			trend: 'stable'
		},
		{
			id: '24',
			sicilNo: '91234590',
			name: 'Sibel Kurt',
			dilGrubu: 'Türkçe',
			acht: 356,
			achtSapma: -4,
			ssrAdet: 38,
			ssrTutar: 2660,
			tscTutar: 12300,
			tscSsr: 14960,
			cagriSayisi: 499,
			range: 8.0,
			hedef: 360,
			mma: 1.57,
			mmaTuslama: 12,
			aylikMolaOrani: 8.5,
			performansSkoru: 87,
			trend: 'stable'
		},
		{
			id: '25',
			sicilNo: '91234591',
			name: 'Cem Yavuz',
			dilGrubu: 'Türkçe',
			acht: 362,
			achtSapma: 2,
			ssrAdet: 35,
			ssrTutar: 2450,
			tscTutar: 11900,
			tscSsr: 14350,
			cagriSayisi: 483,
			range: 7.7,
			hedef: 360,
			mma: 1.51,
			mmaTuslama: 14,
			aylikMolaOrani: 8.8,
			performansSkoru: 84,
			trend: 'down'
		},
		{
			id: '26',
			sicilNo: '91234592',
			name: 'Tuğba Esen',
			dilGrubu: 'Türkçe',
			acht: 368,
			achtSapma: 8,
			ssrAdet: 32,
			ssrTutar: 2240,
			tscTutar: 11500,
			tscSsr: 13740,
			cagriSayisi: 467,
			range: 7.4,
			hedef: 360,
			mma: 1.45,
			mmaTuslama: 15,
			aylikMolaOrani: 9.1,
			performansSkoru: 81,
			trend: 'stable'
		},
		{
			id: '27',
			sicilNo: '91234593',
			name: 'Murat Kılıç',
			dilGrubu: 'Türkçe',
			acht: 374,
			achtSapma: 14,
			ssrAdet: 29,
			ssrTutar: 2030,
			tscTutar: 11100,
			tscSsr: 13130,
			cagriSayisi: 451,
			range: 7.1,
			hedef: 360,
			mma: 1.39,
			mmaTuslama: 17,
			aylikMolaOrani: 9.4,
			performansSkoru: 78,
			trend: 'down'
		},
		{
			id: '28',
			sicilNo: '91234594',
			name: 'Esra Güneş',
			dilGrubu: 'Türkçe',
			acht: 380,
			achtSapma: 20,
			ssrAdet: 26,
			ssrTutar: 1820,
			tscTutar: 10700,
			tscSsr: 12520,
			cagriSayisi: 435,
			range: 6.8,
			hedef: 360,
			mma: 1.33,
			mmaTuslama: 19,
			aylikMolaOrani: 9.7,
			performansSkoru: 75,
			trend: 'down'
		},
		{
			id: '29',
			sicilNo: '91234595',
			name: 'Onur Doğan',
			dilGrubu: 'Türkçe',
			acht: 385,
			achtSapma: 25,
			ssrAdet: 23,
			ssrTutar: 1610,
			tscTutar: 10300,
			tscSsr: 11910,
			cagriSayisi: 419,
			range: 6.5,
			hedef: 360,
			mma: 1.27,
			mmaTuslama: 21,
			aylikMolaOrani: 10.0,
			performansSkoru: 72,
			trend: 'stable'
		},
		{
			id: '30',
			sicilNo: '91234596',
			name: 'Betül Çakır',
			dilGrubu: 'Türkçe',
			acht: 390,
			achtSapma: 30,
			ssrAdet: 20,
			ssrTutar: 1400,
			tscTutar: 9900,
			tscSsr: 11300,
			cagriSayisi: 403,
			range: 6.2,
			hedef: 360,
			mma: 1.21,
			mmaTuslama: 23,
			aylikMolaOrani: 10.3,
			performansSkoru: 69,
			trend: 'down'
		}
	];

	const dilGroupData = {
		'hepsi': allMembers,
		'almanca': allMembers.filter(m => m.dilGrubu === 'Almanca'),
		'ingilizce': allMembers.filter(m => m.dilGrubu === 'İngilizce'),
		'turkce': allMembers.filter(m => m.dilGrubu === 'Türkçe')
	};

	const tabKeys = ['hepsi', 'almanca', 'ingilizce', 'turkce'];
	const tabLabels = ['Tüm Takım', 'Almanca Ekip', 'İngilizce Ekip', 'Türkçe Ekip'];
	const currentMembers = dilGroupData[tabKeys[tabValue]];

	// Sıralama - performans skoruna göre varsayılan olarak yüksekten düşüğe
	const sortedMembers = [...currentMembers].sort((a, b) => {
		if (sortBy === 'performansSkoru') {
			return sortOrder === 'desc' ? b.performansSkoru - a.performansSkoru : a.performansSkoru - b.performansSkoru;
		}
		
		const aVal = a[sortBy];
		const bVal = b[sortBy];
		const multiplier = sortOrder === 'asc' ? 1 : -1;
		return (aVal < bVal ? -1 : aVal > bVal ? 1 : 0) * multiplier;
	});

	const handleSort = (column: keyof TeamMember) => {
		if (sortBy === column) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortBy(column);
			setSortOrder('desc');
		}
	};

	const getDilGrupColor = (dilGrubu: string) => {
		switch (dilGrubu) {
			case 'Almanca':
				return { backgroundColor: '#1976d220', color: '#1976d2' };
			case 'İngilizce':
				return { backgroundColor: '#388e3c20', color: '#388e3c' };
			case 'Türkçe':
				return { backgroundColor: '#d32f2f20', color: '#d32f2f' };
			default:
				return {};
		}
	};

	const getTrendIcon = (trend: string) => {
		switch (trend) {
			case 'up':
				return <FuseSvgIcon size={16} className="text-green-500">lucide:trending-up</FuseSvgIcon>;
			case 'down':
				return <FuseSvgIcon size={16} className="text-red-500">lucide:trending-down</FuseSvgIcon>;
			case 'stable':
				return <FuseSvgIcon size={16} className="text-gray-500">lucide:minus</FuseSvgIcon>;
			default:
				return null;
		}
	};

	const getPerformanceColor = (score: number) => {
		if (score >= 90) return 'success';
		if (score >= 80) return 'warning';
		return 'error';
	};

	return (
		<Paper className="flex flex-auto flex-col overflow-hidden rounded-xl p-6 shadow-sm">
			<div className="flex flex-col items-start justify-between sm:flex-row mb-4">
				<div>
					<Typography className="truncate text-lg leading-6 font-medium tracking-tight">
						Takım Performans Sıralaması
					</Typography>
					<Typography 
						className="mt-1 font-medium"
						color="text.secondary"
					>
						Detaylı çalışan performans metrikleri ve sıralama
					</Typography>
				</div>
				<div className="mt-3 sm:mt-0">
					<Tabs
						value={tabValue}
						onChange={(_, value: number) => setTabValue(value)}
					>
						{tabLabels.map((label, index) => (
							<Tab
								key={index}
								value={index}
								label={label}
							/>
						))}
					</Tabs>
				</div>
			</div>

			<div className="table-responsive">
				<Table className="simple table w-full min-w-full">
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell>
								<IconButton size="small" onClick={() => handleSort('sicilNo')}>
									Sicil No
									<FuseSvgIcon size={14}>lucide:arrow-up-down</FuseSvgIcon>
								</IconButton>
							</TableCell>
							<TableCell>
								<IconButton size="small" onClick={() => handleSort('name')}>
									İsim
									<FuseSvgIcon size={14}>lucide:arrow-up-down</FuseSvgIcon>
								</IconButton>
							</TableCell>
							<TableCell>Dil Grubu</TableCell>
							<TableCell>ACHT</TableCell>
							<TableCell>ACHT Sapma</TableCell>
							<TableCell>SSR Adet</TableCell>
							<TableCell>SSR Tutar</TableCell>
							<TableCell>TSC Tutar</TableCell>
							<TableCell>TSC-SSR</TableCell>
							<TableCell>Çağrı Sayısı</TableCell>
							<TableCell>Range</TableCell>
							<TableCell>MMA</TableCell>
							<TableCell>Mola Oranı</TableCell>
							<TableCell>
								<IconButton size="small" onClick={() => handleSort('performansSkoru')}>
									Skor
									<FuseSvgIcon size={14}>lucide:arrow-up-down</FuseSvgIcon>
								</IconButton>
							</TableCell>
							<TableCell>Trend</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{sortedMembers.map((member, index) => (
							<TableRow key={member.id}>
								<TableCell>
									<Typography className="font-bold">
										{index + 1}
									</Typography>
								</TableCell>
								<TableCell>
									<Typography className="font-mono text-sm">
										{member.sicilNo}
									</Typography>
</TableCell>
								<TableCell>
									<Typography className="font-medium">
										{member.name}
									</Typography>
								</TableCell>
								<TableCell>
									<Chip
										label={member.dilGrubu}
										size="small"
										sx={getDilGrupColor(member.dilGrubu)}
									/>
								</TableCell>
								<TableCell>
									<Typography className={member.acht <= member.hedef ? 'text-green-600 font-semibold' : ''}>
										{member.acht}
									</Typography>
								</TableCell>
								<TableCell>
									<Typography className={member.achtSapma < 0 ? 'text-green-600' : 'text-red-600'}>
										{member.achtSapma > 0 ? '+' : ''}{member.achtSapma}
									</Typography>
								</TableCell>
								<TableCell>{member.ssrAdet}</TableCell>
								<TableCell>
									€{member.ssrTutar.toLocaleString('de-DE')}
								</TableCell>
								<TableCell>
									€{member.tscTutar.toLocaleString('de-DE')}
								</TableCell>
								<TableCell>
									<Typography className="font-semibold">
										€{member.tscSsr.toLocaleString('de-DE')}
									</Typography>
								</TableCell>
								<TableCell>{member.cagriSayisi}</TableCell>
								<TableCell>€{member.range}</TableCell>
								<TableCell>{member.mma}</TableCell>
								<TableCell>{member.aylikMolaOrani}%</TableCell>
								<TableCell>
									<Chip
										label={member.performansSkoru}
										size="small"
										color={getPerformanceColor(member.performansSkoru)}
										variant="filled"
									/>
								</TableCell>
								<TableCell>
									{getTrendIcon(member.trend)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</Paper>
	);
}

export default memo(TeamPerformansWidget);