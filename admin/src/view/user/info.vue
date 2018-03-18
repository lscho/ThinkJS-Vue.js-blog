<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="用户名">
            <Input v-model="formItem.username"></Input>
        </FormItem>
        <FormItem label="邮箱">
            <Input v-model="formItem.email"></Input>
        </FormItem>
        <FormItem label="github">
            <Input v-model="formItem.github"></Input>
        </FormItem>
        <FormItem label="qq">
            <Input v-model="formItem.qq"></Input>
        </FormItem>
        <FormItem label="weibo">
            <Input v-model="formItem.weibo"></Input>
        </FormItem>
        <FormItem label="zhihu">
            <Input v-model="formItem.zhihu"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="post">保存</Button>
        </FormItem>
    </Form>
</template>
<script>
import { user } from "@/api";
import { Form, Button, FormItem, Input } from 'iview';
export default {
  components: {
    Button,
    Form,
    FormItem,
    Input
  },
  data() {
    return {
      formItem: {
        username: "",
        email: "",
        github: "",
        qq: "",
        weibo: "",
        zhihu: ""
      }
    };
  },
  methods: {
    get() {
      user.getInfo(this.$store.state.admin.user.name).then(res => {
        this.formItem = res.data;
      });
    },
    post() {
      user.update(this.$store.state.admin.user.name, this.formItem).then(res => {

      });
    }
  },
  mounted() {
    this.get();
  }
};
</script>