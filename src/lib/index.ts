/**
 * 16进制转rgb
 * @param $color: 16进制
 */
export function colorRgb($color: string) {
    let sColor = $color.toLowerCase()
    // 十六进制颜色值的正则表达式
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = '#'
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
            }
            sColor = sColorNew
        }
        // 处理六位的颜色值
        const sColorChange = []
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        }
        return sColorChange
    }
    return sColor
}

export function throttle(fn: () => void, interval = 50) {
    let last = 0
    return function (...args: Array<any>) {
        const _this = this

        const now = new Date().getTime()
        if (now - last > interval) {
            fn.apply(_this, args)
            last = now
        }
    }
}

export function isUrl(str: string) {
    return /https?:\/\/.+/i.test(str)
}

export function formatDate(date: Date, fmt: string) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    const o: { [k: string]: number } = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            const str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero(str: string) {
    return ('00' + str).substr(str.length)
}

/**
 * 下载文件
 * @param data
 * @param fileName
 */
export function download(data: string, fileName: string): void;
export function download(data: Blob, fileName: string): void;
export function download(data: string | Blob, fileName: string): void {
    if (typeof data === 'object' && window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(data, fileName)
    } else {
        const link = document.createElement('a')
        link.download = fileName
        link.href = window.URL.createObjectURL(data)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
}

/**
 * 文件转Blob
 * @param data 文件
 * @returns {Blob}
 */
export function dataURLtoBlob(data: File): Blob {
    const bstr = window.atob(String(data).replace(/[^A-Za-z0-9+/]/g, ''))
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], {type: 'application/vnd.ms-excel'})
}

/**
 * base64转blob
 * @param base64
 */
export function base64ToBlob(base64: string) {
    const parts = base64.split(';base64,')
    const contentType = parts[0].split(':')[1]
    const raw = window.atob(parts[1])
    const rawLength = raw.length

    const uInt8Array = new Uint8Array(rawLength)

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
    }
    return new Blob([uInt8Array], {type: contentType})
}

/**
 * 比特转MB、GB
 * @param size
 * @returns {string}
 */
export function byteChange(size: number | string): string {
    const s: number = +size
    if (s < 1024) {
        return s + 'B'
    } else if (s >= 1024 && s < 1024 * 1024 * 1024) {
        return (s / 1024 / 1024).toFixed(2) + 'MB'
    } else {
        return (s / 1024 / 1024 / 1024).toFixed(2) + 'GB'
    }
}

/**
 * 秒 -> 时分秒
 * @param total
 * @returns {string}
 */
export function secondToTime(total: number | string): string {
    const setTextTime = (time: number) => {
        return time < 10 ? `0${time}` : time
    }
    const t: number = +total
    const h = Math.floor(t / 3600)
    const s = t % 60
    const m = Math.floor((t - h * 3600) / 60)

    return `${setTextTime(h)}:${setTextTime(m)}:${setTextTime(s)}`
}

export function getParams(query: string, key?: string) {
    const params: { [index: string]: any } = {}
    if (query.length === 0) {
        return null
    }
    const q = query.substring(1, query.length)
    const qList = q.split('&')
    for (const item of qList) {
        const t = item.split('=')
        const value = decodeURIComponent(t[1] || null)
        if (value && !isNaN(+value)) {
            params[t[0]] = +value
        } else {
            params[t[0]] = value
        }
    }
    return key ? params[key] : params
}

/**
 * uuid
 * @param len 长度
 * @param radix 进制 2，10，16
 * @returns {string}
 */
export function uuid(len: number, radix: number) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    const uuid = []
    let i
    radix = radix || chars.length

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
        // rfc4122, version 4 form
        let r

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
            }
        }
    }

    return uuid.join('')
}

export function getObjectURL(file: File) {
    let url
    if (typeof window !== 'undefined' && (window as any).createObjectURL) { // basic
        url = (window as any).createObjectURL(file)
    } else if (window.webkitURL) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
    } else if (window.URL) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
    }
    return url
}

export function debounce(fn: any, time = 500) {
    let timer: any = null

    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(fn, time)
    }
}

export function fileOrBlobToDataURL(obj: File | Blob, cb: any) {
    const a = new FileReader()
    a.readAsDataURL(obj)
    a.onload = function (e) {
        cb(e.target.result)
    }
}

export function blobToImage(blob: Blob, cb: (img: HTMLImageElement) => void) {
    fileOrBlobToDataURL(blob, function (dataurl: string) {
        const img = new Image()
        img.src = dataurl
        cb(img)
    })
}

export function getUserAgent() {
    const agent = ['trident', 'edg', 'chrome', 'safari', 'firefox']
    const userAgent = navigator?.userAgent?.split(' ')
    if (!userAgent) {
        return 'unKnow browser'
    }
    // const result = userAgent?.split(' ')?.find(e => agent.filter(a => e.toLocaleLowerCase().includes(a)).length > 0)
    const result = agent.find(e => userAgent.find(a => a.toLocaleLowerCase().indexOf(e) > -1))

    return userAgent.find(e => e.toLocaleLowerCase().indexOf(result) > -1) || 'unKnow browser'
}
