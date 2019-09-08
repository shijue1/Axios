const xhr = new XMLHttpRequest()

export default ({ method = 'GET', url, headers }) => {
    return new Promise((resolve, reject) => {
        xhr.open(method, url, true)
        xhr.onload = () => {
            const res = JSON.parse(xhr.responseText)
            resolve(res)
        }
        Object.keys(headers).forEach(key => {
            xhr.setRequestHeader(key, headers[key])
        })
        xhr.send()
    })
}