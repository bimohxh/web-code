<template>
  <div>
    <nav class="navbar navbar-dark bd-navbar sticky-top navbar-light navbar-expand-md">
      <button type="button" aria-label="Toggle navigation" aria-controls="bd-main-nav" aria-expanded="false" class="navbar-toggler">
        <span class="navbar-toggler-icon"></span>
      </button>
      <nuxt-link to="/" class="navbar-brand" target="_self">
        <span class="d-block">Wait Code</span>
        <span class="sr-only">Home</span>
      </nuxt-link>
      <div id="bd-main-nav" class="justify-content-between navbar-collapse collapse" style="display: none;">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">码库</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/square" class="nav-link">广场</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/code/new" class="nav-link">发布代码</router-link>
          </li>
        </ul>
        <router-link :to="'/mem/' + $store.state.session.id" v-if="$store.state.session" class="nav-mem">
          <img :src="$store.state.session.avatar" class="avatar" />
        </router-link>
        <button class="btn btn-outline-secondary btn-sm" @click="login" v-else>登 录 </button>
      </div>
    </nav>
    <div id="alert-container"></div>
    <nuxt />
    <div class="login-box card" v-if="showLogin">
      <a href="javascript: void(0)" class="close-btn">
        <icon name="x" />
      </a>
      <a href=""><icon name="github" size="60" /></a>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      showLogin: false
    }
  },
  methods: {
    login: async function () {
      const res = await this.$axios().get('auth/login')
      if (res.data.status === 200) {
        Cookie.set('atoken', res.data.data[0].token, { expires: 30 })
        this.$store.commit('setAuth', res.data.data[0].mem)
      } else {
        Cookie.set('atoken', null)
      }
    }
  }
}
</script>

<style lang="scss">
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

a {
  text-decoration: none;
  color: #34495e;
}

.bd-navbar {
  background-color: #000;
}

#alert-container {
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 100;
  text-align: center;
  .alert {
    // border-radius: 0;
    margin: 0;
    display: inline-block;
  }
}

.card {
  box-shadow: 0 1px 10px 0 rgba(0,0,0,.05);
  border: 1px solid #e4eaf5;
}
.card-header {
  .card-title {
    margin-bottom: 0;
  }
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

.pagination {
  margin-bottom: 0;
}

.nav-mem {
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 100%;
  }
}
.login-box {
  position: fixed;
  width: 100%;
  max-width: 300px;
  height: 300px;
  top: 100px;
  left: 50%;
  margin-left: -150px;
  box-shadow: 0px 0px 50px rgb(186, 194, 200);
  border: 1px solid #b7c7e5;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .close-btn {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #DDD;
  }
}
</style>
