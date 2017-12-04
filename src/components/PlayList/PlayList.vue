<template>
<transition name="list-fade">
  <div class="playlist" @click="hide()" v-show="showFlag">
    <div class="list-wrapper" @click.stop>
      <div class="list-header">
          <h1 class="title">
            <i class="icon"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
          </h1>
        </div>
      <better-scroll ref="listContent" :data="sequenceList" class="list-content" :refreshDelay="refreshDelay">
        <transition-group ref="list" name="list" tag="ul">
          <li class="item" v-for="(item, index) in sequenceList" :key="item.id">
            <i class="current" :class="getCurrentIcon(item)"></i>
            <span class="text">{{item.name}}</span>
            <span class="like">
              <i class="icon-favorite"></i>
            </span>
            <span class="delete">
              <i class="icon-delete"></i>
            </span>
          </li>
        </transition-group>
      </better-scroll>
      <div class="list-operate">
        <div class="add">
          <i class="icon-add"></i>
          <span class="text">添加歌曲到队列</span>
        </div>
      </div>
      <div @click="hide()" class="list-close">
        <span>关闭</span>
      </div>
    </div>
    <confirm ref="confirm" text="是否清空播放列表" confirmBtnText="清空"></confirm>
  </div>
</transition> 
</template>
<script>
import { playerMixin } from 'common/tools/mixin';
import { playMode } from 'common/tools/config';

import Confirm from '@/baseCom/Confirm/Confirm';
import BetterScroll from '@/baseCom/BetterScroll/BetterScroll';
export default {
  mixins: [playerMixin],
  data () {
    return {
      showFlag: false,
      refreshDelay: 120
    }
  },
  components: {
    Confirm,
    BetterScroll
  },
  computed: {
    modeText() {
      return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
    }
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    showConfirm() {
      this.$refs.confirm.show();
    },
    getCurrentIcon(item) {
      if (this.currentSong.id === item.id) {
        return 'icon-play'
      }
      return ''
    },
  }
}
</script>
<style lang="scss">
  @import '../../assets/css/variable.scss';
  @import '../../assets/css/base.scss';

  .playlist {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 0;
    z-index: 200;
    background-color: $color-background-d;

    &.list-fade-enter-active,
    &.list-fade-leave-active {
      transition: opacity 0.3s;

      .list-wrapper {
        transition: all 0.3s;
      }
    }
      
    &.list-fade-enter,
    &.list-fade-leave-to{
      opacity: 0;

      .list-wrapper {
         transform: translate3d(0, 100%, 0);
      }
       
    }
      
    &.list-fade-enter,
    .list-wrapper {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: $color-highlight-background;
      .list-header {
        position: relative;
        padding: 20px 30px 10px 20px;
        .title {
          display: flex;
          align-items: center;
          .icon {
            margin-right: 10px;
            font-size: 30px;
            color: $color-theme-d;
          }
           
          .text {
            flex: 1;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
           
          .clear {
            @extend .extend-click;
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
       
      .list-content {
        max-height: 240px;
        overflow: hidden;
        .item {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 30px 0 20px;
          overflow: hidden;
          &.list-enter-active, &.list-leave-active {
            transition: all 0.1s;
          }
            
          &.list-enter,
          &.list-leave-to {
            height: 0;
          }
            
          .current {
            flex: 0 0 20px;
            width: 20px;
            font-size: $font-size-small;
            color: $color-theme-d;
          }
           
          .text {
            flex: 1;
            @extend .no-wrap;
            font-size: $font-size-medium;
            color: $color-text-d;
          }
            
          .like {
            @extend .extend-click;
            margin-right: 15px;
            font-size: $font-size-small;
            color: $color-theme;
            .icon-favorite {
              color: $color-sub-theme;
            }
              
          }
            
          .delete {
            @extend .extend-click;
            font-size: $font-size-small;
            color: $color-theme;
          }
        }
      }
        
      .list-operate {
        width: 140px;
        margin: 20px auto 30px auto;
        .add {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border: 1px solid $color-text-l;
          border-radius: 100px;
          color: $color-text-l;
          .icon-add {
             margin-right: 5px;
            font-size: $font-size-small-s;
          }
           
          .text {
            font-size: $font-size-small;
          }
        }
      }
       
      .list-close {
        text-align: center;
        line-height: 50px;
        background: $color-background;
        font-size: $font-size-medium-x;
        color: $color-text-l;
      }
    }
  }
   
</style>
