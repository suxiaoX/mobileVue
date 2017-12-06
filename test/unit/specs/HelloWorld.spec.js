import Vue from 'vue';
import FindMusic from '@/components/FindMusic';

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(FindMusic);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent)
    .toEqual('Welcome to Your Vue.js App');
  });
});
