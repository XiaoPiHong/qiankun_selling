import type { VueCookies } from 'vue-cookies'

declare global {
  interface Window {
    $cookies: VueCookies
  }
}
