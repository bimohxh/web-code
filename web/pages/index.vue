<template>
  <section class="container code-list">
    <div class="row">
      <div class="col-8">
        <div class="card">
          <ul class="list-group list-group-flush">
            <router-link :to="'/code/' + code.id" v-for="code in codes" :key="code.title" class="list-group-item d-flex">
              <div class="flex-grow-1">{{ code.title }}</div>
              <div style="color: #AAA">
                <span v-for="tag in tagsArr(code)" :key="tag">{{ tag }} / </span>
              </div>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-header align-items-center">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData(context) {
    const res = await context.app.$axios().get('code')
    return {
      codes: res.data.data.items
    }
  },
  methods: {
    fetchData: async function () {
      const res = await this.$axios().get('code')
      this.codes = res.data.data.items
    },
    tagsArr: function (code) {
      return (code.tags || '').split(',')
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
.code-list {
  a.list-group-item {
    text-decoration: none;
    color: #34495e;
    &:hover {
      background-color: #f7f8fa;
    }
  }
}

</style>
