import { NavItem } from 'vuepress/config';

const NavItemsEN: NavItem[] = [
	{
		text: 'Guide',
		link: '/guide/',
	},
	{
		text: 'Topics',
		link: '/topics/',
	},
	{
		text: 'Learn More',
		ariaLabel: 'Learn More',
		items: [
			{
				text: 'GitHub',
				link: 'https://v2.vuepress.vuejs.org/zh/',
			},
			{
				text: 'Gitee',
				link: 'https://v2.vuepress.vuejs.org/',
			},
		],
	},
];

export default NavItemsEN;
