<template>
	<article  v-cloak class="main-content page-page" itemscope itemtype="http://schema.org/Article">
		<div class="post-header">
			<h1 class="post-title" itemprop="name headline" v-html="content.title"></h1>
		</div>
		<div id="post-content" class="post-content" itemprop="articleBody">
      <div v-html="content.content"></div>
		</div>
	</article>
</template>
<script>
import axios from "~/plugins/axios";
export default {
  layout: 'blog',
  validate ({ params }) {
    return true;
  },
  asyncData ({ app,params }) {
    return app.$axios.get('/api/content/'+params.slug.replace(".html","")).then((response) => {
      return {content:response.data.data}
    })
  },
  data() {
    return {
      content:{}
    }
  },
  filters:{
    datetime(timestamp){
      return (new Date(timestamp*1000)).toDateString();
    }
  }
}	
</script>