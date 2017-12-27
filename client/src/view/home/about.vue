<template>
<div class="container">
	<div class="col-group">
		<div class="col-8" id="main">
			<div class="res-cons">
				<article class="post">              
					<header>
						<div class="post-content" v-html="item.content">
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
      item: {}
    };
  },
  methods: {
    getContent() {
      content.getInfo('about').then(res => {
        this.item = res.data;
      });
    }
  },
  filters: {
    date: function(value) {
      if (!value) return "";
      return new Date(value * 1000).toLocaleString();
    }
  },
  watch: {
    $route(to, from) {
      this.getContent();
    }
  },
  mounted() {
    this.getContent();
  }
};
</script>