<template>
<div class="card mt-2">
  <div class="card-header action-nav">
    <router-link :to="'/mem/' + mem.id + '?action=pub'" :class="'active-' + (action === 'pub')">我发布的</router-link>
    <router-link :to="'/mem/' + mem.id + '?action=zan'" :class="'active-' + (action === 'zan')">我点赞的</router-link>
    <router-link :to="'/mem/' + mem.id + '?action=favor'" :class="'active-' + (action === 'favor')">我收藏的</router-link>
  </div>
  <ul class="list-group list-group-flush code-list">
    <router-link :to="'/code/' + code.id" v-for="code in codes" :key="code.title" class="list-group-item d-flex">
      <div class="flex-grow-1">{{ code.title }}</div>
      <div style="color: #AAA; font-size: 0.8rem">
        {{ tagsArr(code) }}
      </div>
    </router-link>
  </ul>
</div>
</template>
<script>
export default {
  watchQuery: ['action'],
  async asyncData(context) {
    const res = await context.app.$axios().get('code')
    return {
      codes: res.data.data.items,
      action: context.query.action || 'pub'
    }
  },
  data() {
    return {
      mem: this.$store.state.session
    }
  },
  methods: {
    tagsArr: function (code) {
      return (code.tags || '').split(',').filter(item => item !== '').join(' / ')
    }
  }
}
</script>

<style lang="scss" scoped>
.action-nav {
  background-color: #f5f7fb;
  padding: 0;
  a {
    display: inline-block;
    margin-right: 10px;
    text-decoration: none;
    color: #34495e;
    padding: 10px;
    &.active-true {
      font-weight: bold;
      border-bottom: #d9860a 1px solid;
      margin-bottom: -1px;
      color: #d9860a;
    }
  }
}
.code-list {
  .list-group-item {
    text-decoration: none;
  }
}
</style>
