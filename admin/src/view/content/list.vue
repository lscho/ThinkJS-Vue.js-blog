<style>
  .page{
    float:right;
    margin-top:10px;
  }
  .search{
    text-align: right;
  }
</style>
<template>
    <div>
      <Form ref="formInline" :model="map" inline class="search">
          <FormItem>
              <Input type="text" v-model="map.key" placeholder="关键字">
              </Input>
          </FormItem>
          <FormItem>
              <Button type="primary" @click="getList">查询</Button>
          </FormItem>
      </Form>
      <Table border :loading="loading" :columns="columns" :data="data.data"></Table>
      <Page class="page" :total="data.count" :page-size="data.pagesize" show-total  @on-change="changePage"></Page>
    </div>
</template>
<script>
import { content } from "@/api";
import { Button, Table, Page, Form, FormItem, Input } from 'iview';
export default {
  components: {
    Button,
    Table,
    Page,
    Form,
    FormItem,
    Input
  },
  data() {
    return {
      loading: true,
      columns: [
        {
          title: "文章名称",
          key: "title"
        },
        {
          title: "分类",
          key: "category",
          render: (h, params) => {
            return params.row.category.name;
          }
        },
        {
          title: "阅读量",
          key: "view",
          width: 100,
          align: "center"
        },
        {
          title: "发布时间",
          key: "create_time",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (!params.row.create_time) return "";
            return new Date(params.row.create_time * 1000).toLocaleString();
          }
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/admin/content/save",
                        query: {
                          slug: params.row.slug
                        }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      if (confirm("确定要删除吗？")) {
                        this.delete(params.row.id, params.index);
                      }
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: {},
      map:{
        page:1,
        key:"",
        all:1,
        pageSize:10
      }
    };
  },
  methods: {
    getList() {
      this.loading=true;
      content.getList(this.map).then(res => {
        this.data = res.data;
        this.loading = false;
      });
    },
    delete(id, index) {
      content.delete(id).then(res => {
        this.data.splice(index, 1);
      });
    },
    changePage(index){
      this.map.page=index;
      this.getList();
    }
  },
  mounted() {
    this.getList();
  }
};
</script>