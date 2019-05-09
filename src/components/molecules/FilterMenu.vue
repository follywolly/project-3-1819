<template>
  <b-modal
    :id="modal"
    class="jf-filter-menu"
    ok-title="Save"
    title="Add filters"
    ref="filtermodal"
    size="sm"
    >
    <b-form @submit.prevent>
      <b-form-group
        id="jf-filter-menu__fieldset-1"
        label="Filter by type"
        label-for="jf-filter-menu__type"
      >
        <b-form-checkbox-group @input="emitFilters"
        id="jf-filter-menu__type"
        v-model="filter.type"
        :options="types"
        ></b-form-checkbox-group>
      </b-form-group>

      <b-form-group
        id="jf-filter-menu__fieldset-2"
        label="Filter by entity"
        label-for="jf-filter-menu__entity"
      >
        <b-form-checkbox-group @input="emitFilters"
        id="jf-filter-menu__entity"
        v-model="filter.entity"
        :options="entities"
        ></b-form-checkbox-group>
      </b-form-group>
    </b-form>
  </b-modal>
</template>
<script>
export default {
  name: 'filtermenu',
  props: ['modal'],
  data() {
    return {
      template: {
        type: [],
        entity: []
      },
      filter: {
        type: [],
        entity: []
      },
      types: ['comment', 'run'],
      entities: ['human', 'process'],
      active: {}
    }
  },
  methods: {
    emitFilters() {
      const filters = {type: this.filter.type, entity: this.filter.entity}
      this.active = filters
      this.$emit('filters_changed', filters)
    },
    removeFilter(valueToRemove) {
      const filters = Object.entries(this.filter)

      // returns array containing the property name and current value of filter to be updated
      const filterToUpdate = filters.find(sub => sub[1].indexOf(valueToRemove) > -1)
      const propertyToUpdate = filterToUpdate[0]
      const removeIndex = filterToUpdate[1].indexOf(valueToRemove)
      this.filter[filterToUpdate[0]].splice(removeIndex, 1)
      this.$emit('filters_changed', this.filter)
    },
    resetFilters() {
      this.filter = {type: [], entity: []}
      this.$emit('filters_changed', this.filter)
    }
  }
}
</script>
