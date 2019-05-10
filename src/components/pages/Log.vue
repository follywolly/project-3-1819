<template>
  <div class="jf-detail">
    <div class="jf-content__header">
      <b-container class="jf-content__inner-container" fluid>
        <b-row>
          <b-col class="jf-content__header-holder">
            <div>
              <div v-if="log.title">
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
              <b-button class="jf-add-log__button jf-btn" variant="primary" v-b-modal="'jf-add-log'" v-if="log.tags">{{log.tags[0] === 'comment' ? 'Add comment' : 'Add log'}}</b-button>
              <AddLog modal="jf-add-log"></AddLog>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="jf-content__body">
      <b-container class="jf-content__inner-container" fluid>
        <b-row>
          <b-col class="col-7" v-if="log.description">
            <h3>Description</h3>
            <div class="jf-content__log-description">
              {{ log.description }}
            </div>
          </b-col>
          <b-col v-if="log.files && log.files.length > 0" class="col-5">
            <h3>Files</h3>
            <ul class="jf-content__log-files list-unstyled">
              <li v-for="file in log.files" :key="`file-${file.name}`" class="jf-content__log-file"><span class="jf-content__log-file__type">{{file.type}}</span><span class="jf-content__log-file__name">{{file.name}}</span><span class="jf-content__log-file__size">{{ filesize(file) }}</span></li>
            </ul>
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
  },
  methods: {
    filesize(file) {
      return Math.abs(file.size) >= 1.0e+9

       ? Math.round(Math.abs(file.size) / 1.0e+9) + " GB"
       // Six Zeroes for Millions
       : Math.abs(file.size) >= 1.0e+6

       ? Math.round(Math.abs(file.size) / 1.0e+6) + " MB"
       // Three Zeroes for Thousands
       : Math.abs(file.size) >= 1.0e+3

       ? Math.round(Math.abs(file.size) / 1.0e+3) + " KB"

       : Math.abs(file.size)
    }
  }
}

</script>
