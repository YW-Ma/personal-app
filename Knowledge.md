我在做项目的过程中，学习了一些前端基础知识。为了方便以后的查询，将这些知识集中在这篇博客中，方便以后的查询。

 

# todo-list项目中的知识：

------

## 1. NPM 版本号控制

版本号：major.minor.patch

^：控制Major

~：控制Minor

空前缀：安装指定版本

------

## 2. 如何实现本地持久化存储

**应当使用localStorage进行存储。**

**localStorage**： localStorage 很适合进行少量数据（< 5 M）的存取
sessionStorage： sessionStorage **会在页面关闭之后被清空，无法进行持久化存储**
indexedDB：看情况，如果是存储一个简单 JSON 对象，则没有必要使用数据库

**此外：localStorage可以存储图片（**不过不能太大，可以存小图标**）**

有一种编码方式叫做 base64，这种编码方式可以将二进制编码为可显示的 ASCII 字符（大小写字母及若干个标点符号）。

因此虽然localStorage不能存储二进制，但是可以存储base64编码后的图标。

------

## 3. 表单提交后，页面的默认行为是刷新，如何阻止页面在提交后刷新

**改用别的方案**：比如监听input元素的keydown事件检测回车，而不再使用表单提交。

**阻止默认行为**：使用preventDefault方法可以组织后续行为的执行，在表单提交汇总可以组织跳转。

**使表单不通过校验**：监听表单的onSubmit事件并返回false。当onSubmit事件返回false之后，浏览器会认为表单未通过校验，进而就不进行跳转。

------

## 4. 解构赋值

**数组解构：**

支持：解构字符串、跳跃解构、利用剩余参数解构，也支持默认值。

```javascript
// example 1
const text = "Hello world";
const [,e,l, ...rest] = text;
// H is skipped.
// e --> e
// l --> l
// rest --> ["l", "o", " ", "w", "o", "r", "l", "d"]
 
// example 2
const array = [1,2,3];
const [a, b, c, d = 100] = array;
// d === 100 
```

**对象解构：**

关键：用对应的键名来解构对象，如果想取别的名字要用别名（见example 2）。

支持：键名解构（example 1）、别名解构（example 2）、层级结构（example 3）；也支持剩余属性解构和默认赋值。

实际上，example 3中的层级结构类似于example 2的别名，只是这个别名也被解构了。

```javascript
// example 1 basic
const Person = {name: "Fiona", age: 22, title: "Miss"};
const {name, age, title} = Person; // declare three variables and assgin them values.
 
// example 2 alias
// formate: {attribute: variable name}
const Person = {name: "Fiona", age: 22, title: "Miss"};
const {name: who} = Person // who === "Fiona";
 
// example 3 hierarchical structure
const family = {
    property: 567222333,
    members: [
        {name: "Fiona", age: 22},
        {name: "Eris", age: 24},
    ]
};
 
const { members:[first, ...rest] } = family;
//first === {name: "Fiona", age: 22}
//rest === [ {name: "Eris", age: 24} ]
```

**应用：**

**for of循环：**以快速获取对象属性。比如遍历一个班级的名单（每一项为{name:xxx, age:xxx}），可以for (const {name, age} of array) { ... }

**解构参数：**以快速获取内容。比如在定义、调用中都以[name, age]作为参数。

 

**参数默认值：**联合结构参数一起使用，把默认值也写成一个结构体。

```javascript
// array
function add([x, y] = [1, 2]) {
    return x + y;
}
add() === 3;
 
// object
function sub({x, y} = {x: 10, y: 5}) {
    return x - y;
}
sub() === 5;
```

**交换变量：**

```javascript
[a, b] = [b, a]
```

**import 语句：**

ES6的import语句也是解构赋值。

 

**注意事项：**

