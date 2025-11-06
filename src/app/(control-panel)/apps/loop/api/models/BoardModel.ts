import _ from 'lodash';
import { PartialDeep } from 'type-fest';
import { ScrumboardBoard, ScrumboardCard } from '../types';

export type CardIdsType = ScrumboardCard['id'][];

/**
 * LOOP/QM Platform Board Model
 * GlobalBilgi - SunExpress Müşteri Temsilciliği için LOOP ve QM platformları
 */
function BoardModel(data?: PartialDeep<ScrumboardBoard>): ScrumboardBoard {
	data = data || {};

	// Board türüne göre varsayılan değerler
	const getDefaultValues = () => {
		const title = data.title?.toLowerCase() || '';
		
		if (title.includes('loop') || title.includes('hata')) {
			return {
				title: 'LOOP - Sistematik Hata Analizi',
				description: 'Tekrarlayan hataları sistemsel gelişim fırsatına dönüştüren platform. Corpix entegrasyonu ile otomatik eğitim atama.',
				icon: 'lucide:refresh-ccw'
			};
		} else if (title.includes('qm') || title.includes('kalite')) {
			return {
				title: 'QM - Kalite Yönetimi',
				description: 'Sürekli iyileştirme döngüsü için kalite sorunlarını tespit ve çözüm platformu',
				icon: 'lucide:shield-check'
			};
		} else if (title.includes('eğitim') || title.includes('corpix')) {
			return {
				title: 'Corpix Eğitim Platformu',
				description: 'LOOP entegrasyonu ile otomatik eğitim içeriği atama sistemi',
				icon: 'lucide:graduation-cap'
			};
		}
		
		return {
			title: 'Yeni LOOP/QM Projesi',
			description: 'SunExpress müşteri temsilciliği kalite ve gelişim projesi',
			icon: 'lucide:clipboard-list'
		};
	};

	const defaults = getDefaultValues();

	// Board türüne göre varsayılan etiketler
	const getDefaultLabels = () => {
		const title = data.title?.toLowerCase() || '';
		
		if (title.includes('loop') || title.includes('hata')) {
			return [
				{ id: 'kritik-oncelik', title: 'Kritik Öncelik' },
				{ id: 'loop-sureci', title: 'LOOP Süreci' },
				{ id: 'teknik-hata', title: 'Teknik Hata' },
				{ id: 'surecsel-hata', title: 'Süreç Hatası' },
				{ id: 'tekrarlayan-hata', title: 'Tekrarlayan Hata' },
				{ id: 'corpix-analizi', title: 'Corpix Analizi' }
			];
		} else if (title.includes('qm') || title.includes('kalite')) {
			return [
				{ id: 'kritik-oncelik', title: 'Kritik Öncelik' },
				{ id: 'qm-sureci', title: 'QM Süreci' },
				{ id: 'musteri-odakli', title: 'Müşteri Odaklı' },
				{ id: 'rezervasyon-sorunu', title: 'Rezervasyon Sorunu' },
				{ id: 'checkin-sorunu', title: 'Check-in Sorunu' },
				{ id: 'bagaj-sorunu', title: 'Bagaj Sorunu' }
			];
		}
		
		// Genel projeler için
		return [
			{ id: 'kritik-oncelik', title: 'Kritik Öncelik' },
			{ id: 'yuksek-oncelik', title: 'Yüksek Öncelik' },
			{ id: 'orta-oncelik', title: 'Orta Öncelik' },
			{ id: 'dusuk-oncelik', title: 'Düşük Öncelik' },
			{ id: 'loop-sureci', title: 'LOOP Süreci' },
			{ id: 'qm-sureci', title: 'QM Süreci' }
		];
	};

	return _.defaults(data, {
		id: _.uniqueId(),
		title: defaults.title,
		description: defaults.description,
		icon: defaults.icon,
		lastActivity: new Date(),
		members: [],
		settings: {
			subscribed: true,
			cardCoverImages: true
		},
		lists: [],
		labels: getDefaultLabels()
	});
}

export default BoardModel;