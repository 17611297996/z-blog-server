---
title: vue3复盘与学习
description: 本篇文章介绍了如何使用 vue3 语法编写文章，包括基本语法和一些实用技巧。
date: 2025-04-21
tags: [技术点滴, 前端开发, vue]
sort: 2
---

```vue
<template>
    <MdEditor v-model="text" />
</template>

<script setup>
import { ref } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const text = ref('Hello Editor!')
</script>
```
