import {
  format as dateFnsFormat,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInCalendarDays,
  differenceInCalendarISOWeeks,
  differenceInCalendarMonths,
  differenceInCalendarISOYears
} from 'date-fns'

export const proxyImg = (url) => {
  if (!url || url === 'null') return null
  return `${process.env.BACKEND_SERVER}/api/pimg?url=${url}`
}

export const formatDecimal = (str, { len = 4, percentage = false } = {}) => {
  if (!str) return 0
  if (len === 0) return Math.round(str)
  if (percentage) {
    str = parseFloat(str) * 100
  }
  str = str.toString()
  if (str.split('.')[1]) {
    str = str.split('.')[0] + '.' + str.split('.')[1].slice(0, len)
  }
  return parseFloat(str)
}

/**
 * dateFormat
 */
export const dateFormat = (date, format = 'MMM. DD YYYY') => {
  return dateFnsFormat(date, format)
}

/**
 * timeFormat
 */
export const timeFormat = date => {
  const now = new Date()
  const fDate = new Date(date)
  if (differenceInCalendarISOYears(now, fDate)) return `${differenceInCalendarISOYears(now, fDate)} years ago`
  else if (differenceInCalendarMonths(now, fDate)) return `${differenceInCalendarMonths(now, fDate)} months ago`
  else if (differenceInCalendarISOWeeks(now, fDate)) return `${differenceInCalendarISOWeeks(now, fDate)} weeks ago`
  else if (differenceInCalendarDays(now, fDate)) return `${differenceInCalendarDays(now, fDate)} days ago`
  else if (differenceInHours(now, fDate)) return `${differenceInHours(now, fDate)} hours ago`
  else if (differenceInMinutes(now, fDate)) return `${differenceInMinutes(now, fDate)} minutes ago`
  else if (differenceInSeconds(now, fDate) <= 10) return 'Just now'
  else return `${differenceInSeconds(now, fDate)} seconds ago`
}

export const sliceStr = (str, { start = 0, end = 8 } = {}) => {
  if (!str) return str
  return str.toString().slice(start, end)
}

/**
 * 截取显示部分地址
 */
export const splitAddress = (address, { before = 5, end = 3, symbol = '***' } = {}) => {
  if (typeof address !== 'string') return address
  return address.slice(0, before) + symbol + address.slice(-end)
}

/**
 * wei to eth
 */
export const weiToEth = (value, decimals = 18) => {
  if (!value) return value

  value = parseInt(value) / Math.pow(10, parseInt(decimals))

  return parseFloat(value).toFixed(4)
}

export const formatNumber = (number) => {
  if (!number) return 0

  number = parseFloat(number)

  const symbols = [
    { symbol: 'b', num: 1000000000 },
    { symbol: 'm', num: 1000000 },
    { symbol: 'k', num: 1000 }
  ]
  let str
  for (const s of symbols) {
    if (number / s.num >= 1) {
      str = `${parseFloat(number / s.num).toFixed(1)}${s.symbol}`
      break
    }
  }
  return str || number
}

export const hasClass = (name, dom) => {
  if (!dom || typeof dom !== 'object' || !name) return false
  if (!dom.className) return false
  const classNames = dom.className.split(' ')
  if (classNames.indexOf(name) === -1) return false
  return true
}

export const addClass = (name, dom) => {
  if (!dom || typeof dom !== 'object') return
  let className = dom.className
  if (!className) {
    dom.className = name
    return
  }
  let classNames = className.split(' ')
  if (classNames.indexOf(name) !== -1) return
  dom.className += ` ${name}`
}
export const removeClass = (name, dom) => {
  if (!dom || typeof dom !== 'object') return
  let className = dom.className
  if (!className) return
  let classNames = className.split(' ')
  if (classNames.indexOf(name) === -1) return
  dom.className = classNames.filter((item) => item !== name).join(' ')
}
export const toggleClass = (name, dom) => {
  if (!dom || typeof dom !== 'object') return
  let classNames = (dom.className || '').split(' ')
  if (classNames.indexOf(name) !== -1) removeClass(name, dom)
  else addClass(name, dom)
}
export const filterSocialIcon = (url) => {
  if (!url) return null
  const mathchs = [
    /https:\/\/(twitter).com/,
    /https:\/\/(t).me/,
    /https:\/\/(github).com/,
    /https:\/\/(facebook).com/,
    /https:\/\/(linkedin).com/,
    /https:\/\/(medium).com/
  ]
  let icon = null
  for (const match of mathchs) {
    if (url.match(match)) {
      icon = `#icon-${url.match(match)[1]}-logo`
      break
    }
  }
  return icon
}

export const cdn2lordlessio = (url) => {
  if (!url) return url
  const match = /(lordless.oss-cn-hongkong.aliyuncs.com)/g
  return url.replace(match, 'cdn.lordlessio.com')
}

export const getBase64Image = (img, width, height) => {
  const canvas = document.createElement('canvas')
  canvas.width = width || img.width
  canvas.height = height || img.height

  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  const dataURL = canvas.toDataURL()
  return dataURL
}

/**
 * 图片转base64格式
 */
export const img2Base64 = (url) => {
  url = url.split('?')[0]
  console.log('url', url)
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.crossOrigin = ''
    img.src = url
    img.onload = function () {
      const width = img.naturalWidth
      const height = img.naturalHeight
      const data = getBase64Image(img, width * 2, height * 2)
      resolve(data)
    }
  })
}

export const xhrImg2Base64 = (imgUrl) => {
  return new Promise((resolve) => {
    window.URL = window.URL || window.webkitURL
    var xhr = new XMLHttpRequest()
    xhr.open('get', imgUrl, true)
    // 至关重要
    xhr.responseType = 'blob'
    xhr.onload = function () {
      if (this.status === 200) {
      // 得到一个blob对象
        var blob = this.response
        console.log('blob', blob)
        //  至关重要
        let oFileReader = new FileReader()
        oFileReader.onloadend = function (e) {
          const base64 = e.target.result
          console.log('方式一》》》》》》》》》', base64)
          return resolve(e.target.result)
        }
        oFileReader.readAsDataURL(blob)

        // ====为了在页面显示图片，可以删除====
        const img = document.createElement('img')
        img.onload = function (e) {
          window.URL.revokeObjectURL(img.src) // 清除释放
        }
      }
    }
    xhr.send()
  })
}

export const filter721Url = (str, size = 140) => {
  if (!str || typeof str !== 'string') return str
  const array = str.split('_')
  return `http://cdn.lordlessio.com/0xsir/source/${array[0]}/${array[1]}.png?x-oss-process=image/resize,w_${size}`
}

export const resizeImage = (url, size = 140) => {
  if (!url || typeof url !== 'string') return url
  if (url.match(/(x-oss-process=image\/resize)/)) return url

  return `${url}?x-oss-process=image/resize,w_${size}`
}

export const generateId = function () {
  return Math.floor(Math.random() * 10000)
}
