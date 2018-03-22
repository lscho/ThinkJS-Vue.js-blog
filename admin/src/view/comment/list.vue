<style>
.page {
  float: right;
  margin-top: 10px;
}

.search {
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
    <Page class="page" :total="data.count" :page-size="data.pagesize" show-total @on-change="changePage"></Page>
  </div>
</template>
<script>
import { comment } from "@/api";
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
      columns: [{
          title: "文章名称",
          key: "title",
          render: (h, params) => {
            return h('span', params.row.title);
          }
        },
        {
          title: "评论",
          key: "text"
        },
        {
          title: "显示",
          key: "view",
          width: 100,
          align: "center",
          render: (h, params) => {
            let icon=params.row.status==99?'checkmark':'close';
            let color=params.row.status==99?'#19be6b':'#ed3f14';
            return h('Icon', {
              props: {
                type: icon
              },
              style: {
                color: color
              },
            });
          }
        },
        {
          title: "时间",
          key: "create_time",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (!params.row.create_time) return "";
            return h('span', new Date(params.row.create_time * 1000).toLocaleString());
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
                "Button", {
                  props: {
                    type: "primary",
                    size: "small",
                    icon: 'edit'
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/comment/save",
                        query: {
                          id: params.row.id
                        }
                      });
                    }
                  }
                }
              ),
              h(
                "Button", {
                  props: {
                    type: "error",
                    size: "small",
                    icon: 'trash-a'
                  },
                  on: {
                    click: () => {
                      if (confirm("确定要删除吗？")) {
                        this.delete(params.row.id, params.index);
                      }
                    }
                  }
                }
              )
            ]);
          }
        }
      ],
      data: {},
      map: {
        page: 1,
        key: "",
        all: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    getList() {
      this.loading = true;
      comment.getList(this.map).then(res => {
        this.data = res.data;
        this.loading = false;
      });
    },
    delete(id, index) {
      comment.delete(id).then(res => {
        this.data.data.splice(index, 1);
      });
    },
    changePage(index) {
      this.map.page = index;
      this.getList();
    }
  },
  mounted() {
    this.getList();
  }
};

</script>
