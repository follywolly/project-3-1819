<template>
  <b-card
    tag="li"
    class="mb-2 jf-card jf-card--log"
  >
    <router-link :to="`/logs/${id}`" class="jf-card__link">
      <div class="jf-card__id">
        {{id}}
      </div>
      <div class="jf-card__content">
        <h3 class="jf-card__title">
          {{title}}
        </h3>
        <b-card-text class="jf-card__text" v-if="tags.indexOf('human') > -1">
          <span class="jf-card__text--secondary">written by </span><span class="jf-card__text--primary">{{author}}</span><span class="jf-card__text--secondary"> - at </span><span class="jf-card__text--primary">{{time}}</span><span class="jf-card__text--secondary"> on </span><span class="jf-card__text--primary">{{date}}</span>
        </b-card-text>
        <b-card-text class="jf-card__text" v-if="tags.indexOf('process') > -1">
          <span class="jf-card__text--secondary">at </span><span class="jf-card__text--primary">{{time}}</span><span class="jf-card__text--secondary"> on </span><span class="jf-card__text--primary">{{date}}</span>
        </b-card-text>
      </div>
      <div class="jf-card__tag-holder">
        <Tag v-for="(tag, index) in tags" :key="`tag-${index}`" :title="tag" :class="tag" />
      </div>
    </router-link>
  </b-card>
</template>
<script>
import Tag from '../atoms/Tag.vue'
export default {
  name: 'logcard',
  props: ['title', 'id', 'time', 'date', 'author', 'tags'],
  components: {
    Tag
  }
}

</script>
