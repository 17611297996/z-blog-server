---
title: ReactNative0.68环境搭建
description: ReactNative0.68环境搭建记录
date: 2024-09-02
tags: [技术点滴, 前端开发, React]
sort: 5
---

## ReactNative0.68 环境搭建

1. 安装 JDK 为 11 版本

    安装包：

暂时无法在飞书文档外展示此内容

安装步骤，一路往下 next,也可以自定义安装到指定文件夹里

1. 我此时的 node 和 npm 版本和 yarn 版本为以下如图，但是我不清楚是否和 node 版本有关系

![图片](/mardownImg/public/markdown-images/418069be2832b36432a7aadfeec03bff.png)

1. 下载 Android Studio，直接在官网上下，自己的网如果可以打开页面那就不用配代理。

2. 一开始会让自己选择下那些 android SDK 的版本，一开始都是最新的，而且下载巨慢，我一开始下载是 35 版本的，之后我又换成了 12 版本的

![图片](/mardownImg/public/markdown-images/776e6dfc5c6af8f93ff69660cd6dd4d9.png)
tools 里安装这些，这里遇见的第一个坑，就是使用 adb 命令连接真机的时候报错 adb 不是内部命令就是没有安装 androidSDK Platform-Tools,还有一种情况是环境变量没配对

![图片](/mardownImg/public/markdown-images/5290f928a8c089ce9b9876a5083feeb0.png)

1. 配置环境变量，安装官网的配就行，我的配置如下

![图片](/mardownImg/public/markdown-images/813eb39963f0f7e68986673ce3f9578e.png)
ANDROID_HOME 是新添加的，指定的是安装 android SDK 的目录

PATH 里面点击编辑然后在里面添加以下变量

![图片](/mardownImg/public/markdown-images/3e87b4bfec26cef7d431d5eb17ba9c97.png)
我只在用户变量里面配的，系统变量没有配。

1. 创建一个新项目试一下

    指定版本创建

    使用 npx react-native init AwesomeProject --version 0.68

1. 连接真机调试，直接用数据线连接到手机或者 pad,打开开发者模式，选择开启 usb 调试和网络共享就可以了，然后手机会有弹窗提示就说明可以了，然后在电脑里运行 adb devices 命令在查看连接上了没有，连接上会出现连接码的

1. 第一次运行项目，使用 yarn android,第一次运行会很慢很慢，用了 3 个小时，而且中途可能会报错，

    报错如果是 gradle 的包下载超时了，我的解决办法是修改 gradle 的引用路径,把 https 换成本地引用

暂时无法在飞书文档外展示此内容

![图片](/mardownImg/public/markdown-images/cc350aa508605836b79fc60b8f9b1ac1.png)

![图片](/mardownImg/public/markdown-images/fd7b4e7c92bb83a088fdf00f530a7a9d.png)
有可能还会报别的错，有的啥 gradle 版本 x.xx.x 找不到了，可能要修改 build.gradle 文件，我当时没遇到，但是另一个电脑遇到了所以需要记录一下 build.gradle 的配置，他有可能会报 25 行

classpath("com.android.tools.build:gradle:7.0.4")这个版本找不到的错，可能会需要更换别的版本或者是在网上找切换镜像的方法

```plain
import org.apache.tools.ant.taskdefs.condition.Os

// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    ext {
        buildToolsVersion = "31.0.0"
        minSdkVersion = 21
        compileSdkVersion = 31
        targetSdkVersion = 31

        if (System.properties['os.arch'] == "aarch64") {
            // For M1 Users we need to use the NDK 24 which added support for aarch64
            ndkVersion = "24.0.8215888"
        } else {
            // Otherwise we default to the side-by-side NDK version from AGP.
            ndkVersion = "21.4.7075529"
        }
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:7.0.4")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("de.undercouch:gradle-download-task:4.1.2")
        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url("$rootDir/../node_modules/react-native/android")
        }
        maven {
            // Android JSC is installed from npm
            url("$rootDir/../node_modules/jsc-android/dist")
        }
        mavenCentral {
            // We don't want to fetch react-native from Maven Central as there are
            // older versions over there.
            content {
                excludeGroup "com.facebook.react"
            }
        }
        google()
        maven {
             url 'https://www.jitpack.io'
              }
    }
}
```

1. 下载完，执行到 100 就可以了，手机上会提示下载安装包的，之后打开就是要运行的项目就可以调试了。这里的坑运行的时候可能会报设备连接异常或者是没有可连接的设备，我当时遇见的是连接异常，pad 上面下载安装包的时候就闪退了，之后就会报错，这是因为 pad 上又另一个版本的包，卸了重新执行就可以了
