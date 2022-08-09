# Stylelint 基本操作

![](https://zengxiaoluan.com/wp-content/uploads/2017/10/stylelint-logo.png)

## Stylelint 概念

Stylelint 是一个强大、先进的 CSS 代码检查器（linter），与 ESLint 类似，其通过定义一系列的编码风格规则来帮助我们规避 CSS 代码中的错误并保持一致的编码风格。

Stylelint 的强大源于：

- 拥有超过 **170 条内置规则** 赖检查最新的 CSS 语法和功能
- 支持 **插件** 以创建你自己的规则
- 自动 **修复** 大多数代码格式上的问题
- 经过 15000 多次的 **充分的单元测试**
- 支持扩展或创建 **可共享的配置**
- **非强制约束（unopinionated）**，可根据你自己的需求进行自定义
- 像 Prettier 一样可以 **美化打印** 效果
- 拥有一个 **不断增长的社区**，并且被 Google、GitHub 和 WordPress 所使用

还可以被扩展为：

- 解析 **类似 CSS 的语法**，例如 SCSS、Sass、Less 以及 SugarSS
- 能够从 HTML、Markdown 和 CSS in JS 对象以及模板文本中提取 **内嵌的样式代码**

## Stylelint 安装及使用

1. 安装**stylelint**运行工具：

   ```bash
   npm install stylelint -D
   // 或者
   yarn add stylelint -D
   ```

2. 安装**stylint-config-standard**（stylelint 的推荐配置）和**stylelint-order**（CSS 属性排序插件）：

   ```bash
   npm install stylelint-config-standard stylelint-order -D
   yarn add stylelint-config-standard stylelint-order -D
   ```

3. stylelint 有如下三种方式配置：

- 在 package.json 中的`stylelint`属性指定规则。
- 在 .stylelintrc 文件中指定，文件格式可以是`JSON`或者`YAML`。也可以给该文件加后缀： .stylelintrc.json , .stylelintrc.yaml , .stylelintrc.yml , .stylelintrc.js 。
- stylelint.config.js 文件，该文件 exports 一个配置对象。

  ```js
  module.exports = {
  	processors: [],
  	plugins: [],
  	extends: 'stylelint-config-standard', // 这是官方推荐的方式
  	rules: {
  		'at-rule-empty-line-before': 'always' | 'never',
  		'at-rule-name-case': 'lower' | 'upper',
  		'block-no-empty': true,
  	},
  };
  ```

4. 让 stylelint 处理项目中的所有 CSS 文件：

   ```bash
   npx stylelint "**/*.css"
   // 或者
   yarn stylelint "**/*.css"
   ```

## Stylelint 配置项说明

1. **rules**

   `rules`是一个对象，属性名为规则名称，属性值为规则取值，它告诉`stylelint`该检查什么，该怎么报错。所有规则默认都是关闭的。

   rules 优先级大于 extends，建议采用 extends 方式统一管理。

   规则名称：

   - 由连字符组成的小写单词

   - 由两个部分组成：

     1. 描述该规则应用于什么东西
     2. 表示该规则检查了什么

     ```json
     "number-leading-zero"
     // ↑          ↑
     // the thing  what the rule is checking
     ```

     规则应用于整个样式表时只包含第二个部分：

     ```json
     "no-eol-whitespace"
     "indentation"
     //    ↑
     // what the rules are checking
     ```

   规则取值：

   规则类型不同，支持的值也不同，如下为一个案例：

   ```json
   {
     "rules": {
       "at-rule-blacklist": string|[],
       "at-rule-empty-line-before": "always"|"never",
       "at-rule-name-case": "lower"|"upper",
       "block-no-empty": true
       ...
     }
   }
   ```

   值为 null 时表示禁用该规则：

   ```json
   {
   	"rules": {
   		"block-no-empty": null
   	}
   }
   ```

   除了规则本身的取值之外，`stylelint`还支持一些自定义配置，给规则传递一个数组即可，数组第一项是规则值，第二项是自定义配置：

   ```json
   "selector-pseudo-class-no-unknown": [true, {
     "ignorePseudoClasses": ["global"]
   }]
   ```

   通过配置项可以指定：

   - `severity`，错误级别，取值`"warning"`或者`"error"`。默认情况下，所有规则的错误级别都是`"error"`，通过`defaultSeverity`可以修改此默认值。不过，需要针对某规则修改错误级别就需要用到该属性。

     ```json
     "indentation": [2, {
       "severity": "warning"
     }]
     ```

   - `message`，自定义错误信息。

     ```json
     "color-hex-case": ["lower", {
         "message": "Lowercase letters are easier to distinguish from numbers"
     }]
     ```

2. **extends 扩展**

   stylelint 的配置可以 extend 一个已存在的配置文件（无论是你自己的还是第三方的配置），当一个配置继承了里一个配置，它将会添加自己的属性并覆盖原有的属性。

   你也可以将`extends`设置为一个数组，每一项都是一个独立的`stylelint`配置项，后一项将会覆盖前一项，而接下来你自己书写的 rules 规则可以覆盖他们所有。

   ```json
   {
   	"extends": "stylelint-config-standard",
   	"rules": {
   		"indentation": "tab",
   		"number-leading-zero": null
   	}
   }
   ```

   上述示例中，`rules`中的`indentation`和`number-leading-zero`将会覆盖`stylelint-config-standard`中对应的规则。

   ```json
   {
   	"extends": ["stylelint-config-standard", "./myExtendableConfig"],
   	"rules": {
   		"indentation": "tab"
   	}
   }
   ```

   以上，`./myExtendableConfig`中的配置将会覆盖`stylelint-config-standard`中的对应配置，而`rules`中的`indentation`将会覆盖`./myExtendableConfig`中对应的规则。

   extends 取值：

   `extends`的值实际上一个**定位器**（或者一个包含若干**定位器**的数组），所有可以通过`require`来使用的资源都可以作为`extends`的值。因此，可以使用 Node 的 `require.resolve()` 算法适应任何格式。一个**定位器**可以是：

   - `node_modules`中的某个模块名称 ，该模块的主文件需要返回一个配置对象 (例如：`stylelint-config-standard`；模块的 `main` 文件必须是一个有效的 JSON 配置）。
   - 一个带有 `.js` 或 `.json` 扩展名的文件 (若你在 Node 上下文中创建了一个 JS 对象，并将它传入也是有效的）的绝对路径。
   - 一个带有 `.js` 或 `.json` 扩展名的文件的相对路径，相对于引用的配置 (例如：如果 configA 是 `extends: "../configB"`，我们将查找 `configB` 相对于 configA）。

   正因为 extends，你可以创建和使用可分享的 stylelint 配置。如果你要发布你的配置到 npm，在你的 package.json 文件中使用 `stylelint-config` 关键字。

3. **plugins 插件**

   插件一般是由社区提供的，对`stylelint`已有规则进行扩展，一般可以支持一些非标准的`css`语法检查或者其他特殊用途。一个插件会提供一个或者多个检查规则。

   `plugins`是一个数组，包含一组插件的定位器，这些**定位器**的取值跟 extends 一致。

   `plugins`声明后还需要在`rules`中使用它，具体规则名称以及可能的取值需要去查看每个插件的文档。

   ```json
   {
   	"plugins": ["../some-rule-set.js"],
   	"rules": {
   		"some-rule-set/first-rule": "everything",
   		"some-rule-set/second-rule": "nothing",
   		"some-rule-set/third-rule": "everything"
   	}
   }
   ```

4. **processors 处理器**

   可以在`stylelint`的处理流中加入自己的处理函数`processors`，其只能作为 命令行 和 Node API 使用，`PostCss`的插件会忽略它们。

   通过`processors`，我们可以让`styleline`去处理`html`中`style`标签里面的`css`代码，`MarkDown`里面的`css`代码块或者`js`里面一段包含`css`的字符串。

   ```json
   {
     "processors": [
       "stylelint-html-processor",
       [ "some-other-processor", { "optionOne": true, "optionTwo": false } ]
     ],
     "rules": {..}
   }
   ```

5. **defaultSeverity**

   所有在第二个选项中没有指定严重级别规则的默认严重级别。`severity` 可用的值为：

   - `"warning"`
   - `"error"`

6. **ignoreFiles**

   一个文件匹配规则，或者一组文件匹配规则，来指定需要忽略的文件。

   可以通过 .stylelintignore 文件或者调整一下你的文件匹配规则来更高效地忽略文件。

   ignoreFiles 方式：

   ```
   // .stylelintignore
   *.js
   *.png
   *.eot
   *.ttf
   *.woff
   ```

   片段禁用规则：

   ```css
   /* stylelint-disable */
   /* （请说明禁止检测的理由）前端组件限制类名 */
   .cropper_topContainer .img-preview {
   	border: 0 none;
   }
   /* stylelint-enable */
   ```

7. **fix**

   - 一键 fix

     在 package.json 中的 scripts 添加指令，然后 npm run lintcss 即可：

     ```json
     {
     	"scripts": {
     		"lintcss": "stylelint 'src/**/*.css' --fix"
     	}
     }
     ```

   - 手动 fix

     针对指定文件自己执行， 文件一定要用`""`括起来：

     ```bash
     stylelint "src/less/bulma-cloud.less" --fix
     ```

## Stylelint 使用流程
