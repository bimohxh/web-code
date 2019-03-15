<template>
  <section class="container code-new-box">
    <div class="card">
      <div class="card-header d-flex">
        <div class=" flex-grow-1">
          <input type="text" class="form-control" placeholder="必须给标题，说明代码用途" v-model="code.title" style="width: 300px;" />
        </div>
        <div >
          <button class="btn btn-sm btn-primary" @click="save" :disabled="!cansub">
            <icon name="send" size="15" /> 发 布
          </button>
        </div>
      </div>
    </div>
    <!-- 代码文件 -->
    <div v-for="(file, index) in code.files" :key="file" class="card mt-2">
      <div class="card-header d-flex">
        <div class=" flex-grow-1 d-flex align-items-center">
          <input type="text" class="form-control" placeholder="文件名，可不填" style="width: 200px;" />
          <a v-show="code.files.length > 1" href="javascript: void(0)" @click="deleteFile(file)" class="ml-2 del-file-btn">
            <icon name="trash" size="18" />
          </a>
        </div>
        <div>
          <div class="btn-group" role="group">
            <button v-for="language in languages" :key="language" @click="file.language = language" type="button" :class="'btn btn-sm ' + (file.language === language ? 'btn-secondary' : 'btn-outline-secondary')">
            {{ language }}
            </button>
          </div>
        </div>
      </div>
      <div class="card-body editor-box">
        <editor :flag="'code-' + index" v-model="file.content" :options="codeEditorOptions" :mode="codemode(file.language)" />
      </div>
    </div>
    <div class="card mt-2 add-btn">
      <a @click="addFile" class="card-header text-center" href="javascript: void(0)">
        <icon name="plus" size="20">添加一个文件</icon>
      </a>
    </div>

    <div class="card mt-2">
      <div class="card-body">
        <editor flag="desc" v-model="code.remark" placeholder="如果有对上面代码的额外解释，请写在这里...." />
      </div>
    </div>
  </section>
</template>

<script>
import Editor from '@/components/editor'
const defaultCode = `







`
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
        files: [
          {
            language: 'JavaScript',
            content: defaultCode
          }
        ],
        remark: ''
      }
    }
  },
  computed: {
    cansub: function () {
      return this.code.title && this.code.title.trim() !== ''
    }
  },
  methods: {
    codemode: function (language) {
      const lang = language.toLowerCase()
      return lang === 'html' ? 'htmlmixed' : lang
    },
    addFile: function () {
      this.code.files.push({
        language: 'JavaScript',
        content: defaultCode
      })
    },
    deleteFile: function (file) {
      if (!confirm('确定删除该文件？')) { return }
      this.code.files.splice(this.code.files.indexOf(file), 1)
    },
    save: async function () {
      await this.$axios().post('code', this.code)
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

  .add-btn {
    a {
      color: #AAA;
      text-decoration: none;
    }
  }
  .del-file-btn {
    color: #AAA;
    text-decoration: none;
  }
}
</style>