**对已经声明了的变量使用解构赋值时，要把这个语句包裹在小括号里（）。不然，由于以大括号 { 开头，会被解释器认为本语句将是一个块级代码。**

**此外：基本类型解构：解释器将{}中的变量自动转化为对象（比如输入一个函数的名字作为变量名，就会变为这个函数对象）；而null和undefined因为无法被转换为对象，因此无法解构。**

------

## 5. CSS布局：使元素上下居中有哪些常用的办法

**使用Flex布局：**如果不考虑兼容性问题，使用flex布局加align-item: center。

**relative相对定位**：需要知父子元素的高度，且父元素下也只能有这一个元素。

![img](https://img-blog.csdnimg.cn/20200907164513794.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L01vcmdhbl9zYWt1cmE=,size_16,color_FFFFFF,t_70)

**设置line-height使得文字上下居中：**如果父元素只有这一个子元素，而且知道父元素的height，那么可以通过设置子元素的line-height值为父元素的height值。[参考这篇文章](https://www.cnblogs.com/huchong-bk/p/11504834.html) 应该是这个意思：

![img](https://img-blog.csdnimg.cn/20200907164054477.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L01vcmdhbl9zYWt1cmE=,size_16,color_FFFFFF,t_70)

------

# 个人中心项目中的知识：

------

## 1. react-router-dom中的组件

**``** 是用于包裹 React 路由链接的组件，放置于最外层。参考[参阅官方文档](https://reactrouter.com/web/api/BrowserRouter)；

**``** 类似switch-case，能够选择其中一个 `` 进行渲染；

**``** 每条路由的路径及组件声明；

**``** 一个类似于 `` 标签的组件，可以用于 React 单页应用内的导航。

举例：

```javascript
const Router = () => (
    <Switch>
        {/* Switch相当于js中的switch function */}
        <Route exact path="/" component={Home}/>  
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        {/* Route负责匹配一个路径和渲染此路径的组件。 */}
    </Switch>
);
```

------

## 2. （按需加载）导入组件的方式

举例：如果想从antd中导入Menu组件：

```javascript
import { Menu } from 'antd' 
// 是最常用也是最简单的方法，结合解构方便快捷地导入组件；需要注意的是，这种方法需要搭配摇树优化插件才能实现按需加载；
 
import Menu from 'antd/lib/menu' 
// 这种方法是一种按需加载的引入方法，只引入所需要的模块，减小打包体积；
 
import { Menu } from 'antd/dist/antd' 
// 是将打包好的 Antd 资源文件导入，也是直接将整个包导入，而且无法进行加载优化；
 
const { Menu } = require('antd') 
// 是 nodejs 的 require 导入方法，在 ES6 普及的当下，并不推荐在项目中使用这种写法（各类配置文件除外）。
```

搭配tree-shaking插件，通过 import {Menu} from 'antd' 导入组件可以实现按需加载。

如果是直接找到了Menu所在的文件，即'antd/lib/menu'，也可以手动按需加载导入Menu。

余下的两种方法（一种写明了资源文件，一种是用的require而不是import），则无法实现按需加载。

------

## 3. 不被CSS支持的选择器

镶嵌语法（nesting）、变量、mixin写法（为了代码复用）

```css
// nesting写法
.myArticle {
    &p {
        ...
       }
}
 
// @width是一个变量
@width: 10px;
 
// mixin可以进行代码复用
.mixin()
```

------

## 4. （CSS Module写法）如何引入两个样式

假设 './index.module.less' 中有 .dark和 .light两个类样式：

**CSS Module可以直接导入到组件中：**

```css
import styles from './index.module.css'
```

**也可以用解构赋值的方法导入：**

```css
import {dark, light} from './index.module.css'
```

**如果使用单一的样式：**

```html
<div class = {styles.dark}>Dark Theme</div>
```

**如果要使用多个样式，要添加空格：** 第一行两个变量间添加了空格，第二行是用空格来join。

```html
<div class = {`$(dark) $(light)`}>Dark & Light</div> 
<div class = {[dark, light].join(' ')}>Dark & Light</div>
```

------

## 5. useEffect的返回函数（在组件销毁时执行的函数）

useEffect被用于在函数组件中模拟生命周期。

下面是来自九章的说明：

> 举个例子：
>
> ```javascript
> function MyComponent() {
>     useEffect(() => {
>         const timer = setInterval(
>             () => console.log('hooooooook!'),
>             1000
>         );
>         return () => clearInterval(timer);
>     }, []);
>     
>     return (<div>Hello</div>);
> }
> ```
>
> 在这个例子中，**组件被挂载时会生成一个计时器**，每一秒向控制台输出内容；
> **在组件被销毁时，这个计时器也应该被清除**，否则会造成内存泄漏；
> 最后的返回函数 **`() => clearInterval(timer)` 会在组件被销毁时执行，用于清除计时器。**