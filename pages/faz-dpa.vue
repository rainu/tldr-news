<template>
  <Overview :crawler="createCrawlerFazDpa()" />
</template>

<script>
import Overview from "~/components/news/Overview.vue"
import {createCrawlerFazDpa} from "~/services/crawler/faz-dpa";

export default {
  components: {Overview},
  methods: {
    createCrawlerFazDpa
  },
}
</script>