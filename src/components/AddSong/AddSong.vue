<template>
<transition name="slide">
  <div class="add-song" v-show="showFlag" @click.stop>
    <div class="header">
      <h1 class="title">添加歌曲到列表</h1>
      <div class="close" @click="hide()">
        <i class="icon-close"></i>
      </div>
    </div>
    <div class="shortcut">
      <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
      <div class="list-wrapper">
        <better-scroll ref="songList" class="list-scroll" v-if="currentIndex===0" :data="playHistory">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong"></song-list>
          </div>
        </better-scroll>
        <better-scroll ref="searchList" class="list-scroll" v-if="currentIndex===1" :data="searchHistory">
          <div class="list-inner">
            <search-list @delete="deleteSearchHistory" @select="addKeywords" :searches="searchHistory"></search-list>
          </div>
        </better-scroll>
      </div>
    </div>
    <top-tip ref="topTip">
      <div class="tip-title">
        <i class="icon-ok"></i>
        <span class="text">1首歌曲已经添加到播放列表</span>
      </div>
    </top-tip>
  </div>
</transition>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Song from 'common/tools/song';

import Switches from '@/baseCom/Switches/Switches';
import BetterScroll from '@/baseCom/BetterScroll/BetterScroll';
import SongList from '@/baseCom/SongList/SongList';
import SearchList from '@/baseCom/SearchList/SearchList';
import TopTip from '@/baseCom/TopTip/TopTip';

export default {
  data () {
    return {
      showFlag: false,
      currentIndex: 0,
      songs: [],
      switches: [
        {
          name: '最近播放'
        },
        {
          name: '搜索历史'
        }
      ]
    }
  },
  components: {
    Switches,
    BetterScroll,
    SongList,
    SearchList,
    TopTip
  },
  methods: {
    ...mapMutations({
      setKeywords: 'SET_KEYWORDS'
    }),
    ...mapActions([
      'deleteSearchHistory',
      'insertSong'
    ]),
    show() {
      this.showFlag = true;
      // 让滚动起做作用
       setTimeout(() => {
          if (this.currentIndex === 0) {
            this.$refs.songList.refresh()
          } else {
            this.$refs.searchList.refresh()
          }
        }, 20)
    },
    hide() {
      this.showFlag = false;
    },
    switchItem(index) {
      this.currentIndex = index;
    },
    selectSong(song, index) {
      if (index !== 0) {
        console.log(song);
        this.insertSong(new Song(song));
        this.$refs.topTip.show();
      }
    },
    addKeywords(keyword) {
      this.setKeywords(keyword);
      this.hide();
      this.$router.push('/search');
      this.$refs.topTip.$parent.hide()
      console.log(this.$refs.topTip.$parent);
    },
  },
  computed: {
    ...mapGetters([
      'playHistory',
      'searchHistory'
    ])
  }
}
</script>
<style lang="scss">
  @import '../../assets/css/variable.scss';
  @import '../../assets/css/base.scss';

  .add-song {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 200;
    background: $color-background;

    &.slide-enter-active,
    &.slide-leave-active {
      transition: all 0.3s;
    }
      
    &.slide-enter,
    &.slide-leave-to {
      transform: translate3d(100%, 0, 0)
    }
      
    .header {
      position: relative;
      height: 44px;
      text-align: center;

      .title {
        line-height: 44px;
        font-size: $font-size-large;
        color: $color-text;
      }
        
      .close {
        position: absolute;
        top: 0;
        right: 8px;

        .icon-close {
          display: block;
          padding: 12px;
          font-size: 20px;
          color: $color-theme;
        }
      }
    }
      

    .search-box-wrapper {
      margin: 20px;
    }
      
    .shortcut {
      .list-wrapper {
        position: absolute;
        top: 100px;
        bottom: 0;
        width: 100%;

        .list-scroll {
          height: 100%;
          overflow: hidden;

          .list-inner {
            padding: 20px 30px;
          }
        }
      }
    }
      
    .search-result {
      position: fixed;
      top: 124px;
      bottom: 0;
      width: 100%;
    }
     
    .tip-title {
      text-align: center;
      padding: 18px 0;
      font-size: 0;
      .icon-ok {
        font-size: $font-size-medium;
        color: $color-theme;
        margin-right: 4px;
      }
        
      .text {
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
  }
   
</style>
