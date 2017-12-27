<template>
<div class="container">
    <div class="col-group">
        <div class="col-8" id="main">
            <div class="res-cons">
                <article class="post" v-for="(item , index) in items" :key="index">              
                    <header>
                        <h5 class="post-title">
                            <router-link :to="{ path: 'post/'+item.slug }">{{item.title}}</router-link>
                        </h5>
                         <div class="post-meta">{{item.create_time|date}}</div>
                        <div class="post-content">
                            <div v-html="item.description"></div>
                        </div>
                    </header>
                </article>
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
      content.getList().then(res => {
        this.items = res.data;
      });
    }
  },
  filters: {
    date: function(value) {
      if (!value) return "";
      return new Date(value * 1000).toLocaleString();
    }
  },
  mounted() {
    this.getList();
  }
};
</script>