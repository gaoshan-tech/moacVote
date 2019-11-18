<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      unique-opened
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import router from '@/router/index'



export default {
  components: { SidebarItem, ScrollBar },
  data() {
    return {
      menuData: [
        /*{
          name: "投票创建员管理",
          uri: "",
          children: [
            {
              name: "创建员列表",
              uri: "creatorList",
              children: []
            }
          ]
        },*/
        {
          name: "投票管理",
          uri: "",
          children: [
            {
              name: "投票列表",
              uri: "voteList",
              children: []
            },
            // {
            //   name: "白名单",
            //   uri: "whitelist",
            //   children: []
            // },
            // {
            //   name: "黑名单",
            //   uri: "blacklist",
            //   children: []
            // },
            // {
            //   name: "投票详情",
            //   uri: "voteDetails",
            //   children: []
            // }
          ]
        },
        {
          name: "管理员管理",
          uri: "",
          children: [
            {
              name: "管理员列表",
              uri: 'admin-list',
              children: []
            },
            {
              name: "修改密码",
              uri: 'changePassword',
              children: []
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      const serverPersion = this.menuData;
      localStorage.setItem('permission', JSON.stringify(serverPersion));
      // const serverPersion = JSON.parse(localStorage.getItem('permission'));
      return serverPersion.filter(item=>item.uri!=='dashboardManage');
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
