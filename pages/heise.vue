<template>
  <NewsOverview :crawler="createCrawlerHeise()" />
</template>

<script>
import {createCrawlerHeise} from "~/services/crawler/heise";

export default {
  methods: {
    createCrawlerHeise
  },
}
</script>