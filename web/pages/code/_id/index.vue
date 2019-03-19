<template>
  <div class="container">
    <div class="row">
      <div :class="showList ? 'col-3' : 'col-0'">
        <left-menu :codes="codes" v-show="showList" />
      </div>
      <div :class="showList ? 'col-9' : 'col-12'">
        <section class="code-box">
          <div class="card mb-2">
            <div class="card-header d-flex code-top">
              <div class="flex-grow-1 d-flex align-items-center">
                <a class="toggle-btn mr-2 d-inline-flex" href="javascript: void(0)" @click="showList = !showList">
                  <icon name="menu" />
                </a>
                <!--<div class="mem-box mr-2">
                  <img class="avatar" src="https://myawesome.oss-cn-hongkong.aliyuncs.com//mem/1500258094011-442-2419.png?x-oss-process=style/repo-50" />
                </div>-->
                <div>{{ code.title }}</div>
              </div>
              <div class="d-flex align-items-center">
                <a :href="carbonlink" class="ml-2" target="_blank" title="收藏">
                  <icon name="star" size="18" />
                </a>
              </div>
            </div>
          </div>
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
            <div class="lang-label">{{file.language}}</div>

            <div class="card-footer">
            </div>

          </div>

          <div class="card mt-2">
            <div class="card-header d-flex author-box">
              <div class="mem-box mr-2 flex-grow-1">
                <img class="avatar mr-2" src="https://myawesome.oss-cn-hongkong.aliyuncs.com//mem/1500258094011-442-2419.png?x-oss-process=style/repo-50" />
                <span class="mr-2">笔墨伺候（作者） / </span>
                <span>共发布<strong>10</strong>段代码</span>
              </div>
              <div>
                <a :href="carbonlink" target="_blank" title="有用">
                  <icon name="thumbs-up" size="16">4人觉得有用</icon>
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
import LeftMenu from './_menu'

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
    Comment,
    LeftMenu
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

<style lang="scss" scoped>
.code-box {
  max-width: 800px;
  margin: 0 auto;
  .code-top {
    padding: 0.75rem 0.5rem;
    .toggle-btn {
      color: #AAA;
    }
    a {
      color: #34495e;
      text-decoration: none;
    }
  }
  .author-box {
    a {
      color: #827a83;
      text-decoration: none;
    }
  }
  .mem-box {
    display: flex;
    align-items: center;
    .avatar {
      border-radius: 100%;
      width: 30px;
      height: 30px;
    }
  }
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
</style>
