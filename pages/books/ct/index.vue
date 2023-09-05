<template>
  <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="2" v-for="book of view" :key="book.title">
        <v-card class="clickable" @click="onClick(book)">
          <v-img :src="book.previewImg">
            <template v-slot:placeholder>
              <v-progress-circular indeterminate></v-progress-circular>
            </template>
          </v-img>
          <v-card-title>
            {{book.title}}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-bottom-navigation :active="list.length > 0" grow>
    <v-row>
      <v-col>
        <v-pagination v-model="page" :length="pages"></v-pagination>
      </v-col>
    </v-row>
  </v-bottom-navigation>
</template>

<script>

import {createCrawlerHeiseCt} from "~/services/books/heise/ct"
import {mapState} from "pinia";
import {useSessionsStore} from "~/store/sessions";

export default {
  data(){
    return {
      loading: true,
      list: [],
      page: 1,
      limit: 12,
    }
  },
  computed: {
    ...mapState(useSessionsStore, ['heise']),
    view(){
      return this.list.slice(this.page * this.limit - this.limit, this.limit * this.page)
    },
    pages(){
      return Math.ceil(this.list.length / this.limit)
    },
  },
  methods: {
    onClick(book) {
      navigateTo({
        path: `/books/ct/${book.year}_${book.number}`
      })
    }
  },
  mounted() {
    createCrawlerHeiseCt(this.heise.cookies).list().then(r => {
      this.list = r
      this.loading = false
    })
  }
}
</script>

<style>
.clickable {
  cursor:pointer;
}
</style>