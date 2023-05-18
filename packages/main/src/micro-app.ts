const microApps = [
  {
    name: 'jquery',
    entry: '//localhost:48149',
    activeRule: '/home',
  },
]

const apps = microApps.map((item) => ({
  ...item,
  container: '#home', // 子应用挂载的div
  props: {
    routerBase: item.activeRule, // 下发基础路由
  },
}))

export default apps
