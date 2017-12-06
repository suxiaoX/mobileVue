import Vue from 'vue';
import Router from 'vue-router';
// import { resolve } from 'path';
// import { resolve } from '../../../../Library/Caches/typescript/2.6/node_modules/@types/q';
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

const Disc = resolve => {
  import('@/components/Disc/Disc').then(module => {
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

const TopList = resolve => {
  import('@/components/TopList/TopList').then(module => {
    resolve(module);
  });
};

const Radio = resolve => {
  import('@/components/Radio/Radio').then(module => {
    resolve(module);
  });
};

const Search = resolve => {
  import('@/components/Search/Search').then(module => {
    resolve(module);
  });
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
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
          component: Recommend,
          children: [
            {
              path: ':id',
              component: Disc
            }
          ]
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
          component: Rank,
          children: [
            {
              path: ':id',
              component: TopList
            }
          ]
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
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
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
