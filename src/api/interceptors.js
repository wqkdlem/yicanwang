import axios from "axios"

// 添加请求拦截器
axios.interceptors.request.use(function(config, el) {
    // 在发送请求之前做些什么
    config.credentials = "same-origin"
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    return response;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
axios.defaults.timeout = 20000;
// ---------本地开发测试
//  当前 没有区分开发环境和生产环境    只能手动进行修改   如想区分  请设置 --config文件设置
if (process.env.NODE_ENV == 'development') {

}
if (process.env.NODE_ENV == 'production') {}