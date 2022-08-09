import { SidebarConfigArray } from 'vuepress/config';

function getTopicSidebar(
	groupA: string,
	introductionA: string,
): SidebarConfigArray {
	const sidebar: SidebarConfigArray = [
		{
			title: groupA,
			collapsable: false,
			sidebarDepth: 2,
			children: [['', introductionA], 'eslint', 'prettier', 'stylelint'],
		},
	];

	return sidebar;
}

export default getTopicSidebar;
