<template>
  <b-modal
    :id="modal"
    class="jf-add-log"
    ok-title="Save"
    :title="`Log #${log_id}`"
    @ok="saveLog"
    ref="modal"
    >

    <b-form @submit.prevent="onSubmit">
      <div class="jf-add-log__header">
        <b-form-group
          id="jf-add-log__fieldset-1"
          label="Log title"
          label-for="jf-add-log__title"
        >
          <b-form-input id="jf-add-log__title" v-model="log.title" trim autocomplete="off"></b-form-input>
        </b-form-group>

        <b-form-group
          id="jf-add-log__fieldset-2"
          label="Add log type"
          label-for="jf-add-log__type"
        >
          <b-form-select id="jf-add-log__type" v-model="log.tags[0]" :options="possible_types"></b-form-select>
        </b-form-group>

        <b-form-group
          id="jf-add-log__fieldset-3"
          label="Add entity"
          label-for="jf-add-log__entity"
        >
          <b-form-select id="jf-add-log__entity" v-model="log.tags[1]" :options="possible_entities"></b-form-select>
        </b-form-group>
      </div>
      <div class="jf-add-log__body">
        <b-form-group
          id="jf-add-log__fieldset-4"
          label="Description"
          label-for="jf-add-log__description"
        >
          <b-form-textarea
            id="jf-add-log__description"
            v-model="log.description"
            placeholder="Add description"
            rows="6"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group
          id="jf-add-log__fieldset-5"
          label="Add file(s)"
          label-for="jf-add-log__files"
          description="Please select all files in one go"
        >
          <b-form-file
            v-model="log.files"
            placeholder="Choose file(s)..."
            drop-placeholder="Drop file(s) here..."
            multiple
          ></b-form-file>
        </b-form-group>

      </div>
    </b-form>


  </b-modal>
</template>
<script>
export default {
  name: 'addlog',
  props: ['modal'],
  data() {
    return {
      template: {
        title: '',
        tags: ['comment', 'human'],
        description: '',
        files: []
      },
      log: {
        title: '',
        tags: ['comment', 'human'],
        description: '',
        files: []
      },
      possible_types: [
        {value: 'comment', text: 'Comment', selected: true},
        {value: 'run', text: 'Run'}
      ],
      possible_entities: [
        {value: 'human', text: 'Human', selected: true},
        {value: 'process', text: 'Process'},
      ],
    }
  },
  computed: {
    log_id() {
      return this.$store.getters.current_log_id
    }
  },
  methods: {
    format(val) {
      return val < 10 ? '0' + val : val
    },
    onSubmit() {
      // format inputted title to be capitalized only
      const temptitle = this.log.title.toLowerCase()
      const title = temptitle.substring(0,1).toUpperCase() + temptitle.slice(1)

      // get current client user
      const author = this.$store.getters.username
      const today = new Date()

      // format date & time
      const date = `${this.format(today.getDate())}/${this.format(today.getMonth() + 1)}/${today.getFullYear()}`
      const time = `${this.format(today.getHours())}:${this.format(today.getMinutes())}`

      const id = String(this.log_id)
      this.$nextTick(() => {
        this.$store.commit('increment_id')
        this.$refs.modal.hide()
        this.log = this.template
      })

      this.makeToast('Adding log to database...', 'Process', 'default')

      setTimeout(() => {
        // create a new log
        this.$store.commit('add_log', {...this.log, title, author, date, time, id})

        this.makeToast('Added log to database!', 'Process', 'success')
      }, 3300)
    },
    makeToast(text, title, variant, append = false) {
      this.$bvToast.toast(text, {
        title,
        variant,
        autoHideDelay: 3000,
        appendToast: append,
        solid: true
      })
    },
    saveLog() {
      this.onSubmit()
    }
  }
}
</script>
