const getItem = (name: string) => () => window.$cookies.get(name) || ''
const setItem = (name: string) => (value: string) => window.$cookies.set(name, value)
const removeItem = (name: string) => () => window.$cookies.remove(name)
function cookieItemFactory(name: string) {
  return {
    get: getItem(name),
    set: setItem(name),
    remove: removeItem(name),
  }
}

export const tk = cookieItemFactory('tk')
