import {useSettingsStore} from "~/store/settings";

export const proxyFetch = (url) => {
  const proxy = useSettingsStore().$state.cors.proxy

  return $fetch(`${proxy}${url}`)
}