import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import moment from 'moment'
import 'babel-polyfill'

import $ from 'jquery'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
  
Vue.use(ElementUI, { locale })
Vue.use(VueQuillEditor)
Vue.use(VCharts)

// 解决登录报错的问题Vue router报错：NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}
import Router from 'vue-router'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false

Vue.prototype.$moment = moment;//赋值使用

import clipboard from 'clipboard';
//注册到vue原型上
Vue.prototype.clipboard = clipboard;

// 加载中loading
Vue.prototype.openLoading = function(domClass, text, maskClass) {
  const loading = this.$loading({           // 声明一个loading对象
    lock: true,                             // 是否锁屏
    text: text || '正在加载...',                     // 加载动画的文字
    spinner: 'el-icon-loading',             // 引入的loading图标
    background: 'rgba(0, 0, 0, 0.3)',       // 背景颜色
    target: `.${domClass}`,                    // 需要遮罩的区域
    body: true,
    customClass: maskClass || null                     // 遮罩层新增类名
  });
  setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close();                        // 关闭遮罩层
  },5000)
  return loading;
};

//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
const accDiv = function(arg1,arg2){
  var t1=0,t2=0,r1,r2;
  try{t1=arg1.toString().split(".")[1].length}catch(e){}
  try{t2=arg2.toString().split(".")[1].length}catch(e){}
  // with(Math){
  //     r1=Number(arg1.toString().replace(".",""))
  //     r2=Number(arg2.toString().replace(".",""))
  //     return (r1/r2)*pow(10,t2-t1);
  // }
};
//给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg){
  return accDiv(this, arg);
};
//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
const accMul = function(arg1,arg2)
{
  var m=0,s1=arg1.toString(),s2=arg2.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}
//给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg){
  return accMul(arg, this);
}

//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1,arg2){
  var r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2))
  return (arg1*m+arg2*m)/m
}
//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg){
  return accAdd(arg,this);
}

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

