<template>
  <v-app>

    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
            v-for="(item, i) in items"
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
    </v-navigation-drawer>

    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <img v-if="currentFavIcon" :src="currentFavIcon" width="24" :alt="$t(currentTitle)" />
      <strong class="pl-2">
        {{ $t(currentTitle) }}
      </strong>

      <v-spacer />

      <v-toolbar-items>
        <Info />
      </v-toolbar-items>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
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

export default {
  components: {Info, Settings},
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'home.title',
          to: '/'
        },
        {
          favIcon: 'https://tagesschau.de/resources/assets/image/favicon/favicon.svg',
          title: 'tagesschau.title',
          to: '/tagesschau'
        },
        {
          favIcon: 'https://www.heise.de/icons/ho/favicon/favicon-32x32.png',
          title: 'heise.title',
          to: '/heise'
        }
      ],
      rightDrawer: false,
    }
  },
  methods: {
    goto(target){
      this.$router.push(target)
    }
  },
  computed: {
    currentRoute(){
      return this.$route.path
    },
    currentTitle(){
      return this.items.find(i => i.to === this.$route.path).title
    },
    currentFavIcon(){
      return this.items.find(i => i.to === this.$route.path).favIcon
    }
  }
}
</script>