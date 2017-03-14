# ![dreamerLOGO](./dream.png) Dream UI React

[![NPM version](https://img.shields.io/npm/v/amazeui-react.svg?style=flat-square)](https://www.npmjs.com/package/dreamui-react)

Dream UI component build with React.  
基于 React.js 封装的 Web 组件库。

----

- webpack 2
-

## Start Program

### 目录结构

```
├── package.json		# npm文档
├── dist				# 构建目录
├── docs				# 文档源文件
├── example				# 实例源文件
├── lib					# npm源文件目录
├── www 				# 文档构建目录
├── src					# 组件源文件
└──
```

### 开发 

使用之前先安装依赖

```
npm install
```
可能还需要进行webpack和gulp以及eslint的全局安装。

- 开发及文档

```
npm run start
```

- 构建 

```
npm run build
```
- 示例

```
npm run example
```


### 为什么我自己写一个react组件库并开源？

- 因为在react中 一切皆组件，一个组件或大或小，麻雀虽小，五脏俱全，它有完整的 视图展示、交互功能。

- 某种意义上来讲，react的组件化代表了web前端的发展方向 [WebComponent](https://developer.mozilla.org/en-US/docs/Web/Web_Components)。

- 开发者封装了react组件，避免了重复的书写代码，和优秀代码的共享，更将html、css、javascript集合到了一起，这可以让我们更好的移植它。

- 每一个组件，或者说是一个模块，相互不干预，保证了web application的稳定可靠性，可以说也降低了开发难度。



### 需要构思的难点

* 需要抽象常用组件（按钮、输入框、单选、复选）好多啊。。。
* 这东西得做成一个npm包，到时候发布到npm，方便安装使用。
* 组件内部肯定会有一些依赖，如果处理这些依赖？
* 还要考虑用webpack打包，可能还会用到gulp吧？
* 我应该怎么设计对外输入接口？也就是说别人用我这个库的时候怎么调用才方便？
* 嗯，我应该去参考一下现有的第三方实现，看看人家是怎么做的
* 用hammer还是fastclick解决touch延时问题？
* 移动端需要normalize这些东西吗？
* icon-font要引入一个吧，用哪个库？
* 大问题：移动端尺寸适配。之前研究过淘宝的flexible，但是好像问题不少，要不考虑一下用flexbox？
* 样式肯定要统一，所以肯定要定义variable.scss、mixin.scss这些文件
* 要用到CSS Module吗？
* 源码怎么组织？
* 要做统一的动画吗？
* 要根据安卓和ios做两套样式吗？