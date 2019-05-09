<template>
  <div class="jf-search">
    <form @submit.prevent class="jf-search__form">
      <input @input="emitValue" v-model="value" type="text" :id="`jf-search__input-${id}`" class="jf-search__input" :class="this.value ? 'has-value' : ''" value="">
      <label class="jf-search__label" :for="`jf-search__input-${id}`">
        Search
      </label>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  computed: {
    id() {
      return this._uid
    }
  },
  methods: {
    emitValue() {
      this.$emit('changed', this.value)
    }
  }
}


</script>
