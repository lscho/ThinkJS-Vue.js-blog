<template>
    <Form :model="data" :label-width="80">
      <Tabs>
          <TabPane label="站点设置">
            <FormItem label="站点名称">
                <Input v-model="data.title"></Input>
            </FormItem>

            <FormItem label="站点地址">
                <Input v-model="data.url"></Input>
            </FormItem>

            <FormItem label="关键词">
                <Input v-model="data.keywords"></Input>
            </FormItem>

            <FormItem label="站点描述">
                <Input v-model="data.description"></Input>
            </FormItem>

            <FormItem label="底部说明">
                <Input type="textarea" v-model="data.footer"></Input>
            </FormItem>            
          </TabPane>
          <TabPane label="邮箱设置">
            
          </TabPane>
      </Tabs>

        <FormItem>
            <Button type="primary" @click="post">保存</Button>
        </FormItem>
    </Form>
</template>
<script>
import { site } from "@/api";
import { Form, FormItem, Input, Button, Tabs, TabPane } from 'iview';
export default {
  components: {
    Form, FormItem, Input, Button, Tabs, TabPane
  },
  data() {
    return {
      data: {
        
      }
    };
  },
  methods: {
    get() {
      site.getInfo(1).then(res => {
        this.data = res.data;
      });
    },
    post() {
      site.update(1, this.data).then(res => {});
    }
  },
  mounted() {
    this.get();
  }
};
</script>