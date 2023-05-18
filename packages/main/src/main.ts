import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'
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
import microApps from './micro-app'

VXETable.setup({
  size: 'mini',
  // 对组件内置的提示语进行国际化翻译
  // @ts-ignore
  i18n: (key, args) => i18n.global.t(key, args),
})
const app = createApp(App)
app.use(router)
app.use(VueCookies)
app.use(ElementPlus, { size: 'small', locale: zhCn })
app.use(VXETable)
app.mount('#app')
app.component('MyButton', button)
app.component('MySearchForm', searchForm)
app.component('MyForm', form)
app.component('SvgIcon', svgIcon)
app.component('MyDialog', dialog)

// 给子应用配置加上loader方法
const apps = microApps.map((item) => ({
  ...item,
}))
registerMicroApps(apps, {
  beforeLoad: (app) => Promise.resolve(),
  beforeMount: (app) => Promise.resolve(),
  afterMount: (app) => Promise.resolve(),
  afterUnmount: (app) => Promise.resolve(),
})
// setDefaultMountApp('/jquery')
start()
