<template>
    <header class="header clearfix">
        <div class="container">
            <div class="col-group">
                <div class="site-name ">  
                    <a href="http://localhost/typecho/">
                        <h1>{{title}}</h1>
                    </a>
                    <br>
                    <h2 class="serif" id="description">{{description}}</h2>
                </div>
                <div>
                    <nav id="nav-menu" class="clearfix">
                        <a class="current " href="http://localhost/typecho/">文章</a>
                        <a href="http://localhost/typecho/index.php/start-page.html" title="关于">关于</a>
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
          description:String
        }        
    }
</script>