<template>
  <b-container>
    <b-row>
      <b-col>
        <div class="jf-content__title-holder">
          <h2 class="jf-content__title">Logs</h2>
          <h3 class="jf-content__subtitle">- {{cards.length}} logs</h3>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Search v-on:changed="logValue" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <ListFilter v-on:sort_changed="sortValue" />
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
        No matches found!
      </b-col>
    </b-row>

  </b-container>
</template>
<script>
import LogCard from '../molecules/LogCard.vue'
import Search from '../molecules/Search.vue'
import ListFilter from '../molecules/Filter.vue'
export default {
  name: 'logs',
  components: {
    LogCard,
    Search,
    ListFilter
  },
  data() {
    return {
      data: [
        {
          title: 'Some log title',
          id: '122',
          time: '10:00 AM',
          date: '30/07/2019',
          author: 'Folkert-Jan van der Pol',
          tags: ['comment', 'human']
        },
        {
          title: 'Another log title this time a bit longer',
          id: '154',
          time: '10:00 AM',
          date: '31/07/2019',
          author: '',
          tags: ['run', 'process']
        },
        {
          title: 'Log title',
          id: '102',
          time: '10:00 AM',
          date: '29/06/2019',
          author: 'Dennis Wegereef',
          tags: ['comment', 'human']
        },
        {
          title: 'Random log title',
          id: '98',
          time: '10:00 AM',
          date: '17/06/2019',
          author: '',
          tags: ['run', 'process']
        },
        {
          title: 'Hey look it\'s another log title',
          id: '36',
          time: '10:00 AM',
          date: '12/06/2019',
          author: 'Folkert-Jan van der Pol',
          tags: ['comment', 'human']
        }
      ],
      search: '',
      sort: 'latest'
    }
  },
  computed: {
    cards() {
      const data = this.data
      if (this.search === '') {

        return data
          .sort(this.sorter)
      }

      return data
        .filter(obj => {
          return this.check(obj.title) || this.check(obj.author) || this.check(obj.id)
        })
        .sort(this.sorter)
    }
  },
  methods: {
    sorter(a, b) {
      if (this.sort === 'latest' || this.sort === 'oldest') {
        let dateA = a.date.split('/')
        let dateB = b.date.split('/')
        dateA = new Date(dateA[2], dateA[1], dateA[0])
        dateB = new Date(dateB[2], dateB[1], dateB[0])
        if (this.sort === 'latest') {
          return dateB - dateA
        }
        if (this.sort === 'oldest') {
          return dateA - dateB
        }
      }
      if (this.sort === 'ascending') return a.id - b.id
      if (this.sort === 'descending') return b.id - a.id

      if (this.sort === 'alphabetical') {
        if(a.title < b.title) return -1
        if(a.title > b.title) return 1
        return 0
      }
    },
    check(val) {
      if (!val) {
        return true
      }
      let string
      if (typeof val !== 'string') {
        string = String(val)
      } else {
        string = val
      }
      string = string.toLowerCase()
      return string.includes(this.search.toLowerCase())
    },
    logValue(val) {
      this.search = val
    },
    sortValue(val) {
      this.sort = val
    }
  }
}

</script>
