/**
 * 1.对setData封装
 * 2.在setData时，检测有没有computed的属性，如果有则计算结果
 * 3.将计算结果setData
 */
let computed = (function(){
  
  function setComputed(ctx){
    let setData = ctx.setData
    let computed = ctx.computed
    ctx.setData = function(config,cb){
      
    }
  }
  
  return {setComputed}
})()

export default computed