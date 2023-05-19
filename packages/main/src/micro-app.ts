// const getActiveRule = (hash) => (location) => location.hash.startsWith(hash);
const microApps = [
  {
    name: 'jquery',
    entry: '//localhost:48149',
    activeRule: '/main',
  },
]

const apps = microApps.map((item) => ({
  ...item,
  container: '#jquery-container', // 子应用挂载的div
  props: {
    routerBase: item.activeRule, // 下发基础路由
  },
}))

export default apps
