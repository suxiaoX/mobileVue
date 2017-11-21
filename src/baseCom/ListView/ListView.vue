<template>
  <better-scroll :data="data"
                  class="listView"
                  ref="listView">
    <!-- <ul>
      <li v-for="group in data" :key="group.id" class="list-group" ref="listGroup">
        <h4>{{group.title}}</h4>
      </li>
    </ul> -->
    <mt-index-list>
      <mt-index-section v-for="(group, index) in data" :key="index" :index="group.title">
        <li class="singer-item" v-for="singer in group.items" :key="singer.id">
          <img class="avatar" v-lazy="singer.avatar" :src="singer.avatar" >
          <span class="name">{{singer.name}}</span>
        </li>
      </mt-index-section>
    </mt-index-list>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </better-scroll>
</template>
<script>
import Vue from 'vue';
import { IndexList, IndexSection } from 'mint-ui';

import BetterScroll from '../BetterScroll/BetterScroll'
import Loading from '../Loading/Loading'

Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  components: {
    BetterScroll,
    Loading
  }
}
</script>
<style lang="scss">
.mint-indexlist-content {
  margin-right: 57px !important;
}
.mint-indexsection {
  width: 100%;
}
.mint-indexlist-navlist {
  height: 100%;
  justify-content: space-evenly;
}
.singer-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin: 0;
  padding: 10px 0;

  &:last-child {
    border: none;
  }

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 20px;
  }
}
</style>
