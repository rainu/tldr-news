<template>
  <NewsOverview :crawler="createCrawlerZeit()" />
</template>

<script>
import {createCrawlerZeit} from "~/services/crawler/zeit";

export default {
  methods: {
    createCrawlerZeit
  },
}
</script>