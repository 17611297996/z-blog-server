---
title: Pinia与Vuex对比(为什么推荐Pinia)
description: Vue3Pinia与Vuex状态管理的优势对比
date: 2025-05-27
tags: [技术点滴, 前端开发, Vue]
sort: 8
---

## 一、核心概念对比

### vuex

-   vuex 是强调严格的单向数据流

-   通过 mutations/actions/getters 等概念强制分离关注点

### Pinia

-   基于 Composition API 的轻量级状态管理

-   提供更灵活的组织方式

-   减少模版代码，更贴近 Vue3 的响应式理念

### 基本结构差异

#### vuex 的 Store 结构：

```javascript
import { createStore } from 'vuex'

export default createStore({
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
})
```

#### Pinia 的 Store 结构

```javascript
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
    state: () => ({}),
    getters: {},
    actions: {}
})
```

**关键区别:**

-   Pinia 没有 mutations 的概念，actions 可同步可异步

-   Pinia 使用 defineStore 工厂函数而非单一 Store 实例

-   Pinia 的 store 本质是一个组合式函数

## 二、API 用法对比

Vuex

```javascript
// 定义
state: () => ({
  count: 0
})

// 组件中使用
computed: {
  count() {
    return this.$store.state.count
  }
}
```

Pinia:

```javascript
// 定义
state: () => ({
    count: 0
})

// 组件中使用
const store = useStore()
const count = computed(() => store.count)
```

### 优势对比:

Pinia 直接通过 store 实例访问状态无需$store.stagte

Pinia 的状态天然石响应式的，无需额外包装

### 状态变更方式：

vuex

```javascript
// 定义 mutation
mutations: {
  increment(state) {
    state.count++
  }
}

// 组件中提交
this.$store.commit('increment')
```

Pinia 的灵活方式

```javascript
// 直接修改
store.count++

// 或通过 action
actions: {
  increment() {
    this.count++
  }
}

// 组件中调用
store.increment()
```

Pinia 允许直接修改状态，消除了 mutation 的概念 简化了状态变更的流程

## 三、模块化方案对比

Vuex 的模块系统

```javascript
const moduleA = {
    namespaced: true,
    state: () => ({}),
    mutations: {},
    actions: {}
}

const store = createStore({
    modules: {
        a: moduleA
    }
})

// 使用
this.$store.commit('a/someMutation')
```

-   需要显示声明 namespaced

-   访问需要模块前缀

-   嵌套模版可能变得复杂

Pinia 的模块化方案

```javascript
// userStore.js
export const useUserStore = defineStore('user', {
    state: () => ({}),
    actions: {}
})

// productStore.js
export const useProductStore = defineStore('product', {
    state: () => ({}),
    actions: {}
})

// 组件中使用
const userStore = useUserStore()
const productStore = useProductStore()
```

**优势:**

-   每个 store 天然独立，无需命名空间配置

-   可以交叉组合使用多个 store

-   更符合现代化前端工程的模块化思想

## 四、TypeScript 支持对比

#### Vuex 4 对 TypeScript 错的支持有所改进，但仍存在挑战

```javascript
interface State {
    count: number;
}

export default createStore <
    State >
    {
        state: (): State => ({
            count: 0
        }) // 需要额外类型声明来保证类型安全
    }
```

##

痛点：

mutations/actions 参数需要手动声明类型

模块类型系统复杂

使用 this.$store 时类型推断有限

####

#### Pinia 的 TS 优势

Pinia 天生微 TypeScript 设计:

```javascript
interface State {
    count: number;
}

export const useStore = defineStore('store', {
    state: (): State => ({
        count: 0
    }),
    getters: {
        doubleCount(): number {
            return this.count * 2 // 完全类型推断
        }
    },
    actions: {
        increment() {
            this.count++ // 自动类型推断
        }
    }
})
```

特点：

-   完整的类型推断

-   无需额外类型声明

-   组合 store 时类型安全

## 五、性能与体积对比

Pinia 体积减少约百分之 40 ，对 bundle 大小更友好

#### 运行时性能

1. 响应式系统

-   Pinia 直接基于 Vue3 的 reactive();

-   Vuex 需要维护自己的响应式系统

1. 更新效率

-   Pinia 的颗粒度更细更新更高效

-   Vuex 的全局单一 Store 在大型应用中可能触发不必要的更新

1. 内存占用

-   Pinia 的模块化设计内存占用更低

-   Vuex 需要维护完整的模块树
