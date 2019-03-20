<template>
  <div class="card code-list">
    <ul class="list-group list-group-flush">
      <div class="list-group-item search-box">
        <input type="text" placeholder="关键字回车搜索..." style="border: none"/>
        <icon name="search" />
      </div>
      <div class="list-box">
        <router-link :to="'/code/' + code.id" v-for="code in codes" :key="code.title" class="list-group-item">
          {{ code.title }}
        </router-link>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      codes: []
    }
  },
  async created() {
    const res2 = await this.$axios().get('code')
    this.codes = res2.data.data.items
  }
}
</script>

<style lang="scss" scoped>
.code-list {
  position: fixed;
  min-width: 250px;
  top: 80px;
  bottom: 10px;
  padding-top: 50px;
  a.list-group-item {
    text-decoration: none;
    color: #34495e;
    &:hover {
      background-color: #f7f8fa;
    }
  }
  .search-box {
    padding: 0;
    position: fixed;
    padding-right: 30px;
    top: 81px;
    width: 248px;
    input {
      border: none;
      padding: 12px 10px;
      width: 100%;
      outline: none;
      background: none;
      &::placeholder {
        color: #CCC
      }
    }
    .icon {
      position: absolute;
      right: 6px;
      top: 10px;
      color: #DDD;
    }
  }
  .list-box {
    overflow-y: auto;
  }
}
</style>
