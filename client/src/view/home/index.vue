<template>
<div class="container">
    <div class="col-group">
        <div class="col-8" id="main">
            <div class="res-cons">

                <article class="post" v-for="v in content">              
                    <header>
                        <h3 class="post-title">
                            <router-link :to="{ path: 'post/'+v.slug }">{{v.title}}</router-link>
                        </h3>
                         <div class="post-meta">{{v.create_time|date}}</div>
                        <div class="post-content">
                            <div v-html="v.description"></div>
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
export default {
  data() {
    return {
      content: []
    };
  },
  methods: {
    getList() {
      content.getList().then(res => {
        this.content = res.data;
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