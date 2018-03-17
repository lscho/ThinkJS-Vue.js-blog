<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="站点名称">
            <Input v-model="formItem.title"></Input>
        </FormItem>

        <FormItem label="站点地址">
            <Input v-model="formItem.url"></Input>
        </FormItem>

        <FormItem label="关键词">
            <Input v-model="formItem.keywords"></Input>
        </FormItem>

        <FormItem label="站点描述">
            <Input v-model="formItem.description"></Input>
        </FormItem>

        <FormItem label="底部说明">
            <Input type="textarea" v-model="formItem.footer"></Input>
        </FormItem>

        <FormItem>
            <Button type="primary" @click="post">保存</Button>
        </FormItem>
    </Form>
</template>
<script>
import { site } from "@/api";
import { Form, FormItem, Input, Button } from 'iview';
export default {
  components: {
    Form, FormItem, Input, Button
  },
  data() {
    return {
      formItem: {
        id: "",
        title: "",
        url:"",
        keywords:"",
        description: "",
        footer: ""
      }
    };
  },
  methods: {
    get() {
      site.getInfo(1).then(res => {
        this.formItem = res.data;
      });
    },
    post() {
      site.update(1, this.formItem).then(res => {});
    }
  },
  mounted() {
    this.get();
  }
};
</script>