<template>
  <div class="player" v-show="playlist.length>0">
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="top">
          <div class="back">
            <i class="icon-back" @click="hideNormal()"></i>
          </div>
          <h2 class="title" v-html="currentSong.name"></h2>
          <h4 class="subtitle" v-html="currentSong.singer"></h4>
        </div>
        <div class="middle"
             @touchstart.prevent="middleTouchStart"
             @touchmove.prevent="middleTouchMove"
             @touchend="middleTouchEnd"
              >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdClass">
                <img class="cd-img" :src="currentSong.image" alt="" />
              </div>
            </div>
          </div>
          <better-scroll class="middle-r" ref="middleR" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p ref="lyricLine"
                    class="text"
                    :class="{'current': currentLineNum === index}"
                    :key="index"
                    v-for="(line, index) in currentLyric.lines">{{line.txt}}</p>
              </div>
            </div>
          </better-scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" :class="disableCls" @click="changeMode">
              <i :class="iconMode"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i class="icon-prev" @click="prevSong()"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i :class="playIcon" @click="togglePlaying()"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i class="icon-next" @click="nextSong()"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
        <div class="back-img">
          <img width="100%" height="100%" :src="currentSong.image" alt="" />
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="openNomal()">
        <div class="icon">
          <img :src="currentSong.image" :class="cdClass" width="40" height="40" alt="" />
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <progress-circle :radius="radius" :percent="percent">
             <i @click.stop="togglePlaying()" class="icon-mini" :class="miniIcon"></i>
          </progress-circle>     
        </div>
        <div class="control" @click.stop="showPlayList()">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <play-list ref="playlist"></play-list>
    <audio ref="audio" :src="currentSong.url" @play="ready" @error="errorPlay"  @timeupdate="updateTime" @ended="end"></audio>
  </div>  
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import animations from 'create-keyframe-animation';
import Lyric from 'lyric-parser';

import { playMode } from 'common/tools/config';
import { rearRange } from 'common/tools/util';
import ProgressBar from '@/baseCom/ProgressBar/ProgressBar';
import ProgressCircle from '@/baseCom/ProgressCircle/ProgressCircle';
import BetterScroll from '@/baseCom/BetterScroll/BetterScroll';
import PlayList from '@/components/PlayList/PlayList';

