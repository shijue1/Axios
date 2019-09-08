import request from './xhr'
import defaults from './defaults'
import { deepMerge } from './utils'

export default new class Axios {

    constructor() {
        this.request = (url, option = {}) => {
            
            // 模拟方法重载
            if (typeof url === 'string') {
                option.url = url
            } else {
                option = url
            }

            // 合并配置项
            option = deepMerge(this.request.defaults, option)
            option = deepMerge(option, {
                url: option.baseURL ? option.baseURL + option.url : option.url
            })

            // 发起 XMLHttpRequest 请求，并返回一个 Promise 实例
            return request(option).then(res => {
                return res
            })
        }

        Object.assign(this.request, {
            defaults,
            get: this.request,
        })

        return this.request
    }


}