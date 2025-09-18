declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.js' {
  const content: any
  export default content
}

declare module './router/routes' {
  const routes: any[]
  export default routes
}

declare module './boot' {
  const boot: any[]
  export default boot
}