export default {
  data () {
    return {
      songReady: false,
      currentTime: 0,
      radius: 32,
      currentShow: 'cd',
      currentLyric: null,
      currentLineNum: 0,
      playingLyric: ''
    }
  },
  components: {
    ProgressBar,
    ProgressCircle,
    BetterScroll,
    PlayList
  },
  created () {
    this.touch = {}
  },
  computed: {
    ...mapGetters([
      'currentIndex',
      'fullScreen',
      'playing',
      'currentSong',
      'playlist',
      'mode',
      'sequenceList'
    ]),
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random';
    },
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
      setPlayingState: 'SET_PLAYING_STATE',
      setPlayMode: 'SET_PLAY_MODE',
      setPlaylist: 'SET_PLAYLIST'
    }),
    ...mapActions([
      'savePlayHistory'
    ]),
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
    loop () { // 循环播放
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      this.setPlayingState(true);
    },
    nextSong() {
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        this.loop();
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
      // 保存播放历史
      this.savePlayHistory(this.currentSong);
    },
    end() { // 播放模式为单曲循环的时候，结束后重新开始
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.nextSong();
      }
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
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 500)
      }
    },
    // 运动函数 animations
    enter(el, done) {
      const {x, y, scale} = this._getPosAndScale();

      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      };

      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 500,
          easing: 'linear'
        }
      })

      animations.runAnimation(this.$refs.cdWrapper, 'move', () => {
        animations.unregisterAnimation('move');
        this.$refs.cdWrapper.style.animation = '';
      });
    },
    afterEnter() {
      console.log('全部进入')
      // animations.unregisterAnimation('move');
      // this.$refs.cdWrapper.style.animation = '';
      // this.$refs.cdWrapper.style.transform = '';
    },
    leave(el, done) { // 这个效果目前还没实现，尴尬
      this.$refs.cdWrapper.style.transition = "all 0.5s";
      const {x, y, scale} = this._getPosAndScale();
      this.$refs.cdWrapper.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener('transitionend', done);
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = '';
      this.$refs.cdWrapper.style.transform = '';
    },
    changeMode() {
      const mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      let list = null;
      if (this.mode === playMode.random) {
        list = rearRange(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this._resetCurrendIndex(list);
      this.setPlaylist(list);
    },
    _resetCurrendIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    _getPosAndScale() {
      const targetWidth = 40; // 目标宽度，mini-player的图片宽度
      const paddingLeft = 40; // 目标mini-player的图片离左边屏幕的距离
      const paddingBottom = 30; // 目标mini-player的图片离底部屏幕的距离
      const paddingTop = 30; // 目标mini-player的图片离父容器顶部的距离
      const width = window.innerWidth * 0.8; // normal图片父容器的宽度
      const scale = targetWidth / width; // 计算出两个图片的比列
      const x = -((window.innerWidth / 2) - paddingLeft); // 计算出要移动的x方向的距离
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom; // 计算出要移动的y方向的距离
      
      return {
        x,
        y,
        scale
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
    // 滑动显示歌词或者CD
    middleTouchStart(e) {
      this.touch.initiated = true;
      // 判断是否是一次移动
      this.touch.moved = false;
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
    },
    middleTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0];
      const moveXsize = touch.pageX - this.touch.startX;
      const moveYsize = touch.pageY - this.touch.startY;
      // 上滑
      if (Math.abs(moveYsize) > Math.abs(moveXsize)) {
        return
      }
      if (!this.touch.moved) {
        this.touch.moved = true;
      }
      // 判断 middle的位置，如果在第一个CD 那么就是原始位置，在显示歌词位置，就是移动一个屏幕的距离
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth;
      // 获取位移的距离
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + moveXsize));
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
      this.$refs.middleR.$el.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
      this.$refs.middleR.$el.style.transitionDuration = 0;
      this.$refs.middleL.style.opacity = 1 - this.touch.percent;
      this.$refs.middleL.style.transitionDuration = 0;

    },
    middleTouchEnd() {
      if (!this.touch.moved) {
        return
      }
      let offsetWidth;
      let opacity;
      // 判断左滑，或者右滑 左滑动 @percent是一个递增的过程，右滑动 @percent是一个递减的过程，
      if (this.currentShow === 'cd') {
        if (this.touch.percent > 0.2) {
          offsetWidth = -window.innerWidth;
          opacity = 0;
          this.currentShow = 'lyric';
        } else {
          offsetWidth = 0;
          opacity = 1;
        }
      } else {
        if (this.touch.percent < 0.8) {
          offsetWidth = 0;
          this.currentShow = 'cd';
          opacity = 1;
        } else {
          offsetWidth = -window.innerWidth;
          opacity = 0;
        }
      }

      const delay = 350;
      this.$refs.middleR.$el.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
      this.$refs.middleR.$el.style.transitionDuration = `${delay}ms`;
      this.$refs.middleL.style.opacity = opacity;
      this.$refs.middleL.transitionDuration = `${delay}ms`;
      this.touch.initiated = false;
    },
    getLyric() {
      this.currentSong.getLyric().then(lyric => {
        this.currentLyric = new Lyric(lyric, this.handleLyric);
        if (this.playing) {
          this.currentLyric.play()
        }
      }).catch(() => {
        console.log('no lyric')
        this.currentLyric = null;
        this.playingLyric = '';
        this.currentLineNum = 0;
      })
    },
    handleLyric({lineNum, txt}) {
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5];
        this.$refs.middleR.scrollToElement(lineEl, 500);
      } else {
        this.$refs.middleR.scrollTo(0, 0, 500);
      }
      this.playingLyric = txt;
    },
    showPlayList() {
      this.$refs.playlist.show();
    }
  },
  watch: {// 采用监听的方式，去实现下一首，上一首，暂停等功能
    currentSong(newSong, oldSong) {
      if(!newSong.id) {
        return
      }
      if(newSong.id === oldSong.id) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLineNum = 0
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$refs.audio.play();
        this.getLyric();
      }, 1000);
      // this.$nextTick(() => {
      //   this.$refs.audio.play();
      //   this.getLyric();
      // })
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

    &.normal-enter-active,
    &.normal-leave-avtive {
      transition: all 0.4s;

      .top,
      .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100px, 0);
      }

      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }

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

      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-size: $font-size-medium;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;

            &.current {
              color: $color-text;
            }
          }
        }
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
      bottom: 40px;
      width: 100%;

      .dot-wrapper {
        text-align: center;
        font-size: 0;
        padding: 10px 0;

        .dot {
           display: inline-block;
            vertical-align: middle;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: $color-text-l;

            &.active {
              width: 20px;
              border-radius: 5px;
              background: $color-text-ll;
            }
             
        }
      }

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

    &.mini-enter-active,
    &.mini-leave-active {
       transition: all 0.4s;
    }
       
    &.mini-enter,
    &.mini-leave-to {
       opacity: 0;
    }
       
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
        position: absolute;
        top: 0;
        left: 0;
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
