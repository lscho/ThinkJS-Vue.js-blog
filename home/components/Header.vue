<template>
  <header id="header" class="header bg-white">
    <div class="navbar-container">
      <nuxt-link to="/" class="navbar-logo">XIN. </nuxt-link>
      <div class="navbar-menu">
        <nuxt-link to="/page/archives.html">Archives</nuxt-link>
        <nuxt-link to="/page/about.html">About</nuxt-link>
        <nuxt-link to="/page/links.html">Links</nuxt-link>
      </div>
      <div class="navbar-search" onclick=""> <span class="icon-search"></span>
        <form id="search" method="post" action="/" role="search"> <span class="search-box"> <input type="text" id="input" class="input" name="s" required="true" placeholder="Search..." maxlength="30" autocomplete="off"> </span> </form>
      </div>
      <div class="navbar-mobile-menu" onclick=""> <span class="icon-menu cross"><span class="middle"></span></span>
        <ul>
          <li><nuxt-link to="/page/archives.html">Archives</nuxt-link></li>
          <li><nuxt-link to="/page/about.html">About</nuxt-link></li>
          <li><nuxt-link to="/page/links.html">Links</nuxt-link></li>
        </ul>
      </div>
    </div>
  </header>
</template>
