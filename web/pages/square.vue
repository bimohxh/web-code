<template>
  <section class="container code-list">
    <div class="row">
      <div class="col-8">
        <div class="card">
          <ul class="list-group list-group-flush">
            <div class="list-group-item search-box">
              <input type="text" placeholder="输入关键字，回车搜索你想要的代码..." style="border: none"/>
              <icon name="search" />
            </div>
            <div class="list-group-item status-box">
              共找到 120 段符合条件的代码
            </div>
            <router-link :to="'/code/' + code.id" v-for="code in codes" :key="code.title" class="list-group-item d-flex">
              <div class="flex-grow-1">{{ code.title }}</div>
              <div style="color: #AAA; font-size: 0.8rem">
                {{ tagsArr(code) }}
              </div>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-header align-items-center">
            <span class="card-title">小提示</span>
          </div>
          <div class="card-body">
            普通用户发布的代码一开始会出现在广场，等到积累 10 个赞即可离开广场，升级为优选代码并进入码库
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: '首页'
    }
  },
  async asyncData(context) {
    const res = await context.app.$axios().get('code')
    return {
      codes: res.data.data.items
    }
  },
  data() {
    return {
      tags: ['算法', '正则', '小程序', '微信开发', '语义化', 'Vue.js', 'React', 'PWA', '部署', 'Node.js']
    }
  },
  methods: {
    fetchData: async function () {
      const res = await this.$axios().get('code')
      this.codes = res.data.data.items
    },
    tagsArr: function (code) {
      return (code.tags || '').split(',').filter(item => item !== '').join(' / ')
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.code-list {
  max-width: 1000px;
  a.list-group-item {
    text-decoration: none;
    color: #34495e;
    &:hover {
      background-color: #f7f8fa;
    }
  }
  .search-box {
    padding: 0;
    padding-right: 30px;
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
  .status-box {
    color: #0c5460;
    background-color: #d1ecf1;
    border-color: #bee5eb;
    font-size: 0.9rem;
  }
}

</style>
