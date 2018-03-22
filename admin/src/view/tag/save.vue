<template>
    <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleInline">
        <FormItem label="标签名称"  prop="name">
            <Input v-model="formItem.name" placeholder="标签名称"></Input>
        </FormItem>
        <FormItem label="缩略名" prop="slug">
            <Input v-model="formItem.slug" placeholder="标签缩略名用于创建友好的链接形式, 建议使用字母, 数字, 下划线和横杠"></Input>
        </FormItem>
        <FormItem label="排序">
            <InputNumber  v-model="formItem.sort"></InputNumber>
        </FormItem>
        <FormItem label="标签描述">
            <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="此文字用于描述标签"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="post">提交</Button>
        </FormItem>
    </Form>
</template>
<script>
import { tag } from "@/api";
import { Form, FormItem, Input, InputNumber, Button } from 'iview';
export default {
  components: {
    Form, FormItem, Input, InputNumber, Button
  },
  data() {
    return {
      formItem: {
        id: "",
        name: "",
        slug: "",
        sort: 0,
        description: ""
      },
      ruleInline: {
        name: [{ required: true, message: "标签名称必须填写", trigger: "blur" }],
        slug: [{ required: true, message: "缩略名必须填写", trigger: "blur" }]
      }
    };
  },
  methods: {
    post() {
      this.$refs["formItem"].validate(valid => {
        if (valid) {
          if (this.formItem.id) {
            //更新数据
            tag.update(this.formItem.id, this.formItem).then(res => {
              this.$router.push("/tag/list");
            });
          } else {
            //新增数据
            tag.create(this.formItem).then(res => {
              this.$router.push("/tag/list");
            });
          }
        } else {
          this.$Message.error("请填写必要信息");
        }
      });
    },
    get(id) {
      tag.getInfo(id).then(res => {
        this.formItem = res.data;
      });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.get(this.$route.query.id);
    }
  }
};
</script>