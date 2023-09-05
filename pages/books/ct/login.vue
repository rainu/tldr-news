<template>
  <v-container>
    <v-form>
      <v-card>
        <v-card-title>
          {{$t('heise.login.title')}}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field id="username" v-model="username" :label="$t('heise.login.username')"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <GeneralSecret id="password" v-model="password" :label="$t('heise.login.password')"></GeneralSecret>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <v-btn block color="primary" @click="onLogin">{{ $t('heise.login.action') }}</v-btn>
            </v-col>
            <v-col cols="12" v-show="!!loginErr">
              <v-alert type="error" :text="loginErr"></v-alert>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import {mapWritableState} from "pinia";
import {useSessionsStore} from "~/store/sessions";
import {loginHeise} from "~/services/books/heise/ct";

export default {
  data(){
   return {
     username: null,
     password: null,
     loginErr: null,
   }
  },
  computed: {
    ...mapWritableState(useSessionsStore, ['heise'])
  },
  methods: {
    onLogin(){
      this.loginErr = null

      loginHeise(this.username, this.password)
        .then(cookies => {
          this.heise.cookies = cookies
          this.$router.push('/books/ct');
        })
        .catch(err => {
          this.loginErr = "" + err
        })
    }
  }
}
</script>

<style scoped>

</style>