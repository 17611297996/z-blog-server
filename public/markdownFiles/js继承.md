---
title: Js中的继承
description: JavaScript】继承的实现方式详解
date: 2024-12-23
tags: [技术点滴, 前端开发, JavaScript]
sort: 7
---

# JavaScript】继承的实现方式详解

## 原型链继承

原型链继承的核心思想是让子类的 prototype 指向父类的实例，这样子类就能访问父类的方法和属性

```javascript
//原型链继承
function Parent() {
    this.name = 'zhangsan'
    this.color = 'red'
}
function Child() {
    console.log(this.name, 'na,me==>>')
}
Child.prototype = new Parent()
const child1 = new Child()
console.log(child1, 'child') //此时就可以获取到父类的属性和方法
```

#### 存在的问题

1. 子类实例共享父类的引用属性，会都发生改变，会产生影响

2. 无法向父类构造函数穿参数

## 构造函数继承

通过在子类的构造函数中调用父类构造函数，并使用 call 或者 appliy 绑定 this 来实现继承

这样也可以解决 引用类型翁题

```javascript
function Parent(name) {
    this.name = name
    this.colors = ['red', 'blue', 'green'] // 引用类型属性
}

function Child(name) {
    Parent.call(this, name) // 调用父类构造函数
}

const child1 = new Child('Child1')
const child2 = new Child('Child2')

child1.colors.push('yellow') // 修改 child1 的 colors 数组

console.log(child1.colors) // ["red", "blue", "green", "yellow"]
console.log(child2.colors) // ["red", "blue", "green"] (不会被修改)
```

**避免了引用属性共享问题**（子类实例有自己的  `colors`）

✅ **支持向父类构造函数传参**

#### 存在的问题

-   **方法不能复用**：父类的方法必须在每个子类实例上都创建一次，而不是共享在  `prototype`  上。

### class 类 继承（最现代化的方式）

✅ **语法简洁，易读易写**

✅ **继承逻辑清晰**

✅ `super()`**关键字提供更清晰的继承机制**

```javascript
class Parent {
    constructor(name) {
        this.name = name
        this.colors = ['red', 'blue', 'green']
    }

    getName() {
        return this.name
    }
}

class Child extends Parent {
    constructor(name, age) {
        super(name) // 继承父类属性
        this.age = age
    }
}

const child1 = new Child('Child1', 18)
console.log(child1.getName()) // Child1
console.log(child1.colors) // ["red", "blue", "green"]
```

直接使用 extends 实现继承

在现代 JavaScript 开发中，建议  **优先使用 ES6**`class`**继承**，
