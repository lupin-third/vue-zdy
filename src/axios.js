import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'


axios.defaults.baseURL = "http://localhost:8086"

// 前置拦截
axios.interceptors.request.use(config => {
    //可以统一设置请求头
    return config
})

axios.interceptors.response.use(response => {
        let res = response.data;

        console.log("=================")
        console.log(res)
        console.log("=================")

        if (res.code === 0) {
            //当结果的code是否为200时
            return response
        } else {
            //异常弹窗信息
            Element.Message.error(res.msg, {duration: 3 * 1000})
            //直接拒绝往下面返回的结果消息
            return Promise.reject(response.data.msg)
        }
    },
    error => {
        console.log(error)
        if (error.response.data) {
            error.message = error.response.data.msg
        }
        //根据请求状态决定是否登录或者提示其他
        if (error.response.status === 401) {
            store.commit("REMOVE_INFO")
            router.push("/login")
        }

        Element.Message.error(error.message, {duration: 3 * 1000})
        return Promise.reject(error)
    }
)