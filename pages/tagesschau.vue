<template>
  <Overview :crawler="createCrawlerTagesschau()" />
</template>

<script>
import Overview from "~/components/news/Overview.vue"
import {createCrawlerTagesschau} from "~/services/crawler/tagesschau";

export default {
  components: {Overview},
  methods: {
    createCrawlerTagesschau
  },
}
</script>