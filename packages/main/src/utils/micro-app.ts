import { LoadableApp, loadMicroApp, MicroApp, ObjectType } from 'qiankun'

export function useMicroApp() {
  const appMap: { [k: string]: MicroApp } = {}
  const loadApp = (app: LoadableApp<ObjectType>) => {
    const newApp = loadMicroApp(app, {
      sandbox: {
        strictStyleIsolation: true,
        experimentalStyleIsolation: true,
      },
    })
    appMap[app.name] = newApp
    newApp.mountPromise.then(() => {}).catch(() => {})
  }

  return {
    loadApp,
    appMap,
  }
}
