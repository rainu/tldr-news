<template>
  <v-switch v-model="darkModeSwitch" :label="$t('settings.theme.dark')"></v-switch>
  <v-text-field v-model="marquee.speed"
                :label="$t('settings.marquee.speed')"
                type="number"
                variant="outlined"
                :rules="[marquee.rules.min, marquee.rules.max]"
                suffix="%"
                @change="onMarqueeSpeedChanged"></v-text-field>
</template>

<script>
import {useSettingsStore} from '~/store/settings'
import { mapState, mapWritableState, mapActions } from 'pinia';

export default {
  name: "SettingsGeneral",
  data(){
    return {
      darkModeSwitch: false,
      marquee: {
        speed: 0,
        rules: {
          min: v => !!(v => 0),
          max: v => !!(v <= 100)
        }
      }
    }
  },
  computed: {
    ...mapState(useSettingsStore, ['theme']),
    ...mapWritableState(useSettingsStore, ['marqueeSpeed'])
  },
  methods: {
    ...mapActions(useSettingsStore, ['applyDarkTheme']),
    onMarqueeSpeedChanged(){
      if(this.marquee.speed >= 0 && this.marquee.speed <= 100) {
        this.marqueeSpeed = Number(this.marquee.speed)
      }
    }
  },
  watch: {
    darkModeSwitch(value){
      this.applyDarkTheme(value)
    }
  },
  mounted() {
    this.darkModeSwitch = this.theme.dark
    this.marquee.speed = this.marqueeSpeed
  }
}
</script>

<style scoped>

</style>
