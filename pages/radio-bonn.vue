<template>
  <NewsOverview :crawler="createCrawlerRadioBonn()" />
</template>

<script>
import {createCrawlerRadioBonn} from "~/services/crawler/radiobonn";

export default {
  methods: {
    createCrawlerRadioBonn
  },
}
</script>