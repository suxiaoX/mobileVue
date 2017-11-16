import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const HelloWorld = resolve => {
  import('@/components/mHeader/mHeader').then(module => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
