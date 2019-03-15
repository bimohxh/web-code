import Vue from 'vue'
import { format } from 'timeago.js'
const marked = require('marked')
const Prism = require('prismjs')
const renderer = new marked.Renderer()

renderer.code = (code, language) => {
  return '<pre class="language-' + language + '"><code class="hljs language-' + language + '">' +
    Prism.highlight(code, Prism.languages[language] || Prism.languages.javascript) +
    '</code></pre>'
}
renderer.image = (href, title, text) => {
  return '<img src=' + href + ' data-action="zoom"/>'
}

// markdown 解析
Vue.prototype.$marked = function (con) {
  if (!con || con.trim() === '') {
    return con
  }
  return marked(con, { renderer: renderer })
}

// 时间本地化
Vue.prototype.$timeago = function (datetime) {
  return format(datetime, 'zh_CN')
}
