# 微信小程序扩展
> 只做简易的实现，用于日常简单的业务

* [EventBus](#EventBus)
* [Mixin](#Mixin)
* [GlobalData](#GlobalData)
* [Watch](#Watch)

## EventBus
1. app.js引入
```javascript
import eventBus from './lib/eventBus.js'
//挂载到全局上
wx.$bus = eventBus
```
2. 使用
```javascript
//监听(可监听多个)
wx.$bus.on('event1',(msg)=>{
  console.log('event1:'+msg)
})
//触发
wx.$bus.emit('event1','hello')
//移除
wx.$bus.off('event1')
```

## Mixin
> 页面的定义 优先级大于 mixins, 生命周期优先执行mixin再执行Page
1. app.js引入
```javascript
import mixin from './lib/mixin.js'
```
2. 全局mixin
```javascript
//在app.js使用
wx.mixin({
  data:{},
  onLoad(){},
  myMethod(){}
})
```

3. Page的mixins选项
```javascript
//my-mixin.js
export default const mixin = {
  data:{
    msg:'mixin'
  },
  myMethod(){
    console.log('hi')
  },
  onLoad(){}
}
```
```javascript
//Page
import myMixin from '../../mixins/my-mixin.js'
Page({
  mixins:[myMixin],
  data:{
    msg:'page'
  },
  onLoad(){
    console.log(this.data.msg) // page
    this.myMethod() // hi
  }
})
```
## GlobalData
> 将此方法mixin到页面或挂载到全局后，页面获取globalData时不需要再声明getApp()
1. app.js引入
```javascript
import $global from './lib/globalData.js'
wx.mixin({$global})
```
2. 使用
```javascript
//获取globalData
this.$global()
//获取项
this.$global('name')
//设置单个
this.$global('name','Joe')
//设置多个
this.$global({name:'Joe'})
```
## Watch
> 监听数据变化，用法和Vue相似
1. app.js引入
```javascript
import watch from './lib/watch.js'
wx.mixin({
  onLoad(){
    watch.setWatch(this)
  }
})
```
2. 使用
```javascript
Page({
  data:{
    msg:'hello',
    msg2:'hi',
    people:{
      name:'Joe'
    }
  },
  watch:{
    msg:function(newVal,oldVal){},
    //字符串方法名
    msg2:'someMethod',
    //数组内接受多个方法
    'people.name':[
      'someMethod2',
      function(newVal,oldVal){}
    ],
    //监听对象变化，需要添加deep
    people:{
      handler(newVal,oldVal){},
      deep:true
    }
  }
})
```