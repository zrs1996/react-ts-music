// interface info {

// }
export const query = (info) => {
    return fetch(info).then(data => {
        return data.json()
    }).then(res => {
        return res
    })
}

const axios = {
    
}