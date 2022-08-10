const ghpages = require('gh-pages');

const DIR = 'docs/.vuepress/dist';
const GITCONFIG = {
	branch: 'gh-pages',
	repo: 'https://github.com/Vinrun/Topics.git',
	user: {
		name: 'Jaqea',
		email: '1601676692@qq.com',
	},
};

ghpages.publish(DIR, GITCONFIG);
