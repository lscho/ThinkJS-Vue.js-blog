<template>
<div class="container">
	<div class="col-group">
		<div class="col-8" id="main">
			<div class="res-cons">
				<article class="post">              
						<h5 class="post-title">
							{{item.title}}
						</h5>
						 <div class="post-meta">{{item.create_time|date}}</div>
             <hr>
						<div class="post-content" v-html="item.content">
						</div>
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
      item: {}
    };
  },
  methods: {
    getContent(slug) {
      content.getInfo(slug).then(res => {
        this.item = res.data;
      });
    }
  },
  filters: {
    date: function(value) {
      if (!value) return "";
      return new Date(value * 1000).toDateString();
    }
  },
  watch: {
    $route(to, from) {
      const slug = this.$route.params.slug;
      this.getContent(slug);
    }
  },
  mounted() {
    const slug = this.$route.params.slug;
    this.getContent(slug);
  }
};
</script>