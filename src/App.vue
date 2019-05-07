<template>
  <div id="app" :class="dark_mode ? 'dark' : ''">
    <Sidebar id="sidebar"/>
    <b-container fluid class="jf-content">
      <b-row>
        <b-col>
          <router-view id="main"></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from './components/organisms/Sidebar.vue'

export default {
  name: 'app',
  components: {
    Sidebar
  },
  computed: {
    dark_mode() {
      return this.$store.getters.dark_mode
    }
  }
}
</script>
