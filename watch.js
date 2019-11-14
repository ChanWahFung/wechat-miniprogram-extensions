let watch = (function () {
  function setWatch(ctx) {
    let data = ctx.data,
      watch = ctx.watch
    if (!isType(watch, 'object')) {
      return
    }
    Object.keys(watch).forEach(item => {
      //处理点语法的watch
      let keys = item.split('.'),
        targetData = data,
        targetKey = keys[keys.length - 1],
        watchFn = watch[item],
        deepFlag = false;
      keys.length > 1 && keys.pop() && keys.forEach(key => { targetData = targetData[key] })
      //watch属性为对象的情况
      if (isType(watchFn, 'object')) {
        watchFn = watch[item].handler
        deepFlag = watch[item].deep
      }
      //监听
      observe(targetData, targetKey, watchFn, deepFlag, ctx)
    })
  }
  //监听属性 Object.defineProperty
  function observe(obj, key, watchFn, deepFlag, ctx) {
    let cacheVal = obj[key]
    if (isType(cacheVal, 'null') || isType(cacheVal, 'array')) {
      return
    }
    if (deepFlag && isType(cacheVal, 'object')) {
      //watch目标为对象时，遍历递归为属性添加监听器
      Object.keys(cacheVal).forEach(cacheValkey => {
        observe(cacheVal, cacheValkey, watchFn, deepFlag, ctx)
      })
    }
    if (!isType(cacheVal, 'object')) {
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        set(newVal) {
          if (newVal === cacheVal) return
          // 处理不同类型的监听句柄
          if (isType(watchFn, 'array')) {
            watchFn.forEach(item => { runWatchFn(item, ctx, newVal, cacheVal) })
          } else {
            runWatchFn(watchFn, ctx, newVal, cacheVal)
          }
          cacheVal = newVal
        }
      })
    }
  }
  //执行watch句柄
  function runWatchFn(watchFn, ctx, newVal, oldVal) {
    if (isType(watchFn, 'string')) {
      watchFn = ctx[watchFn]
    }
    isType(watchFn, 'function') && watchFn.call(ctx, newVal, oldVal)
  }
  //类型工具函数
  function isType(target, type) {
    let targetType = Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
    type = type.toLowerCase()
    return targetType === type
  }
  return { setWatch }
})()
export default watch