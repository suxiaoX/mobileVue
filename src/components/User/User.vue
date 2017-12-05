<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back()">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
      </div>
       <div ref="playBtn" class="play-btn" @click="random()">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <better-scroll ref="favoriteList" class="list-scroll" v-if="currentIndex===0" :data="favoriteList">
          <div class="list-inner">
            <song-list :songs="favoriteList"></song-list>
          </div>
        </better-scroll>
        <better-scroll ref="playList" class="list-scroll" v-if="currentIndex===1" :data="playHistory">
          <div class="list-inner">
            <song-list :songs="playHistory"></song-list>
          </div>
        </better-scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultDesc"></no-result>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Song from 'common/tools/song';

import Switches from '@/baseCom/Switches/Switches';
import NoResult from '@/baseCom/NoResult/NoResult';
import BetterScroll from '@/baseCom/BetterScroll/BetterScroll';
import SongList from '@/baseCom/SongList/SongList';

export default {
  data () {
    return {
      currentIndex: 0,
      switches: [
        { name: '我喜欢的' },
        { name: '最近听的' }
      ]  
    }
  },
  components: {
    Switches,
    NoResult,
    BetterScroll,
    SongList
  },
  methods: {
    ...mapActions([
      'randomPlay'
    ]),
    back() {
      this.$router.back();
    },
    switchItem(index) {
      this.currentIndex = index;
    },
    random() {
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory;
      if (list.length === 0) {
        return;
      }
      list = list.map(song => {
        return new Song(song)
      })
      this.randomPlay({
        list
      })
    }
  },
  computed: {
    ...mapGetters([
      'favoriteList',
      'playHistory'
    ]),
    noResult() {
      if (this.currentIndex === 0) {
        return !this.favoriteList.length;
      } else {
        return !this.playHistory.length;
      }
    },
    noResultDesc() {
       if (this.currentIndex === 0) {
        return '暂无收藏歌曲';
      } else {
        return '你还没有听过歌曲';
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/css/variable.scss';
.user-center {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: $color-background;

  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }
    
  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
    
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
     
  }
    
  .switches-wrapper {
    margin: 10px 0 30px 0;
  }
    
  .play-btn {
    box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid  $color-text-l;
    color: $color-text-l;
    border-radius: 100px;
    font-size: 0;

    .icon-play {
      display: inline-block;
      vertical-align: middle;
      margin-right: 6px;
      font-size: $font-size-medium-x;
    }
     
    .text {
      display: inline-block;
      vertical-align: middle;
      font-size: $font-size-small;
    }
  }
   
  .list-wrapper {
    position: absolute;
    top: 120px;
    bottom: 40px;
    width: 100%;

    .list-scroll {
      height: 100%;
      overflow: hidden;

      .list-inner {
        padding: 20px 30px;
      }
    }
  } 
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
  
</style>