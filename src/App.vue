<template>
  <div id="app" :class="dark_mode ? 'dark' : ''">
    <Sidebar id="sidebar"/>
    <main id="main" class="jf-content" >
      <router-view></router-view>
    </main>
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
