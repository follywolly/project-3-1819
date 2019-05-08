<template>
  <div class="jf-detail">
    <div class="jf-content__header">
      <b-container class="jf-content__inner-container" fluid>
        <b-row>
          <b-col>
            <div v-if="log.title">
              <h3 class="jf-content__subtitle">Log #{{ log.id }}</h3>
              <h2 class="jf-content__title">{{log.title}}</h2>
            </div>
            <div v-else>
              <h2 class="jf-content__title">Run #{{log.id}}</h2>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="jf-content__body">
      <b-container class="jf-content__inner-container" fluid>
        <b-row>
          <b-col>
            <b-button>Some button</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    log() {
      return this.$store.getters.logs(this.$route.params.id)
    }
  }
}

</script>
