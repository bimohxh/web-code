import { format } from 'timeago.js'

export default ({ app, req }, inject) => {
  inject('timeago', (date) => {
    return format(date, 'zh_CN')
  })
}
