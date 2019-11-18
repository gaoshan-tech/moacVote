import 'amfe-flexible';
// import '../../base/src/main';
import '@/styles/index.css' // global css
import Vue from 'vue';
import App from './App';
import { router } from './router';
import moment from 'moment';
import VeeValidate, { Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';

Vue.prototype.$moment = moment;


import {
    Row,
    Col,
    Toast,
    Field,
    PullRefresh,
    Tag,
    Button,
    NavBar,
    CellGroup,
    SwipeCell,
    Cell,
    Popup,
    Picker,
    DatetimePicker,
    Uploader, Icon,
    Checkbox, CheckboxGroup, List, ImagePreview, RadioGroup, Radio
} from 'vant';

import axios from 'axios'
Vue.prototype.$axios = axios;

import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
let vConsole = new VConsole() // 初始化

Vue.use(Row).use(Col).use(CellGroup);
Vue.use(List);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Tag);
Vue.use(PullRefresh);
Vue.use(Toast);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(RadioGroup);
Vue.use(DatetimePicker);
Vue.use(Uploader);
Vue.use(ImagePreview);
Vue.use(Icon);
Vue.use(Radio);
Vue.use(Cell).use(SwipeCell);
Vue.use(Checkbox).use(CheckboxGroup);

// 引入tp-js-sdk
const tp = require('tp-js-sdk');
Vue.prototype.$tp = tp;
// 引入chain3
const Chain3 = require('chain3');
const chain3 = new Chain3(new Chain3.providers.HttpProvider('https://chain3.mytokenpocket.vip'));
Vue.prototype.$chain3 = chain3;
// console.log(chain3);


function getServerConfig () {
    return new Promise ((resolve, reject) => {
        axios.get('./serverConfig.json').then((result) => {
            // console.log(result)  // 看打印出来的结果
            let config = result.data;
            // console.log(config);
            for (let key in config) {
                Vue.prototype[key] = config[key];
            }
            // console.log(Vue.prototype.baseUrl)  // 验证是否已经把属性挂在了Vue上
            resolve();
        }).catch((error) => {
            console.log(error);
            reject()
        })
    })
}
// getServerConfig();

import { URLDATA }from '@/utils/url'
Vue.prototype.baseUrl = URLDATA.baseUrl;

new Vue({
    router,
    el: '#app',
    render: h => h(App)
});

