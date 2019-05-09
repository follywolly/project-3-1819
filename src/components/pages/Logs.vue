<template>
  <b-container class="jf-content__inner-container" fluid>
    <b-row>
      <b-col>
        <div class="jf-content__page-header">
          <div class="jf-content__title-holder">
            <h2 class="jf-content__title">Logs</h2>
            <h3 class="jf-content__subtitle">- {{cards.length}} logs</h3>
          </div>
          <b-button class="jf-add-log__button jf-btn" variant="primary" v-b-modal="'jf-add-log'">Add log</b-button>
          <AddLog modal="jf-add-log"></AddLog>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Search v-on:changed="searchList" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <ListFilter v-on:sort_changed="sortList" v-on:filters_changed="filterList" />
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="cards.length > 0">
        <transition-group name="flip-list" class="list-unstyled" tag="ul">
          <LogCard
          v-for="(card,index) in cards"
          :key="`card-${card.id}`"
          :title="card.title"
          :id="card.id"
          :time="card.time"
          :date="card.date"
          :author="card.author"
          :tags="card.tags"
          />
        </transition-group>
      </b-col>
      <b-col v-else>
        <b-card class="jf-card">
          No matches found!
        </b-card>
      </b-col>
    </b-row>

  </b-container>
</template>
<script>
import LogCard from '../molecules/LogCard.vue'
import Search from '../organisms/Search.vue'
import ListFilter from '../organisms/Filter.vue'
import AddLog from '../molecules/AddLog.vue'
export default {
  name: 'logs',
  components: {
    LogCard,
    Search,
    ListFilter,
    AddLog
  },
  data() {
    return {
      search: '',
      sort: 'latest',
      filters: {type: [], entity: []}
    }
  },
  computed: {
    cards() {
      const data = this.$store.getters.logs()

      // no searchwords = no filtered list
      if (this.search.trim() === '') {
        return data
          .filter(this.filterer)
          .sort(this.sorter)
      }

      // consider comma seperated values as different searchwords. Empty strings are not counted
      const searchwords = this.search.split(',').filter(word => word.trim() !== '')

      return data
        .filter(obj => {
          const matches = searchwords.filter(word => {
            const title = this.check(obj.title, word)
            const author = this.check(obj.author, word)
            const id = this.check(obj.id, word)

            // if any of the string values in a log match the searchword, return true
            return title || author || id
          })

          // the more search words you have, the more matching string values a log needs to have to show up
          return searchwords.length === matches.length
        })
        .filter(this.filterer)
        .sort(this.sorter)
    }
  },
  methods: {
    filterer(obj) {
      const filters = Object.values(this.filters)
      const type = filters[0]
      const entity = filters[1]

      const typeInFilters = (type.length === 0 || type.includes(obj.tags[0]))
      const entityInFilters = (entity.length === 0 || entity.includes(obj.tags[1]))
      return typeInFilters && entityInFilters
    },
    sorter(a, b) {
      if (this.sort === 'latest' || this.sort === 'oldest') {

        // format date & time of objects to a timestamp
        let dateA = a.date.split('/').concat(a.time.split(':'))
        let dateB = b.date.split('/').concat(a.time.split(':'))
        dateA = new Date(dateA[2], dateA[1], dateA[0], dateA[3], dateA[4]).getTime()
        dateB = new Date(dateB[2], dateB[1], dateB[0], dateB[3], dateB[4]).getTime()

        if (this.sort === 'latest') {
          // if timestamp is the same, order from highest id to lowest
          if (dateA === dateB) {
            return b.id - a.id
          }

          return dateB - dateA
        }
        if (this.sort === 'oldest') {
          // if timestamp is the same, order from lowest id to highest
          if (dateA === dateB) {
            return a.id - b.id
          }

          return dateA - dateB
        }
      }
      // lowest id first
      if (this.sort === 'ascending') return a.id - b.id

      // highest id first
      if (this.sort === 'descending') return b.id - a.id

      // if title is empty, it goes last. otherwise, sort alphabetical
      if (this.sort === 'alphabetical') {
        if (a.title === '') return 1
        if (b.title === '') return -1
        if(a.title < b.title) return -1
        if(a.title > b.title) return 1
        return 0
      }
    },
    check(val, searchword) {
      if (!val) {
        return false
      }
      let string
      if (typeof val !== 'string') {
        string = String(val)
      } else {
        string = val
      }
      string = string.toLowerCase()

      // if any string value of a log matches any of the search words, return true
      return string.includes(searchword.trim().toLowerCase())
    },
    searchList(val) {
      this.search = val
    },
    sortList(val) {
      this.sort = val
    },
    filterList(filters) {
      this.filters = filters
    }
  }
}

</script>
