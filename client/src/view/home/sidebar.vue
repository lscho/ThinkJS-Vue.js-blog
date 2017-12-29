<template>
        <div class="sidebar">
        <section class="widget">
            <form id="search" method="post" action="/">
                <input type="text" name="key" v-model="key" class="text" placeholder="搜索...">
                <button type="button" @click="search" class="submit icon-search">搜索</button>
            </form>
        </section>

        <section class="widget">
            <ul class="widget-list widget-list2">
                <li><h3><router-link :class="{current:route.name=='post'||route.name=='index'}" :to="{ path: '/'}">文章</router-link></h3></li>
                <li><h3><router-link :class="{current:route.name=='archives'}" :to="{ path: '/archives'}">归档</router-link></h3></li> 
                <li><h3><router-link :class="{current:route.name=='about'}" :to="{ path: '/about'}">关于</router-link></h3></li> 
            </ul>
        </section>
        </div>    
</template>
<script>
export default {
  props: {
    route: Object
  },
  data(){
      return {
          key:""
      }
  },
  methods:{
      search(){
          if(this.key){
              this.$router.push({
                    path: "/",
                    query: {
                        key: this.key
                    }
            });
            this.key="";
          }
      }
  }
};
</script>