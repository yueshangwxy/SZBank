import axios from 'axios'
import router from '@/router/routers'
import {Notification, MessageBox} from 'element-ui'
import store from '@/store'
import {getToken, getCurrentRole} from './auth'
import Config from '@public/config/settings'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/api', // api 的 base_url
    //baseURL: process.env.VUE_APP_BASE_API === '' ? '/' : process.env.VUE_APP_BASE_API, // api 的 base_url
    timeout: Config.timeout,// 请求超时时间
    withCredentials: true
})

// request拦截器
service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        config.headers['Content-Type'] = 'application/json'
        // console.log('========request.use=========>', store.state.user.user.currentRole)
        const path = window.location.href.replace(window.location.origin, '').replace('/#', '')
        config.headers['client-page'] = path
        try {
            if (getCurrentRole()) {
                config.headers['current-roleid'] = getCurrentRole().id
            }
        } catch (e) {
        }

        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        const code = response.status
        if (code < 200 || code > 300) {
            Notification.error({
                title: response.message
            })
            return Promise.reject('error')
        } else {
            if (response.headers['content-disposition'])
                return response
            return response.data
        }
    },
    error => {
        let code = 0
        let msg = ''
        try {
            code = error.response.data.status
            msg = error.response.data.message
        } catch (e) {
            if (error.toString().indexOf('Error: timeout') !== -1) {
                Notification.error({
                    title: '网络请求超时',
                    duration: 5000
                })
                return Promise.reject(error)
            }
        }
        if (code) {
            if (code === 401) {
                MessageBox.confirm(
                    '登录状态已过期，您可以继续留在该页面，或者重新登录',
                    '系统提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).then(() => {
                    store.dispatch('LogOut').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                })
            } else if (code === 403) {
                router.push({path: '/401'})
            } else {
                const errorMsg = error.response.data.message
                if (errorMsg !== undefined) {
                    Notification.error({
                        title: errorMsg,
                        duration: 5000
                    })
                }
            }
        } else {
            Notification.error({
                title: '接口请求失败',
                duration: 5000
            })
        }
        return Promise.reject(error)
    }
)
export default service
