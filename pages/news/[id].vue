<template>
  <NewsOverview :crawler="crawler" />
</template>

<script>

import news from '~/services/news'

export default {
  computed: {
    id(){
      return this.$route.params.id
    },
    crawler(){
      return news.sources[this.id].crawler()
    }
  }
}
</script>