module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
	},
	parser: 'vue-eslint-parser',
	extends: [
		'plugin:vue/vue3-essential',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		requireConfigFile: false,
		sourceType: 'module',
	},
	rules: {
		'vue/match-component-file-name': [
			'error',
			{
				extensions: ['js', 'vue'],
				shouldMatchCase: false,
			},
		],
	},
};
