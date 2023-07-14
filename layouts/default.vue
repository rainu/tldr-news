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
            <v-icon>{{ item.icon }}</v-icon>
          </template>

          <v-list-item-title v-text="$t(item.title)" />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

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

    <v-navigation-drawer v-model="rightDrawer" location="right" temporary fixed>
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
          icon: 'mdi-backup-restore',
          title: 'backup.title',
          to: '/backup'
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
    }
  }
}
</script>