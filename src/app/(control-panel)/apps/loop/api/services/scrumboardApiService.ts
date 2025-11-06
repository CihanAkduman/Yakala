import { api } from '@/utils/api';
import _ from 'lodash';
import reorder, { reorderQuoteMap } from '../../lib/utils/reorder';
import CardModel from '../models/CardModel';
import BoardModel from '../models/BoardModel';
import {
	ScrumboardMember,
	ScrumboardList,
	ScrumboardLabel,
	ScrumboardCard,
	ScrumboardBoard,
	OrderResult
} from '../types';
import { PartialDeep } from 'type-fest';

/**
 * LOOP/QM Platform API Service
 * GlobalBilgi - SunExpress Müşteri Temsilciliği için API servisleri
 * 
 * - LOOP: Sistematik hata analizi ve sürekli gelişim platformu
 * - QM: Kalite yönetimi ve sürekli iyileştirme platformu
 * - Corpix: Eğitim platformu entegrasyonu
 */
export const scrumboardApiService = {
	// Ekip Ãœyeleri API
	getScrumboardMembers: async (): Promise<ScrumboardMember[]> => {
		return api.get('mock/loop/members').json();
	},

	createScrumboardMember: async (member: ScrumboardMember) => {
		return api.post('mock/loop/members', { json: member }).json();
	},

	getScrumboardMember: async (memberId: string): Promise<ScrumboardMember> => {
		return api.get(`mock/loop/members/${memberId}`).json();
	},

	updateScrumboardMember: async (member: PartialDeep<ScrumboardMember>) => {
		return api.put(`mock/loop/members/${member.id}`, { json: member }).json();
	},

	deleteScrumboardMember: async (memberId: string) => {
		return api.delete(`mock/loop/members/${memberId}`).json();
	},

	// Liste YÃ¶netimi API
	getScrumboardBoardLists: async (boardId: string): Promise<ScrumboardList[]> => {
		return api.get('mock/loop/lists', { searchParams: { boardId } }).json();
	},

	createScrumboardBoardList: async (listItem: Omit<ScrumboardList, 'id'>) => {
		// LOOP/QM süreçlerine uygun varsayılan liste isimleri
		const getDefaultTitle = (title: string) => {
			const lowerTitle = title.toLowerCase();
			
			// LOOP Aşamaları
			if (lowerTitle.includes('tespit')) {
				return 'Tespit Edilen Hatalar';
			} else if (lowerTitle.includes('analiz')) {
				return 'Analiz Aşamasında';
			} else if (lowerTitle.includes('kök') || lowerTitle.includes('neden')) {
				return 'Kök Neden Belirlendi';
			} else if (lowerTitle.includes('eğitim')) {
				return 'Eğitim İçeriği Hazırlanıyor';
			} else if (lowerTitle.includes('corpix')) {
				return 'Corpix\'e Atandı';
			} else if (lowerTitle.includes('takip')) {
				return 'Takip Ediliyor';
			} else if (lowerTitle.includes('çözül') || lowerTitle.includes('tamam')) {
				return 'Çözüldü';
			}
			
			// QM Aşamaları
			else if (lowerTitle.includes('kalite')) {
				return 'Kalite Sorunu Tespit Edildi';
			} else if (lowerTitle.includes('veri')) {
				return 'Veri Toplama (Sıklık & Segment)';
			} else if (lowerTitle.includes('alternatif')) {
				return 'Çözüm Alternatifleri';
			} else if (lowerTitle.includes('uygula')) {
				return 'Uygulama Aşaması';
			} else if (lowerTitle.includes('sonuç')) {
				return 'Sonuç Takibi';
			}
			
			return title || 'Yeni Aşama';
		};

		const enhancedListItem = {
			...listItem,
			title: getDefaultTitle(listItem.title)
		};

		return api.post('mock/loop/lists', { json: enhancedListItem }).json();
	},

	getScrumboardBoardList: async (listId: string): Promise<ScrumboardList> => {
		return api.get(`mock/loop/lists/${listId}`).json();
	},

	updateScrumboardBoardList: async (list: ScrumboardList) => {
		return api.put(`mock/loop/lists/${list.id}`, { json: list }).json();
	},

	deleteScrumboardBoardList: async (listId: string) => {
		return api.delete(`mock/loop/lists/${listId}`).json();
	},

	// Etiket YÃ¶netimi API
	getScrumboardBoardLabels: async (boardId: string): Promise<ScrumboardLabel[]> => {
		return api.get('mock/loop/labels', { searchParams: { boardId } }).json();
	},

	createScrumboardBoardLabel: async ({
		boardId,
		label
	}: {
		boardId: string;
		label: PartialDeep<ScrumboardLabel>;
	}) => {
		// LOOP/QM sÃ¼reÃ§lerine uygun varsayÄ±lan etiketler
		const getDefaultLabelTitle = (title: string) => {
			const lowerTitle = title.toLowerCase();
			
			// Ã–ncelik Etiketleri
			if (lowerTitle.includes('kritik') || lowerTitle.includes('urgent')) {
				return 'Kritik Ã–ncelik';
			} else if (lowerTitle.includes('yÃ¼ksek')) {
				return 'YÃ¼ksek Ã–ncelik';
			} else if (lowerTitle.includes('orta')) {
				return 'Orta Ã–ncelik';
			} else if (lowerTitle.includes('dÃ¼ÅŸÃ¼k')) {
				return 'DÃ¼ÅŸÃ¼k Ã–ncelik';
			}
			
			// LOOP Hata Kategorileri
			else if (lowerTitle.includes('teknik')) {
				return 'Teknik Hata';
			} else if (lowerTitle.includes('sÃ¼reÃ§')) {
				return 'SÃ¼reÃ§ HatasÄ±';
			} else if (lowerTitle.includes('iletiÅŸim')) {
				return 'Ä°letiÅŸim HatasÄ±';
			} else if (lowerTitle.includes('sistem')) {
				return 'Sistem HatasÄ±';
			} else if (lowerTitle.includes('tekrarla')) {
				return 'Tekrarlayan Hata';
			} else if (lowerTitle.includes('sistematik')) {
				return 'Sistematik Hata';
			}
			
			// QM Kategorileri
			else if (lowerTitle.includes('mÃ¼ÅŸteri')) {
				return 'MÃ¼ÅŸteri OdaklÄ±';
			} else if (lowerTitle.includes('rezervasyon')) {
				return 'Rezervasyon Sorunu';
			} else if (lowerTitle.includes('check-in') || lowerTitle.includes('checkin')) {
				return 'Check-in Sorunu';
			} else if (lowerTitle.includes('bagaj')) {
				return 'Bagaj Sorunu';
			} else if (lowerTitle.includes('ÅŸikayet')) {
				return 'MÃ¼ÅŸteri Åžikayeti';
			}
			
			// MÃ¼ÅŸteri Segmentleri
			else if (lowerTitle.includes('bireysel')) {
				return 'Bireysel MÃ¼ÅŸteri';
			} else if (lowerTitle.includes('kurumsal')) {
				return 'Kurumsal MÃ¼ÅŸteri';
			} else if (lowerTitle.includes('premium')) {
				return 'Premium MÃ¼ÅŸteri';
			}
			
			// SÃ¼reÃ§ Etiketleri
			else if (lowerTitle.includes('loop')) {
				return 'LOOP SÃ¼reci';
			} else if (lowerTitle.includes('qm') || lowerTitle.includes('kalite')) {
				return 'QM SÃ¼reci';
			} else if (lowerTitle.includes('eÄŸitim')) {
				return 'EÄŸitim Gerekli';
			} else if (lowerTitle.includes('corpix')) {
				return 'Corpix Analizi';
			} else if (lowerTitle.includes('kÃ¶k neden')) {
				return 'KÃ¶k Neden Analizi';
			} else if (lowerTitle.includes('Ã§Ã¶zÃ¼m')) {
				return 'Ã‡Ã¶zÃ¼m GeliÅŸtirme';
			} else if (lowerTitle.includes('takip')) {
				return 'Takip Gerekli';
			}
			
			return title || 'Yeni Etiket';
		};

		const enhancedLabel = {
			...label,
			title: getDefaultLabelTitle(label.title || ''),
			boardId
		};

		return api.post('mock/loop/labels', { json: enhancedLabel }).json();
	},

	getScrumboardBoardLabel: async (labelId: string): Promise<ScrumboardLabel> => {
		return api.get(`mock/loop/labels/${labelId}`).json();
	},

	updateScrumboardBoardLabel: async (label: ScrumboardLabel) => {
		return api.put(`mock/loop/labels/${label.id}`, { json: label }).json();
	},

	deleteScrumboardBoardLabel: async (labelId: string) => {
		return api.delete(`mock/loop/labels/${labelId}`).json();
	},

	// Kart YÃ¶netimi API
	getScrumboardBoardCards: async (boardId: string): Promise<ScrumboardCard[]> => {
		return api.get('mock/loop/cards', { searchParams: { boardId } }).json();
	},

	createScrumboardBoardCard: async ({
		boardId,
		listId,
		card
	}: {
		boardId: string;
		listId: string;
		card: PartialDeep<ScrumboardCard>;
	}): Promise<ScrumboardCard> => {
		// Kart türüne göre varsayılan açıklama ekle
		const getDefaultDescription = (title: string) => {
			const lowerTitle = title.toLowerCase();
			
			if (lowerTitle.includes('hata')) {
				return 'LOOP sürecinde tespit edilen sistemsel hata. Kök neden analizi yapılacak, Corpix entegrasyonu ile eğitim içeriği oluşturulacak.';
			} else if (lowerTitle.includes('kalite')) {
				return 'QM sürecinde belirlenen kalite sorunu. Sıklık ve müşteri segmenti analizi yapılarak çözüm alternatifleri geliştirilecek.';
			} else if (lowerTitle.includes('eğitim')) {
				return 'SunExpress temsilcileri için hazırlanacak eğitim içeriği. Corpix platformuna entegre edilecek ve otomatik olarak ilgili kişilere atanacak.';
			} else if (lowerTitle.includes('çözüm')) {
				return 'Tekrarlayan sorunlar için geliştirilecek kalıcı çözüm önerisi. Uygulama sonrası sonuç takibi yapılacak.';
			} else if (lowerTitle.includes('corpix')) {
				return 'Corpix eğitim platformuna entegre edilecek içerik. LOOP hata analizinden türetilmiş eğitim materyali.';
			}
			
			return '';
		};

		const enhancedCard = {
			...card,
			description: card.description || getDefaultDescription(card.title || '')
		};

		return api
			.post('mock/loop/cards', {
				json: CardModel({
					...enhancedCard,
					boardId,
					listId
				})
			})
			.json();
	},

	updateScrumboardBoardCard: async (card: PartialDeep<ScrumboardCard>) => {
		return api.put(`mock/loop/cards/${card.id}`, { json: card }).json();
	},

	deleteScrumboardBoardCard: async (cardId: string) => {
		return api.delete(`mock/loop/cards/${cardId}`).json();
	},

	// Proje YÃ¶netimi API
	getScrumboardBoards: async (): Promise<ScrumboardBoard[]> => {
		return api.get('mock/loop/boards').json();
	},

	createScrumboardBoard: async (board?: PartialDeep<ScrumboardBoard>) => {
		return api.post('mock/loop/boards', { json: BoardModel(board) }).json();
	},

	getScrumboardBoard: async (boardId: string): Promise<ScrumboardBoard> => {
		return api.get(`mock/loop/boards/${boardId}`).json();
	},

	updateScrumboardBoard: async (board: PartialDeep<ScrumboardBoard>) => {
		return api.put(`mock/loop/boards/${board.id}`, { json: board }).json();
	},

	deleteScrumboardBoard: async (boardId: string) => {
		return api.delete(`mock/loop/boards/${boardId}`).json();
	},

	// SÄ±ralama API
	updateScrumboardBoardListOrder: async ({
		orderResult,
		board
	}: {
		orderResult: OrderResult;
		board: ScrumboardBoard;
	}): Promise<void> => {
		const ordered = reorder(_.merge([], board.lists), orderResult.source.index, orderResult.destination.index);

		return api
			.put(`mock/loop/boards/${board.id}`, {
				json: { ...board, lists: ordered }
			})
			.json();
	},

	updateScrumboardBoardCardOrder: async ({
		orderResult,
		board
	}: {
		orderResult: OrderResult;
		board: ScrumboardBoard;
	}) => {
		const ordered = reorderQuoteMap(_.merge([], board.lists), orderResult.source, orderResult.destination);

		return api
			.put(`mock/loop/boards/${board.id}`, {
				json: { ...board, lists: ordered }
			})
			.json();
	}
};