import { DayCellContentArg } from '@fullcalendar/core';
import Box from '@mui/material/Box';

type CalendarDayCellContentProps = {
	dayInfo: DayCellContentArg;
};

/**
 * Özelleştirilmiş takvim gün hücresi içeriği.
 * 
 * Bu bileşen takvim hücrelerinin içeriğini özelleştirmek için kullanılır.
 * Şu anda sadece gün numarasını gösterir, ancak gelecekte şu özellikler eklenebilir:
 * - Günlük çalışma saati toplamı
 * - Vardiya türü istatistikleri
 * - Özel işaretlemeler (tatil günleri, vb.)
 */
function CalendarDayCellContent(props: CalendarDayCellContentProps) {
	const { dayInfo } = props;

	// Gün numarasını al
	const dayNumber = dayInfo.dayNumberText;

	return (
		<Box className="fc-daygrid-day-top">
			<span className="fc-daygrid-day-number">{dayNumber}</span>
		</Box>
	);
}

export default CalendarDayCellContent;