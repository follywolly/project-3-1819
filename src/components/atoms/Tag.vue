<template>
  <b-badge class="jf-tag" :variant="variant">
    {{title}}
  </b-badge>

</template>
<script>
export default {
  props: ['title'],
  computed: {
    variant() {
      let result
      if (this.title === 'human') {
        result = 'success'
      }
      if (this.title === 'run') {
        result = 'warning'
      }
      if (this.title === 'comment' || this.title === 'process'){
        result = 'primary'
      }
      return result
    }
  }
}
</script>
