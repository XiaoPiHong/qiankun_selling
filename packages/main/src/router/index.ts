import * as VueRouter from 'vue-router'
import layout from '@/layout/index.vue'
import * as routeNames from './route-names'
import * as views from '@/views'
import * as cookieUtil from '@/utils/cookie'

export const constantRoutes: Array<VueRouter.RouteRecordRaw> = [
  {
    path: '/',
    name: routeNames.ROOT,
    component: layout,
    redirect: '/home',
    meta: { show: true, title: '首页' },
    children: [
      {
        path: 'home',
        name: routeNames.ROOT_HOME,
        component: views.home,
        meta: { show: true, title: '首页', keepAlive: true },
      },
    ],
  },
  {
    path: '/login',
    name: routeNames.LOGIN,
    component: views.login,
    meta: { show: false, title: '登录', keepAlive: true },
  },
  {
    path: '/sale',
    name: routeNames.SALE,
    component: layout,
    redirect: '/sale/allegro/publish',
    meta: { show: true, title: '销售' },
    children: [
      {
        path: 'allegro',
        name: routeNames.SALE_ALLEGRO,
        redirect: '/sale/allegro/publish',
        meta: { show: true, title: 'Allegro' },
        children: [
          {
            path: 'publish',
            name: routeNames.SALE_ALLEGRO_PUBLISH,
            component: views.allegroPublish,
            meta: { show: true, title: '产品刊登', keepAlive: true },
          },
        ],
      },
    ],
  },
  {
    path: '/product',
    name: routeNames.PRODUCT,
    component: layout,
    redirect: '/product/supplier/supplierManagement',
    meta: { show: true, title: '产品' },
    children: [
      {
        path: 'supplier',
        name: routeNames.PRODUCT_SUPPLIER,
        redirect: '/product/supplier/supplierManagement',
        meta: { show: true, title: '供应商' },
        children: [
          {
            path: 'supplierManagement',
            name: routeNames.PRODUCT_SUPPLIER_ADMINISTRATION,
            component: views.supplierManagement,
            meta: { show: true, title: '供应商管理', keepAlive: true },
          },
        ],
      },
    ],
  },
  {
    path: '/main',
    name: routeNames.MAIN,
    component: layout,
    redirect: '/main/supplier/index',
    meta: { show: true, title: '产品' },
    children: [
      {
        path: 'supplier/index',
        name: routeNames.MAIN_SUPPLIER_INDEX,
        meta: { show: true, title: '供应商管理' },
        component: views.mainSupplierIndex,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: routeNames.NOT_FOUND,
    component: views.notFound,
    meta: { show: false, title: '404' },
  },
]

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: constantRoutes,
})

/** 白名单 */
const whiteList: VueRouter.RouteRecordName[] = [routeNames.LOGIN]

router.beforeEach((to, from, next) => {
  if (cookieUtil.tk.get()) {
    return new Promise((resolve, reject) => {
      // if (获取到资源就放行) {
      //   resolve(true)
      // } else {
      //   // 获取资源后放行，获取资源失败就reject
      // }
      resolve(true) // 当前没有接入资源默认放行
    })
      .then((flag) => {
        if (flag) {
          to.name !== routeNames.LOGIN ? next() : next({ name: routeNames.ROOT })
        } else {
          next({ path: to.path })
        }
      })
      .catch(() => {
        router.push({ name: routeNames.LOGIN })
      })
  }
  const { name } = to
  if (name !== null && name !== undefined && whiteList.includes(name)) {
    next()
  } else {
    next({ name: routeNames.LOGIN })
  }
})

export default router
