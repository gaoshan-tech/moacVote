<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img v-if="src" class="user-avatar" :src="src">
        <img v-else class="user-avatar" src="~@/assets/images/init.png">
        <span class="name-wrap">{{userName}}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <!--<router-link class="inlineBlock" to="/">-->
          <!--<el-dropdown-item>-->
            <!--首页-->
          <!--</el-dropdown-item>-->
        <!--</router-link>-->
        <el-dropdown-item>
          <span @click="changePassword" style="display:block;">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getUserInfo } from '@/api/vote-api';

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  data(){
    return{
      src: null,
      userName: ''
      // initSrc: require('~@/assets/images/init.png'),

    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$router.push({path:'/login'})
      localStorage.clear();
     /* setTimeout(function(){
        location.reload() // 为了重新实例化vue-router对象 避免bug
      },200)*/
    },
    changePassword() {
      this.$router.push({path:'/changePassword'})

    },
    initUserInfo() {
      getUserInfo().then( res => {
        console.log(res);
        if (res) {
          this.src = res.data.picUrl;
          this.userName = res.data.username;
        }
      })
    }
  },
  created(){
    this.initUserInfo()
    // var src = localStorage.getItem('icon');
   /* if(src){
      this.src = src;
    }else{
      this.src = '/static/img/timg.jpg';
    }*/
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0 !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      display: flex;
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin-right: 5px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .name-wrap {
    width: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>

