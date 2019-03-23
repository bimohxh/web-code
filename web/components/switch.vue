<template>
<b-form-checkbox switch v-model="sval" name="check-button">
<slot />
</b-form-checkbox>
</template>

<script>
export default {
  props: ['value', 'true', 'false'],
  data() {
    return {
      sval: this.value === this.true
    }
  },
  watch: {
    sval: function () {
      this.$emit('input', this.sval ? this.true : this.false)
    }
  }
}
</script>
