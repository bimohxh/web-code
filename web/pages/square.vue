<template>
  <section class="container code-list">
    <div class="row">
      <div class="col-8">
        <div class="card">
          <ul class="list-group list-group-flush">
            <router-link :to="'/code/' + code.id" v-for="code in codes" :key="code.title" class="list-group-item">
              {{ code.title }}
            </router-link>
          </ul>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-header align-items-center">
            如何成为一名全栈开发工程师
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
