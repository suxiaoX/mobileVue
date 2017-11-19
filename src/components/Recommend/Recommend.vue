<template>
  <div>
    <swipe>
      <mt-swipe-item v-for="item in this.recomends" :key="item.id">
        <a :href="item.linkUrl"></a>
        <img :src="item.picUrl" alt="" />
      </mt-swipe-item>
    </swipe>
    <div class="hot-music">
      <h4 class="title">热门歌单推荐</h4>
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          class="recommend-list"
          >
        <li v-for="item in this.discList" :key="item.id" class="music-info">
          <div class="img-wraper">
            <img v-lazy="item.imgurl" :src="item.imgurl" />
          </div>
          <div class="text">
            <h4 class="title" v-html="item.creator.name"></h4>
            <p class="desc" v-html="item.dissname"></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Swipe from '@/baseCom/Swipe/Swipe';
import { Cell, InfiniteScroll, SwipeItem } from 'mint-ui';
import { getRecommend, getDiscList } from 'api/recommend.js';
import { ERR_OK } from 'api/config.js';

Vue.component(Cell.name, Cell);
Vue.use(InfiniteScroll);
Vue.component(SwipeItem.name, SwipeItem);

export default {
  data () {
    return {
      recomends: [],
      discList: [],
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
        console.log(22222);
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
          this.discList = res.data.list;
        }
      })
    }
  }
}
</script>
<style lang="scss">

@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';
.hot-music {
  .music-info {
    display: flex;
    justify-content: space-between;
    @include px2rem(padding-left, 40);
    @include px2rem(padding-right, 40);

    .img-wraper {
      @include px2rem(width, 120);
      @include px2rem(height, 120);

      img {
        width: 100%;
      }
    }
    .text {
      text-align: left;
    }
  }
}


li {
  display: block;
  margin: 20px 0;
  font-size: $font-size-medium;
}
</style>

