//eventBus乞丐版

//on：注册事件，并传入一个事件函数
//emit: 触发事件
//off: 移除已注册的事件
let EventBus = (function () {
  let eventList = {}
  function on(key, fn) {
    if (!eventList[key]) {
      eventList[key] = []
    }
    eventList[key].push(fn)
  }
  function emit() {
    let key = Array.prototype.shift.call(arguments)
    let events = eventList[key]
    if (!events || events.length === 0) {
      return false
    }
    events.forEach(fn => fn.apply(null, arguments))
  }
  function off(key, fn) {
    let events = eventList[key]
    if (!events || events.length === 0) {
      return false
    }
    events.forEach(item => {
      if (item === fn) {
        let idx = events.indexOf(fn)
        events.splice(idx, 1)
        return
      }
    })
  }
  return {on, emit, off}
})()

export default EventBus