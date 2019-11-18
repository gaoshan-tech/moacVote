<template>
  <div class="menu-wrapper">
    <template v-for="(item,index) in routes" v-if="!item.hidden&&item.children">
          
      <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.uri+'/'+item.children[0].uri"
        :key="item.children[0].name">
        <el-menu-item :index="item.uri+'/'+item.children[0].uri" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- <svg-icon v-if="routeIcon[index].icon" :icon-class="routeIcon[index].icon"></svg-icon> -->
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.uri" :key="item.name">
        <template slot="title">
          <span v-if="item.name" slot="title">{{item.name}}</span>
        </template>
        <template v-for="(child) in item.children">
          <router-link :to="{path:(item.uri ? item.uri+'/' : '/') +child.uri,query: { type: child.children[0].type }}" :key="child.name" v-if="child.children.length > 0">
            <el-menu-item :index="(item.uri ? item.uri+'/' : '/')+child.uri">
              <span v-if="child.name" slot="title">{{child.name}}</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path:(item.uri ? item.uri+'/' : '/') +child.uri}" :key="child.name" v-else>
            <el-menu-item :index="(item.uri ? item.uri+'/' : '/')+child.uri">
              <span v-if="child.name" slot="title">{{child.name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  data(){
    return{
      newRouters:[],
      routeIcon:[{
        icon:'order',
        children:[{
          icon:'order',


          }
        ]
      },{
        icon:'product-list',
        children:[{
          icon:'product-list',
          }
        ]
      }]
    }
  },
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    }
  },
  created(){
  }
}
</script>
