<template>
<div class="icon">
  <span v-html="icon"></span>
  <span style="margin-left: 2px;">
    <slot />
  </span>
</div>
</template>

<script>
const feather = require('feather-icons')
export default {
  props: ['name', 'size'],
  data() {
    return {
      icon: feather.icons[this.name].toSvg({
        width: (this.size || 20) + 'px',
        height: (this.size || 20) + 'px'
      })
    }
  }
}
</script>

<style lang="scss">
.icon {
  display: inline-flex;
  align-items: center;
  span {
    display: inline-flex;
  }
}
</style>
