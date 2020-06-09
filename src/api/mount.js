function defaults(){
    axios.defaults.baseURL = 'https://api.example.com';
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.timeout = 2500;
}

function TimeDist (){
    instance.get('/longRequest', {
    // 可以使用 validateStatus 配置选项定义一个自定义 HTTP 状态码的错误范围
    validateStatus: function (status) {
        return status < 500; // 状态码在大于或等于500时才会 reject
    },
    // 为已知需要花费很长时间的请求覆写超时设置
    timeout: 5000
    });
}