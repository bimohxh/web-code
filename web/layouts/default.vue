<template>
  <div>
    <nav class="navbar navbar-dark bd-navbar sticky-top navbar-light navbar-expand-md">
      <button type="button" aria-label="Toggle navigation" aria-controls="bd-main-nav" aria-expanded="false" class="navbar-toggler">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a href="/" class="navbar-brand" target="_self">
        <span class="d-block">Wait Code</span>
        <span class="sr-only">Home</span>
      </a>
      <div id="bd-main-nav" class="justify-content-between navbar-collapse collapse" style="display: none;">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/square" class="nav-link">广场</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/code/new" class="nav-link">发布代码</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
    margin: 0;
    font-family: roboto-mono,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;
    font-size: .9375rem;
    font-weight: 400;
    line-height: 1.5;
    color: #34495e;
    text-align: left;
    background-color: #f5f7fb;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.bd-navbar {
  background-color: #000;
}

.card {
  box-shadow: 0 1px 10px 0 rgba(0,0,0,.05);
  border: 1px solid #e4eaf5;
}

.container {
  padding: 20px 0;
}

.list-group-item {
  border: 1px solid #ebeced;
}

a {
  transition: all .5s;
}

.card-header {
  border-bottom: 1px solid #ebeced;
  background-color: #FFF;
}

.card-footer {
  background-color: #FFF;
}

@font-face {
  font-family: 'Roboto Mono';
  src: url('/fonts/RobotoMono-Regular.ttf')
}

.tag {
  font-size: 0.75rem;
  color: #6e7687;
  background-color: #e9ecef;
  border-radius: 3px;
  padding: 0 .5rem;
  line-height: 2em;
  display: inline-flex;
  font-weight: 400;
  user-select: none;
}

</style>
