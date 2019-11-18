<template>
  <div class="login-container">
    <div class="login-form-layout">
      <div class="msg-bg-container">
        <img src="~@/assets/images/login-bg1.png" alt="">
      </div>
      <el-card>
        <el-form autoComplete="on"
                 :model="loginForm"
                 :rules="loginRules"
                 ref="loginForm"
                 class="form-container"
                 label-position="left">
          <p class="login-title color-main main-title">投票后台管理系统</p>
          <p class="welcome-text">Hello! 欢迎您 <span style="color: #164cf3;font-weight: bolder">登录</span></p>
          <el-form-item prop="username">
            <p class="login-data-text">账号</p>
            <el-input name="username"
                      type="text"
                      v-model="loginForm.username"
                      autoComplete="on"
                      placeholder="请输入用户名">
          <span slot="prefix">
            <svg-icon icon-class="user" class="color-main" style="margin-top: 9px;font-size: 18px;"></svg-icon>
          </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <p class="login-data-text">密码</p>
            <el-input name="password"
                      :type="pwdType"
                      @keyup.enter.native="handleLogin"
                      v-model="loginForm.password"
                      autoComplete="on"
                      placeholder="请输入密码">
          <span slot="prefix">
            <svg-icon icon-class="password" class="color-main"></svg-icon>
          </span>
              <span slot="suffix" @click="showPwd">
            <svg-icon icon-class="eye" class="color-main"></svg-icon>
          </span>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 60px">
            <el-button class="btn-style" style="width: 100%" type="primary" :loading="loading" @click.native.prevent="handleLogin">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate';
  import {setSupport,getSupport,SupportUrl} from '@/utils/support';
  import login_center_bg from '@/assets/images/login_center_bg.png'
  import { getRequest,postRequest } from "../../common.js";
  import { mapGetters } from 'vuex'
  import { login } from '@/api/login'
  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 3) {
          callback(new Error('密码不能小于3位'))
        } else {
          callback()
        }
      };
      return {
        loginForm: {
          username: '',
          password: '',
          // username: 'admin',
          // password: '123456',
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        loading: false,
        pwdType: 'password',
        login_center_bg,
        dialogVisible:false,
        arrData:[]
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            localStorage.clear();
            const params = {
              userName: this.loginForm.username,
              password: this.loginForm.password
            }

            postRequest("/admin/login", params)
              .then(ret => {
                var Auth = ret.data.tokenHead + ret.data.token;
                localStorage.token = Auth;
                localStorage.setItem('name', this.loginForm.username);
                this.loading = false;
                this.$router.push({ path: '/voteList'});
              })
              .catch(err => {
                console.log(err)
                // this.$message.error(err);
                this.loading = false;
              });
          } else {
            // console.log(error)
            // this.$message.error('参数验证不合法！');
            return false
          }
        })
      },
      deepArray(data){
        const arrData = [];
          data.forEach((item,index)=>{
            if(item.children.length){
              this.deepArray(item.children);
            }else{
              arrData.push(item);
            }
          });
        this.arrData.push(...arrData);
        return this.arrData
      },
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
    }
  }
</script>

<style scoped>
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: url("~@/assets/images/login-bg.png") no-repeat top left;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    font-family: PingFangSC-Semibold;
  }
  .login-form-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    /*padding: 20px 40px;*/
    /*position: absolute;*/
    /*left: 0;*/
    /*right: 0;*/
    width: 1000px;
    height: 500px;
    /*margin: 140px auto;*/
    /*border-top: 10px solid #409EFF;*/
  }
.msg-bg-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 100%;
  background: -webkit-linear-gradient(left top, #3892E8, #07E0FD);
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  float: left;
  border-radius: 8px 0 0 8px;
}
.msg-bg-container img {
  width: 400px;
  height: 400px;
}
.form-container {
  width: 368px;
  height: unset;
  position: unset;
  left: unset;
  right: unset;
  padding: unset;
  margin: unset;
}
  .login-title {
    margin-top: 0;
    text-align: left;
    color: #000;
    font-size: 36px;
    font-weight: bolder;
  }
.welcome-text {
  margin-bottom: 61px;
  font-size: 18px;
  text-align: left;
  color: #666;
}
.login-data-text {
  line-height: 20px;
  margin: 6px 0;
  color: #696969;
}
  .login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
  .login-form-layout .el-card {
    border-radius: 0;
    padding: 20px 45px;
    border-radius: 0 8px 8px 0;
  }
  .btn-style {
    background: -webkit-linear-gradient(left,#6B73FF, #000DFF)
  }
</style>
