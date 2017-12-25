<template>
<div class="container">
	<div class="col-group">
		<div class="col-8" id="main">
			<div class="res-cons">
				<article class="post">              
					<header>
						<h3 class="post-title">
							{{data.title}}
						</h3>
						 <div class="post-meta">{{data.create_time|date}}</div>
						<div class="post-content" v-html="data.content">
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
      data: {}
    };
  },
  methods: {
    getContent(slug) {
      content.getInfo(slug).then(res => {
        this.data = res.data;
      });
    }
  },
  filters: {
    date: function(value) {
      if (!value) return "";
      return (new Date(value*1000)).toLocaleString();
    }
  },
  mounted() {
    const slug = this.$route.params.slug;
    this.getContent(slug);
  }
};
</script>