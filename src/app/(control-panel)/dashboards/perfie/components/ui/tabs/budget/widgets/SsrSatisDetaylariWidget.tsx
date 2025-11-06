'use client';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import Chip from '@mui/material/Chip';

/**
 * The SsrSatisDetaylariWidget widget.
 */
function SsrSatisDetaylariWidget() {
	// Mock data - SSR satış detayları
	const widget = {
		columns: [
			'SSR Türü',
			'Satış Adedi',
			'Toplam Gelir',
			'Ort. Birim Fiyat',
			'Dil Ekibi',
			'Durum'
		],
		rows: [
			{
				ssrType: 'Koltuk Seçimi',
				salesCount: 1250,
				totalRevenue: 87500,
				avgPrice: 70,
				team: 'Almanca',
				status: 'strong'
			},
			{
				ssrType: 'Ek Bagaj',
				salesCount: 890,
				totalRevenue: 62300,
				avgPrice: 70,
				team: 'İngilizce', 
				status: 'strong'
			},
			{
				ssrType: 'VIP Hizmetler',
				salesCount: 320,
				totalRevenue: 96000,
				avgPrice: 300,
				team: 'Türkçe',
				status: 'moderate'
			},
			{
				ssrType: 'Bundle Paket',
				salesCount: 450,
				totalRevenue: 67500,
				avgPrice: 150,
				team: 'Almanca',
				status: 'strong'
			},
			{
				ssrType: 'Meal Upgrade',
				salesCount: 680,
				totalRevenue: 27200,
				avgPrice: 40,
				team: 'İngilizce',
				status: 'moderate'
			},
			{
				ssrType: 'Priority Boarding',
				salesCount: 540,
				totalRevenue: 16200,
				avgPrice: 30,
				team: 'Türkçe',
				status: 'weak'
			},
			{
				ssrType: 'Lounge Erişimi',
				salesCount: 180,
				totalRevenue: 18000,
				avgPrice: 100,
				team: 'Almanca',
				status: 'weak'
			}
		]
	};

	const { columns, rows } = widget;

	const getStatusChip = (status: string) => {
		switch (status) {
			case 'strong':
				return <Chip label="Güçlü" size="small" color="success" variant="filled" />;
			case 'moderate':
				return <Chip label="Orta" size="small" color="warning" variant="filled" />;
			case 'weak':
				return <Chip label="Zayıf" size="small" color="error" variant="filled" />;
			default:
				return <Chip label="Normal" size="small" variant="outlined" />;
		}
	};

	const getTeamColor = (team: string) => {
		switch (team) {
			case 'Almanca':
				return { backgroundColor: '#1976d220', color: '#1976d2' };
			case 'Türkçe':
				return { backgroundColor: '#d32f2f20', color: '#d32f2f' };
			case 'İngilizce':
				return { backgroundColor: '#388e3c20', color: '#388e3c' };
			default:
				return {};
		}
	};

	return (
		<Paper className="flex flex-auto flex-col overflow-hidden rounded-xl p-6 shadow-sm">
			<Typography className="truncate text-lg leading-6 font-medium tracking-tight">
				SSR Satış Detayları
			</Typography>
			<Typography 
				className="mt-1 text-sm"
				color="text.secondary"
			>
				Special Service Request satış performansı
			</Typography>

			<div className="table-responsive mt-6">
				<Table className="simple table w-full min-w-full">
					<TableHead>
						<TableRow>
							{columns.map((column, index) => (
								<TableCell key={index}>
									<Typography
										color="text.secondary"
										className="text-md font-semibold whitespace-nowrap"
									>
										{column}
									</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{rows.map((row, index) => (
							<TableRow key={index}>
								<TableCell component="th" scope="row">
									<Typography className="font-medium">
										{row.ssrType}
									</Typography>
								</TableCell>
								
								<TableCell>
									<Typography>
										{row.salesCount.toLocaleString('de-DE')}
									</Typography>
								</TableCell>
								
								<TableCell>
									<Typography className="font-semibold">
										{row.totalRevenue.toLocaleString('de-DE', {
											style: 'currency',
											currency: 'EUR'
										})}
									</Typography>
								</TableCell>
								
								<TableCell>
									<Typography>
										{row.avgPrice.toLocaleString('de-DE', {
											style: 'currency',
											currency: 'EUR'
										})}
									</Typography>
								</TableCell>
								
								<TableCell>
									<Chip
										label={row.team}
										size="small"
										variant="filled"
										sx={getTeamColor(row.team)}
									/>
								</TableCell>
								
								<TableCell>
									{getStatusChip(row.status)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</Paper>
	);
}

export default memo(SsrSatisDetaylariWidget);