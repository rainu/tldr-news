<template>
  <NewsOverview :crawler="createCrawlerZeitDpa()" />
</template>

<script>
import {createCrawlerZeitDpa} from "~/services/crawler/zeit";

export default {
  methods: {
    createCrawlerZeitDpa
  },
}
</script>