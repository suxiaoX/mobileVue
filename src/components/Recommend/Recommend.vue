<template>
  <div class="recommend" ref="recommend">
    <better-scroll ref="scroll" :data="this.discList">
      <div>
        <swipe>
          <mt-swipe-item v-for="item in this.recomends" :key="item.id">
            <a :href="item.linkUrl"></a>
            <img :src="item.picUrl" alt="" />
          </mt-swipe-item>
        </swipe>
        <div class="hot-music">
          <h3 class="title">热门歌单推荐</h3>
          <!-- <ul v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="10"
              class="recommend-list"> -->
          <ul class="recommend-list">
            <li v-for="item in this.discList" @click="selectItem(item)" :key="item.id" class="music-info clearfix">
              <div class="img-wraper fl">
                <img class="needsclick" v-lazy="item.imgurl" @load="loadImage" :src="item.imgurl" />
              </div>
              <div class="fl">
                <div class="text">
                  <h4 class="text-title" v-html="item.creator.name"></h4>
                  <p class="desc" v-html="item.dissname"></p>
                </div>
              </div>
            </li>
          </ul>
          <div class="loading-container" v-show="!discList.length">
            <loading></loading>
          </div>
        </div>
      </div>
    </better-scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapMutations } from 'vuex';
import Swipe from '@/baseCom/Swipe/Swipe';
import Loading from '@/baseCom/Loading/Loading';
import BetterScroll from '@/baseCom/BetterScroll/BetterScroll';
// import { Cell, InfiniteScroll, SwipeItem } from 'mint-ui';
import { getRecommend, getDiscList } from 'api/recommend.js';
import { ERR_OK } from 'api/config.js';
import { playlistMixin } from 'common/tools/mixin';
// Vue.component(Cell.name, Cell);
// Vue.use(InfiniteScroll);
// Vue.component(SwipeItem.name, SwipeItem);

export default {
  mixins: [playlistMixin],
  data () {
    return {
      recomends: [],
      discList: []
    }
  },
  // mounted () {
  //   this._getRecommend();
  //   this._getDiscList();
  // },
  created () {
    this._getRecommend();
    this._getDiscList();
  },
  components: {
    Swipe,
    Loading,
    BetterScroll
  },
  methods: {
    ...mapMutations({
      setDisc: 'SET_DISC'
    }),
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : '';

      this.$refs.recommend.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    /*
    loadMore () {
      this.loading = true
      // setTimeout(() => {
      //   console.log(22222);
      // }, 2500)
    },
    */
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
    },
    selectItem(item) {
      this.setDisc(item);
      this.$router.push(`/find/recommend/${item.dissid}`);
    },
    loadImage () {
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.scroll.refresh()
      }
    },
  }
}
</script>
<style lang="scss">

@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';
@import '../../assets/css/base.scss';
// @import '../../assets/css/index.scss';
.hot-music {
  .title {
    font-size: $font-size-large;
    padding: 10px 0;
  }

  .music-info {
    @include px2rem(padding-left, 40);
    @include px2rem(padding-right, 40);
    margin: 0;
    display: block;
    @include px2rem(margin-bottom, 40);
    font-size: $font-size-medium;

    .img-wraper {
      @include px2rem(width, 120);
      @include px2rem(height, 120);
      margin-right: -100%;

      img {
        width: 100%;
      }
    }
    .text {
      text-align: left;
      @include px2rem(margin-left, 40);
      margin-left: 80px;

      h4 {
        font-weight: bold;
      }
    }
  }
}

.loading-container {
  display: flex;
  justify-content: center;
  @include px2rem(margin-top, 40);
}
</style>

