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
              共找到 {{ amount }} 段符合条件的代码
            </div>
            <router-link :to="'/code/' + code.id" v-for="code in codes" :key="code.title" class="list-group-item d-flex">
              <div class="flex-grow-1">{{ code.title }}</div>
              <div style="color: #AAA; font-size: 0.8rem">
                {{ tagsArr(code) }}
              </div>
            </router-link>
          </ul>
          <div class="card-footer">
            <pagination :callback="pagiClick" :pageCount="pageCount" :page="currentPage" />
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-header align-items-center">
            <span class="card-title">热门标签</span>
          </div>
          <div class="card-body">
            <router-link :to="'?tag=' + tag" v-for="tag in tags" :key="tag" class="tag mr-2 mb-2">{{ tag }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const pageSize = 20
export default {
  watchQuery: ['tag', 'page'],
  head() {
    return {
      title: '首页'
    }
  },
  async asyncData(context) {
    const _params = {
      page: context.query.page || 1,
      limit: pageSize,
      is_optimization: 'y'
    }
    ;['tag'].forEach((key) => {
      if (context.query[key]) {
        _params[key] = context.query[key]
      }
    })
    const res = await context.app.$axios().get('code', {
      params: _params
    })
    return {
      codes: res.data.data.items,
      amount: res.data.data.count,
      pageCount: Math.ceil(res.data.data.count / pageSize),
      currentPage: _params.page
    }
  },
  data() {
    return {
      tags: ['算法', '正则', '小程序', '微信开发', '语义化', 'Vue.js', 'React', 'PWA', '部署', 'Node.js']
    }
  },
  methods: {
    tagsArr: function (code) {
      return (code.tags || '').split(',').filter(item => item !== '').join(' / ')
    },
    pagiClick: function (page) {
      let _href = '?page=' + page
      const _tag = this.$route.query.tag
      if (_tag && _tag !== '') {
        _href += '&tag=' + _tag
      }
      this.$router.push(_href)
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
