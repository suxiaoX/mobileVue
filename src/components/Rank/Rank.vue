<template>
  <div class="rank" ref="rank">
    <better-scroll class="toplist" ref="toplist" :data="topList">
      <ul>
        <li class="item" v-for="item in topList" :key="item.id" @click="selectItem(item)">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl" />
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.songList" :key="index">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </better-scroll>
    <div v-show="!topList.length" class="loading-container">
      <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import BetterScroll from '@/baseCom/BetterScroll/BetterScroll';
import Loading from '@/baseCom/Loading/Loading';
import { getTopList } from 'api/rank.js';
import { ERR_OK } from 'api/config.js';
export default {
  data () {
    return {
      topList: []
    }
  },
  components: {
    BetterScroll,
    Loading
  },
  created () {
    this._getTopList();
  },
  methods: {
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    }),
    selectItem(item) {
      this.$router.push(`/find/rank/${item.id}`);
      this.setTopList(item);
    },
    _getTopList() {
      getTopList().then(res => {
        if (res.code === ERR_OK) {
          this.topList = res.data.topList;
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';
@import '../../assets/css/base.scss';

.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  z-index: 101;

  .toplist {
    height: 100%;
    overflow: hidden;

    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;

      &:last-child {
        padding-bottom: 20px;
      }
        
      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }
        
      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: $color-highlight-background;
        color: $color-text-d;
        font-size: $font-size-small;
        
        .song {
          @extend .no-wrap;
          line-height: 26px;
          text-align: left;
        }
      }
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 45px;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-around;
  }
}
    
</style>
