<template>
	<article class="main-content page-page" itemscope itemtype="http://schema.org/Article">
		<div class="post-header">
			<h1 class="post-title" itemprop="name headline" v-html="content.title"></h1>
			<div class="post-data">
				<time :datetime="content.create_time|datetime" itemprop="datePublished">Published on {{content.create_time|datetime}}</time> in 
        <nuxt-link v-if="content.category" :to="content|categoryUrl">{{content.category.name}}</nuxt-link> with <a href="#comments"> 0 comment</a> 
      </div>
		</div>
		<div id="post-content" class="post-content" itemprop="articleBody">
			<p class="post-tags">
          <nuxt-link v-if="content.tag" v-for="tag in content.tag" :to="tag|tagUrl" :key="tag.id">{{tag.name}}</nuxt-link>
      </p>
      <div v-html="content.content"></div>
		</div>
	</article>
</template>
<script>
import axios from "~/plugins/axios";
export default {
  layout: 'blog',
  validate ({ params }) {
    if(!params.slug||!params.category){
      return false;
    }
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
    categoryUrl(content){
      if(content.category){
        return '/category/' + content.category.slug + '/';
      }
    },
    tagUrl(tag){
      return '/tag/' + tag.slug + '/';
    },
    datetime(timestamp){
      return (new Date(timestamp*1000)).toDateString();
    }
  }
}	
</script>