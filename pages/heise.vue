<template>
  <Overview :crawler="createCrawlerHeise()" />
</template>

<script>
import Overview from "~/components/news/Overview.vue"
import {createCrawlerHeise} from "~/services/crawler/heise";

export default {
  components: {Overview},
  methods: {
    createCrawlerHeise
  },
}
</script>