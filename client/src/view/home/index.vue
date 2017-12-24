<template>
<div class="container">
    <div class="col-group">
        <div class="col-8" id="main">
            <div class="res-cons">

                <article class="post" v-for="v in content">              
                    <header>
                        <h3 class="post-title">
                            <router-link :to="{ path: 'post/'+v.id }">{{v.title}}</router-link>
                        </h3>
                         <div class="post-meta">December 23, 2017 </div>
                        <div class="post-content">
                            {{v.content}}
                            <p class="more"><a href="">- 阅读剩余部分 -</a></p>
                        </div>
                    </header>
                </article>

            </div>
        </div>
    </div>
</div>
</template>
<script>
    import { content } from '@/api';
    export default {
        data(){
            return {
                content:[]
            }
        },
        methods:{
            getContent(){
                content.getList().then(res=>{
                    this.content=res.data;
                });
            },
        },
        mounted(){
            this.getContent();
        }
    }
</script>