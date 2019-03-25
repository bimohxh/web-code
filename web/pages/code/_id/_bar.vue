<template>
<div class="code-bar">
  <div class="card"  v-if="code.mem">
    <div class="card-body d-flex">
      <img class="avatar" :src="code.mem.avatar" />
      <div class="ml-2">
        <div><strong>{{ code.mem.nc }}</strong> <small>{{ code.mem.location }}</small></div>
        <div>代码 10 / 赞 50</div>
      </div>
    </div>
  </div>
  <div class="card mt-2">
    <div class="card-header d-flex">
      <div class="flex-grow-1">
        <span>{{ code.title }}</span>
      </div>
      <a href="javascript: void(0)" class="star-btn">
        <icon name="star" size="18" />
      </a>
    </div>
    <div class="card-body text-center">
      <a href="javascript: void(0)" class="mt-3">
        <icon name="thumbs-up" size="40"></icon>
      </a>
      <div class="mt-3">{{ code.zan }}人觉得很赞</div>
    </div>
    <div class="card-footer d-flex">
      <div class="flex-grow-1">
        <a href="javascript: void(0)">
          <icon name="chevron-left">上一段</icon>
        </a>
      </div>
      <div>
        <a href="javascript: void(0)" class="d-flex">
          <span class="d-inline-flex">下一段</span>
          <icon name="chevron-right" />
        </a>
      </div>
    </div>
  </div>

  <div class="card mt-2" v-if="isAuthor">
    <router-link :to="'/code/' + code.id + '/edit'" class="card-body d-flex" style="justify-content: space-between">
      <span>编辑该代码段</span>
      <icon name="edit-2" size="16" />
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  props: ['code'],
  computed: {
    isAuthor: function () {
      return (this.$store.state.session || {}).id === this.code.mem_id
    }
  }
}
</script>

<style lang="scss" scoped>
.code-bar {
  a {
    text-decoration: none;
    color: #34495e;
    &.star-btn {
      color: #AAA;
    }
  }
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}
</style>
