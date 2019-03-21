<template>
  <section class="container code-new-box">
    <div class="card">
      <div class="card-header d-flex">
        <div class=" flex-grow-1">
          <input type="text" class="form-control" placeholder="必须给标题，说明代码用途" v-model="code.title" style="width: 300px;" />
        </div>
        <div >
          <button class="btn btn-sm btn-primary" @click="save" :disabled="!cansub">
            <icon name="send" size="15">发 布</icon>
          </button>
        </div>
      </div>
      <div class="card-body alert alert-warning mb-0">
        <icon name="alert-triangle" size="18" > 发布须知：请勿发布垃圾和违反法律的代码，否则将会失去发布的权限！</icon>
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
    <div class="card mt-2">
      <div class="card-body">
        <div class="form-group">
          <label>标签（以英文 , 分隔）</label>
          <input type="text" class="form-control" v-model="code.tags" />
          <div class="mt-2 tag-box">
            <a v-for="tag in tags" :key="tag"  @click="addTag(tag)" href="javascript: void(0)" class="tag mr-2">{{ tag }}</a>
          </div>
        </div>
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
      languages: ['JavaScript', 'CSS', 'HTML', 'Dockerfile', 'Shell', 'Sass'],
      code: {
        title: '',
        tags: '',
        files: [
          {
            language: 'JavaScript',
            content: defaultCode
          }
        ],
        remark: ''
      },
      tags: ['算法', '正则', '小程序', '微信开发', '语义化', 'Vue.js', 'React', 'PWA', '部署', 'Node.js']
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
    addTag: function (tag) {
      const _tags = (this.code.tags || '').split(',').map((item) => {
        item = item.trim()
        return item
      }).filter(item => item !== '')
      if (_tags.indexOf(tag) < 0) {
        _tags.push(tag)
      }
      this.code.tags = _tags.join(',')
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
      const res = await this.$axios().post('code', this.code)
      if (res.data.status === 200) {
        this.$router.push('/code/newok')
      }
    }
  },
  components: {
    Editor
  }
}
</script>

<style lang="scss" scoped>
.code-new-box {
  max-width: 800px;
  .editor-box {
    padding: 15px 0;
    background-color: #2f1e2e;
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

  .tag-box {
    a {
      text-decoration: none;
    }
  }
}
</style>
