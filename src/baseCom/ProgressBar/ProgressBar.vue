<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
const progressBtnWidth = 16;

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.touch = {}
  },
  methods: {
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.progressBtn.style['transform'] = `translate3d(${offsetWidth}px,0,0)`;
    },
    progressTouchStart(e) {
      this.touch.initiated = true; // 用于控制拖动期间不影响播放，拖放结束才播放，下不然watch一直会刷新
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const moveSize = e.touches[0].pageX - this.touch.startX;
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + moveSize))
      this._offset(offsetWidth);
    },
    progressTouchEnd(e) {
      this.touch.initiated = false;
      this._triggerPercent();
    },
    progressClick(e) { // 点击时获取距离位置，并重置位置 重新播放音乐
      const rect = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left; // rect.left bar 离屏幕左边的距离 e.pageX 点击位置离屏幕左边的距离 
      this._offset(offsetWidth);
      this._triggerPercent();
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const percent = this.$refs.progress.clientWidth / barWidth;
      this.$emit('percentChange', percent);
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        const offsetWidth = newPercent * barWidth;
        this._offset(offsetWidth);
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/css/variable.scss';

  .progress-bar{
    height: 30px;

    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);

      .progress {
        position: absolute;
        height: 100%;
        background: $color-theme;
      }
       
      .progress-btn-wrapper {
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;

        .progress-btn {
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid $color-text;
          border-radius: 50%;
          background: $color-theme;
        }
      }
    }
  }
    
</style>
