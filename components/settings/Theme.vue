<template>
  <v-switch v-model="darkModeSwitch" :label="$t('settings.theme.dark')"></v-switch>
</template>

<script>
import {useSettingsStore} from '~/store/settings'
import { mapState, mapActions } from 'pinia';

export default {
  name: "SettingsTheme",
  data(){
    return {
      darkModeSwitch: false
    }
  },
  computed: {
    ...mapState(useSettingsStore, ['theme'])
  },
  methods: {
    ...mapActions(useSettingsStore, ['applyDarkTheme'])
  },
  watch: {
    darkModeSwitch(value){
      this.applyDarkTheme(value)
    }
  },
  mounted() {
    this.darkModeSwitch = this.theme.dark
  }
}
</script>

<style scoped>

</style>
