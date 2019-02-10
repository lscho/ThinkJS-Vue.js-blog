<template>
  <div>
    <Form ref="formInline" inline>
      <FormItem>
        <Button type="success" icon="plus" @click="add">添加标签</Button>
      </FormItem>
    </Form>
    <Table border :loading="loading" :columns="columns" :data="data"></Table>
    <Modal v-model="modal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>删除后数据将无法找回，是否继续删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="del">确认删除</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { tag } from "@/api";
import { Button, Table, Form, FormItem, Modal, Icon } from 'iview';
export default {
  components: {
    Button,
    Table,
    Form,
    FormItem,
    Modal,
    Icon
  },
  data() {
    return {
      loading: true,
      modal: false,
      modal_loading: false,
      modal_temp: {},
      columns: [{
          title: "标签名称",
          key: "name"
        },
        {
          title: "缩略名",
          key: "slug"
        },
        {
          title: "标签描述",
          key: "description"
        },
        {
          title: "排序",
          width: 100,
          align: "center",
          key: "sort"
        },
        {
          title: "文章数量",
          key: "count",
          width: 100,
          align: "center"
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
                        path: "/tag/save",
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
                      this.modal = true;
                      this.modal_temp = {
                        id: params.row.id,
                        index: params.index
                      }
                    }
                  }
                }
              )
            ]);
          }
        }
      ],
      data: []
    };
  },
  methods: {
    getList() {
      tag.getList().then(res => {
        this.data = res.data;
        this.loading = false;
      });
    },
    del() {
      if (!this.modal_temp.id) {
        return false;
      }
      tag.delete(this.modal_temp.id).then(res => {
        this.modal = false;
        if (res.errno == 0) {
          this.getList();
        }
      });
    },
    add() {
      this.$router.push('/tag/save');
    }
  },
  mounted() {
    this.getList();
  }
};

</script>
