<template>
  <div class="meditor" :style="hideBorder ? 'border: 0' : ''">
    <div class="con" v-show="view == 'editor'">
      <textarea :id="'meditor-' + flag" :placeholder="placeholder" style="display: none"/>
    </div>
  </div>
</template>

<script>
require('codemirror/lib/codemirror.css')
require('codemirror/theme/paraiso-dark.css')
export default {
  props: ['flag', 'value', 'setval', 'hideTool', 'hideFooter', 'hideBorder', 'placeholder', 'options', 'mode'],
  data() {
    return {
      htmlstr: '',
      view: 'editor',
      markdownEditor: null
    }
  },
  watch: {
    'setval': function (val) {
      this.markdownEditor.setValue(val.val)
    },
    'mode': function (val) {
      window.console.log('===', val)
      this.markdownEditor.setOption('mode', val)
    }
  },
  methods: {
    preview: function () {
      if (this.view === 'editor') {
        this.htmlstr = this.markdownEditor.getValue()
        this.view = 'preview'
      } else {
        this.view = 'editor'
      }
    }
  },
  mounted() {
    if (process.browser) {
      const CodeMirror = require('codemirror')
      require('codemirror/mode/markdown/markdown.js')
      require('codemirror/mode/javascript/javascript.js')
      require('codemirror/mode/css/css.js')
      require('codemirror/mode/htmlmixed/htmlmixed.js')
      require('codemirror/addon/display/placeholder.js')
      const self = this
      const options = {
        mode: this.mode || 'markdown',
        theme: 'default',
        tabSize: 2,
        cursorHeight: 0.85,
        lineWrapping: true,
        viewportMargin: Infinity,
        extraKeys: { 'Enter': 'newlineAndIndentContinueMarkdownList' }
      }
      this.options = this.options || {}
      Object.keys(this.options).forEach((key) => {
        options[key] = this.options[key]
      })
      this.markdownEditor = CodeMirror.fromTextArea(document.getElementById('meditor-' + this.flag), options)
      this.markdownEditor.on('focus', function () {
      })

      this.markdownEditor.on('change', function (editor) {
        self.$emit('input', editor.getValue())
      })
    }
    this.markdownEditor.setValue(this.value)

    // if (this.setval) {
    //   markdown_editor.setValue(this.setval.val)
    // }
  }
}
</script>

<style lang="scss">
  .meditor {
    border: #DDD 1px solid;
    border-radius: 2px;
  }
  .toolbar {
    padding: 10px;
    border-bottom: #EEE 1px solid;

    a {
      padding: 0 10px;

      &:link, &:visited {
        color: #969595
      }

      &:hover, &:active {
        color: #333
      }

      &.active-true {
        color: #da552f
      }
    }
  }

  .right {
    float: right
  }

  .con {
    padding: 8px;
  }

  .preview {
    padding: 20px 30px;
    font-size: 15px;
    line-height: 27px;
  }

  .footbar {
    padding: 10px;
    border-top: #EEE 1px solid;
    overflow: hidden;
    position: relative;

    .info {
      color: #DDD
    }
  }
  .CodeMirror, .CodeMirror pre {
    font-family: "Roboto Mono", '微软雅黑' , Monaco, courier, monospace;
  }
  .CodeMirror-linenumber {
    color: #b2b2b2;
  }
  .CodeMirror {
    height: auto;
  }
  .CodeMirror-empty {
    color: #AAA;
  }
  .cm-s-paraiso-dark span.cm-comment {
    color: #888c8d;
  }
  .cm-s-paraiso-dark div.CodeMirror-selected {
    background: #871514;
  }
</style>
