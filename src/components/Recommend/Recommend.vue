<template>
  <div>
    <swipe></swipe>
    <div>
      <h4>热门歌单推荐</h4>
      <ul>
        <li v-for="n in 18" :key="n">选项{{n}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Swipe from '@/baseCom/Swipe/Swipe'
import { Cell } from 'mint-ui'
Vue.component(Cell.name, Cell)

export default {
  components: {
    Swipe
  }
}
</script>
<style>

li {
  display: block;
  margin: 20px 0;
}
</style>

