<template>
  <header class="jf-sidebar" :class="this.closed ? 'closed' : ''">
    <div class="jf-header">
      <div class="jf-header__logo">

      </div>
      <h1 class="jf-header__title">Jiskefet</h1>
      <button class="jf-btn--plain jf-header__toggle" @click="toggleSidebarSize">
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
    <nav class="jf-nav jf-nav__main">
      <ul>
        <li><router-link to="/logs"><font-awesome-icon :icon="['fas', 'book']" />Logs</router-link></li>
        <li><router-link to="/runs"><font-awesome-icon :icon="['fab', 'buffer']" />Runs</router-link></li>
        <li><router-link to="/overview"><font-awesome-icon :icon="['fas', 'eye']" />Subsystems overview</router-link></li>
      </ul>

    </nav>
    <nav class="jf-nav jf-nav__secondary">
      <ul>
        <li v-if="dark_mode"><button class="jf-btn--plain" @click="toggleDarkMode"><font-awesome-icon :icon="['fas', 'sun']" /></button>Light mode</li>
        <li v-else><button class="jf-btn--plain" @click="toggleDarkMode"><font-awesome-icon :icon="['fas', 'moon']" /></button>Dark mode</li>
        <li><font-awesome-icon :icon="['fas', 'user-circle']" />Account</li>
      </ul>
    </nav>
    <div class="jf-footer">
      Jiskefet v0.1.0
    </div>
  </header>
</template>
<script>
export default {
  name: 'sidebar',
  data() {
    return {
      closed: false,
    }
  },
  computed: {
    dark_mode() {
      return this.$store.getters.dark_mode
    }
  },
  methods: {
    toggleSidebarSize() {
      this.closed = !this.closed
    },
    toggleDarkMode() {
      const mode = this.$store.getters.dark_mode
      this.$store.commit('dark_mode', !mode)
    }
  }
}

</script>
