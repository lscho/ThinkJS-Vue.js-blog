<template>
    <Table border  :loading="loading" :columns="columns" :data="data"></Table>
</template>
<script>
    import { content } from '@/api'
    export default {
        data () {
            return {
                loading: true,
                columns: [
                    {
                        title: '文章名称',
                        key: 'title',
                    },
                    {
                        title: '分类',
                        key: 'category',
                        render:(h,params) => {
                            return params.row.category.name;
                        }
                    },
                    {
                        title: '阅读量',
                        key: 'view',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                path:'/admin/content/save',
                                                query:{
                                                    id:params.row.id
                                                }
                                            })
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            if(confirm('确定要删除吗？')){
                                                this.delete(params.row.id,params.index);
                                            }
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: [

                ]
            }
        },
        methods: {
            get(){
                content.getList().then(res=>{
                    this.data=res.data;
                    this.loading=false;
                });
            },
            delete(id,index){
                content.delete(id).then(res=>{
                    this.data.splice(index, 1);
                });                
            }
        },
        mounted(){
            console.log(content)
            this.get();
        }
    }
</script>