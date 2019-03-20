<template>
  <div class="page-box">
    <div :id="pid"></div>
    <div class="summary">
      共查询到 
      <strong> {{option.totalcount}} </strong> 条记录
    </div>
  </div>
</template>

<script>
export default {
  props: ['option'],
  methods: {
    pgination: function () {
      let isFirstFetch = true
      let _self = this
      window.$(`#${this.pid}`).pagination({
        dataSource: [this.option.totalcount],
        pageSize: 15,
        showGoInput: true,
        showGoButton: true,
        goButtonText: '跳转',
        callback: function (data, pagination) {
          if (isFirstFetch) {
            isFirstFetch = false
            return
          }
          if (_self.option.callback) {
            _self.option.callback(pagination.pageNumber)
          }
        }
      })
    }
  },
  data () {
    return {
      pid: `pagina-${parseInt(Math.random(10) * 10000)}`
    }
  },
  watch: {
    'option.totalcount': function () {
      this.pgination()
    }
  },
  mounted () {
    this.pgination()
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  display: flex;
  align-items: center;

  .summary {
    margin-left: 20px;
  }
}
</style>