import axios from './axios'

axios.defaults.baseURL = 'http://localhost:3004'

// axios.get('/', {
//     baseURL: 'http://localhost:3004',
//     headers: {'Xsssss-Requested-With': 'XMLHttpRequest'},
// }).then(res => {
//     debugger
// })

axios({
    method: 'get',
    url: '/',
    headers: {
        a: 1
    }
}).then(res => {
})

/*

模拟 axios 的 api 用法

const a = axios.create({ @todo
    baseURL: 'http://localhost:3004',
    timeout: 1000,
})

*/







