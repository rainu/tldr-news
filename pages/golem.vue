<template>
  <NewsOverview :crawler="createCrawlerGolem()" />
</template>

<script>
import {createCrawlerGolem} from "~/services/crawler/golem";

export default {
  methods: {
    createCrawlerGolem
  },
}
</script>