// 考虑扩展性，不适用default
import axios from 'axios'

// axios本身会返回一个promise
export function request(config) {
    

        // 1.创建axios的实例
        const instance = axios.create({
            baseURL: 'http://152.136.185.210:8000/api/w6',
            timeout: 5000
        });

        // 2.axios的拦截器
        // 全局拦截器
        // axios.interceptors
        // 拦截请求
        instance.interceptors.request.use(config => {
            return config;
        }, err => {
            console.log(err);
        });

        // 拦截响应
        instance.interceptors.response.use(res => {
            // 一般只需要获取res.data
            // 不返回res的话，会获取到undefined。且只需要返回res.data
            return res.data;
        }, err => {
            console.log(err);
        })
        
        // 3.发送真正的网络请求
        return instance(config);
}