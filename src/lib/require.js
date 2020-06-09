// import axios from '@/libs/api.request'
import '@/api'
import store from '@/store'
const Qs = require('qs');
import { stringify } from 'querystring';
import { getCreator } from "@/utils/logins";
const Plugin1 = {
	// 调用vue.use(plugin1)之后,他会自动回调这个onstall函数并传递vue对象过来
    // 局部调用方法: this.positionCity(function(el){console.log(el)})
    // 具体调用方法.请看本目录下的haveAway文件
    install(Vue, b, c) {
        // 例子1:get
        // 定位city       //--需要值类型 : 1
        // 接口:https://elm.cangdu.org/v1/cities?type=guess
        Vue.prototype.positionCity = function(success){
            let api="/v1/cities?type=guess";
            // promise写法
            this.axios.get(api,{
                params:{
                }
            }).then(function(response){
                success&&success(response.data)
            })
        },
        // 例子2:post
        // 获取登录信息  //需要用户名:user_name 和密码:password
        // 接口:https://elm.cangdu.org/admin/login
        Vue.prototype.postway=function(el,bl,success){
            let api = "/admin/login"
             // 方法2
            this.axios.post(api,{
                user_name:el,
                password :bl
            }).then(function(response){
                success&&success(response.data)
            })
            // 方法1
            var params = new URLSearchParams()
            params.append('mdcommons', el)
            this.axios.post(api,params).then(function(response){
                success&&success(response.data)
            })
        }
    },
};

export { Plugin1};

