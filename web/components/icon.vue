<template>
<span v-html="icon"></span>
</template>

<script>
const feather = require('feather-icons')
export default {
  props: ['name', 'size'],
  data() {
    return {
      icon: feather.icons[this.name].toSvg({
        width: this.size + 'px',
        height: this.size + 'px'
      })
    }
  }
}
</script>
