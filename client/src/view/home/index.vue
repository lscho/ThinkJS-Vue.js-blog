<template>
<div class="container">
    <div class="col-group">
        <div class="col-8" id="main">
            <div class="res-cons">
                <article class="post" v-for="(item , index) in items.data" :key="index" v-if="items.count>0">              
                    <header>
                        <h5 class="post-title text-center">
                            <router-link :to="{ path: 'post/'+item.slug }">{{item.title}}</router-link>
                        </h5>
                         <div class="post-meta text-center">{{item.create_time|date}}</div>
                        <div class="post-content">
                            <div class="post-content-description" v-html="item.description"></div>
                            <p class="more"><router-link :to="{ path: 'post/'+item.slug }">- 阅读剩余部分 -</router-link></p>
                        </div>
                    </header>
                </article>

                <div v-if="items.count==0">
                  <h3>暂无任何结果</h3>
                </div>

              <ol class="page-navigator">
                <li :class="{'prev':true,'active':items.currentPage>1}">
                  <a href="javascript:" @click="prev">&laquo; Previous</a>
                </li>
                <li><span>{{items.currentPage}}/{{items.totalPages}}</span></li>
                <li :class="{'next':true,'active':items.currentPage<items.totalPages}">
                  <a href="javascript:" @click="next">Next &raquo;</a>
                </li>
              </ol>

            </div>
        </div>
    </div>
</div>
</template>
<script>
import { content } from "@/api";
import "mavon-editor/dist/highlightjs/styles/github.min.css";
export default {
  data() {
    return {
      items: {
        data:[]
      },
      page:1,
      key:''
    };
  },
  methods: {
    getList() {
      let map={
        key:this.key,
        page:this.page
      };
      content.getList(map).then(res => {
        this.items = res.data;
      });
    },
    routePush(){
      let query={};
      if(this.key){
        query.key=this.key;
      }
      if(this.page){
        query.page=this.page;
      }
      this.$router.push({path:'/',query:query});
    },
    next(){
      if(this.items.currentPage<this.items.totalPages){
        this.page=this.items.currentPage+1;
        this.routePush();
      }
    },
    prev(){
      if(this.items.currentPage>1){
        this.page=this.items.currentPage-1;
        this.routePush();
      }
    }
  },
  watch: {
    $route(to, from) {
      this.getList();
    }
  },
  filters: {
    date: function(value) {
      if (!value) return "";
      return new Date(value * 1000).toDateString();
    }
  },
  mounted() {
    this.key=this.$route.query.key||"";
    this.page=this.$route.query.page||1;
    this.getList();
  }
};
</script>