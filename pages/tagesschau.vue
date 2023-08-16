<template>
  <NewsOverview :crawler="createCrawlerTagesschau()" />
</template>

<script>
import {createCrawlerTagesschau} from "~/services/crawler/tagesschau";

export default {
  methods: {
    createCrawlerTagesschau
  },
}
</script>