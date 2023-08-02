<template>
  <Overview :crawler="createCrawlerFaz()" />
</template>

<script>
import Overview from "~/components/news/Overview.vue"
import {createCrawlerFaz} from "~/services/crawler/faz";

export default {
  components: {Overview},
  methods: {
    createCrawlerFaz
  },
}
</script>