import {useSessionsStore} from "~/store/sessions";
import {useSettingsStore} from "~/store/settings";
import {navigateTo} from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
  if(to.path.startsWith('/books/ct') && !useSettingsStore().isRrayInUse) {
    return navigateTo('/error/rray-mandatory')
  }

  if(to.path.startsWith('/books/ct') && to.path !== '/books/ct/login') {
    if(!useSessionsStore().isLoggedInHeise) {
      return navigateTo('/books/ct/login')
    }
  }
})