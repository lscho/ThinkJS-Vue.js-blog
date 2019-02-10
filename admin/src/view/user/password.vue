<template>
  <Form :model="formItem" ref="formItem" :rules="ruleInline" :label-width="80">
    <FormItem label="旧密码" prop="password">
      <Input v-model="formItem.password"></Input>
    </FormItem>
    <FormItem label="新密码" prop="newPassword">
      <Input v-model="formItem.newPassword"></Input>
    </FormItem>
    <FormItem label="确认密码" prop="confirmPassword">
      <Input v-model="formItem.confirmPassword"></Input>
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
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空'));
      } else if (value !== this.formItem.newPassword) {
        callback(new Error('两次密码不一致'));
      } else {
        callback();
      }
    };
    return {
      formItem: {
        password: "",
        newPassword: "",
        confirmPassword: ""
      },
      ruleInline: {
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    post() {
      this.$refs['formItem'].validate((valid) => {
        if (valid) {
          user.update(this.$store.state.admin.user.name, this.formItem).then(res => {

          });
        } else {
          this.$Message.error('请填写必要信息');
        }
      })
    }
  },
  mounted() {
    this.get();
  }
};

</script>
