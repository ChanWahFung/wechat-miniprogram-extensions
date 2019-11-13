let watch = (function(){
  function setWatch(ctx){
    let data = ctx.data,
        watch = ctx.watch
    if(!isType(watch,'object')){
      return
    }
    Object.keys(watch).forEach(item=>{
      //处理点语法的watch
      let keys = item.split('.')
      let targetData = data
      let targetKey = keys[keys.length-1]
      keys.length > 1 && keys.pop() && keys.forEach(key=>{targetData = targetData[key]})
      //监听
      observe(targetData,targetKey,watch[item],ctx)
    })
  }
  //监听属性 Object.defineProperty
  function observe(obj,key,watchFn,ctx){
    let oldVal = obj[key]
    if(isType(oldVal,'null') || isType(oldVal,'object')){
      return
    }
    Object.defineProperty(obj,key,{
      configurable: true,
      enumerable: true,
      set(newVal){
        // 处理不同类型的监听句柄
        if(isType(watchFn,'array')){
          watchFn.forEach(item=>{runWatchFn(item,ctx,newVal,oldVal)})
        }else{
          runWatchFn(watchFn,ctx,newVal,oldVal)
        }
      }
    })
  }
  //执行watch句柄
  function runWatchFn(watchFn,ctx,newVal,oldVal){
    if(isType(watchFn,'string')){
      watchFn = ctx[watchFn]
    }
    isType(watchFn,'function') && watchFn.call(ctx,newVal,oldVal)
  }
  //类型工具函数
  function isType(target, type) {
    let targetType = Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
    type = type.toLowerCase()
    return targetType === type
  }
  return {setWatch}
})()
export default watch