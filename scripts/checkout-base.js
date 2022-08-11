const path = require('path');
const fs = require('fs');
const minimist = require('minimist');

const arguments = minimist(process.argv.slice(2));
const base = arguments['base'];
const pathName = path.join(__dirname, '../docs/.vuepress/config.ts');

fs.readFile(pathName, 'utf-8', (error, data) => {
	if (base == '/') {
		const result = data.replace("base: '/Topics/',", '');
		fs.writeFile(pathName, result, 'utf-8', (error) => {
			if (error) return console.log(error);
		});
	} else {
		const result = data.replace("base: '/Topics/'", `base: '${base}'`);
		fs.writeFile(pathName, result, 'utf-8', (error) => {
			if (error) return console.log(error);
		});
	}
});
