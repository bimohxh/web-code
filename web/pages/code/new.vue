<template>
<edit-code :code="code" />
</template>

<script>
import EditCode from './edit'
const defaultCode = `







`
export default {
  data() {
    return {
      code: {
        title: '',
        tags: '',
        is_public: 'y',
        files: [
          {
            language: 'JavaScript',
            content: defaultCode
          }
        ],
        remark: ''
      }
    }
  },
  components: {
    EditCode
  }
}
</script>
