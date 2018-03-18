<template>
    <Form :model="formItem"  ref="formItem" :rules="ruleInline" :label-width="80">
        <FormItem label="页面标题"  prop="title">
            <Input v-model="formItem.title" placeholder="文章标题"></Input>
        </FormItem>
        <FormItem label="页面标识"  prop="slug">
            <Input v-model="formItem.slug" placeholder="文章唯一标识，并作为参数构造url"></Input>
        </FormItem>
        <FormItem label="页面内容">
            <div id="editor">
                <mavon-editor ref=md @imgAdd="imgAdd" class="editor" v-model="formItem.markdown"></mavon-editor>
            </div>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="post">提交</Button>
        </FormItem>
    </Form>
</template>
<script>
    import 'mavon-editor/dist/css/index.css';
    import { mavonEditor } from 'mavon-editor';
    import { Form, FormItem, Button, Col, Row, CheckboxGroup, Checkbox, RadioGroup, Radio, DatePicker, TimePicker, Select, Option, Input} from 'iview';
    import { category , tag , content , image} from '@/api';
    export default {
        components: {
            mavonEditor, Form, FormItem, Button, Col, Row, CheckboxGroup, Checkbox, RadioGroup, Radio, DatePicker, TimePicker, Select, Option, Input
        },
        data () {
            return {
                formItem: {
                    id:"",
                    title: '',
                    category_id: 0,
                    status: 99,
                    tag: [],
                    date: new Date(),
                    time: new Date(),
                    create_time:[],
                    markdown: '',
                    content:''
                },
                ruleInline: {
                    title: [
                        { required: true, message: '文章标题必须填写' }
                    ]
                },                
                category:[],
                tag:[]
            }
        },
        methods:{
            post(){
                this.formItem.content=this.$refs['md'].d_render;
                //处理发布时间
                let seperator1 = "-";
                let seperator2 = ":";
                let month = this.formItem.date.getMonth() + 1;
                let strDate = this.formItem.date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                this.formItem.create_time= this.formItem.date.getFullYear() + seperator1 + month + seperator1 + strDate+ " " + this.formItem.date.getHours() + seperator2 + this.formItem.date.getMinutes()+ seperator2 + this.formItem.date.getSeconds();
                //文章类型
                this.formItem.type='page';
                //表单验证
                this.$refs['formItem'].validate((valid) => {
                    if (valid) {
                        if(this.formItem.id){
                            //更新数据
                            content.update(this.formItem.id,this.formItem).then(res=>{
                                if(res.errno==0&&res.data.id){
                                    this.$router.push("/content/list");
                                }
                            })
                        }else{
                            //新增数据
                            content.create(this.formItem).then(res=>{
                                if(res.errno==0&&res.data.id){
                                    this.$router.push("/content/list");
                                }
                            })
                        }
                    } else {
                        this.$Message.error('请填写必要信息');
                    }
                })
            },
            getCategory(){
                category.getList().then(res=>{
                    this.category=res.data;
                });
            },
            getTag(){
                tag.getList().then(res=>{
                    this.tag=res.data;
                });                
            },
            get(id){
                content.getInfo(id).then(res=>{
                    let tag=[];
                    for (var i in res.data.tag) {
                        tag.push(res.data.tag[i].id);
                    }
                    res.data.tag=tag;
                    res.data.date=new Date(res.data.create_time*1000);
                    res.data.time=new Date(res.data.create_time*1000);
                    this.formItem=res.data;
                });
            },
            imgAdd(pos, $file){
               var formdata = new FormData();
               formdata.append('image', $file); 
               image.upload(formdata).then(res=>{
                    if(res.errno==0&&res.data.url){
                        this.$refs['md'].$img2Url(pos, res.data.url);
                    }
               });               
            }
        },
        mounted(){
            if(this.$route.query.slug){
                this.get(this.$route.query.slug)
            }
            //获取分类
            this.getCategory();
            //获取标签
            this.getTag();
        }
    }
</script>