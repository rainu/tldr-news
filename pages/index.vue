<template>
  <v-container>
    <v-alert
        type="error"
        :title="$t('validation.openai.missing-token.title')"
        :text="$t('validation.openai.missing-token.text')"
    />
  </v-container>
</template>

<script>
import {mapState} from "pinia";
import {useSettingsStore} from "~/store/settings";

export default {
  computed: {
    ...mapState(useSettingsStore, ['openai']),
  },
  mounted() {
    if(this.openai.token) {
      this.$router.push('/news/tagesschau');
    }
  }
}
</script>