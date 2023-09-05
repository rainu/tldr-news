<template>
  <VitePwaManifest />
  <v-app>

    <v-navigation-drawer v-model="drawer" fixed app width="512">
      <v-list>
        <v-list-item
            v-for="(item, i) in commonListItems"
            :key="i"
            :variant="currentRoute === item.to ? 'tonal' : 'text'"
            color="primary"
            @click="goto(item.to)"
        >
          <template v-slot:prepend>
            <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
            <v-icon v-if="item.favIcon">
              <v-img :src="item.favIcon" heigt="24" width="24" ></v-img>
            </v-icon>
          </template>

          <v-list-item-title v-text="$t(item.title)" />
        </v-list-item>
      </v-list>

      <v-list>
        <v-list-subheader><h3>{{ $t('common.news') }}</h3></v-list-subheader>
        <v-list-item
            v-for="(item, i) in newsListItems"
            :key="i"
            :variant="currentRoute === item.to ? 'tonal' : 'text'"
            color="primary"
            class="ml-5"
            @click="goto(item.to)"
        >
          <template v-slot:prepend>
            <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
            <v-icon v-if="item.favIcon">
              <v-img :src="item.favIcon" heigt="24" width="24" ></v-img>
            </v-icon>
          </template>

          <v-list-item-title v-text="$t(item.title)" />
        </v-list-item>
      </v-list>

      <v-list>
        <v-list-subheader><h3>{{ $t('common.books') }}</h3></v-list-subheader>
        <v-list-item
            v-for="(item, i) in bookListItems"
            :key="i"
            :variant="currentRoute === item.to ? 'tonal' : 'text'"
            color="primary"
            class="ml-5"
            @click="goto(item.to)"
        >
          <template v-slot:prepend>
            <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
            <v-icon v-if="item.favIcon">
              <v-img :src="item.favIcon" heigt="24" width="24" ></v-img>
            </v-icon>
          </template>

          <v-list-item-title v-text="$t(item.title)" />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <img v-if="currentFavIcon" :src="currentFavIcon" width="24" :alt="$t(currentTitle)" />
      <strong class="pl-2">
        {{ $t(currentTitle) }}
      </strong>

      <v-spacer />

      <v-btn v-if="showHeiseLogout"
             color="primary"
             prepend-icon="mdi-logout"
             @click="onHeiseLogout">
        {{ $t('heise.logout') }}
      </v-btn>

      <v-spacer />

      <v-toolbar-items>
        <Info />
      </v-toolbar-items>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </v-main>

    <v-navigation-drawer v-model="rightDrawer" location="right" temporary fixed width="80%">
      <Settings />
    </v-navigation-drawer>
  </v-app>
</template>

<script>

import Info from "@/components/Info";
import Settings from "@/components/settings";
import news from '~/services/news'
import {mapActions, mapState} from "pinia";
import {useSessionsStore} from "~/store/sessions";
import {useTheme} from "vuetify";
import {useSettingsStore} from "~/store/settings";

export default {
  components: {Info, Settings},
  data () {
    const commonListItems = [
      {
        icon: 'mdi-home',
        title: 'home.title',
        to: '/'
      }
    ]

    const newsListItems = []
    for (const sourceId in news.sources) {
      newsListItems.push({
        favIcon: news.sources[sourceId].favIcon(),
        title: `${sourceId}.title`,
        to: `/news/${sourceId}`
      })
    }

    const bookListItems = [{
      icon: 'mdi-book',
      title: 'heise.ct.title',
      to: '/books/ct'
    }]

    return {
      drawer: false,
      commonListItems,
      newsListItems,
      bookListItems,
      rightDrawer: false,
    }
  },
  methods: {
    ...mapActions(useSettingsStore, ['setVuetify']),
    ...mapActions(useSessionsStore, ['heiseLogout']),
    goto(target){
      this.$router.push(target)
    },
    onHeiseLogout(){
      this.heiseLogout()
      navigateTo({
        path: `/books/ct/login`
      })
    }
  },
  computed: {
    ...mapState(useSessionsStore, ['isLoggedInHeise']),
    currentRoute(){
      return this.$route.path
    },
    currentTitle(){
      let items = [
          ...this.commonListItems,
          ...this.newsListItems,
          ...this.bookListItems,
      ]

      let item = items.find(i => i.to === this.$route.path)
      if(item) {
        // exact match
        return item.title
      }

      return items.find(i => this.$route.path.startsWith(i.to)).title
    },
    currentFavIcon(){
      let items = [
        ...this.commonListItems,
        ...this.newsListItems,
        ...this.bookListItems,
      ]

      const item = items.find(i => i.to === this.$route.path)
      if(item) {
        // exact match
        return item.favIcon
      }

      return items.find(i => this.$route.path.startsWith(i.to)).favIcon
    },
    showHeiseLogout(){
      return this.$route.path.startsWith('/books/ct') && this.isLoggedInHeise
    }
  },
  mounted() {
    this.setVuetify(useTheme())
  }
}
</script>