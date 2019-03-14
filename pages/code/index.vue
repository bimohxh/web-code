<template>
  <section class="container code-box">
    <div class="card">
      <div class="card-header d-flex">
        <div class="flex-grow-1">
          {{ code.title }}
        </div>
        <div>
          <a :href="carbonlink" target="_blank" title="导出图片">
            <icon name="image" size="20" />
          </a>
          <a :href="carbonlink" target="_blank" title="导出图片">
            <icon name="star" size="20" />
          </a>
          <a :href="carbonlink" target="_blank" title="导出图片">
            <icon name="thumbs-up" size="20" />
          </a>
        </div>
      </div>
      <div class="card-body code-body">
        <pre><code class="language-javascript">{{ code.code }}</code></pre>
      </div>
    </div>
    <div class="card mt-4">
      <div class="card-body">这里细心的同学可能会提出，选取不同的基准时，是否会有不同性能表现，答案是肯定的，但，因为，我是搞前端的，对算法不是很了解，所以，这个坑留给厉害的人来填补</div>
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
        code: `a
v
`
      }
    }
  },
  computed: {
    carbonlink: function () {
      return `https://carbon.now.sh/?bg=rgba(255%2C255%2C255%2C1)&t=3024-night&wt=none&l=javascript&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=48px&ph=32px&ln=false&fm=Hack&fs=14px&lh=133%25&si=false&code=${encodeURIComponent(this.code.code)}&wm=false`
    }
  },
  mounted() {
    Prism.highlightAll()
  }
}
</script>

<style lang="scss" scoped>
.code-box {
  max-width: 800px;
}
.code-body {
  padding: 0;
  pre {
    margin: 0;
    border-radius: 0;
  }
}
</style>
