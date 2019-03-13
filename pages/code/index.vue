<template>
  <section class="container code-box">
    <div class="card">
      <div class="card-header">
        {{ code.title }}
      </div>
      <div class="card-body">
        <pre>
          <code class="language-javascript">
          {{ code.code }}
          </code>
        </pre>
      </div>
    </div>
  </section>
</template>

<script>
import Prism from 'prismjs'
export default {
  data() {
    return {
      code: {
        title: '快速排序',
        code: `
        var a = 1
        var b = 2
        `
      }
    }
  },
  mounted() {
    Prism.highlightAll()
  }
}
</script>

<style lang="scss">
.code-box {
  max-width: 800px;
}
</style>
