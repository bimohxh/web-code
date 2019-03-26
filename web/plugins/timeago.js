import { format } from 'timeago.js'

export default ({ app, req }, inject) => {
  inject('timeago', (date) => {
    reutrn format(date, 'zh_CN')
  })
}
