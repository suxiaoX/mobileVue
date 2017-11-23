<template>
  <div class="player" v-show="playlist.length>0">
    <div class="normal-player" v-show="fullScreen">
      <div class="top">
        <div class="back">
          <i class="icon-back" @click="hideNormal()"></i>
        </div>
        <h2 class="title" v-html="currentSong.name"></h2>
        <h4 class="subtitle" v-html="currentSong.singer"></h4>
      </div>
      <div class="middle">
        <div class="middle-l" ref="middleL">
          <div class="cd-wrapper">
            <div class="cd" :class="cdClass">
              <img class="cd-img" :src="currentSong.image" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <!-- <div class="dot-wrapper">
          <span class="dot"></span>
        </div> -->
        <div class="progress-wrapper">
          <span class="time time-l">{{format(currentTime)}}</span>
          <div class="progress-bar-wrapper">
            <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
          </div>
          <span class="time time-r">{{format(currentSong.duration)}}</span>
        </div>
        <div class="operators">
          <div class="icon i-left" :class="disableCls">
            <i class="icon-prev" @click="prevSong()"></i>
          </div>
          <div class="icon i-center" :class="disableCls">
            <i :class="playIcon" @click="togglePlaying()"></i>
          </div>
          <div class="icon i-right" :class="disableCls">
            <i class="icon-next" @click="nextSong()"></i>
          </div>
        </div>
      </div>
      <div class="back-img">
        <img width="100%" height="100%" :src="currentSong.image" alt="" />
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen" @click="openNomal()">
      <div class="icon">
        <img :src="currentSong.image" :class="cdClass" width="40" height="40" alt="" />
      </div>
      <div class="text">
        <h2 class="name" v-html="currentSong.name"></h2>
        <p class="desc" v-html="currentSong.singer"></p>
      </div>
      <div class="control">
        <i @click.stop="togglePlaying()" class="icon-mini" :class="miniIcon"></i>
      </div>
      <!-- <div class="control" @click.stop=""></div> -->
    </div>
    <audio ref="audio" :src="currentSong.url" @play="ready" @error="errorPlay"  @timeupdate="updateTime" @ended="end"></audio>
  </div>  
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import ProgressBar from '@/baseCom/ProgressBar/ProgressBar';

export default {
  data () {
    return {
      songReady: false,
      currentTime: 0,
    }
  },
  components: {
    ProgressBar
  },
  computed: {
    ...mapGetters([
      'currentIndex',
      'fullScreen',
      'playing',
      'currentSong',
      'playlist'
    ]),
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play';
    },
    miniIcon() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini';
    },
    cdClass() { 
      return this.playing ? 'play' : 'play pause';
    },
    disableCls() {
      return this.songReady ? '' : 'disable';
    },
    percent() {
      return this.currentTime / this.currentSong.duration
    }
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE'
    }),
    hideNormal() {
      this.setFullScreen(false);
    },
    openNomal() {
      this.setFullScreen(true);
    },
    togglePlaying() {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing);
    },
    nextSong() {
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        return
      } else {
        let index = this.currentIndex + 1;
        if (index === this.playlist.length) {
           index = 0;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
      this.songReady = false;
    },
    prevSong() {
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        return
      } else {
        let index = this.currentIndex - 1;
        if (index === 0) {
           index = this.playlist.length - 1;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
    },
    updateTime(e) { // 获取播放时间
      this.currentTime = e.target.currentTime
    },
    ready() {
      // 歌曲准备好了才开始播放
      this.songReady = true;
    },
    end() {
      this.nextSong();
    },
    errorPlay() {
      // 加载失败，或者网络错误等
      this.songReady = true;
    },
    onProgressBarChange(percent) { // 拖拽进度条
      const currentTime = this.currentSong.duration * percent;
      this.$refs.audio.currentTime = currentTime;

      if (!this.playing) {
        this.togglePlaying()
      }
    },
    format(interval) {
      interval = interval | 0; //取整
      const minute = interval / 60 | 0;
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    _pad(num, n = 2) { // 补0
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
  },
  watch: {// 采用监听的方式，去实现下一首，上一首，暂停等功能
    currentSong(newSong, oldSong) {
      if(!newSong.id) {
        return
      }
      if(newSong.id === oldSong.id) {
        return
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$refs.audio.play();
      }, 1000);
    },
    playing(newPlaying) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      })
    },
    fullScreen(newValue) {
      if(newValue) {
        setTimeout(() => {
          console.log('小点大点');
        }, 20)
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/css/variable.scss';
@import '../../assets/css/base.scss';

.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;

    .top {
      position: relative;
      margin-bottom: 25px;

      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;

        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        font-size: $font-size-large;
        color: $color-text;
        @extend .no-wrap;
      }
      
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }   
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
      }

      .cd-wrapper {
        position: absolute;
        left: 10%;
        top: 0;
        width: 80%;
        height: 100%;
      }

      .cd {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 10px solid rgba(255, 255, 255, 0.1);
        border-radius: 50%;

        &.play {
          animation: rotate 20s linear infinite normal;
        }

        &.pause {
          animation-play-state: paused;
        }

        .cd-img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          border-radius: 50%;
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;

        .progress-bar-wrapper {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
        }

        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;
        }

        &.time-l {
          text-align: left;
        }
              
        &.time-r {
          text-align: right
        }
              
      }
      .operators {
        display: flex;
        align-items: center;

        .icon {
          flex: 1;
          color: $color-theme;

          &.disable {
            color: $color-theme-d
          }

          &.i-left {
            text-align: right;
          }
            
          &.i-center {
            padding: 0 20px;
            text-align: center;

            i {
              font-size: 40px;
            }
          }
            
          &.i-right {
            text-align: left;
          }
        }

        i {
          font-size: 30px;
        }
      }
         
    }

    .back-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: $color-highlight-background;

    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;

      img {
        border-radius: 50%;

        &.play {
          animation: rotate 10s linear infinite;
        }

        &.pause {
          animation-play-state: paused;
        }
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      text-align: left;
      overflow: hidden;

      .name {
        margin-bottom: 2px;
        @extend .no-wrap;
        font-size: $font-size-medium;
        color: $color-text;
      }
          
      .desc {
        @extend .no-wrap;
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }

    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;

      .icon-play-mini,
      .icon-pause-mini,
      .icon-playlist {
        font-size: 30px;
        color: $color-theme-d;
      }
          
      .icon-mini {
        font-size: 32px;
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
