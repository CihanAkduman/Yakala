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
				title: 'Analytics',
				type: 'item',
				icon: 'lucide:chart-pie',
				url: '/dashboards/analytics'
			},
			{
    				id: 'dashboards.phone',
    				title: 'Phone Center',
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
				badge: {
					title: 'NEW'
				}
			},
			{
				id: 'apps.academy',
				title: 'Academy',
				type: 'item',
				icon: 'lucide:graduation-cap',
				url: '/apps/academy',
				translate: 'ACADEMY'
			},
			{
				id: 'apps.calendar',
				title: 'Calendar',
				subtitle: '3 upcoming events',
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
				id: 'apps.contacts',
				title: 'Contacts',
				type: 'item',
				icon: 'lucide:users',
				url: '/apps/contacts',
				translate: 'CONTACTS'
			},
			{
				id: 'apps.help-center',
				title: 'Help Center',
				type: 'collapse',
				icon: 'lucide:info',
				url: '/apps/help-center',
				children: [
					{
						id: 'apps.help-center.home',
						title: 'Home',
						type: 'item',
						url: '/apps/help-center',
						end: true
					},
					{
						id: 'apps.help-center.faqs',
						title: 'FAQs',
						type: 'item',
						url: '/apps/help-center/faqs'
					},
					{
						id: 'apps.help-center.guides',
						title: 'Guides',
						type: 'item',
						url: '/apps/help-center/guides'
					},
					{
						id: 'apps.help-center.support',
						title: 'Support',
						type: 'item',
						url: '/apps/help-center/support'
					}
				]
			},
			{
				id: 'apps.mailbox',
				title: 'Mailbox',
				type: 'item',
				icon: 'lucide:mail',
				url: '/apps/mailbox/folders/inbox',
				translate: 'MAIL',
				badge: {
					title: '27',
					classes: 'px-8 bg-pink-600 text-white rounded-full'
				}
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
			{
				id: 'apps.tasks',
				title: 'Tasks',
				subtitle: '12 remaining tasks',
				type: 'item',
				icon: 'lucide:circle-check',
				url: '/apps/tasks',
				translate: 'TASKS'
			},
			{
				id: 'apps.profile',
				title: 'Profile',
				type: 'item',
				icon: 'lucide:circle-user',
				url: '/apps/profile'
			},
{
    id: 'apps.notifications',
    title: 'Notifications',
    type: 'item',
    icon: 'lucide:bell',
    url: '/apps/notifications'
}
]
},
{
    		id: 'pages',
		title: 'Pages',
		subtitle: 'Custom made page designs',
		type: 'group',
		icon: 'lucide:file-text',
		children: [
			{
				id: 'pages.activities',
				title: 'Activities',
				type: 'item',
				icon: 'lucide:align-left',
				url: '/pages/activities'
			},
			{
				id: 'pages.search',
				title: 'Search',
				type: 'collapse',
				icon: 'lucide:search',
				children: [
					{
						id: 'pages.search.classic-search',
						title: 'Classic Search',
						type: 'item',
						url: '/pages/search/classic'
					},
					{
						id: 'pages.search.modern-search',
						title: 'Modern Search',
						type: 'item',
						url: '/pages/search/modern'
					}
				]
			},
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
