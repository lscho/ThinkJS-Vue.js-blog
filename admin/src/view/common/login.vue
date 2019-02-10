<template>
  <div class="login-form">
    <div class="top-login">
      <span><img src="../../assets/images/group.png" alt=""/></span>
    </div>
    <h1>登录</h1>
    <div class="login-top">
      <Form ref="userInfo" :model="userInfo" :rules="ruleInline">
        <FormItem prop="username">
          <Input type="text" v-model="userInfo.username" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="userInfo.password" placeholder="Password">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem style="text-align:center;">
          <Button type="primary" @click="login('userInfo')">登录</Button>
          <Button type="error" @click="reset">重置</Button>
        </FormItem>
      </Form>
    </div>
    <p class="copy">@lscho</p>
  </div>
</template>
<script>
import "iview/dist/styles/iview.css";
import "@/assets/css/login.css";
import { mapGetters, mapActions } from "vuex";
import { Form, FormItem, Icon, Input, Button } from 'iview';
import { token } from "@/api/index";
export default {
  components: {
    Form,
    FormItem,
    Icon,
    Input,
    Button
  },
  data() {
    return {
      userInfo: {
        username: "",
        password: ""
      },
      ruleInline: {
        username: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          { type: "string", min: 6, message: "密码长度不能小于6位", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["verifyToken"])
  },
  mounted() {
    //检测token是否有效
    if (this.verifyToken) {
      this.$router.push({
        name: "AdminIndex"
      });
    }
  },
  methods: {
    login(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          token.create(this.userInfo).then(res => {
            if (res.errno == 0 && res.data.token) {
              this.$store.commit("setUserName", this.userInfo.username);
              this.$store.commit("setToken", res.data.token);
              this.$router.push("/home");
            }else{
              this.$Message.error(res.errmsg);
            }
          });
        } else {
          this.$Message.error("请填写必要信息");
        }
      });
    },
    reset() {
      this.userInfo = {
        user: "",
        password: ""
      };
    }
  }
};

</script>
