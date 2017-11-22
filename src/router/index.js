import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

const FindMusic = resolve => {
  import('@/components/FindMusic/FindMusic').then(module => {
    resolve(module);
  });
};

const MyMusic = resolve => {
  import('@/components/MyMusic/MyMusic').then(module => {
    resolve(module);
  });
};

const Amigo = resolve => {
  import('@/components/Amigo/Amigo').then(module => {
    resolve(module);
  });
};

const User = resolve => {
  import('@/components/User/User').then(module => {
    resolve(module);
  });
};

const Recommend = resolve => {
  import('@/components/Recommend/Recommend').then(module => {
    resolve(module);
  });
};

const Singer = resolve => {
  import('@/components/Singer/Singer').then(module => {
    resolve(module);
  });
};

const SingerDetail = resolve => {
  import('@/components/SingerDetail/SingerDetail').then(module => {
    resolve(module);
  });
};

const Rank = resolve => {
  import('@/components/Rank/Rank').then(module => {
    resolve(module);
  });
};

const Radio = resolve => {
  import('@/components/Radio/Radio').then(module => {
    resolve(module);
  });
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      // name: 'home',
      redirect: '/find'
    },
    {
      path: '/find',
      component: FindMusic,
      children: [
        {
          path: '/',
          // name: 'find',
          component: Recommend
        },
        {
          path: 'recommend',
          // name: 'recommend',
          component: Recommend
        },
        {
          path: 'singer',
          // name: 'singer',
          component: Singer,
          children: [
            {
              path: ':id',
              component: SingerDetail
            }
          ]
        },
        {
          path: 'rank',
          // name: 'rank',
          component: Rank
        },
        {
          path: 'radio',
          // name: 'radio',
          component: Radio
        }
      ]
    },
    {
      path: '/search',
      // name: 'search',
      component: SingerDetail
    },
    {
      path: '/myMusic',
      // name: 'myMusic',
      component: MyMusic
    },
    {
      path: '/amigo',
      // name: 'amigo',
      component: Amigo
    },
    {
      path: '/user',
      // name: 'user',
      component: User
    }
  ]
});
