<template>
<paginate
  :page-count="pageCount"
  v-model="page"
  :click-handler="callback"
  :prev-text="'«'"
  :next-text="'»'"
  :container-class="'pagination'"
  :page-class="'page-item'"
  page-link-class="page-link"
  prev-class="page-item"
  prev-link-class="page-link"
  next-class="page-item"
  next-link-class="page-link"
  >
</paginate>
</template>

<script>
import Paginate from 'vuejs-paginate/src/components/Paginate.vue'
export default {
  props: ['callback', 'pageCount', 'page'],
  components: {
    Paginate
  }
}
</script>
