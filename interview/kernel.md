# 浏览器内核及 JS 引擎

## 概念

通常所谓的浏览器内核也就是浏览器所采用的渲染引擎

## 常见内核

1. Trident

> IE 内核
> IE8 JS引擎是 Jscript，IE9 开始使用 Chakra

2. Gecko

> Firefox 内核
> JS 引擎是 SpiderMonkey，衍生而来 ​r​a​c​e​M​o​n​k​e​y​，​J​ä​g​e​r​M​o​n​k​e​y​，​I​o​n​M​o​n​k​e​y​

3. presto

> Opera前内核，已废弃，现已拥抱 blink
> JS 引擎是

4. webkit

> Safari 内核,Chrome 内核原型
> 继承至 KDE 的 KHTML
> IOS 上的 webview 的核心引擎
> JS 引擎 JSCore

5. blink

> Chrome 内核
> 继承至 webkit，Chromium 计划的一部分
> 在 Android4.4 以前采用 webkit，以后采用 chromium 的 blink
> JS 引擎，速度超快的 V8，拥有 JIT 等一系列革新技术手段

6. Servo

> Firefox 实验性次时代内核
> Mozilla 基于 Rust 语言开发，主要功能是支持多核和异构处理器，灵活使用 GPU 进行并行处理，通过大幅改善内存管理来强化安全性
