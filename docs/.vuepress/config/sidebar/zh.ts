import { SidebarConfig4Multiple } from 'vuepress/config';
import getTopicSidebar from './shared';

const SidebarZH: SidebarConfig4Multiple = {
	'/zh/topics/': getTopicSidebar('话题', '探讨话题'),
};

export default SidebarZH;
