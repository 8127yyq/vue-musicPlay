export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function getData(el, name, val) {
  // 封装方法,el是dom对象，name，第三个是值（没值表示:get，有值表示：set）
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

// 能力检测
let elementStyle = document.createElement('div').style

// 供应商
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    // 火狐
    Moz: 'MozTransform',
    O: 'OTransform',
    // IE
    ms: 'msTransform',
    // 标准
    standard: 'transform'
  }

  for (let key in transformNames) {
    // 获取供应商key
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  // eg.music-list.vue的['webkitTransform']，供应商+首字母大写+后面字母
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
