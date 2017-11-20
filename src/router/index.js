import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

const mHeader = resolve => {
  import('@/components/mHeader/mHeader').then(module => {
    resolve(module);
  });
};

const Test = resolve => {
  import('@/components/Test/Test').then(module => {
    resolve(module);
  });
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'header',
      component: mHeader
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})
