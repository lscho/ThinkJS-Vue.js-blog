<template>
    <div class="layout" id="admin" :class="{'layout-hide-text':fold}">
        <Row type="flex" class="admin">
            <Col :span="fold?1:3" class="layout-menu-left">
                <Menu active-name="1" theme="dark" width="auto" :active-name="route.path"  @on-select="select" >
                    <div class="layout-logo-left"></div>
                    <template v-for="item in menu">
                        <Submenu :name="item.path" v-if="item.children">
                            <template slot="title">
                                <Icon :type="item.icon" :size="iconSize"></Icon>
                                <span class="layout-text">{{item.name}}</span>
                            </template>
                            <MenuItem :name="child.path" v-for="child in item.children">
                                <Icon :type="child.icon" :size="iconSize"></Icon>
                                <span class="layout-text">{{child.name}}</span>
                            </MenuItem>
                        </Submenu>

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
                        <Button type="text" @click="toggleClick">
                            <Icon type="navicon" size="32"></Icon>
                        </Button>
                        <div  class="layout-header-right">
                            <Dropdown  trigger="click" @on-click="dropdownClick">
                                <a href="javascript:void(0)">
                                    {{username}}
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="userInfo">个人资料</DropdownItem>
                                    <DropdownItem name="loginOut">退出后台</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>                         
                        </div>                        
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
import "@/assets/css/admin.css";
import { mapState } from "vuex";
export default {
  data() {
    return {
      fold: this.$store.getters.getMenu.fold,
      username: this.$store.state.admin.user.name,
      //菜单数据
      // TODO：后台获取
      menu: [
        {
          name: "控制台",
          path: "/admin/home",
          icon: "home"
        },
        {
          name: "内容管理",
          path: "/admin/content",
          icon: "document",
          children: [
            {
              name: "内容发布",
              path: "/admin/content/save",
              icon: "edit"
            },
            {
              name: "内容列表",
              path: "/admin/content/list",
              icon: "navicon-round"
            }
          ]
        },
        {
          name: "分类管理",
          path: "/admin/category",
          icon: "shuffle",
          children: [
            {
              name: "分类发布",
              path: "/admin/category/save",
              icon: "edit"
            },
            {
              name: "分类列表",
              path: "/admin/category/list",
              icon: "navicon-round"
            }
          ]
        },
        {
          name: "标签管理",
          path: "/admin/tag",
          icon: "pricetags",
          children: [
            {
              name: "标签发布",
              path: "/admin/tag/save",
              icon: "edit"
            },
            {
              name: "标签列表",
              path: "/admin/tag/list",
              icon: "navicon-round"
            }
          ]
        },
        {
          name: "系统设置",
          path: "/admin/site",
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
        tag: "标签",
        save: "编辑",
        list: "列表"
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
      route: state => state.route,
      page: state => state.page.open
    })
  },
  methods: {
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
      if (name == "loginOut") {
        this.loginOut();
      }
      if (name == "userInfo") {
        this.$router.push("/admin/user/info");
      }
    }
  }
};
</script>
