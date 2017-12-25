<template>
    <header class="header clearfix">
        <div class="container">
            <div class="col-group">
                <div class="site-name ">  
                    <router-link :to="{ path: '/'}">
                        <h1>{{title}}</h1>
                    </router-link>
                    <br>
                    <h2 class="serif" id="description">{{description}}</h2>
                </div>
                <div>
                    <nav id="nav-menu" class="clearfix">
                        <router-link :to="{ path: '/'}">文章</router-link>
                        <router-link :to="{ path: '/archives'}">归档</router-link>
                        <router-link :to="{ path: '/post/about'}">关于</router-link>
                    </nav>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
export default {
  props: {
    title: String,
    description: String
  }
};
</script>