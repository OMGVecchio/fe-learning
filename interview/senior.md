# 高级

## JS

### 闭包

> 闭包是函数和声明该函数的词法环境的组合，这个环境包含了这个闭包创建时所能访问的所有局部变量

> 可做缓存、模拟私有方法、

> 闭包在处理速度和内存消耗方面对脚本性能具有负面影响

### 原型链

```text
原型对象 P；实例对象 p；构造函数 F
p.__proto__ = P
P.constructor = F
F.prototype = P
p = new F()
```

### 继承

```javascript
function Animal(name) {
  this.name = name
}
function Monkey() {

}
```

1. 原型链继承

`Monkey.prototype = new Animal()`

将子类原型对象设置为父类实例对象，简单纯粹；但不能多继承、原型对象属性被所有子实例共享且无法向父类构造函数传参

2. 构造继承

```javascript
function Monkey(name) {
  Animal.call(this, name)
}
```

抛弃原型链作用，可以通过多次调用 Parent.call 实现多继承，独享属性；只能继承父类实例上的属性方法，对原型上的属性方法无可奈何且每次构造时均需要调用父类实例，影响性能

3. 实例继承

```javascript
function Monkey(name) {
  const ins = new Animal(name)
  return ins
}
```

很好解决了构造方法不支持继承父类原型的问题，但是实例是父类而不是子类的实例，并且不能实现多继承、每次也需要实例一个父类，影响性能

4. 拷贝继承

```javascript
function Monkey(name) {
  const ins = new Animal(name)
  for(let key in ins) {
    Monkey.prototype[key] = ins[key]
  }
}
```

不支持多继承，效率低、内存占用高且无法获取父类不可枚举的方法

5. 组合继承

```javascript
function Monkey(name) {
  Animal.call(this, name)
}
Monkey.prototype = new Animal()
```

可继承父类实例属性方法和原型的属性方法，且通过 call 在子类实例上绑定独享属性解决了原型链上属性共享的问题，也可实例化时传参；但生成了两次父类实例

6. 寄生组合继承

```javascript
function Monkey(name) {
  Animal.call(this, name)
}
Monkey.prototype = Object.create(Animal.prototype)
Monkey.prototype.constructor = Monkey
```

通过寄生方式，砍掉父类的实例属性

### [执行上下文](https://www.cnblogs.com/wilber2013/p/4909430.html)

#### 三种代码运行环境

1. Global Code

开始运行的默认环境

2. Function Code

进入一个函数栈后的执行环境

3. Eval Code

eval() 执行的代码

> 为了表示不同的运行环境，JavaScript 中有一个执行上下文（Execution context，EC）的概念。也就是说，当 JavaScript代码执行的时候，会进入不同的执行上下文，这些执行上下文就构成了一个执行上下文栈（Execution context stack，ECS）

> 对于每个 Execution Context 都有三个重要的属性，变量对象（Variable object，VO），作用域链（Scope chain）和 this

#### VO 和 AO

##### VO

> 一般 VO 中会包含以下信息：变量，函数声明和函数的形参

> 对于 VO，是有下面两种特殊情况: 函数表达式（与函数声明相对）不包含在 VO 之中；没有使用 var、let、const 声明的变量（这种变量是，"全局"的声明方式，只是给 Global 添加了一个属性，并不在 VO 中）

##### AO

> 只有全局上下文的变量对象允许通过 VO 的属性名称间接访问；在函数执行上下文中，VO 是不能直接访问的，此时由激活对象(Activation Object,缩写为 AO)扮演 VO 的角色。激活对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化

> Arguments Objects 是函数上下文里的激活对象AO中的内部对象，它包括下列属性：callee 指向当前函数的引用；length 真正传递的参数的个数，properties-indexes：就是函数的参数值(按参数列表从左到右排列)

> 对于 VO 和 AO 的关系可以理解为，VO 在不同的 Execution Context 中会有不同的表现：当在 Global Execution Context中，可以直接使用 VO；但是，在函数 Execution Context 中，AO 就会被创建

##### EC

```txt
当一段 JavaScript 代码执行的时候，JavaScript 解释器会创建 Execution Context，其实这里会有两个阶段：
1. 创建阶段（当函数被调用，但是开始执行函数内部代码之前）
    创建 Scope chain
    创建 VO/AO（variables, functions and arguments）
    设置 this 的值
2. 激活/代码执行阶段
    设置变量的值、函数的引用，然后解释/执行代码
```

```txt
对于"创建VO/AO"这一步，JavaScript解释器主要做了下面的事情：
1. 根据函数的参数，创建并初始化 arguments object
2. 扫描函数内部代码，查找函数声明（Function declaration）
    对于所有找到的函数声明，将函数名和函数引用存入 VO/AO 中
    如果VO/AO中已经有同名的函数，那么就进行覆盖
3. 扫描函数内部代码，查找变量声明（Variable declaration）
    对于所有找到的变量声明，将变量名存入 VO/AO 中，并初始化为 undefined
    如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性
```

通过对 VO/AO 在"创建阶段"的具体细节，如何扫描函数声明和变量声明，就可以对 JavaScript 中的 Hoisting 有清晰的认识

### 作用域

```txt
每一个 Execution Context 中都有一个 VO，用来存放变量，函数和参数等信息。
在 JavaScript 代码运行中，所有用到的变量都需要去当前 AO/VO 中查找，当找不到的时候，就会继续查找上层 Execution Context中的 AO/VO。这样一级级向上查找的过程，就是所有 Execution Context 中的 AO/VO 组成了一个作用域链。
所以说，作用域链与一个执行上下文相关，是内部上下文所有变量对象（包括父变量对象）的列表，用于变量查询
```

## this

> this 是执行上下文（Execution Context）的一个重要属性，是一个与执行上下文相关的特殊对象

> this不是变量对象（Variable Object）的一个属性，所以跟变量不同，this 从不会参与到标识符解析过程。也就是说，在代码中当访问 this 的时候，它的值是直接从执行上下文中获取的，并不需要任何作用域链查找。this 的值只在进入上下文的时候进行一次确定
