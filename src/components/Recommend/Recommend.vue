<template>
  <div>
    <swipe>
      <mt-swipe-item v-for="item in this.recomends" :key="item.id">
        <a :href="item.linkUrl"></a>
        <img :src="item.picUrl" alt="" />
      </mt-swipe-item>
    </swipe>
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
import { Cell, InfiniteScroll, SwipeItem } from 'mint-ui'
import { getRecommend, getDiscList } from '../../api/recommend.js'
import { ERR_OK } from '../../api/config.js'

console.log(getRecommend);

Vue.component(Cell.name, Cell)
Vue.use(InfiniteScroll)
Vue.component(SwipeItem.name, SwipeItem)

export default {
  data () {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      recomends: [],
      loading: false
    }
  },
  mounted () {
    this._getRecommend();
    this._getDiscList();
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
    },
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recomends = res.data.slider;
        }
      })
    },
    _getDiscList () {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data)
        }
      })
    }
  }
}
</script>
<style lang="scss">

@import '../../assets/css/variable.scss';

li {
  display: block;
  margin: 20px 0;
  font-size: $font-size-medium;
}
</style>

