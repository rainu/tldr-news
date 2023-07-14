<template>
  <v-dialog v-model="dialog" scrollable>
    <v-card>
      <v-card-title>
        <span class="headline">{{$t('about.title')}}</span>
      </v-card-title>

      <v-card-text>
        <v-list-item :prepend-avatar="routerBase + 'avatar.jpg'">
          <v-list-item-subtitle>{{$t('about.author')}}</v-list-item-subtitle>
          <v-list-item-title>
            <a href="http://rainu.solutions" target="_blank">rainu</a>
          </v-list-item-title>
        </v-list-item>

        <v-list-item prepend-icon="mdi-wrench">
          <v-list-item-subtitle>{{$t('about.version')}}</v-list-item-subtitle>
          <v-list-item-title>{{version}} - <a :href="'https://github.com/rainu/tldr-news/tree/' + revision.long" target="_blank">{{revision.short}}</a></v-list-item-title>
          <v-list-item-title>{{formattedBuiltDate}}</v-list-item-title>
        </v-list-item>

        <v-list-item prepend-icon="mdi-bug">
          <v-list-item-title>
            <a href="https://github.com/rainu/tldr-news/issues" target="_blank">{{$t('about.bug')}}</a>
          </v-list-item-title>
        </v-list-item>

        <v-list-item prepend-icon="mdi-code-braces">
          <v-list-item-title>
            <a href="https://github.com/rainu/tldr-news" target="_blank">{{$t('about.code')}}</a>
          </v-list-item-title>
        </v-list-item>

        <v-list-item prepend-icon="mdi-copyright">
          <v-list-item-subtitle>{{$t('about.license')}}</v-list-item-subtitle>
          <v-list-item-title>
            <a href="https://github.com/rainu/tldr-news/blob/master/LICENSE" target="_blank">MIT</a>
          </v-list-item-title>
        </v-list-item>

      </v-card-text>

      <v-card-actions class="text-center">
        <div class="flex-grow-1"></div>
        <v-btn color="primary" @click="dialog = false">{{$t('about.close')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-btn icon @click="dialog = true">
    <v-icon>mdi-information-outline</v-icon>
  </v-btn>
</template>

<script>
  import * as dateFN from 'date-fns'

  export default {
    name: "Info",
    data(){
      const config = useRuntimeConfig()

      return {
        routerBase: config.app.baseURL,
        version: config.public.version,
        builtDate: new Date(config.public.builtDate),
        revision: {
          long: config.public.revision,
          short: config.public.revision?.substring(0, 8),
        },

        dialog: false
      }
    },
    computed: {
      formattedBuiltDate(){
        return dateFN.format(this.builtDate, this.$t('common.datetime.format.date'))
      }
    }
  }
</script>
