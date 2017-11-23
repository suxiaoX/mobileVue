<template>
  <div class="song-list">
    <ul>
      <li class="item" @click="selectItem(song, index)" v-for="(song, index) in songs" :key="index">
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{song.singer}}&nbsp;·&nbsp;{{song.album}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue';
// import { InfiniteScroll } from 'mint-ui';
// Vue.use(InfiniteScroll);

export default {
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectItem(item, index) {
      this.$emit('select', item, index)
    },
  }
}
</script>
<style lang="scss">
@import '../../assets/css/variable.scss';
@import '../../assets/css/base.scss';

.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
  }
  .content {
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    text-align: left;

    .name {
      color: $color-text;
      @extend .no-wrap;
    }

    .desc {
      margin-top: 4px;
      color: $color-text-d;
      @extend .no-wrap;
    }
  }
}
</style>