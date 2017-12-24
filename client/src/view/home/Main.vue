<template>
<div :class="{'move-block':true,'typo':true,'sidebar-active':sidebarOpen}">

    <!--header 组件名字不让用html标签了0.0-->
    <headers :title="site.title" :description="site.description"></headers>
    <!--header-->    

    
    <div id="body">
        <router-view>
        
        </router-view>
    </div>

    <!--sidebar-->
    <div :class="{'icon-arrow-down':!sidebarOpen,'icon-cross':sidebarOpen,'side-click':true,}" @click="toggleClick"></div>
    <div id="secondary"  :class="{'active':sidebarOpen}">
        <sidebar></sidebar>
    </div>
    <!--sidebar-->
    
    <!--footer 组件名字不让用html标签了0.0-->
    <footers :text="site.footer"></footers>
    <!--footer-->

</div>
</template>
<script>
    import '@/assets/css/typo.css';
    import '@/assets/css/home.css';
    import  sidebar from  '@/view/home/sidebar';
    import  headers from  '@/view/home/header';
    import  footers from  '@/view/home/footer';
    import { site , content } from '@/api';
    export default {
        components: {
            sidebar,
            footers,
            headers
        },
        data(){
            return {
                site:{},
                sidebarOpen:false,
                content:[]
            }
        },
        methods:{
            getSite(){
                site.getInfo(1).then(res=>{
                    this.site=res.data;
                });
            },
            getContent(){
                content.getList().then(res=>{
                    this.content=res.data;
                });
            },
            post(){
                site.update(1,this.formItem).then(res=>{

                });
            },
            toggleClick(){
                this.sidebarOpen=!this.sidebarOpen;
            }
        },
        mounted(){
            this.getSite();
            this.getContent();
        }
    }
</script>