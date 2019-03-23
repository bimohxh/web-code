<template>
<paginate
  :page-count="20"
  :click-handler="callback"
  :prev-text="'Prev'"
  :next-text="'Next'"
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
  props: ['callback'],
  components: {
    Paginate
  }
}
</script>
