import { defineConfig } from 'vuepress/config';
import { SidebarEN, SidebarZH, NavItemsEN, NavItemsZH } from './config/index';

export default defineConfig((ctx) => ({
	theme: '@vuepress/vue',
	// dest: '../../dist',
	host: '0.0.0.0',
	port: 8080,
	markdown: {
		lineNumbers: true,
		anchor: { permalink: true, permalinkBefore: true, permalinkSymbol: '#' },
		pageSuffix: '.html',
		toc: { includeLevel: [2, 3] },
		extractHeaders: ['h2', 'h3'],
	},
	head: [['link', { rel: 'icon', href: `/favicon.ico` }]],
	locales: {
		'/': {
			lang: 'en-US',
			title: 'Vinrun Topics',
			description: 'A site of open source project research',
		},
		'/zh/': {
			lang: 'zh-CN',
			title: 'Vinrun Topics',
			description: '开源项目探究站点',
		},
	},
	themeConfig: {
		repo: 'vuejs/vuepress',
		logo: '/favicon.ico',
		editLinks: true,
		docsDir: '/docs',
		smoothScroll: true,
		locales: {
			'/': {
				label: 'English',
				selectText: 'Languages',
				ariaLabel: 'Select language',
				editLinkText: 'Edit this page on GitHub',
				lastUpdated: 'Last Updated',
				nav: NavItemsEN,
				sidebar: SidebarEN,
				repoLabel: 'source',
			},
			'/zh/': {
				label: '简体中文',
				selectText: '选择语言',
				ariaLabel: '选择语言',
				editLinkText: '在 GitHub 上编辑此页',
				lastUpdated: '上次更新',
				nav: NavItemsZH,
				sidebar: SidebarZH,
				repoLabel: '查看源码',
			},
		},
	},
	plugins: [
		['@vuepress/back-to-top', true],
		['@vuepress/medium-zoom', true],
		['vuepress-plugin-flowchart'],
	],
	extraWatchFiles: [
		'.vuepress/config/**',
		'.vuepress/config.ts',
		'.vuepress/enhanceApp.js',
	],
	evergreen: !ctx.isProd,
}));
