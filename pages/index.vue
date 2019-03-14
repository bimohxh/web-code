<template>
  <section class="container code-list">
    <div class="row">
      <div class="col-8">
        <div class="card">
          <ul class="list-group list-group-flush">
            <router-link to="" v-for="code in codes" :key="code.title" class="list-group-item">
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
  data() {
    return {
      codes: [
        {
          title: '如何成为一名全栈开发工程师'
        }, {
          title: '快速排序'
        }, {
          title: '手机号正则验证'
        }, {
          title: '如何成为一名全栈开发工程师'
        }, {
          title: '快速排序'
        }, {
          title: '手机号正则验证'
        }
      ]
    }
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
