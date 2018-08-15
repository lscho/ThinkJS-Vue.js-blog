<template>
    <div class="layout" id="admin" :class="{'layout-hide-text':fold}">
        <Row type="flex" class="admin">
            <Col :span="fold?1:3" class="layout-menu-left">
                <Menu active-name="1" theme="dark" width="auto" :active-name="route.path"  @on-select="select" >
                    <div class="layout-logo-left"></div>
                    <template v-for="(item,key) in menu">
                        <MenuItem  :name="item.path" v-if="!item.children">
                            <Icon :type="item.icon" :size="iconSize"></Icon>
                            <span class="layout-text">{{item.name}}</span>
                        </MenuItem>
                    </template>
                </Menu>
            </Col>
            <Col :span="fold?23:21" class="layout-rignt">
                <div class="layout-header">
                    <Row>
                        <Col span="12" class="layout-header-left">
                          <Button type="text" @click="toggleClick">
                              <Icon type="navicon" size="32"></Icon>
                          </Button>
                        </Col>
                        <Col span="12" class="layout-header-right">
                            <a class="home" target="_blank" href="/"><Icon type="home"></Icon></a>
                            <Dropdown  trigger="click" @on-click="dropdownClick">
                                <a href="javascript:void(0)">
                                    {{userInfo.username}}
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="userInfo">个人资料</DropdownItem>
                                    <DropdownItem name="changePassword">修改密码</DropdownItem>
                                    <DropdownItem name="loginOut">退出后台</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="userInfo.avator" size="large" />
                        </Col>
                    </Row>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem v-if="breadcrumb[0]">{{breadcrumb[0]}}</BreadcrumbItem>
                        <BreadcrumbItem v-if="breadcrumb[1]">{{breadcrumb[1]}}</BreadcrumbItem>
                        <BreadcrumbItem v-if="breadcrumb[2]">{{breadcrumb[2]}}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import "iview/dist/styles/iview.css";
import "@/assets/css/admin.css";
import { Row, Col, Menu, DropdownMenu, DropdownItem, Breadcrumb, BreadcrumbItem, Card, Dropdown, Icon, Submenu, MenuItem, Button, Avatar} from 'iview';
import { mapState } from "vuex";
import { user } from "@/api";
import Vue from 'vue';
Vue.component('Button', Button);
export default {
  components: {
    Row, Col, Menu, DropdownMenu, DropdownItem, Breadcrumb, BreadcrumbItem, Card, Dropdown, Icon, Submenu, MenuItem, Button, Avatar
  },
  data() {
    return {
      userInfo: {},
      fold: this.$store.getters.getMenu.fold,
      //菜单数据
      // TODO：需要优化，这样写太丑
      menu: [
        {
          name: "控制台",
          path: "/home",
          icon: "home"
        },
        {
          name: "内容管理",
          path: "/content/list",
          icon: "document",
        },
        {
          name: "页面管理",
          path: "/page/list",
          icon: "ios-paper",
        },
        {
          name: "评论管理",
          path: "/comment/list",
          icon: "chatbubbles"
        },
        {
          name: "分类管理",
          path: "/category/list",
          icon: "shuffle",
        },
        {
          name: "标签管理",
          path: "/tag/list",
          icon: "pricetags",
        },
        {
          name: "系统设置",
          path: "/config",
          icon: "ios-gear"
        }
      ]
    };
  },
  computed: {
    iconSize() {
      return this.fold ? 24 : 14;
    },
    breadcrumb() {
      let breadcrumbs = this.route.path.split("/");
      let _breadcrumb = {
        admin: "后台",
        home: "控制台",
        content: "内容",
        category: "分类",
        page: "页面",
        comment: "评论",
        tag: "标签",
        save: "编辑",
        list: "列表",
        config:"设置"
      };
      let arr = [];
      for (var i in breadcrumbs) {
        let key = breadcrumbs[i];
        if (key) {
          arr.push(_breadcrumb[key] ? _breadcrumb[key] : "");
        }
      }
      return arr;
    },
    ...mapState({
      route: state => state.route
    })
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo(){
      user.getInfo(this.$store.state.admin.user.name).then(res => {
        this.$store.commit("setUserInfo", res.data);
        this.userInfo = res.data;
      });
    },
    toggleClick() {
      this.fold = !this.fold;
      this.$store.commit("setMenuFlod", this.fold);
    },
    select(name) {
      this.$router.push(name);
    },
    loginOut() {
      this.$store.commit("clearToken");
      this.$router.push("/login");
    },
    dropdownClick(name) {
      if (name === 'loginOut') {
        this.loginOut();
      }
      if (name === 'userInfo') {
        this.$router.push("/user/info");
      }
      if (name === 'changePassword') {
        this.$router.push("/user/password");
      }
    }
  }
};
</script>
