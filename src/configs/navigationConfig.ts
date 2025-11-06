import i18n from '@i18n';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
// import SettingsAppNavigation from '../app/(control-panel)/apps/settings/lib/constants/SettingsAppNavigation';

i18n.addResourceBundle('en', 'navigation', en);
i18n.addResourceBundle('tr', 'navigation', tr);
i18n.addResourceBundle('ar', 'navigation', ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
	{
		id: 'dashboards',
		title: 'Dashboard',
		subtitle: 'Performans ve Telefon',
		type: 'group',
		icon: 'lucide:layout-dashboard',
		translate: 'Kontrol-Paneli',
		children: [
			{
				id: 'dashboards.project',
				title: 'Perfie',
				type: 'item',
				icon: 'lucide:clipboard-check',
				url: '/dashboards/perfie'
			},
			{
				id: 'dashboards.analytics',
				title: 'Analizler',
				type: 'item',
				icon: 'lucide:chart-pie',
				url: '/dashboards/analytics'
			},
			{
    				id: 'dashboards.phone',
    				title: 'SensEI',
    				type: 'item',
    				icon: 'lucide:phone',
    				url: '/dashboards/phone'
	}		]
	},
	{
		id: 'apps',
		title: 'Uygulamalar',
		subtitle: 'Yardım ve Çözüm ',
		type: 'group',
		icon: 'lucide:box',
		translate: 'Uygulamalar',
		children: [
			{
				id: 'apps.ai-image-generator',
				title: 'Globi',
				type: 'item',
				icon: 'lucide:bot',
				url: '/apps/globi',
			},
			{
				id: 'apps.calendar',
				title: 'Calendar',
				type: 'item',
				icon: 'lucide:calendar',
				url: '/apps/calendar',
				translate: 'CALENDAR'
			},
			{
				id: 'apps.messenger',
				title: 'Messenger',
				type: 'item',
				icon: 'lucide:message-square',
				url: '/apps/messenger',
				translate: 'MESSENGER'
			},
			{
				id: 'apps.mailbox',
				title: 'Mailbox',
				type: 'item',
				icon: 'lucide:mail',
				url: '/apps/mailbox/folders/inbox',
				translate: 'MAIL',
			},
			{
				id: 'apps.notes',
				title: 'Notes',
				type: 'item',
				icon: 'lucide:square-pen',
				url: '/apps/notes',
				translate: 'NOTES'
			},
			{
				id: 'apps.scrumboard',
				title: 'Loop',
				type: 'item',
				icon: 'lucide:columns-3',
				url: '/apps/loop',
				translate: 'SCRUMBOARD'
			},
			]
			},
			{
    		id: 'pages',
		title: 'Sayfalar',
		subtitle: 'Ek Kaynak',
		type: 'group',
		icon: 'lucide:file-text',
		children: [
			{
				id: 'Yakala',
				title: 'globalbilgi.com.tr',
				type: 'link',
				url: 'https://www.globalbilgi.com.tr',
				icon: 'lucide:link-2'
			}
		]
	}
];

export default navigationConfig;
