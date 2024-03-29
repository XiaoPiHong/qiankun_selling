import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import VXETable from 'vxe-table'
import '@/assets/styles/vxe-table-global.scss'
import 'virtual:svg-icons-register'
import VueCookies from 'vue-cookies'
import '@/assets/styles/index.scss'
import button from '@/components/button/index.vue'
import searchForm from '@/components/searchForm/index.vue'
import form from '@/components/form/index.vue'
import svgIcon from '@/components/svgIcon/index.vue'
import dialog from '@/components/dialog/index.vue'
import i18n from '@/i18n'
import router from '@/router/index'
import App from './App.vue'

VXETable.setup({
  size: 'small',
  // 对组件内置的提示语进行国际化翻译
  // @ts-ignore
  i18n: (key, args) => i18n.global.t(key, args),
})
const app = createApp(App)
app.use(router)
app.use(VueCookies)
app.use(ElementPlus, { size: 'default', locale: zhCn })
app.use(VXETable)
app.mount('#app')
app.component('MyButton', button)
app.component('MySearchForm', searchForm)
app.component('MyForm', form)
app.component('SvgIcon', svgIcon)
app.component('MyDialog', dialog)
