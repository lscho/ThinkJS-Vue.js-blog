<template>
    <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleInline">
        <FormItem label="分类名称"  prop="name">
            <Input v-model="formItem.name" placeholder="分类名称"></Input>
        </FormItem>
        <FormItem label="缩略名">
            <Input v-model="formItem.slug" placeholder="分类缩略名用于创建友好的链接形式, 建议使用字母, 数字, 下划线和横杠"></Input>
        </FormItem>
        <FormItem label="排序">
            <InputNumber  v-model="formItem.sort"></InputNumber>
        </FormItem>
        <FormItem label="分类描述">
            <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="此文字用于描述分类, 预置参数"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="post">提交</Button>
        </FormItem>
    </Form>
</template>
<script>
import { category } from "@/api";
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
        name: [{ required: true, message: "分类名称必须填写", trigger: "blur" }]
      }
    };
  },
  methods: {
    post() {
      this.$refs["formItem"].validate(valid => {
        if (valid) {
          if (this.formItem.id) {
            //更新数据
            category.update(this.formItem.id, this.formItem).then(res => {
              this.$router.push("/category/list");
            });
          } else {
            //新增数据
            category.create(this.formItem).then(res => {
              this.$router.push("/category/list");
            });
          }
        } else {
          this.$Message.error("请填写必要信息");
        }
      });
    },
    get(id) {
      category.getInfo(id).then(res => {
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