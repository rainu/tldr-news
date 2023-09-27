<template>
  <div @click="onClick">
    <v-progress-linear indeterminate v-show="inProgress" color="primary"></v-progress-linear>
    <p v-show="showContent" class="content">
      {{value.Content}}
    </p>
    <p v-show="showSummary" class="summary">
      {{value.Summary}}
    </p>
  </div>
</template>

<script>

import {openaiClient} from "~/services/openai";

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      showContent: true,
      showSummary: false,
      inProgress: false
    }
  },
  methods: {
    onClick() {
      if(!this.value.Summary) {
        this.inProgress = true
        openaiClient().mainStatementOf(this.value.Content)
          .then(summary => {
            // extend the object itself with the summary
            this.value.Summary = summary

            this.onClick()
          })

        return
      }
      this.inProgress = false

      this.showContent = !this.showContent
      this.showSummary = !this.showSummary
    }
  },
  watch: {
    'value.Summary'() {
      this.showSummary = true
      this.showContent = false
    }
  }
}

</script>

<style lang="scss" scoped>
p {
  border-left-style: solid;
  border-left-width: 3px;
  padding-left: 3px;
}

p.content {
  border-left-color: #00BCD4;
}

p.summary {
  border-left-color: #CDDC39;
}
</style>