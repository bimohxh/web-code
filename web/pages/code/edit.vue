<template>
  <section class="container code-new-box">
    <v-alert :option="alertOption" />
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">
          <div v-if="code.id" class="d-flex align-items-center">
            <router-link :to="'/code/' + code.id" class="btn btn-sm btn-outline-secondary d-inline-flex mr-2">
              <icon name="chevron-left" size="15">返回</icon>
            </router-link>
            <span>更新代码段</span>
          </div>
          <span v-else>发布代码段</span>
        </h5>
      </div>
      <div class="card-body alert alert-danger mb-0" v-if="!$store.state.session">
        你尚未登录，请先登录后再操作！
      </div>
      <div class="card-body d-flex align-items-center">
        <div class=" flex-grow-1">
          <input type="text" class="form-control" placeholder="必须给标题，说明代码用途" v-model="code.title" style="width: 300px;" />
        </div>
        <div class="flex-grow-1">
          <vue-switch v-model="code.is_public" true="y" false="n">{{ code.is_public === 'y' ? '公开代码' : '私有代码' }}</vue-switch>
        </div>
        <div>
          <button class="btn btn-sm btn-primary" @click="submit" :disabled="!cansub">
            <icon name="send" size="15">{{ code.id ? '更 新' : '发 布' }}</icon>
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
            <b-dropdown :text="file.language" variant="outline-secondary" size="sm" dropright>
              <template  v-for="(group, index) in languages">
                <b-dropdown-item v-for="language in group" :key="language" @click="file.language = language">{{ language }}</b-dropdown-item>
                <b-dropdown-divider :key="index" v-if="index !== languages.length - 1" />
              </template>
            </b-dropdown>
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
  props: ['code'],
  data() {
    return {
      icon: '<hr/>',
      checked: true,
      codeEditorOptions: {
        lineNumbers: true,
        theme: 'paraiso-dark'
      },
      languages: [['JavaScript', 'CSS', 'HTML', 'Sass'], ['Dockerfile', 'Shell']],
      tags: ['算法', '正则', '小程序', '微信开发', '语义化', 'Vue.js', 'React', 'PWA', '部署', 'Node.js'],
      submitStatus: 'ready',
      alertOption: {
        show: false,
        type: 'warning',
        msg: 'ok'
      }
    }
  },
  computed: {
    cansub: function () {
      return this.code.title && this.code.title.trim() !== '' && this.$store.state.session
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
    submit: function () {
      this.submitStatus = 'success'
      this.code.id ? this.update() : this.save()
    },
    save: async function () {
      const res = await this.$axios().post('code', this.code)
      if (res.data.status === 200) {
        this.$router.push('/code/newok')
      }
    },
    update: async function () {
      const res = await this.$axios().put('code', this.code)
      if (res.data.status === 200) {
        // this.$router.push('/code/newok')
        this.alertOption = {
          show: true,
          type: 'success',
          msg: '更新代码段成功！你可以继续更新或返回'
        }
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
  .alert {
    border-radius: 0;
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
