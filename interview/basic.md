# 基础

## HTML

### DOCTYP

`DOCTYP` 是一条指令，告诉浏览器通过哪一种文档类型解析文档，`DOCTYPE` 不存在或格式不正确会导致文档以兼容模式呈现。
标准模式的排版和JS运作模式都是以该浏览器支持的最高标准运行；在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。
`HTML5` 中只需要引入 `<!DOCTYPE html>`，之前的版本中基于 `SGML`，所以需要对 `DTD` 进行引用。
所有IE浏览器在默认情况下（<meta http-equiv="X-UA-Compatible">与<!DOCTYPE>均没有），是采用怪异模式（Quirks；
当有<!DOCTYPE>时，均采用浏览器版本对应的标准模式（如IE8就采用IE8标准模式，IE11就采用IE11标准模式）。
`<meta http-equiv="X-UA-Compatible">`可选的值有

```txt
IE=5、IE=7、IE=EmulateIE7、IE=8、IE=EmulateIE8、IE=9、IE=10、 IE=11、 IE=Edge
```

1. IE=5：表示采用怪异模式
2. IE=7等纯数字的值：表示采用对应IE版本的标准模式，即使不是以<!DOCTYPE>作为文档第一行，文档模式依旧使用标准模式
3. IE=EmulateIE7等含EmulateIE字符串的值：表示采用模拟对应IE版本的模式，如果是以<!DOCTYPE>作为文档第一行则采用该版本的标准模式，否则采用怪异模式
4. IE=Edge：表示采用浏览器自身版本的文档模式，如IE11，以<!DOCTYPE html>作为文档第一行则采用IE11标准模式，否则采用怪异模式

`怪异模式` 见后续分析

### link 和 @import

+ `link` 属于 `XHTML` 标签，除了加载 `CSS` 外，还能用于定义 `RSS`, 定义 `rel` 连接属性等作用；而 `@import` 是 `CSS` 提供的，只能用于加载 `CSS`
+ 页面被加载的时，link会同时被加载，而 `@import` 引用的CSS会等到页面被加载完再加载
+ `@import`是 `CSS2.1` 提出的，只在 `IE5` 以上才能被识别，而 `link` 是 `XHTML` 标签，无兼容问题
+ `link` 支持使用 `js` 控制 `DOM` 去改变样式，而 `@import` 不支持

## JS

### 事件模型及事件代理

### 跨域处理

### parseQueryString

### Number 类型

> JavaScript 中 number 的实现遵循 IEEE 754 标准，使用 64 位固定长度来表示，也就是标准的 double 双精度浮点数。第 0 位：符号位，0 表示正数，1  表示负数；第 1 位到第 11 位：储存指数部分；第 12 位到第 63 位：储存小数部分

> 十进制小数变为二进制：用2乘十进制小数，可以得到积，将积的整数部分取出，再用2乘余下的小数 部分，又得到一个积，再将积的整数部分取出，如此进行，直到积中的小数部分为零，或者达到所要求的精度为止。然后把取出的整数部分按顺序排列起来，先取的整数作为二进制小数的高位有效位，后取的整数作为低位有效位

浮点数运算时的丢失问题： 部分浮点数在转化时会无限循环，导致最终生成不了预期的数据

> 整型统一按浮点数处理，整数是按最大 54 位来算最大(2<sup>53</sup> - 1，Number.MAX_SAFE_INTEGER，9007199254740991) 和最小(-(2<sup>53</sup> - 1)，Number.MIN_SAFE_INTEGER，-9007199254740991) 安全整数范围的。所以只要超过这个范围，就会存在被舍去的精度问题

Number.MAX_VALUE/Number.MAX_SAFE_INTEGER  TODO

### microtask 和 macrotask

> 宏任务：setTimeout, setInterval, setImmediate, I/O, UI rendering

> 微任务：process.nextTick, Promises, Object.observe, MutationObserver

### Event Loop
