<template>
  <div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">推荐</mt-tab-item>
      <mt-tab-item id="2">歌手</mt-tab-item>
      <mt-tab-item id="3">排行</mt-tab-item>
      <mt-tab-item id="4">主播电台</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <recommend></recommend>
        <!-- <mt-cell v-for="n in 10" :title="'内容 ' + n" :key="n" /> -->
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <!-- <mt-cell v-for="n in 4" :title="'测试 ' + n" :key="n" /> -->
        <singer></singer>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <rank></rank>
        <!-- <mt-cell v-for="n in 6" :title="'选项 ' + n" :key="n" /> -->
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <div>我是主播</div>
        <!-- <mt-cell v-for="n in 30" :title="'选项 ' + n" :key="n" /> -->
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import Vue from 'vue'
import Recommend from '@/components/Recommend/Recommend'
import Singer from '@/components/Singer/Singer'
import Rank from '@/components/Rank/Rank'
import { Navbar, TabItem, TabContainer, TabContainerItem, Cell } from 'mint-ui'
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Cell.name, Cell)

export default {
  data () {
    return {
      selected: '1'
    }
  },
  components: {
    Recommend,
    Singer,
    Rank
  }
}
</script>
