// interface info {

// }
// export const query = (info) => {
//     return fetch(info).then(data => {
//         return data.json()
//     }).then(res => {
//         return res
//     })
// }

interface Axios {
    method: string
    url: string
    data: {
        [key: string]: string
    }
    header?: {
        [key: string]: string
    }
    success(data: string): void
    error(data: string): void
    actionType?: false //是否异步

}

const defaultOptions = {
    method: 'GET',
    url: '',
    data: {},
    header: {
        'Content-Type': 'application/json'
    },
    success: () => { },
    error: () => { },
    actionType: false
}

const setParams = (data: Axios['data']) => {
    let str = ''
    let i = 0
    let keysArray = Object.keys(data)
    while (Object.keys(data).length > i) {
        let attr = keysArray[i]
        str += attr + '=' + data[attr] + '&'
    }
    return str
}
const axios = (info: Axios) => {
    const xhr = new XMLHttpRequest()
    Object.assign(defaultOptions, info)
    const method = info.method.toUpperCase();
    const params = setParams(info.data)
    let url = info.url;
    
    if (method === 'GET' && params) {
        url = `${url}?${params}`
    }

    xhr.open(method, url)

    if (method === 'POST') {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params)
    } else {
        xhr.send()
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status >= 200) {
            if (xhr.status < 300 || xhr.status === 304) {
                let json = JSON.parse(xhr.responseText);
                info.success(json)
            } else {
                info.error('failed')
            }
        }
    }
}
export default axios