<template>
  <div class="main-content index-page clearfix onelist-page"  v-cloak>
    <div class="post-lists">
      <div class="post-lists-body">
        <div class="post-onelist-item" v-for="content in data.data" :key="content.id">
          <div class="post-onelist-item-container">
            <nuxt-link :to="content|url" v-if="content.thumb">
              <div class="onelist-item-thumb bg-deepgrey" style="background-image:url(https://static.lscho.com/usr/uploads/2018/03/3442956625.jpeg);"></div>
            </nuxt-link>
            <div class="onelist-item-info">
              <div class="item-title">
                <nuxt-link :to="content|url">{{content.title}}</nuxt-link>
              </div>
              <div class="item-meta">
                <time :datetime="content.create_time|datetime" itemprop="datePublished"> Published on {{content.create_time|datetime}}</time> in 
                <nuxt-link :to="content|categoryUrl">{{content.category.name}}</nuxt-link>
              </div>
              <div class="item-meta-hr bg-deepgrey"></div>
              <div class="item-content" v-html="content.description">
              </div>
              <div class="item-readmore"> 
              <nuxt-link :to="content|url">
                Continue Reading → 
               </nuxt-link>
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lists-navigator clearfix">
      <ol class="page-navigator">
        <li class="current"><a href="<%=site.url %>/page/1/">1</a></li>
        <li><a href="<%=site.url %>/page/2/">2</a></li>
        <li><a href="<%=site.url %>/page/3/">3</a></li>
        <li><span>...</span></li>
        <li><a href="<%=site.url %>/page/5/">5</a></li>
        <li class="next"><a href="<%=site.url %>/page/2/">→</a></li>
      </ol>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'blog',
  data() {
    return {
      data: {},
      map: {
        page: 1
      }
    }
  },
  asyncData({app}){
    return app.$axios.get('/api/content').then(response => {
        if (response.data.errno == 0) {
          return {data:response.data.data}
        }
      })
  },
  methods: {
    get() {
      axios.get('/content', { params: this.map }).then(response => {
        if (response.data.errno == 0) {
          this.data = response.data.data;
        }
      })
    }
  },
  mounted() {
    //this.get();
  },
  filters: {
    url(content) {
      return '/' + content.category.slug + '/' + content.slug + '.html';
    },
    categoryUrl(content){
      return '/category/' + content.category.slug;
    },
    datetime(timestamp){
      return (new Date(timestamp*1000)).toDateString();
    }
  }
}

</script>
