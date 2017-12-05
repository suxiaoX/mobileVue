<template>
  <div>
    <mt-swipe 
      :auto="autoNumber"
      :speed="speed"
      :continuous="loop">
      <slot></slot>
    </mt-swipe>
  </div>
</template>
<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

export default {
  props: {
    autoNumber: {
      type: Number,
      default: 4000
    },
    speed: {
      type: Number,
      default: 300
    },
    loop: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss">
.mint-swipe {
  height: 150px;

  img {
    width: 100%;
  }
}
.mint-swipe-item {
a {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
}
.mint-swipe-indicator.is-active {
  width: 15px;
  border-radius: 8px;
  opacity: .8;
}
</style>

