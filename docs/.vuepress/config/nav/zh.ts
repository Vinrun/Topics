import { NavItem } from 'vuepress/config';

const NavItemsZH: NavItem[] = [
	{
		text: '指南',
		link: '/zh/guide/',
	},
	{
		text: '话题',
		link: '/zh/topics/',
	},
	{
		text: '了解更多',
		ariaLabel: '了解更多',
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

export default NavItemsZH;
