// 辅助下面的洗牌函数-获取一个随机数
function getRandomInt(min, max) {
  // Math.random()：0-1的小数且不包含1，(max - min + 1)：+1保证获取到max。
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 洗牌函数
export function shuffle(arr) {
  // _arr副本，不会直接修改arr，不会多次使用影响list
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

// 节流函数 接收一个func函数和一个延迟时间delay，返回一个函数return function (...args){}
export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}