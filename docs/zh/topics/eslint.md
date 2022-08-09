# ESLint 基本操作

![image-20220803232732378](https://gitlab.com/jaqea_project/Pictures/-/raw/master/img/2022/08/3_23_27_32_image-20220803232732378.png)

## ESLint 概念

ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，属于一种 QA（质量保证）工具，它的目标是保证代码的一致性和避免错误，可以用来保证写出语法正确、风格统一的代码。

## ESLint 特性

1. 所有东西都是可以插拔的，可以调用任意的 rule API 或者 formatter API 去打包或者定义 rule or formatter。
2. 任意的 rule 都是独立的。
3. 没有特定的 coding style，可以自己配置。

## ESLint 安装

- 本地安装

  ```bash
  npm install eslint --save-dev
  // 或者
  yarn add eslint -D
  ```

  生成配置文件：

  ```bash
  ./node_modules/.bin/eslint --init
  npx eslint --init
  ```

  运行 ESLint 检查：

  ```
  ./node_modules/.bin/eslint index.js
  npx eslint index.js
  ```

- 全局安装

  ```bash
  npm install -g eslint
  // 或者
  yarn global add [package]
  ```

  生成配置文件：

  ```bash
  eslint --init
  ```

  运行后，会在当前目录下生成一个.eslintrc 文件，可以在这个文件中配置一些规则。

  在任何文件或目录运行 ESLint：

  ```bash
  eslint index.js
  ```

## ESLint 配置

ESLint 被设计为完全可配置的，可以关闭每一个规则而只运行基本语法验证，或混合和匹配 ESLint 默认绑定的规则和你的自定义规则，以让 ESLint 更适合你的项目。

有两种主要的方式来配置 ESLint：

1. **Configuration Comments**（配置注释） ： 使用 JavaScript 注释把配置信息直接嵌入到一个代码源文件中。

2. **Configuration Files**（配置文件），使用下面任一的文件来为全部的目录和它的子目录指定配置信息。

- JavaScript：使用.eslintrc.js 文件并导出一个包含配置的对象。
- YAML：.eslintrc.yaml 或者.eslintrc。
- yml JSON：.eslintrc.json，并且此文件允许使用 JS 形式的注释。
- 废弃的用法：.eslintrc，此文件可以是 JSON 或者 YAML。
- package.json：在 package.json 文件中创建 eslintConfig 属性，所有的配置包含在此属性中。

  这些文件的优先级排列：.eslintrc.js > .eslintrc.yaml > .eslintrc.yml > .eslintrc.json > .eslintrc > package.json。

从最高优先级到最低优先级的完整配置层次：

1. 内联配置：`/*eslint-disable*/`和 `/*eslint-enable*/ /*global*/ /*eslint*/ /*eslint-env*/`
2. 命令行选项：`--global --rule --env -c,--config`
3. 项目及配置：`.eslintrc.*`或者将 package.json 文件放入与 linted 文件相同的目录中，继续搜索.eslintrc，并 package.json 在祖先目录中的文件（父具有最高优先级，然后祖父母等），直至并包括根目录或直到一个配置`root:true`中找到。

在没有从 1~3 的任何配置的情况下，回到个人的默认配置~/.eslintrc。

.eslintrc.\*文件或文件中的 eslintConfig 字段的形式（package.json），ESLint 将自动查找和读取，也可以在命令行上指定配置文件。

若主目录中（通常~/）有配置文件，则 ESLint 仅在 ESLint 找不到任何其他配置文件时才使用它。

若在同一个目录中找到.eslintrc 和 package.json，.eslintrc 将会优先考虑，并且 package.json 不会使用文件。

配置的信息主要有三类：

1. 环境：脚本设计运行的环境，每个环境都带有一组预定义的全局变量。
2. 全局变量：脚本在执行期间访问的其他全局变量。
3. 规则：启用哪些规则以及错误级别。

## ESLint 规则

1. 解析器选项（parserOptions）

   配置解析器内容。

   ```json
   "parserOptions": {
       // 指定ES的版本，默认为5
   	"ecmaVersion": 6,
        // 配置JS文件加载模式，script | module，默认为script。
   	"sourceType": "module",
       // 指定要使用其他那些语言对象
   	"ecmaFeatures": {
   		"experimentalObjectRestSpread": true, // 启用对对象的扩展
   		"jsx": true, // 启用jsx语法
   		"globalReturn":true, // 允许return在全局使用
   		"impliedStrict":true // 启用严格校验模式
   	}
   }
   ```

   属性说明：

   - `"ecmaVersion"`：配置 JS 的语法版本。
   - `"sourceType"`：配置 JS 文件加载模式。
   - `"ecmaVersion"`：配置想要使用的额外语言特性。

2. 解析器（parser）

   默认情况下 ESLint 使用 Espree 解析器，可以修改它的默认设置。

   ```json
   "parser":"babel-eslint"
   ```

3. 环境配置（env）

   配置预定义的全局环境，默认情况下，所有环境变量都为 false，且这些环境并不冲突，可以自由选择搭配。

   环境定义了预定义的全局变量，可用的部分环境有：

   ```
   browser - 浏览器全局变量。
   node - Node.js全局变量和Node.js范围。
   commonjs - CommonJS全局变量和CommonJS范围（使用Browserify / WebPack的浏览器代码）。
   shared-node-browser - Node.js和Browser的通用全局。
   es6- 启用除模块外的所有ECMAScript 6功能（这会自动将ecmaVersion解析器选项设置为6）。
   worker - 网络工作者全局变量。
   amd- 根据amd规范定义require()和define()作为全局变量。
   mocha - 增加了所有的Mocha测试全局变量。
   jasmine - 为版本1.3和2.0添加了所有Jasmine测试全局变量。
   jest - 是全局变量。
   phantomjs - PhantomJS全局变量。
   jquery - jQuery全局变量。
   prototypejs - Prototype.js全局变量。
   shelljs - ShellJS全局变量。
   mongo - MongoDB全局变量。
   ```

   这些环境并不相互排斥，因此可以一次定义多个环境。

   使用形式：

   - 在 JavaScript 文件中使用注释指定环境：

     ```js
     /* eslint-env node, mocha */
     ```

   - 文件内部，配置文件中或使用--env 命令行标志指定环境：

     ```js
     env: {
     	node:true,
     }
     ```

   - package.json 文件中：

     ```json
     {
     	"name": "mypackage",
     	"version": "0.0.1",
     	"eslintConfig": {
     		"env": {
     			"browser": true,
     			"node": true
     		}
     	}
     }
     ```

   - 在 YAML 中：

     ```yaml
     ---
     env:
       browser: true
       node: true
     ```

4. 插件（plugins）

   此配置需要加载的第三方插件。

   ```json
   "plugins": ["standard","promise","react"]
   ```

5. 全局变量（globals）

   定义了全局变量集合，包含在这个集合中的属性都会被工具认为是全局变量，no-undef 规则就不会发出警告。

   全局变量的值为 true|false。true 表示变量可以被覆盖，false 表示不允许被覆盖。

   ```json
   "globals": {
   	"document": true,
   	"navigator": true,
   	"window": true,
   	"think": true
   },
   ```

6. 自定义规则（settings）

   ```json
   "settings": {
   	"sharedData": "Hello"
   }
   ```

7. 禁用持续查找（root）

   默认情况下，ESLint 将在根目录下的所有父文件夹中查找配置文件。该属性的作用是一旦发现了配置文件就停止对父文件夹的查找。

   ```json
   "root": true
   ```

8. 共享配置（extends）

   配置基础规则，该属性可以是 ESLint 命令，也可以是继承文件的路径。`"rules"`属性中配置的规则都是基于这个规则之上配置的。

   ```json
   "extends": recommended, // 引入当前版本eslint的核心功能，并且报告一些常见的共同错误。
   "extends": all, // 引入当前版本eslint的所有核心规则。
   "extends": "./eslint-config-public.js", // 引入配置文件路径
   ```

9. 配置文件中的规则（rules）

   配置检查规则。

   规则的错误等级：

   - `"off" / 0`：关闭规则。
   - `"warn" / 1`：打开规则，并且作为一个警告（并不会导致检查不通过）。
   - `"error / 2"`：打开规则，并且作为一个错误（退出码为 1，检查不通过）。

   使用配置注释配置文件内部的规则，有如下三种格式：

   - `/* eslint xxx: "off", curly: "error" */`

     这个规则中，xxx 被关闭，并且 curly 作为错误打开。

   - `/* eslint xxx: 0, curly: 2 */`

     使用等同于规则严重性的数字。

   - `/* eslint quotes: ["error", "double"], curly: 2 */`

     若规则具有其他选项，则可以使用数组文字语法来指定它们。

   在配置文件内部配置规则，使用该 rules 键、错误级别以及要使用的任何选项：

   - JSON 中：

     ```json
     {
     	"rules": {
     		"eqeqeq": "off",
     		"curly": "error",
     		"quotes": ["error", "double"]
     	}
     }
     ```

   - YMAL 中：

     ```yaml
     ---
     rules:
       eqeqeq: off
       curly: error
       quotes:
         - error
         - double
     ```

   - 要配置在插件中定义的规则，必须在规则 ID 前加上插件名称和 a /：

     ```json
     {
     	"plugins": ["plugin1"],
     	"rules": {
     		"eqeqeq": "off",
     		"curly": "error",
     		"quotes": ["error", "double"],
     		"plugin1/rule1": "error"
     	}
     }
     ```

     ```yaml
     ---
     plugins:
       - plugin1
     rules:
       eqeqeq: 0
       curly: error
       quotes:
         - error
         - 'double'
       plugin1/rule1: error
     ```

     从插件中指定规则时，请确保省略`eslint-plugin-`。ESLint 在内部仅使用前缀名来查找规则。

   通过内嵌评论注释禁用规则：

   - 禁用整个文件中的规则警告

     在文件顶部放置块注释`/* eslint-disable */`

   - 禁用特定行上的所有规则警告

     `alert('foo'); // eslint-disable-line // eslint-disable-next-linealert('foo');`

## ESLint 命令行

1. `eslint [options] [file|dir|glob]*`

   运行 ESLint。

   eg：

   ```bash
   eslint file1.js file2.js
   eslint "lib/**""
   ```

2. `eslint -h`

   查看所有的命令行选项。

   有些选项可接收一组参数，这类选项支持两种传参方式（除了 `--ignore-pattern` 不允许第二种方式）：

   - 多次指定同一选项，每次接收一个不同的参数。eg：`eslint --ext .jsx --ext .js lib/`
   - 将参数列表用逗号分隔，一次传给选项，eg：`eslint --ext .jsx,.js lib/`

OPTIONS 说明：

1. 基本配置

   - `--no-eslintrc`：禁用 `.eslintrc.*` 和 package.json 文件中的配置。
   - `-c`， `--config`：该选项允许你为 ESLint 指定一个额外的配置文件。
   - `--env`：用于指定环境。该选项只能启用环境，不能禁用在其它配置文件中设置的环境。若要指定多个环境的话，使用逗号分隔它们，或多次使用这个选项。
   - `--ext`：可以指定在指定目录中搜索 JavaScript 文件时，ESLint 将使用哪些文件扩展名。默认扩展名为`.js`。
   - `--global`：用于定义全局变量。任何指定的全局变量默认是只读的，在变量名字后加上 `:true` 后会使它变为可写。若要指定多个变量，使用逗号分隔它们，或多次使用这个选项。

2. 指定规则和插件

   - `--rulesdir`：允许指定另一个加载规则文件的目录。
   - `--plugin`：用于指定一个要加载的插件。可以省略插件名的前缀 `eslint-plugin-`。
   - `--rule`：指定要使用的规则。这些规则将会与配制文件中指定的规则合并。定义多个规则时使用逗号分隔它们，或多次使用这个选项。

3. 解决问题选项

   - `--fix`：指示 ESLint 试图修复尽可能多的问题，修复只针对实际文件本身，而且剩下的未修复的问题才会输出。
   - `--fix-dry-run`：与 `--fix` 有相同的效果，唯一一点不同是，修复不会保存到文件系统中。
   - `--fix-type`：允许在使用 `--fix` 或 `--fix-dry-run` 时指定要应用的修复的类型，修复的三种类型是`problem`、`suggestion`、`layout`。

4. 忽略文件选项

   - `--ignore-path`：允许指定一个文件作为 `.eslintignore`。默认情况下，ESLint 在当前工作目录下查找 `.eslintignore`。
   - `--no-ignore`：禁止排除 `.eslintignore`、`--ignore-path` 和 `--ignore-pattern` 文件中指定的文件。
   - `--ignore-pattern`：允许指定要忽略的文件模式，除了 `.eslintignore` 中的模式之外，可以重复该选项以提供多个模式。

5. 处理警告选项

   - `--quiet`：允许禁止报告警告。如果开启这个选项，ESLint 只会报告错误。
   - `--max-warnings`：允许指定一个警告的阈值，当你的项目中有太多违反规则的警告时，这个阈值被用来强制 ESLint 以错误状态退出。

6. 其它

   - `--init`：配置初始化向导。它被用来帮助新用户快速地创建 `.eslintrc` 文件，用户通过回答一些问题，选择一个流行的风格指南，或检查你的源文件，自动生成一个合适的配置。
   - `--debug`：将调试信息输出到控制台。
   - `-h`, `--help`：输出帮助菜单，显示所有可用的选项。当有这个选项时，忽略其他所有选项。
   - `-v`, `--version`：在控制台输出当前 ESLint 的版本。当有这个标记时，忽略其他所有标记。
   - `--print-config`：输出传递的文件使用的配置。当有这个标记时，不进行检测，只有配置相关的选项才是有效的。

7. 退出码

   当检测文件时，ESLint 可以使用以下退出代码之一退出：

   - 0：检测成功，没有错误。若 `--max-warnings` 标志被设置为 `n`，那么警告数量最多为`n`。
   - 1：检测成功，并且至少有一个错误，或者警告多于 `--max-warnings` 选项所允许的警告。
   - 2：由于配置问题或内部错误，检测未能成功。

## ESLint 中的 extends 和 plugins

1. 插件（plugins）

   ESLint 的规则可以通过 rules 配置，但不同场景、不同规范下有些定制的`eslint`检查需求，`eslint`默认提供的可选规则中如果没有，这个时候就需要做一些扩展了。

   plugin 插件主要是为 ESLint 新增一些检查规则，例如`eslint-plugin-react`就会对`react`项目做一些定制的`eslint`规则，源码如下：

   ```js
   // eslint-plugin-react
   module.exports = {
   	rules: {
   		'jsx-boolean-value': {
   			meta: {
   				docs: {
   					description: 'Enforce boolean attributes notation in JSX',
   					category: 'Stylistic Issues',
   					recommended: false,
   					url: docsUrl('jsx-boolean-value'),
   				},
   				fixable: 'code',
   			},
   			create(context) {},
   		},
   		// ...
   	},
   	configs: {
   		// ...
   	},
   };
   ```

   这些规则可通过如下两步来引入项目：

   1. 安装`eslint-plugin-react`插件

      ```bash
      yarn add eslint-plugin-react -D
      ```

   2. 加载插件（写入 ESLint 配置项）

      开启相应规则的检查能力还是要通过 rules 配置（一个插件库里面往往有几十个新规则，并不是每一个规则都需要开启的，这时候就要根据实际需求来配置相关检查规则）。

      ```js
      // .eslintrc.js
      module.exports = {
      	plugins: ['eslint-plugin-react'],
      	rules: {
      		'eslint-plugin-react/jsx-boolean-value': 2,
      	},
      };
      ```

      插件与扩展一样有固定的命名格式，以 `eslint-plugin-` 开头，使用的时候也可以省略这个头：

      ```json
      {
      	"plugins": [
      		"react", // eslint-plugin-react
      		"vue" // eslint-plugin-vue
      	]
      }
      ```

      或者是在扩展中引入插件，规则为`plugin:${pluginName}/${configName}`：

      ```json
      {
      	"extends": ["plugin:react/recommended"]
      }
      ```

      由上述例子可见，pluginName（插件名）为 react，也就是安装 `eslint-plugin-react` 包，configName（配置名）为 recommended，这个配置名来源于 react 插件配置的 configs 属性定义的：

      ```js
      module.exports = {
        // 自定义的 rule
        rules: allRules,
        // 可用的扩展
        configs: {
          // plugin:react/recommended
          recomended: {
            plugins: [ 'react' ]
            rules: {...}
          },
          // plugin:react/all
          all: {
            plugins: [ 'react' ]
            rules: {...}
          }
        }
      }
      ```

      这里的配置其实就是 ESLint 的扩展（extends），通过这种方式即可以加载插件，又可以加载扩展。

2. 扩展（extends）

   plugins 与 rules 结合是 ESLint 基础能力，extends 可以看做是去集成一个个配置方案的最佳实践。

   尽管需要根据不同的需求、风格、规范去配置不同的 ESLint 规则，但往往相似的项目之间需要配置的规则都是大同小异的。若每个项目都是重新一步步开始选择配置规则就比较显得不太人性了；这个时候就是 extends 体现作用的时候。

   可以把 extends 理解为去集成 ESLint 风格或者 ESLint 插件的最佳实践，它配置的内容实际就是一份份别人配置好的`.eslintrc.js`。

   extends 一般支持三种类型：

   ```json
   {
   	"extends": [
   		"eslint:recommended",
   		"plugin:react/recommended",
   		"eslint-config-standard"
   	]
   }
   ```

   - `eslint:` 开头的是 ESLint 官方的扩展，一共有两个：`eslint:recommended` 、`eslint:all`。
   - `plugin:` 开头的是扩展是插件类型，也可以直接在 `plugins` 属性中进行设置。
   - 最后一种扩展来自 npm 包，官方规定 npm 包的扩展必须以 `eslint-config-` 开头，使用时可以省略这个头，上面案例中 `eslint-config-standard` 可以直接简写成 `standard`。

   以`eslint-plugin-react`为例，它实现了几十种配置规则，为了方便其他人使用，它默认实现了两种最佳实践`all`以及`recommened`。

   ```js
   module.export = {
   	extends: ['eslint-plugin-react/recommended'],
   };
   ```

   这样就可以直接把官方配置好的最佳实践直接拿来用，若碰到和自己风格或者规范有冲突的规则，直接在 rules 中重新定义就可以了，毕竟冲突的规则往往都没有多少。

   extends 除了使用 plugin 中 config name 的加载方式，往往也会使用`eslint-config-xxxx`这样命名的包。主要是因为有些最佳实践往往不需要自己去重新实现规则检查的方法，只需要去导出一份 ESLint 配置即可。

## ESLint 使用流程
