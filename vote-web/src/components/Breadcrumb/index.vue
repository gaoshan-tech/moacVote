<template>
  <el-breadcrumb class="app-breadcrumb" separator="">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.name" v-if="item.name">
        
        <p v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect"><router-link to="home" v-if="item.meta.title!=='首页'&&isShowHome">首页&nbsp;/</router-link>&nbsp;{{item.meta.title}}</p>
        <!-- <span v-if="index==levelList.length-1" class="no-redirect">{{item.name}}</span> -->
        <p v-else>
          <router-link v-if="isShowHome" to="home" style="cursor:pointer">首页</router-link>&nbsp;/ <router-link  :to="item.path"> {{item.name}} /&nbsp; </router-link>
        </p>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb();
    const perUri = [];
    const permission = JSON.parse(localStorage.getItem('permission'));
    permission.forEach((item)=>{
      perUri.push(item.uri);
    });
    if(perUri.includes("dashboardManage")){
      this.isShowHome = true;
    }else{
      this.isShowHome = false;
    }
  },
  data() {
    return {
      levelList: null,
      isShowHome:false
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      // var matched = JSON.parse(sessionStorage.getItem('permission'));
      const first = matched[0]
      if (first && first.name !== 'home') {
        matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
