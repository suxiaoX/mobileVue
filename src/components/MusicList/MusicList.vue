<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>  
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play" @click="randomPlayMusic()">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <better-scroll :data="songs"
                   @scroll="scroll"
                   :listen-scroll="listenScroll"
                   class="list"
                   ref="list"
                   :probe-type="probeType">
      <div class="song-list-wrapper">
        <song-list :songs="songs"  @select="selectItem"></song-list>
      </div>
      <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </better-scroll>
  </div> 
</template>
<script>
import { mapActions } from 'vuex';
import BetterScroll from '@/baseCom/BetterScroll/BetterScroll';
import Loading from '@/baseCom/Loading/Loading';
import SongList from '@/baseCom/SongList/SongList';

const RESERVED_HEIGHT = 40;

export default {
  data () {
    return {
      scrollY: 0
    }
  },
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    BetterScroll,
    Loading,
    SongList
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
   created() {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted () {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`;
  },
  methods: {
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ]),
    randomPlayMusic() {
      this.randomPlay({
        list: this.songs
      })
    },
    back() {
      this.$router.back();
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
  },
  watch: {
    scrollY(newValue) {
      let translateY = Math.max(this.minTransalteY, newValue);
      let scale = 1;
      let zIndex = 0;
      let blur = 0;
      const percent = Math.abs(newValue / this.imageHeight);
      // 下拉
      if (newValue > 0) {
        scale = 1 + percent;
        zIndex = 10;
      } else {
        blur = Math.min(20, percent * 20); // 取小的
      }

      this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`;
      this.$refs.filter.style['backdrop-filter'] = `blur(${blur}px)`;

      if (newValue < this.minTransalteY) { // s上拉到顶部
        zIndex = 10;
        this.$refs.bgImage.style.paddingTop = 0;
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
        this.$refs.playBtn.style.display = 'none';
      } else { // 开始下来 到初始位置
        this.$refs.bgImage.style.paddingTop = '70%';
        this.$refs.bgImage.style.height = 0;
        this.$refs.playBtn.style.display = '';
      }

      this.$refs.bgImage.style['transform'] = `scale(${scale})`;
      this.$refs.bgImage.style.zIndex = zIndex;
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/css/variable.scss';

.music-list {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background: $color-background;
  
  .title {
      position: absolute;
      top: 0;
      left: 10%;
      z-index: 40;
      width: 80%;
      text-align: center;
      line-height: 40px;
      font-size: $font-size-large;
      color: $color-text;
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
  
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    // z-index: 1;

    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;
    
      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
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
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7,17,27,0.4);
    }
  }

  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
    // z-index: 2;
  }
     
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    // z-index: 3;

    .song-list-wrapper{ 
      padding: 20px 30px;
    }
        
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>

