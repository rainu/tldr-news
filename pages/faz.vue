<template>
  <NewsOverview :crawler="createCrawlerFaz()" />
</template>

<script>
import {createCrawlerFaz} from "~/services/crawler/faz";

export default {
  methods: {
    createCrawlerFaz
  },
}
</script>