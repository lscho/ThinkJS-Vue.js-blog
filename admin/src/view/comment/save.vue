<template>
  <Form :model="formItem" ref="formItem" :rules="ruleInline" :label-width="80">
    <FormItem label="作者" prop="author">
      <Input v-model="formItem.author" type="text"></Input>
    </FormItem>
    <FormItem label="邮箱" prop="email">
      <Input v-model="formItem.email" type="text"></Input>
    </FormItem>
    <FormItem label="地址" prop="url">
      <Input v-model="formItem.url" type="text"></Input>
    </FormItem>
    <FormItem label="状态" prop="status">
      <RadioGroup v-model="formItem.status">
        <Radio :label="1">隐藏</Radio>
        <Radio :label="99">显示</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="内容" prop="text">
      <Input v-model="formItem.text" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="post">提交</Button>
    </FormItem>
  </Form>
</template>
<script>
import { Form, FormItem, Button, RadioGroup, Radio, Input } from 'iview';
import { comment } from '@/api';
export default {
  components: {
    Form,
    FormItem,
    Button,
    RadioGroup,
    Radio,
    Input
  },
  data() {
    return {
      formItem: {
        id: "",
        text: '',
        status: 99
      },
      ruleInline: {
        author: [
          { required: true, message: '作者不能为空' }
        ],
        email: [
          { required: true, message: '邮箱不能为空' },
          { type: 'email', message: '邮箱格式错误'}
        ],
        url: [
          { required: true, message: '地址不能为空' },
          { type: 'url', message: '地址格式错误'}
        ],
        text: [
          { required: true, message: '留言内容不能为空' }
        ],
      }
    }
  },
  methods: {
    post() {
      //表单验证
      this.$refs['formItem'].validate((valid) => {
        if (valid) {
          //更新数据
          comment.update(this.formItem.id, this.formItem).then(res => {
            if (res.errno == 0) {
              this.$router.push("/comment/list");
            }
          })
        } else {
          this.$Message.error('请填写必要信息');
        }
      })
    },
    get(id) {
      comment.getInfo(id).then(res => {
        this.formItem = res.data;
      });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.get(this.$route.query.id)
    }
  }
}

</script>
