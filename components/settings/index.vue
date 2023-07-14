<template>
  <v-container fluid>
    <v-layout column justify-center>
      <v-row align="center">
        <v-col cols="12">
          <SettingsTheme />
        </v-col>
        <v-col cols="12">
          <SettingsLanguage />
        </v-col>
        <v-col cols="12">
          <SettingsCrawler />
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>

import SettingsTheme from "~/components/settings/Theme";
import SettingsLanguage from "~/components/settings/Language";
import SettingsCrawler from "~/components/settings/Crawler";
export default {
  name: "Settings",
  components: {SettingsCrawler, SettingsLanguage, SettingsTheme},
  data(){
    return {
      panel: 0
    }
  }
}
</script>

<style scoped>

</style>
