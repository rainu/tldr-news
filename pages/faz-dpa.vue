<template>
  <NewsOverview :crawler="createCrawlerFazDpa()" />
</template>

<script>
import {createCrawlerFazDpa} from "~/services/crawler/faz-dpa";

export default {
  methods: {
    createCrawlerFazDpa
  },
}
</script>