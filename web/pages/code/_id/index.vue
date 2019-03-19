<template>
  <div class="container">
    <div class="row">
      <div :class="showList ? 'col-3' : 'col-0'">
        <div class="card code-list">
          <ul class="list-group list-group-flush"  v-show="showList">
            <div class="list-group-item search-box">
              <input type="text" placeholder="关键字回车搜索..." style="border: none"/>
              <icon name="search" />
            </div>
            <router-link :to="'/code/' + code.id" v-for="code in codes" :key="code.title" class="list-group-item">
              {{ code.title }}
            </router-link>
          </ul>
          <a class="toggle-btn" href="javascript: void(0)" @click="showList = false">
            <icon name="chevron-left" />
          </a>
        </div>
      </div>
      <div :class="showList ? 'col-9' : 'col-12'">
        <section class="code-box">
          <div class="card mb-2 card-code" v-for="(file, index) in code.files" :key="file.id" >
            <div class="card-header d-flex">
              <div class="flex-grow-1">
                <!--{{ file.name }}-->
                <div class="pretty-icon">
                  <div></div><div></div><div></div>
                </div>
              </div>
              <div class="flex-grow-1 text-center">
                index.js
              </div>
              <div class="flex-grow-1 text-right">
                <a :href="carbonlink" target="_blank" title="导出图片">
                  <icon name="clipboard" size="20" />
                </a>
                <a :href="carbonlink" target="_blank" title="导出图片">
                  <icon name="image" size="20" />
                </a>
              </div>
            </div>
            <div class="card-body">
              <editor :flag="'code-view-' + index" v-model="file.content" :options="codeEditorOptions" :mode="codemode(file.language)" />
            </div>

            <div class="card-footer">
            </div>

            <div class="lang-label">{{file.language}}</div>
          </div>

          <div class="card mt-2">
            <div class="card-header d-flex">
              <div class="flex-grow-1">
                {{ code.title }}
              </div>
              <div>
                <a :href="carbonlink" target="_blank" title="收藏">
                  <icon name="star" size="20" />
                </a>
                <a :href="carbonlink" target="_blank" title="有用">
                  <icon name="thumbs-up" size="20" />
                </a>
              </div>
            </div>

            <div class="card-body" v-if="code.remark && code.remark !== ''">{{ code.remark }}</div>
          </div>

          <div class="mt-4">
            <comment totype="code" :toid="code.id" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Prism from 'prismjs'
import Editor from '@/components/editor'
import Comment from '@/components/comment'
export default {
  async asyncData(context) {
    const res = await context.app.$axios().get('code/' + context.params.id)
    const res2 = await context.app.$axios().get('code')
    return {
      codes: res2.data.data.items,
      code: res.data.data
    }
  },
  data() {
    return {
      showList: true,
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
  margin: 0 auto;
}

.card-code {
  position: relative;
  & > div {
    background-color: #27162a;
  }
  .card-header {
    border-bottom: 1px solid #5b4060;
    font-family: "Roboto Mono", '微软雅黑' , Monaco, courier, monospace;
    color: #827a83;
    a {
      color: #827a83;
    }
    .pretty-icon {
      display: flex;
      align-items: center;
      height: 100%;
      div {
        width: 13px;
        height: 13px;
        border-radius: 100%;
        background-color: #FF5F56;
        margin-right: 5px;
        &:nth-child(2) {
          background-color: #FFBD2E;
        }
        &:nth-child(3) {
           background-color: #27C93F;
         }
      }
    }
  }
  .card-body {
    padding: 0;
    padding-top: 15px;
    background-color: #2f1e2e;
    .meditor {
      border: 0;
      .con {
        padding: 0;
      }
    }
  }
  .card-footer {
    background-color: #2f1e2e;
    border-top: 0;
  }
  .lang-label {
    // border: #DDD 1px solid;
    display: inline-block;
    color: #FFF;
    position: absolute;
    right: 10px;
    top: 60px;
    padding: 2px 5px;
    border-radius: 2px;
    opacity: 0.2;
    font-size: 12px;
  }
}

.code-list {
  overflow-y: auto;
  position: fixed;
  min-width: 250px;
  top: 80px;
  bottom: 10px;
  a.list-group-item {
    text-decoration: none;
    color: #34495e;
    &:hover {
      background-color: #f7f8fa;
    }
  }
  .search-box {
    padding: 0;
    position: relative;
    padding-right: 30px;
    input {
      border: none;
      padding: 12px 10px;
      width: 100%;
      outline: none;
      background: none;
      &::placeholder {
        color: #CCC
      }
    }
    .icon {
      position: absolute;
      right: 6px;
      top: 10px;
      color: #DDD;
    }
  }
  .toggle-btn {
    width: 30px;
    height: 60px;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFF;
    box-shadow: 0px 0px 5px #DDD;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    opacity: 0.6
  }
}
</style>
