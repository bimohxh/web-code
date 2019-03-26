<template>
  <section class="container code-list">
    <div class="row">
      <div class="col-8">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">
              广场
            </h5>
          </div>
          <ul class="list-group list-group-flush">
            <router-link v-for="code in codes" :key="code.title" :to="'/code/' + code.id" class="list-group-item d-flex">
              <div class="flex-grow-1 d-flex align-items-center">
                <div v-if="code.mem" class="code-mem-box mr-2">
                  <img :src="code.mem.avatar" class="avatar" />
                </div>
                <span>{{ code.title }}</span>
                <span class="extra-msg ml-3">
                  {{ $timeago(code.created_at) }}
                </span>
              </div>
              <div class="d-flex  align-items-center">
                <div style="color: #AAA; font-size: 0.8rem" class="mr-3">
                  {{ tagsArr(code) }}
                </div>
                <span :title="code.zan + '人觉得有用'" >
                  <cir-gress
                    :radius="10"
                    :thick="2"
                    frColor="#10b836"
                    :value="code.zan"
                    :text="code.zan"
                    :textFill="svgTextColor(code)"
                    bgColor="#EEE"
                    :total="10"
                    :textSize="12"/>
                </span>
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
            <span class="card-title">小提示</span>
          </div>
          <div class="card-body">
            积累 10 个赞即可离开广场，升级为优选代码并进入码库
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CirGress from '@/components/cirgress'
const pageSize = 20
export default {
  head() {
    return {
      title: '首页'
    }
  },
  async asyncData(context) {
    const _params = {
      page: context.query.page || 1,
      limit: pageSize,
      is_optimization: 'n'
    }
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
    }
  },
  components: {
    CirGress
  },
  methods: {
    fetchData: async function () {
      const res = await this.$axios().get('code')
      this.codes = res.data.data.items
    },
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
    },
    svgTextColor: function (code) {
      return code.zan === 0 ? '#AAA' : '#10b836'
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
  .code-mem-box {
    font-size: 0.9rem;
    font-size: #AAA;
    .avatar {
      width: 20px;
      height: 20px;
      border-radius: 100%;
    }
  }
  .extra-msg {
    font-size: 0.7rem;
    color: #CCC;
  }
}

</style>
