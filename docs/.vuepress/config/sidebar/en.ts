import { SidebarConfig4Multiple } from 'vuepress/config';
import getTopicSidebar from './shared';

const SidebarEN: SidebarConfig4Multiple = {
	'/topics/': getTopicSidebar('Topics', 'Topic Discussion'),
};

export default SidebarEN;
