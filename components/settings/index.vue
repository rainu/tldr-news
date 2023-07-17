<template>
  <v-container fluid>
    <v-layout column justify-center>
      <v-row align="center" dense>
        <v-col cols="12">
          <v-card>
            <v-card-title>{{ $t('settings.title') }}</v-card-title>
            <v-card-text>
              <SettingsTheme />
              <SettingsLanguage />
              <SettingsCrawler />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>{{ $t('settings.openai.title') }}</v-card-title>
            <v-card-text>
              <SettingsOpenAI />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>

import SettingsTheme from "~/components/settings/Theme";
import SettingsLanguage from "~/components/settings/Language";
import SettingsCrawler from "~/components/settings/Crawler";
import SettingsOpenAI from "~/components/settings/OpenAI.vue";
export default {
  name: "Settings",
  components: {SettingsCrawler, SettingsLanguage, SettingsTheme, SettingsOpenAI},
  data(){
    return {
      panel: 0
    }
  }
}
</script>

<style scoped>

</style>
