<template>
      <Tabs>
          <TabPane label="站点设置">
            <Form :model="site" :label-width="80">
            <FormItem label="站点名称">
                <Input v-model="site.title"></Input>
            </FormItem>

            <FormItem label="站点地址">
                <Input v-model="site.url"></Input>
            </FormItem>

            <FormItem label="关键词">
                <Input v-model="site.keywords"></Input>
            </FormItem>

            <FormItem label="站点描述">
                <Input v-model="site.description"></Input>
            </FormItem>

            <FormItem label="底部说明">
                <Input type="textarea" v-model="site.footer"></Input>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="post('site',site)">保存</Button>
            </FormItem>
            </Form>
          </TabPane>

          <TabPane label="邮箱设置">
            <Form :model="email" :label-width="80">
            <FormItem label="服务器">
                <Input v-model="email.host"></Input>
            </FormItem>

            <FormItem label="端口">
                <Input v-model="email.port"></Input>
            </FormItem>

            <FormItem label="安全模式">
              <RadioGroup v-model="email.secure">
                  <Radio :label="0">否</Radio>
                  <Radio :label="1">是</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="账号">
                <Input v-model="email.user"></Input>
            </FormItem>

            <FormItem label="密码">
                <Input v-model="email.pass"></Input>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="post('email',email)">保存</Button>
            </FormItem>
            </Form>
          </TabPane>

          <TabPane label="七牛配置">
            <Form :model="qiniu" :label-width="80">
            <FormItem label="access_key">
                <Input v-model="qiniu.access_key"></Input>
            </FormItem>

            <FormItem label="secret_key">
                <Input v-model="qiniu.secret_key"></Input>
            </FormItem>

            <FormItem label="bucket">
                <Input v-model="qiniu.bucket"></Input>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="post('qiniu',qiniu)">保存</Button>
            </FormItem>
            </Form>
          </TabPane>
      </Tabs>
</template>
<script>
import { config } from "@/api";
import { Form, FormItem, Input, Button, Tabs, TabPane, RadioGroup, Radio } from 'iview';
export default {
  components: {
    Form, FormItem, Input, Button, Tabs, TabPane, RadioGroup, Radio
  },
  data() {
    return {
      site: {},
      email:{
        secure:1
      },
      qiniu :{}
    };
  },
  methods: {
    get() {
      config.getList().then(res => {
        if(res.data.site){
          this.site = res.data.site;
        }
        if(res.data.email){
          this.email = res.data.email;
        }
        if(res.data.qiniu){
          this.qiniu = res.data.qiniu;
        }
      });
    },
    post(type,data) {
      console.log(type)
      config.update(type, data).then(res => {

      });
    }
  },
  mounted() {
    this.get();
  }
};
</script>