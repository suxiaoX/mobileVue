<template>
  <div>
    <header>recommend</header>
    <mt-swipe :auto="4000"  @change="handleChange">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

export default {
  methods: {
    handleChange (index) {
      console.log(index)
    }
  }
}
</script>
<style lang="scss">
.mint-swipe {
  height: 100px;
}
.mint-swipe-items-wrap > div {
  background: yellowgreen;
}
</style>

