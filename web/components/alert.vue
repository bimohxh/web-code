<template>
  <div :class="'alert alert-' + option.type " v-show="option.show">
    <span v-html="option.msg"></span>
    <span class="close" data-dismiss="alert" aria-label="Close" @click="option.show = false">
      <span aria-hidden="true">&times;</span>
    </span>
  </div>
</template>

<script>
export default {
  props: ['option'],
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.alert {
  .close {
    cursor: pointer;
  }
}
</style>
