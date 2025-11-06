'use client';
import { lighten, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import useGloBiAppContext from '../../contexts/GloBiAppContext/useGloBiAppContext';
import { useUpdateConversation } from '../../api/hooks/conversations/useUpdateConversation';
import { ChatMessage as ChatMessageType } from '../../api/types/globi-types';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import ChatMessage from './ChatMessage';

type GloBiContentProps = {
	onSetMainSidebarOpen: (open: boolean) => void;
	onNewChat: () => void;
};

function GloBiContent(props: GloBiContentProps) {
	const { onSetMainSidebarOpen, onNewChat } = props;
	const { selectedConversation, setSelectedConversation, loading, setLoading } = useGloBiAppContext();
	const { mutate: updateConversation } = useUpdateConversation();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const chatRef = useRef<HTMLDivElement>(null);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<ChatMessageType[]>([]);

	useEffect(() => {
		if (selectedConversation) {
			setMessages(selectedConversation.messages);
		}
	}, [selectedConversation]);

	useEffect(() => {
		if (messages) {
			setTimeout(scrollToBottom);
		}
	}, [messages]);

	function scrollToBottom() {
		if (!chatRef.current) {
			return;
		}
		chatRef.current.scrollTo({
			top: chatRef.current.scrollHeight,
			behavior: 'smooth'
		});
	}

	function isFirstMessageOfGroup(item: ChatMessageType, i: number) {
		return i === 0 || (messages[i - 1] && messages[i - 1].role !== item.role);
	}

	function isLastMessageOfGroup(item: ChatMessageType, i: number) {
		return i === messages.length - 1 || (messages[i + 1] && messages[i + 1].role !== item.role);
	}

	function onInputChange(ev: React.ChangeEvent<HTMLInputElement>) {
		setMessage(ev.target.value);
	}

	// Knowledge Base Response
	const getAIResponse = (question: string): string => {
		const lowerQuestion = question.toLowerCase();

		if (lowerQuestion.includes('um') || lowerQuestion.includes('refakatsiz')) {
			return '**UM (Refakatsiz Çocuk) Kuralları:**\n\n**Yaş Sınırları:**\n- 5-11 yaş arası: UM servisi zorunlu\n- 12-17 yaş arası: Talep üzerine UM servisi\n- 5 yaş altı: Kabul edilmez\n\n**Prosedür:**\n1. Rezervasyon sırasında UM kodu girilmeli\n2. Veliden imzalı izin belgesi alınmalı\n3. Check-in sırasında refakatçinin kimliği kayıt altına alınmalı\n4. Teslim alacak kişinin kimlik bilgileri kontrol edilmeli\n5. UM bilekligi takılmalı\n\n**Önemli Notlar:**\n- Aktarmalı uçuşlarda ekstra prosedürler gerekir\n- UM ücreti tahsil edilmelidir\n- Kabin ekibine UM listesi iletilmelidir';
		}

		if (lowerQuestion.includes('sıvı') || lowerQuestion.includes('su') || lowerQuestion.includes('içecek')) {
			return '**Sıvı Madde Kuralları (Kabin Bagajı):**\n\n**100ml Kuralı:**\n- Her sıvı kabı maksimum 100ml olmalı\n- Tüm sıvılar şeffaf, yeniden kapatılabilir plastik torbada (max 1 litre)\n- Yolcu başına 1 adet torba\n\n**İstisnalar:**\n- Bebek maması ve bebek sütü (bebekle seyahat gerekli)\n- İlaçlar (reçete ibraz edilmeli)\n- Özel diyet gereksinimleri\n\n**Kayıtlı Bagajda:**\n- Sınırlama yok, ancak patlayıcı/yanıcı maddeler yasak\n- Alkollü içkiler: %70\'in altında, maksimum 5 litre';
		}

		if (lowerQuestion.includes('evcil') || lowerQuestion.includes('hayvan') || lowerQuestion.includes('kedi') || lowerQuestion.includes('köpek')) {
			return '**Evcil Hayvan Kuralları:**\n\n**Kabinde İzin Verilenler:**\n- Kedi ve köpek (max 8 kg, taşıma çantası dahil)\n- Taşıma çantası boyutları: 55x40x20 cm\n- Rezervasyon sırasında bildirilmeli\n- Sağlık belgesi ve aşı karnesi zorunlu\n\n**Bagaj Bölümünde:**\n- 8 kg üzeri hayvanlar\n- IATA standartlarına uygun kafes\n- Sıcaklık kontrollü bölüm\n\n**YASAK Hayvanlar:**\n- Pit Bull, Dogo Argentino, Fila Brasileiro\n- Vahşi hayvanlar\n- Zehirli hayvanlar\n- Sürüngenler (yılan, kertenkele)\n\n**Özel Durumlar:**\n- Rehber köpekler: Ücretsiz, sertifika gerekli\n- Duygusal destek hayvanları: Önceden onay gerekli\n\n**Ücretler:**\n- Kabinde: €50/tek yön\n- Bagaj bölümünde: €100/tek yön';
		}

		if (lowerQuestion.includes('yasak') || lowerQuestion.includes('yasaklı')) {
			return '**Yasaklı Eşyalar:**\n\n**Kabin ve Kayıtlı Bagajda Yasak:**\n- Patlayıcılar (havai fişek, patlayıcı madde)\n- Yanıcı maddeler (benzin, gaz tüpü, çakmak gazı)\n- Zehirli maddeler\n- Radyoaktif maddeler\n- Korozif maddeler (asit, alkali)\n\n**Sadece Kabin Bagajında Yasak:**\n- Kesici/delici aletler (bıçak, makas >6cm)\n- Künt cisimler (beyzbol sopası, golf sopası)\n- Ateşli silahlar ve benzeri\n- Elektroşok cihazları\n\n**Özel İzinle Taşınabilenler:**\n- Spor ekipmanları (kayak, sörf tahtası)\n- Müzik aletleri (ekstra ücret)\n- Tıbbi cihazlar (belgeli)\n\n**Not:** Güvenlik kontrolünde yakalanan yasak eşyalar imha edilir, geri verilmez.';
		}

		if (lowerQuestion.includes('bagaj') || lowerQuestion.includes('bavul') || lowerQuestion.includes('kilo')) {
			return '**Bagaj Hakları ve Kuralları:**\n\n**Kabin Bagajı:**\n- 1 adet el bagajı (55x40x23 cm, max 8 kg)\n- 1 adet kişisel eşya (çanta, laptop çantası)\n\n**Kayıtlı Bagaj:**\n- Ekonomi: 20 kg (1 parça)\n- Business: 30 kg (2 parça)\n- Fazla bagaj: 15€/kg\n\n**Boyut Limitleri:**\n- Kayıtlı bagaj: Max 158 cm (eni+boyu+yüksekliği)\n- Aşırı boyutlu bagaj: Ekstra ücret\n\n**Özel Bagajlar:**\n- Bebek arabası: Ücretsiz\n- Spor ekipmanı: Önceden bildirilmeli, ekstra ücret\n- Müzik aleti: Ekstra koltuk satın alınabilir\n\n**Hasarlı/Kayıp Bagaj:**\n- Hasar tespit formu doldurulmalı (PIR)\n- 21 gün içinde tazminat başvurusu';
		}

		if (lowerQuestion.includes('check-in') || lowerQuestion.includes('checkin')) {
			return '**Check-in Prosedürleri:**\n\n**Online Check-in:**\n- Uçuştan 24 saat önce açılır\n- Uçuştan 3 saat öncesine kadar aktif\n- Mobil boarding pass gönderilebilir\n\n**Havalimanı Check-in:**\n- İç hatlar: En geç 45 dakika önce\n- Dış hatlar: En geç 60 dakika önce\n- Grup check-in: 90 dakika önce\n\n**Özel Durumlar:**\n- UM yolcular: 90 dakika önce\n- WCHR/WCHC: 60 dakika önce\n- Evcil hayvan: 90 dakika önce\n\n**Geç Kalan Yolcular:**\n- Gate kapanış: Kalkıştan 15 dakika önce\n- Son çağrı sonrası gelenler kabul edilmez (no-show)\n\n**Gerekli Belgeler:**\n- Pasaport/Kimlik (geçerli)\n- Vize (gerekiyorsa)\n- Sağlık belgesi (ülkeye göre)';
		}

		if (lowerQuestion.includes('wchr') || lowerQuestion.includes('wchc') || lowerQuestion.includes('engelli') || lowerQuestion.includes('tekerlekli')) {
			return '**Özel Yardım Kodları:**\n\n**WCHR (Wheelchair Ramp):**\n- Kısa mesafe yürüyebilir\n- Sadece rampa/merdiven için yardım\n- Uçakta kendi koltuğuna oturabilir\n\n**WCHS (Wheelchair Steps):**\n- Uçağa kadar yürüyebilir\n- Merdiven çıkamaz\n- Uçakta kendi koltuğuna oturabilir\n\n**WCHC (Wheelchair Cabin Seat):**\n- Hiç yürüyemez\n- Uçak koltuğuna transfer gerekli\n- Sürekli yardım gerekli\n- Kabin ekibi bilgilendirilmeli\n\n**Prosedür:**\n- Rezervasyonda SSR kodu girilmeli\n- En geç 48 saat önce bildirim\n- Havalimanında 90 dakika önce check-in\n- Tekerlekli sandalye ücretsiz taşınır\n\n**İlaç ve Tıbbi Cihazlar:**\n- Kabin bagajında taşınabilir\n- Doktor raporu ibraz edilmeli';
		}

		if (lowerQuestion.includes('hamile') || lowerQuestion.includes('gebelik')) {
			return '**Hamile Yolcu Kuralları:**\n\n**28. Haftaya kadar:**\n- Serbest seyahat\n- Belge gerekmez\n\n**28-36. Hafta:**\n- Doktor raporu zorunlu\n- Rapor 7 günden eski olmamalı\n- Komplikasyon olmadığına dair belge\n\n**36. Haftadan sonra:**\n- Uçuşa kabul edilmez\n- İstisna: Tıbbi acil durum\n\n**Önemli Notlar:**\n- Çoğul gebelik: 32. haftaya kadar\n- Risk durumu: Doktor onayı şart\n- Kemer takılış şekli gösterilmeli (göbek altı)';
		}

		return 'Üzgünüm, bu konuda yeterli bilgiye sahip değilim.\n\n**GloBi\'nin uzmanlık alanları:**\n- UM (Refakatsiz çocuk) kuralları\n- Bagaj hakları ve kuralları\n- Sıvı madde kuralları\n- Evcil hayvan taşıma\n- Yasaklı eşyalar\n- Check-in prosedürleri\n- Özel yardım kodları (WCHR, WCHC)\n- Hamile yolcu kuralları\n\nLütfen sorunuzu bu konulardan biriyle ilgili olarak yeniden sorabilir misiniz?';
	};

	function onMessageSubmit(ev: React.FormEvent<HTMLFormElement>) {
		ev.preventDefault();

		if (message === '' || !selectedConversation) {
			return;
		}

		const userMessage: ChatMessageType = {
			id: `msg-${Date.now()}`,
			role: 'user',
			content: message,
			timestamp: Date.now()
		};

		const updatedMessages = [...messages, userMessage];
		setMessages(updatedMessages);

		// Auto-generate title from first message
		const newTitle =
			selectedConversation.messages.length === 0 ? message.slice(0, 50) : selectedConversation.title;

		setMessage('');
		setLoading(true);

		// AI Response
		setTimeout(() => {
			const aiMessage: ChatMessageType = {
				id: `msg-${Date.now() + 1}`,
				role: 'assistant',
				content: getAIResponse(message),
				timestamp: Date.now()
			};

			const finalMessages = [...updatedMessages, aiMessage];
			setMessages(finalMessages);

			const updatedConversation = {
				...selectedConversation,
				messages: finalMessages,
				updatedAt: Date.now(),
				title: newTitle
			};

			updateConversation(updatedConversation, {
				onSuccess: (updated) => {
					setSelectedConversation(updated);
					setLoading(false);
				}
			});
		}, 1500);
	}

	if (!selectedConversation) {
		return (
			<div className="flex w-full flex-1 flex-col items-center justify-center p-6">
				<FuseSvgIcon
					className="mb-4"
					color="action"
					size={64}
				>
					lucide:bot
				</FuseSvgIcon>
				<Typography
					className="text-secondary mb-2 text-xl font-medium tracking-tight"
					color="text.secondary"
				>
					GloBi'ye Hoş Geldiniz
				</Typography>
				<Typography
					className="mb-6 text-center"
					color="text.secondary"
				>
					GlobalBilgi AI asistanınız. İş sorularınızı yanıtlamak için buradayım.
				</Typography>
				<Button
					variant="contained"
					color="secondary"
					onClick={onNewChat}
					startIcon={<FuseSvgIcon>lucide:plus</FuseSvgIcon>}
				>
					Yeni Sohbet Başlat
				</Button>
			</div>
		);
	}

	return (
		<>
			<Box
				className="w-full border-b-1"
				sx={(theme) => ({
					backgroundColor: lighten(theme.palette.background.default, 0.02),
					...theme.applyStyles('light', {
						backgroundColor: lighten(theme.palette.background.default, 0.4)
					})
				})}
			>
				<Toolbar className="flex w-full items-center justify-between px-4">
					<div className="flex items-center">
						<IconButton
							aria-label="Open drawer"
							onClick={() => onSetMainSidebarOpen(true)}
							className="border-divider flex border lg:hidden"
						>
							<FuseSvgIcon>lucide:menu</FuseSvgIcon>
						</IconButton>
						<Box
							className="mx-2 flex h-10 w-10 items-center justify-center rounded-full"
							sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText' }}
						>
							<FuseSvgIcon size={20}>lucide:bot</FuseSvgIcon>
						</Box>
						<Typography
							color="inherit"
							className="px-1 text-lg font-semibold"
						>
							{selectedConversation.title}
						</Typography>
					</div>
				</Toolbar>
			</Box>
			<div className="flex h-full min-h-0 w-full flex-auto">
				<div className={clsx('relative z-10 flex flex-1 flex-col')}>
					<div
						ref={chatRef}
						className="flex flex-1 flex-col overflow-y-auto"
					>
						{messages?.length > 0 && (
							<div className="flex flex-col space-y-2 pt-4 pb-24 md:px-4">
								{messages.map((item, i) => (
									<ChatMessage
										key={item.id}
										message={item}
										isFirstOfGroup={isFirstMessageOfGroup(item, i)}
										isLastOfGroup={isLastMessageOfGroup(item, i)}
									/>
								))}
							</div>
						)}
						{loading && (
							<div className="flex items-center gap-3 px-4 py-2 md:px-8">
								<Avatar
									sx={{
										backgroundColor: 'secondary.main',
										color: 'secondary.contrastText',
										width: 36,
										height: 36
									}}
								>
									G
								</Avatar>
								<Paper className="px-4 py-2">
									<Box className="flex items-center gap-1">
										<span className="animate-bounce text-xs">●</span>
										<span
											className="animate-bounce text-xs"
											style={{ animationDelay: '0.2s' }}
										>
											●
										</span>
										<span
											className="animate-bounce text-xs"
											style={{ animationDelay: '0.4s' }}
										>
											●
										</span>
									</Box>
								</Paper>
							</div>
						)}
					</div>
					{selectedConversation && (
						<Paper
							square
							component="form"
							onSubmit={onMessageSubmit}
							className="absolute right-0 bottom-0 left-0 border-t-1 px-4 py-4"
							sx={(theme) => ({
								backgroundColor: lighten(theme.palette.background.default, 0.02),
								...theme.applyStyles('light', {
									backgroundColor: lighten(theme.palette.background.default, 0.4)
								})
							})}
						>
							<div className="relative flex items-center">
								<IconButton type="button">
									<FuseSvgIcon
										className="text-3xl"
										color="action"
									>
										lucide:smile
									</FuseSvgIcon>
								</IconButton>

								<IconButton type="button">
									<FuseSvgIcon
										className="text-3xl"
										color="action"
									>
										lucide:paperclip
									</FuseSvgIcon>
								</IconButton>

								<InputBase
									autoFocus={false}
									id="message-input"
									className="mx-2 flex flex-1 shrink-0 grow rounded-lg border-1 px-2"
									placeholder="Mesajınızı yazın..."
									onChange={onInputChange}
									value={message}
									disabled={loading}
									sx={{ backgroundColor: 'background.paper' }}
								/>
								<IconButton
									type="submit"
									disabled={loading}
								>
									<FuseSvgIcon color="action">lucide:send</FuseSvgIcon>
								</IconButton>
							</div>
						</Paper>
					)}
				</div>
			</div>
		</>
	);
}

export default GloBiContent;