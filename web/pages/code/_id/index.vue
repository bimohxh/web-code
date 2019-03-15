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
          <a :href="carbonlink" target="_blank" title="收藏">
            <icon name="star" size="20" />
          </a>
          <a :href="carbonlink" target="_blank" title="有用">
            <icon name="thumbs-up" size="20" />
          </a>
        </div>
      </div>
    </div>
    <div class="card mt-2" v-for="(file, index) in code.files" :key="file.id" >
      <div class="card-header d-flex">
        <div class="flex-grow-1">
          {{ file.name }}
        </div>
        <div>
          <a :href="carbonlink" target="_blank" title="导出图片">
            <icon name="image" size="20" />
          </a>
        </div>
      </div>
      <div class="card-body code-body">
        <editor :flag="'code-view-' + index" v-model="file.content" :options="codeEditorOptions" :mode="codemode(file.language)" />
      </div>
    </div>

    <div class="card mt-4 mb-4">
      <div class="card-body">{{ code.remark }}</div>
    </div>
    <div class="card mt-4 mb-4">
      <div class="card-body">{{ code.remark }}</div>
    </div>

    <comment totype="code" :toid="code.id" />
  </section>
</template>

<script>
import Prism from 'prismjs'
import Editor from '@/components/editor'
import Comment from '@/components/comment'
export default {
  async asyncData(context) {
    const res = await context.app.$axios().get('code/' + context.params.id)
    return {
      code: res.data.data
    }
  },
  data() {
    return {
      codeEditorOptions: {
        lineNumbers: true,
        theme: 'paraiso-dark'
      }
    }
  },
  components: {
    Editor,
    Comment
  },
  computed: {
    carbonlink: function () {
      return `https://carbon.now.sh/?bg=rgba(255%2C255%2C255%2C1)&t=3024-night&wt=none&l=javascript&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=48px&ph=32px&ln=false&fm=Hack&fs=14px&lh=133%25&si=false&code=${encodeURIComponent(this.code.code)}&wm=false`
    }
  },
  methods: {
    codemode: function (language) {
      const lang = language.toLowerCase()
      return lang === 'html' ? 'htmlmixed' : lang
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
.code-body {
  padding: 0;
  .meditor {
    border: 0;
    .con {
      padding: 0;
    }
  }
}
</style>
