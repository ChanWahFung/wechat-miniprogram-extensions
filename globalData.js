function $global(name,value){
  let app = getApp()
  let argLen = arguments.length
  if(argLeng === 0){
    return app.globalData
  }
  if(argLen === 1){
    if(isType(name,'string')){
      return globalData[name]
    }
    if(isType(name,'object')){
      app.globalData = Object.assign(globalData,name)
    }
  }
  if(argLen === 2){
    app.globalData[name] = value
  }
}
//判断类型工具
function isType(target, type) {
  let targetType = Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
  type = type.toLowerCase()
  return targetType === type
}
export default $global