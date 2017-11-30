<template>
  <better-scroll  ref="suggest"
                  class="suggest"
                  :data="result"
                  :pullup="pullup"
  >
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item, index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
    <div class="no-result-wrapper" v-show="!result.length">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </better-scroll>
</template>
<script>
import { mapGetters } from 'vuex';
import Loading from '@/baseCom/Loading/Loading';
import BetterScroll from '@/baseCom/BetterScroll/BetterScroll';
import NoResult from '@/baseCom/NoResult/NoResult';

import { createSong } from 'common/tools/song';
import { search } from 'api/search.js';
import { ERR_OK } from 'api/config.js';

const TYPE_SINGER = 'singer';
const perpage = 20;
export default {
  data () {
    return {
      page: 1,
      pullup: true,
      beforeScroll: true,
      hasMore: true,
      result: []
    }
  },
  props: {
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Loading,
    BetterScroll,
    NoResult
  },
  computed: {
    ...mapGetters([
      'keywords'
    ])
  },
  methods: {
    _search() {
      this.page = 1;
      this.hasMore = true;
      this.$refs.suggest.scrollTo(0, 0);
      search(this.keywords, this.page, this.showSinger, perpage).then(res => {
        if(res.code === ERR_OK) {
          this.result = this._genResult(res.data);
        }
      })
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    _genResult(data) {
      let ret = [];
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list));
      }
      return ret;
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      })
      return ret;
    }
  },
  watch: {
    keywords(newValue) {
      this._search();
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';
@import '../../assets/css/base.scss';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 20px 30px;
      .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
      }
        
      .icon {
        flex: 0 0 30px;
        width: 30px;
        [class^="icon-"] {
          font-size: 14px;
          color: $color-text-d;
        }
      }
        
      .name {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-d;
        overflow: hidden;

        .text {
          @extend .no-wrap;
        }
      }
        
    .no-result-wrapper {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
    
</style>