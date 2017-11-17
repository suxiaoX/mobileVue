<template>
  <div>
    <swipe></swipe>
    <div>
      <h4>热门歌单推荐</h4>
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <li v-for="(value, index) in this.list" :key="index">选项{{value}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Swipe from '@/baseCom/Swipe/Swipe'
import { Cell, InfiniteScroll } from 'mint-ui'

Vue.component(Cell.name, Cell)
Vue.use(InfiniteScroll)

export default {
  data () {
    return {
      list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
      loading: false
    }
  },
  components: {
    Swipe
  },
  methods: {
    loadMore () {
      this.loading = true
      setTimeout(() => {
        let last = this.list[this.list.length - 1]
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i)
        }
        this.loading = false
      }, 2500)
      console.log(2222);
    }
  }
}
</script>
<style>

li {
  display: block;
  margin: 20px 0;
}
</style>

