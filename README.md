# 微信小程序扩展：EventBus、Mixin、GlobalData
> 只做简易的实现，用于日常简单的业务

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
```javascript
//app.js
import $global from './lib/globalData.js'
wx.mixin({$global})
```
1. 获取globalData
```javascript
this.$global()
```
2. 获取项
```javascript
this.$global('name')
```
3. 设置
```javascript
//单个
this.$global('name','Joe')
//多个
this.$global({name:'Joe'})
```