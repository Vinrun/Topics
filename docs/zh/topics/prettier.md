# Prettier 基本操作

![](https://tech.trivago.com/img/posts/thefirstprettierpluginfortwigishere/prettier-logo.png)

## Prettier 概念

Prettier 是一款强势武断的代码格式化工具，支持：

- JavaScript（包括实验性功能）
- [JSX](https://facebook.github.io/jsx/)
- [Angular](https://angular.io/)
- [Vue](https://vuejs.org/)
- [Flow](https://flow.org/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS、[Less](http://lesscss.org/)和[SCSS](https://sass-lang.com/)
- [HTML](https://en.wikipedia.org/wiki/HTML)
- [JSON](https://json.org/)
- [GraphQL](https://graphql.org/)
- [Markdown](https://commonmark.org/)，包括[GFM](https://github.github.com/gfm/)和[MDX](https://mdxjs.com/)
- [YAML](https://yaml.org/)

它几乎移除了编辑器本身所有的对代码的操作格式，然后重新显示。就是为了让所有用这套规则的人有完全相同的代码。在团队协作开发的时候更是体现出它的优势。

与 eslint，tslint 等各种格式化工具不同的是，prettier 只关心代码格式化，而不关心语法问题。

## Prettier 安装及使用

prettier 可以通过如下三种方式使用：

1. 安装编辑器配套的插件，在编辑器内配置一下即可使用：[详情官网查看](https://link.juejin.cn/?target=https%3A%2F%2Fprettier.io%2Fdocs%2Fen%2Feditors.html)。

   以 VS Code 为例，安装**Prettier - Code formatter**插件，并在 settings.json 中的 prettier 配置如下：

   ```json
   {
   	// 使能每一种语言默认格式化规则
   	"[html]": {
   		"editor.defaultFormatter": "esbenp.prettier-vscode"
   	},
   	"[css]": {
   		"editor.defaultFormatter": "esbenp.prettier-vscode"
   	},
   	"[less]": {
   		"editor.defaultFormatter": "esbenp.prettier-vscode"
   	},
   	"[javascript]": {
   		"editor.defaultFormatter": "esbenp.prettier-vscode"
   	},

   	/*  prettier的配置 */
   	"prettier.printWidth": 100, // 超过最大值换行
   	"prettier.tabWidth": 4, // 缩进字节数
   	"prettier.useTabs": false, // 缩进不使用tab，使用空格
   	"prettier.semi": true, // 句尾添加分号
   	"prettier.singleQuote": true, // 使用单引号代替双引号
   	"prettier.proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
   	"prettier.arrowParens": "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
   	"prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
   	"prettier.disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
   	"prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
   	"prettier.eslintIntegration": false, //不让prettier使用eslint的代码格式进行校验
   	"prettier.htmlWhitespaceSensitivity": "ignore",
   	"prettier.ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
   	"prettier.jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
   	"prettier.jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
   	"prettier.parser": "babylon", // 格式化的解析器，默认是babylon
   	"prettier.requireConfig": false, // Require a 'prettierconfig' to format prettier
   	"prettier.stylelintIntegration": false, //不让prettier使用stylelint的代码格式进行校验
   	"prettier.trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
   	"prettier.tslintIntegration": false // 不让prettier使用tslint的代码格式进行校验
   }
   ```

   如上只包含了一些基本的语言的格式化规范，可以根据自己的实际需求进行调整。

   但是现在没法使用类似格式化 HTML/css/js 的方式来格式化 vue 格式的代码，像下面这样：

   ```json
   {
   	"[vue]": {
   		"editor.defaultFormatter": "esbenp.prettier-vscode"
   	}
   }
   ```

   不过既然编写 vue 代码的话，相信都会下载 Vetur 插件，而 Vetur 插件内部默认使用 prettier 进行格式化的。但由于 Vetur 的默认格式化配置与我们期望的有所出入，所以需要单独对 Vetur 的 prettier 进行配置如下：

   ```json
   {
   	"vetur.format.defaultFormatter.html": "prettier",
   	"vetur.format.defaultFormatter.js": "prettier",
   	"vetur.format.defaultFormatter.less": "prettier",
   	"vetur.format.defaultFormatterOptions": {
   		"prettier": {
   			"printWidth": 160,
   			"singleQuote": true, // 使用单引号
   			"semi": true, // 末尾使用分号
   			"tabWidth": 4,
   			"arrowParens": "avoid",
   			"bracketSpacing": true,
   			"proseWrap": "preserve" // 代码超出是否要换行 preserve保留
   		}
   	}
   }
   ```

   这些配置并不会和之前配置的 prettier 规则冲突。

   优点：配置简单，使用方便，可以搭配快捷键（ctrl+s 保存 触发自动格式化）。

   缺点：每个人可能使用不同的编辑器，版本、配置不好统一，很难预设一份配置表给所有人共享。所以个人使用没问题，团队推广不太适合。

2. 安装官方的 CLI 工具，使用 cli 工具提供的命令。

   prettier 作为开发依赖记录在 package.json 里，跟着项目走，版本统一，既可以使用官方的默认配置，也可以指定一套内容的配置项。适合团队协作。

   - **安装依赖**

     局部安装：

     ```bash
     npm install prettier -D
     // 或者
     yarn add prettier -D
     ```

     全局安装：

     ```bash
     npm install -g prettier
     // 或者
     yarn global add prettier
     ```

     可以使用 `prettier -v` 检查是否安装完成。

   - **运行命令**

     局部运行：

     ```bash
     npx prettier --write <文件路径 + 文件名>
     // 或者不指定具体文件名
     npx prettier --write .
     ```

     全局运行：

     ```bash
     // prettier --write <文件路径 + 文件名>
     prettier --write ./xxx.js
     ```

   - **自定义配置规则**

     写入自定义规则的文件需要满足以下格式：

     - .prettierrc 文件，支持 yaml 和 json 格式；或者加上 .yaml/.yml/.json 后缀名

       ```yaml
       # .prettierrc or .prettierrc.yaml
       trailingComma: 'es5'
       tabWidth: 4
       semi: false
       singleQuote: true
       ```

     - .prettierrc.toml 文件（当为 toml 格式的时候，后缀是必须的）

       ```toml
       # .prettierrc.toml
       trailingComma = "es5"
       tabWidth = 4
       semi = false
       singleQuote = true
       ```

     - prettier.config.js 或者 .prettierrc.js，需要返回一个对象

       ```js
       // prettier.config.js or .prettierrc.js
       module.exports = {
       	trailingComma: 'es5',
       	tabWidth: 4,
       	semi: false,
       	singleQuote: true,
       };
       ```

     - package.json 文件中加上"prettier"属性

       ```json
       {
       	"trailingComma": "es5",
       	"tabWidth": 4,
       	"semi": false,
       	"singleQuote": true
       }
       ```

   - **常用命令**

     - 格式化代码

       prettier 查找配置的方式首先会找当前目录下，使用如下指令格式化代码：

       ```bash
       // prettier --write <文件路径 + 文件名>
       prettier --write ./xxx,js
       ```

     - 指定配置文件路径

       若 prettier 在当前目录找不到配置文件，会一直向上级目录查找，直到找到或找不到。若配置文件放在别的地方，则需要手工指定配置文件的路径：

       ```bash
       // prettier --config <配置文件路径 + 文件名> --write <文件路径 + 文件名>
       prettier --config ./prettier/.prettierrc --write ./xxx.js
       ```

     - 格式化所有文件

       若觉得每次格式化一个文件比较麻烦，使用如下指令一次性格式化所有文件：

       ```bash
       prettier --config ./prettier/.prettierrc --write './*.{ts,js,css,json}'
       ```

       一般使用这种方式的时候，就把这个配置文件写在项目根路径下，然后使用命令行一次性格式化项目下的所有文件。

     - 检查文件是否已经格式化

       ```
       prettier --check .
       ```

3. 编程的形式使用，通过调用 npm 包`prettier`暴露的一些模块或方法（需要说明的是，prettier 也支持在浏览器端格式化代码）。

   适合一些搭配 prettier 的 API 写一些代码嵌入到一些特定的代码中执行（此方法暂不作叙述，需要的话请自行百度）。

大多数还是以第一、二种方式为主，第一种方式其实适合个人开发，第二种方式适合团队开发。若两者同时存在的话，会存在优先级的问题。 .prettierrc 的优先级会**高于**在 vscode 全局配置 settings.json 中格式化配置的优先级。

所以，由于编辑器 settings.json 每个人的设置可能都不一样，要求每个人统一设置也不方便操作，而嵌入在项目中的配置文件则可以随着项目到达各个开发者，而且会覆盖每个开发者的不同代码喜好，真正做到团队代码统一的效果。

## Prettier 配置项说明

```js
module.exports = {
	// 1.一行代码的最大字符数，默认是80(printWidth: <int>)
	printWidth: 80,
	// 2.tab宽度为2空格(tabWidth: <int>)
	tabWidth: 2,
	// 3.是否使用tab来缩进，我们使用空格(useTabs: <bool>)
	useTabs: false,
	// 4.结尾是否添加分号，false的情况下只会在一些导致ASI错误的其工况下在开头加分号，我选择无分号结尾的风格(semi: <bool>)
	semi: false,
	// 5.使用单引号(singleQuote: <bool>)
	singleQuote: true,
	// 6.object对象中key值是否加引号（quoteProps: "<as-needed|consistent|preserve>"）as-needed只有在需求要的情况下加引号，consistent是有一个需要引号就统一加，preserve是保留用户输入的引号
	quoteProps: 'as-needed',
	// 7.在jsx文件中的引号需要单独设置（jsxSingleQuote: <bool>）
	jsxSingleQuote: false,
	// 8.尾部逗号设置，es5是尾部逗号兼容es5，none就是没有尾部逗号，all是指所有可能的情况，需要node8和es2017以上的环境。（trailingComma: "<es5|none|all>"）
	trailingComma: 'es5',
	// 9.object对象里面的key和value值和括号间的空格(bracketSpacing: <bool>)
	bracketSpacing: true,
	// 10.jsx标签多行属性写法时，尖括号是否另起一行(jsxBracketSameLine: <bool>)
	jsxBracketSameLine: false,
	// 11.箭头函数单个参数的情况是否省略括号，默认always是总是带括号（arrowParens: "<always|avoid>"）
	arrowParens: 'always',
	// 12.range是format执行的范围，可以选执行一个文件的一部分，默认的设置是整个文件（rangeStart: <int>  rangeEnd: <int>）
	rangeStart: 0,
	rangeEnd: Infinity,
	// 18. vue script和style标签中是否缩进,开启可能会破坏编辑器的代码折叠
	vueIndentScriptAndStyle: false,
	// 19.    endOfLine: "<lf|crlf|cr|auto>" 行尾换行符,默认是lf,
	endOfLine: 'lf',
	// 20.embeddedLanguageFormatting: "off",默认是auto,控制被引号包裹的代码是否进行格式化
	embeddedLanguageFormatting: 'off',
};

// 14. requirePragma: <bool>,格式化有特定开头编译指示的文件 比如下面两种
/**
 * @prettier
 */
// or
/**
 * @format
 */

// 15.insertPragma: <bool> 自当插入pragma到已经完成的format的文件开头

// 16. proseWrap: "<always|never|preserve>" 文章换行,默认情况下会对你的markdown文件换行进行format会控制在printwidth以内

// 13. 指定parser,因为pretter会自动选择,所以一般不用指定(parser: "<string>"  parser: require("./my-parser"))
// "babel" (via @babel/parser) Named "babylon" until v1.16.0
// "babel-flow" (same as "babel" but enables Flow parsing explicitly to avoid ambiguity) First available in v1.16.0
// "babel-ts" (similar to "typescript" but uses Babel and its TypeScript plugin) First available in v2.0.0
// "flow" (via flow-parser)
// "typescript" (via @typescript-eslint/typescript-estree) First available in v1.4.0
// "espree" (via espree) First available in v2.2.0
// "meriyah" (via meriyah) First available in v2.2.0
// "css" (via postcss-scss and postcss-less, autodetects which to use) First available in v1.7.1
// "scss" (same parsers as "css", prefers postcss-scss) First available in v1.7.1
// "less" (same parsers as "css", prefers postcss-less) First available in v1.7.1
// "json" (via @babel/parser parseExpression) First available in v1.5.0
// "json5" (same parser as "json", but outputs as json5) First available in v1.13.0
// "json-stringify" (same parser as "json", but outputs like JSON.stringify) First available in v1.13.0
// "graphql" (via graphql/language) First available in v1.5.0
// "markdown" (via remark-parse) First available in v1.8.0
// "mdx" (via remark-parse and @mdx-js/mdx) First available in v1.15.0
// "html" (via angular-html-parser) First available in 1.15.0
// "vue" (same parser as "html", but also formats vue-specific syntax) First available in 1.10.0
// "angular" (same parser as "html", but also formats angular-specific syntax via angular-estree-parser) First available in 1.15.0
// "lwc" (same parser as "html", but also formats LWC-specific syntax for unquoted template attributes) First available in 1.17.0
// "yaml" (via yaml and yaml-unist-parser) First available in 1.14.0

// 17. htmlWhitespaceSensitivity: "<css|strict|ignore>" html中的空格敏感性

// 针对不同文件或目录设置不同配置的方法,json格式例子
// {
//   "semi": false,
//   "overrides": [
//     {
//       "files": "*.test.js",
//       "options": {
//         "semi": true
//       }
//     },
//     {
//       "files": ["*.html", "legacy/**/*.js"],
//       "options": {
//         "tabWidth": 4
//       }
//     }
//   ]
// }
```

## Prettier 使用流程
