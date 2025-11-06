import { ChatConversation } from '../../types/globi-types';

export const mockConversations: ChatConversation[] = [
	{
		id: '1',
		title: 'UM yolcu prosedürü',
		createdAt: Date.now() - 86400000 * 2,
		updatedAt: Date.now() - 86400000 * 2,
		favorite: true,
		messages: [
			{
				id: 'm1',
				role: 'user',
				content: 'UM yolcu için prosedür nedir?',
				timestamp: Date.now() - 86400000 * 2
			},
			{
				id: 'm2',
				role: 'assistant',
				content:
					'**UM (Refakatsiz Çocuk) Kuralları:**\n\n**Yaş Sınırları:**\n- 5-11 yaş arası: UM servisi zorunlu\n- 12-17 yaş arası: Talep üzerine UM servisi\n- 5 yaş altı: UM servisi ile kabul edilmez, refakatçi zorunlu\n\n**Prosedür:**\n1. Rezervasyon sırasında UM kodu girilmeli\n2. Veliden imzalı izin belgesi alınmalı\n3. Check-in sırasında refakatçinin kimliği kayıt altına alınmalı\n4. Teslim alacak kişinin kimlik bilgileri kontrol edilmeli\n5. UM bilekligi takılmalı\n\n**Önemli Notlar:**\n- Aktarmalı uçuşlarda ekstra prosedürler gerekir\n- UM ücreti tahsil edilmelidir\n- Kabin ekibine UM listesi iletilmelidir',
				timestamp: Date.now() - 86400000 * 2 + 5000
			}
		]
	},
	{
		id: '2',
		title: 'Sıvı madde kuralları',
		createdAt: Date.now() - 86400000,
		updatedAt: Date.now() - 86400000,
		favorite: false,
		messages: [
			{
				id: 'm3',
				role: 'user',
				content: 'Kabin bagajında sıvı madde kuralları neler?',
				timestamp: Date.now() - 86400000
			},
			{
				id: 'm4',
				role: 'assistant',
				content:
					'**Sıvı Madde Kuralları (Kabin Bagajı):**\n\n**100ml Kuralı:**\n- Her sıvı kabı maksimum 100ml olmalı\n- Tüm sıvılar şeffaf, yeniden kapatılabilir plastik torbada (max 1 litre)\n- Yolcu başına 1 adet torba\n\n**İstisnalar:**\n- Bebek maması ve bebek sütü (bebekle seyahat gerekli)\n- İlaçlar (reçete ibraz edilmeli)\n- Özel diyet gereksinimleri\n\n**Kayıtlı Bagajda:**\n- Sınırlama yok, ancak patlayıcı/yanıcı maddeler yasak\n- Alkollü içkiler: %70\'in altında, maksimum 5 litre',
				timestamp: Date.now() - 86400000 + 3000
			}
		]
	},
	{
		id: '3',
		title: 'Evcil hayvan taşıma',
		createdAt: Date.now() - 3600000,
		updatedAt: Date.now() - 3600000,
		favorite: true,
		messages: [
			{
				id: 'm5',
				role: 'user',
				content: 'Hangi hayvanlar yasak?',
				timestamp: Date.now() - 3600000
			},
			{
				id: 'm6',
				role: 'assistant',
				content:
					'**YASAK Hayvanlar:**\n- Pit Bull, Dogo Argentino, Fila Brasileiro\n- Vahşi hayvanlar\n- Zehirli hayvanlar\n- Sürüngenler (yılan, kertenkele)\n\n**Kabinde İzin Verilenler:**\n- Kedi ve köpek (max 8 kg, taşıma çantası dahil)\n- Taşıma çantası boyutları: 55x40x20 cm\n- Rezervasyon sırasında bildirilmeli\n- Sağlık belgesi ve aşı karnesi zorunlu',
				timestamp: Date.now() - 3600000 + 4000
			}
		]
	}
];

export default mockConversations;