import $ from 'jquery'
import { Message, MessageBox } from 'element-ui'
import Vue from 'vue'
import Router from '@/router/index'
export function postRequest(url, data = {},auth) {
    auth = auth?auth:localStorage.token;
    return new Promise((resolve, reject) => {
        //   axios.post(url,data)
        //     .then(response => {
        //       resolve(response.data);
        //     },err => {
        //       reject(err)
        //     })
        $.ajax({
            url: process.env.API_HOST + url,
            type: 'post',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': auth
            },
            data: JSON.stringify(data),
            success: function (response) {
                if (response.code == 401) {
                  Message.error("登录过期");
                  Router.push({path:'/login'})
                    // window.location.href = "/login";
                    // _self.$router.push("login");
                }else if(response.code == '200'){
                    // Message.success(response.message);
                    resolve(response);
                }else if(response.code == 207 || response.code === '400' || response.code <= 500){
                  console.log(response);
                  Message.error(response.msg);
                    reject(response.msg);
                }
            },
            error: function (err) {
                reject(err)
            }
        })
    })
}
export function getRequest(url, params = {},auth) {
    auth = auth?auth:localStorage.token;
    return new Promise((resolve, reject) => {
        $.ajax({
            url: process.env.API_HOST + url,
            type: 'get',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': auth
            },
            data: params,
            success: function (response) {
                if (response.code == 401) {
                    // _self.$message.error("登录过期");
                    window.location.href = "/login";
                }
                resolve(response);
            },
            error: function (err) {
                reject(err)
            }
        })
    })
}
