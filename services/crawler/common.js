import {useSettingsStore} from "~/store/settings";
import {client} from '@rainu/r-ray-client/src'

let clientInstance = null

export const proxyFetch = (url, opts) => {
  const rray = useSettingsStore().$state.rray
  const cors = useSettingsStore().$state.cors

  //r-ray is always the best choice
  if(rray.url) {
    if(!clientInstance) {
      clientInstance = client(rray.url, rray.username, rray.password)
    }
    return clientInstance.fetch(`${url}`, opts)
  }

  //fallback to cors if no r-ray is given
  return $fetch(`${cors.proxy}${url}`)
}