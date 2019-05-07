<template>
  <div class="jf-filter">
    <form @submit.prevent class="jf-filter__form">
      <div class="jf-filter__sort-group">
        sort by
        <b-dropdown :text="sort_value" size="sm" class="m-2 jf-filter__sort-btn">
          <b-dropdown-item @click="sort_value = 'latest'" :active="sort_value === 'latest' ? true : false">latest</b-dropdown-item>
          <b-dropdown-item @click="sort_value = 'oldest'" :active="sort_value === 'oldest' ? true : false">oldest</b-dropdown-item>
          <b-dropdown-item @click="sort_value = 'ascending'" :active="sort_value === 'ascending' ? true : false">id ascending</b-dropdown-item>
          <b-dropdown-item @click="sort_value = 'descending'" :active="sort_value === 'descending' ? true : false">id descending</b-dropdown-item>
          <b-dropdown-item @click="sort_value = 'alphabetical'" :active="sort_value === 'alphabetical' ? true : false">title by alphabet</b-dropdown-item>
        </b-dropdown>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sort_value: 'latest'
    }
  },
  computed: {
    id() {
      return this._uid
    }
  },
  watch: {
    sort_value() {
      this.$emit('sort_changed', this.sort_value)
    }
  }
}
</script>
