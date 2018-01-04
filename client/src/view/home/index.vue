<template>
<div class="container">
    <div class="col-group">
        <div class="col-8" id="main">
            <div class="res-cons">
                <article class="post" v-for="(item , index) in items" :key="index" v-if="items.length>0">              
                    <header>
                        <h5 class="post-title">
                            <router-link :to="{ path: 'post/'+item.slug }">{{item.title}}</router-link>
                        </h5>
                         <div class="post-meta">{{item.create_time|date}}</div>
                        <div class="post-content">
                            <div class="post-content-description" v-html="item.description"></div>
                        </div>
                    </header>
                </article>

                <div v-if="items.length==0">
                  <h3>暂无任何结果</h3>
                </div>
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
      items: []
    };
  },
  methods: {
    getList() {
      let map={};
      const key = this.$route.query.key;
      if(key){
        map.key=key;
      }
      content.getList(map).then(res => {
        this.items = res.data;
      });
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
    this.getList();
  }
};
</script>