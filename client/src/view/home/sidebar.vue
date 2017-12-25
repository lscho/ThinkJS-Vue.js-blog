<template>
        <div class="sidebar">
            <section class="widget">
            <div class="widget-title">最新文章</div>
            <ul class="widget-list widget-list2">
                <li><h3><a href="http://localhost/typecho/index.php/archives/1/">欢迎使用 Typecho</a></h3></li>        </ul>
        </section>
        
        <section class="widget">
            <form id="search" method="post" action="./">
                <input type="text" name="s" class="text" placeholder="搜索...">
                <button type="submit" class="submit icon-search">搜索</button>
            </form>
        </section>

            <section class="widget">
            <h3 class="widget-title">分类</h3>
            <ul class="widget-list widget-list2">
                <li><h3><a href="http://localhost/typecho/index.php/category/default/">默认分类</a></h3></li>        </ul>
        </section>
        </div>    
</template>
<script>
export default {};
</script>