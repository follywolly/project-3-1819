<template>
  <div class="jf-detail">
    <div class="jf-content__header">
      <b-container class="jf-content__inner-container" fluid>
        <b-row>
          <b-col class="jf-content__header-holder">
            <div>
              <div v-if="log.tags[0] === 'comment'">
                <h3 class="jf-content__subtitle" v-if="log.id">Log #{{ log.id }}</h3>
                <h2 class="jf-content__title jf-content__title--comment">{{log.title}}</h2>
              </div>
              <div v-else>
                <h2 class="jf-content__title" v-if="log.id">Run #{{log.id}}</h2>
              </div>
              <div v-if="log.author && log.time && log.date">
                <span class="jf-content__metadata--secondary">written by </span><span class="jf-content__metadata--primary">{{log.author}}</span><span class="jf-content__metadata--secondary"> - at </span><span class="jf-content__metadata--primary">{{log.time}}</span><span class="jf-content__metadata--secondary"> on </span><span class="jf-content__metadata--primary">{{log.date}}</span>
              </div>
              <div v-if="!log.author && log.time && log.date">
                <span class="jf-content__metadata--secondary">at </span><span class="jf-content__metadata--primary">{{log.time}}</span><span class="jf-content__metadata--secondary"> on </span><span class="jf-content__metadata--primary">{{log.date}}</span>
              </div>
              <div class="jf-content__tag-holder">
                <Tag v-for="(tag, index) in log.tags" :key="`tag-${index}`" :title="tag" :class="tag" />
              </div>
            </div>
            <div>
              <b-button class="jf-add-log__button jf-btn" variant="primary" v-b-modal="'jf-add-log'">{{log.tags[0] === 'comment' ? 'Add comment' : 'Add log'}}</b-button>
              <AddLog modal="jf-add-log"></AddLog>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="jf-content__body">
      <b-container class="jf-content__inner-container" fluid>
        <b-row>
          <b-col>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
import Tag from '../atoms/Tag.vue'
import AddLog from '../molecules/AddLog.vue'
export default {
  components: {
    Tag,
    AddLog
  },
  computed: {
    log() {
      return this.$store.getters.logs(this.$route.params.id)
    }
  }
}

</script>
