---
title: js中的Class类
description: 为了更好的实现面向对象编程，降低代码的冗余度，es6推出了class类的概念。他实际上是一种语法糖，本质上利用的还是原型和构造函数的概念
date: 2025-02-23
tags: [技术点滴, 前端开发, JavaScript]
sort: 6
---

1. es6 中推的目的是什么？为什么推类

为了更好的实现面相对象编程，降低代码的冗余度,es6 推出了 class 类的概念，他实际上是一种语法糖，

1. 类定义

两种方式:

```javascript
class Person{} //第一种
//表达式中这个名称PerName是可选的
let Person = class [PersonName] //第二种
console.log(Person.namew)
```

**类的话是块级作用域**

1. 类的构成

js 中类主要分为五类:

1. 构造函数方法

2. 实例方法

3. 静态方法

4. 获取函数

5. 设置函数

```javascript
class Person {
  //构造函数方法
  constructor(name,age){
    this.name = name;
    this.age = age;
  }
  //实例方法
  getName(){
    console.log(this.name);
  }
  //静态方法
  static sayHello(){
    console.log('你好，陌生人')
  }
  //设置函数
  set _name(val){
    console.log('有人试图改名字',val)；
    this.name = val;
  }
  //获取函数
  get _name(){
    console.log('有人想获取名字')
    return this.name
  }
}
let p = new Person('zhangsan'，18)
p.getName()
Person.sayHello()
p._name = 'lisi'
console.log(p._name);
```

1. 类构造函数

constructor 关键字用于在定义块内部创建类的构造函数，方法名 constructor 会告诉解释器在是使用 new 操作符创建类实例的时候，应该调用这个函数。构造函数的定义不是必须的，不定义构造函数相当于将构造函数定义为空函数

**使用 new 创建实例的过程:**

1. 创建一个新对象

2. 对象的 prototype 属性指向构造函数的原型

3. 构造函数中 this 指向该对象

4. 执行构造函数，初始化实例对象

5. 构造函数若返回引用类型的值，将返回该值，否则，将返回新对象

**类构造函数和构造函数的区别:**

类构造函数只能通过 new 操作符调用，构造函数可以直接调用，也能 new 调用。

类的本质：

类的本质就是一个函数，只不过只能用 new 调用。

```javascript
console.log(typeof Person)// "function"
console.log(Person.constructor === Fcuntion) true
```

因为类是函数，你也可以立即执行

```javascript
const p = new Person{}()
```

1. 实例独有与原型共享

**实例独有**

在构造函数中定义的方法和属性是实例独有的，每个实例都有自己的独有副本。不会和其他实例共享

例如:

```javascript
class Person1 = {
  constructor(name,age){
    this.name = name;
    this.age = age；
    this.getName = () => {
      console.log(this.name);
    }
  }
}
const p1 = new Person1("zhangsan", 18);
const p2 = new Person1("lisi", 20);
console.log(p1.getName) //属于p1 实例
console.log(p2.getName) //属于p2 实例
console.log(p1.getName())//zhangsan
console.log(p2.getName())//lisi
```

**原型共享**
**相比之下，定义在类的原型上的方法会被所有实例所共享，这也是原型继承的核心之一**

```javascript
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    getName() {
        console.log(this.name)
    }
}

const person1 = new Person('Alice', 25)
const person2 = new Person('Bob', 30)

console.log(Person.prototype.getName) // 输出函数定义，属于原型
person1.getName() // Alice
person2.getName() // Bob
```

getName 方法是定义在 Person 类的原型上的，所有实例都会共享这个方法
总的来说在构造函数中定义的方法和属性属于实例对象，在不共享

而定义在类中的方法则共享
