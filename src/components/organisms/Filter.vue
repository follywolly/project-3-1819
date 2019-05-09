<template>
  <div class="jf-filter">
    <div class="jf-filter__form">
      <div class="jf-filter__sort-group">
        <span class="jf-filter__description">sort by</span>
        <b-dropdown :text="sort_value" size="sm" class="m-1 jf-filter__sort-btn">
          <b-dropdown-item @click="sort_value = 'latest'" :active="sort_value === 'latest' ? true : false">latest</b-dropdown-item>
          <b-dropdown-item @click="sort_value = 'oldest'" :active="sort_value === 'oldest' ? true : false">oldest</b-dropdown-item>
          <b-dropdown-item @click="sort_value = 'ascending'" :active="sort_value === 'ascending' ? true : false">id ascending</b-dropdown-item>
          <b-dropdown-item @click="sort_value = 'descending'" :active="sort_value === 'descending' ? true : false">id descending</b-dropdown-item>
          <b-dropdown-item @click="sort_value = 'alphabetical'" :active="sort_value === 'alphabetical' ? true : false">title by alphabet</b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="jf-filter__filter-group">
        <span class="jf-filter__description">filters</span>
        <ul class="jf-filter__filter-list">
          <li v-for="filter of filters" :key="filter"><b-badge class="jf-filter__filter-badge">{{filter}}<b-button variant="danger" @click="removeFilter" :data-filter="filter"><font-awesome-icon :icon="['fas', 'trash']" /></b-button></b-badge></li>
        </ul>
        <b-button class="jf-filter__filter-btn jf-btn--plain" variant="primary" v-b-modal="'jf-filter__filter'"><font-awesome-icon :icon="['fas', 'plus-circle']" /></b-button>
        <button class="jf-filter__reset-filters-btn jf-btn--plain" @click="resetFilters">reset all filters</button>
        <FilterMenu ref="filter_menu" v-on:filters_changed="updateFilters" modal="jf-filter__filter" />

      </div>
    </div>
  </div>
</template>
<script>
import FilterMenu from '../molecules/FilterMenu.vue'
export default {
  components: {
    FilterMenu
  },
  data() {
    return {
      sort_value: 'latest',
      filters: []
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
  },
  methods: {
    updateFilters(filters) {
      if (!filters) {
        return
      }
      this.filters = Object.values(filters).flat()
      this.$emit('filters_changed', filters)
    },
    removeFilter(e) {
      const filter = e.target.dataset.filter
      this.$refs.filter_menu.removeFilter(filter)
    },
    resetFilters() {
      this.$refs.filter_menu.resetFilters()
    }
  }
}
</script>
