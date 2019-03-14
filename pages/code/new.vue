<template>
  <section class="container code-new-box">
    <div class="card">
      <div class="card-header d-flex">
        <div class=" flex-grow-1">
          <div class="btn-group" role="group">
            <button v-for="language in languages" :key="language" @click="code.language = language" type="button" :class="'btn btn-sm ' + (code.language === language ? 'btn-secondary' : 'btn-outline-secondary')">
            {{ language }}
            </button>
          </div>
        </div>
        <div>
          <button class="btn btn-sm btn-primary">
            <icon name="send" size="15" /> 提 交
          </button>
        </div>
      </div>
      <div class="card-body editor-box">
        <editor flag="text" v-model="code.code" :options="codeEditorOptions" :mode="codemode" />
      </div>
      <div class="card-body">
        <editor flag="desc" v-model="code.remark" placeholder="如果有对上面代码的额外解释，请写在这里...." />
      </div>

      <div class="card-footer">
        <input type="text" class="form-control" placeholder="给你的代码取个标题吧"/>
      </div>
    </div>
  </section>
</template>

<script>
import Editor from '@/components/editor'
export default {
  data() {
    return {
      icon: '<hr/>',
      codeEditorOptions: {
        lineNumbers: true,
        theme: 'paraiso-dark'
      },
      languages: ['JavaScript', 'CSS', 'HTML'],
      code: {
        title: '',
        remark: '',
        language: 'JavaScript',
        code: `







`
      }
    }
  },
  computed: {
    codemode: function () {
      const lang = this.code.language.toLowerCase()
      return lang === 'html' ? 'htmlmixed' : lang
    }
  },
  components: {
    Editor
  }
}
</script>

<style lang="scss">
.code-new-box {
  max-width: 800px;
  .editor-box {
    padding: 0;
    border-bottom: #DDD 1px solid;
  }
  .meditor {
    border: 0;
    .con {
      padding: 0;
    }
  }
}
</style>
