<template>
<edit-code :code="code" />
</template>

<script>
import EditCode from '../edit'

export default {
  async asyncData({ app, params }) {
    const res = await app.$axios().get('code/' + params.id)
    return {
      code: res.data.data
    }
  },
  components: {
    EditCode
  }
}
</script>
