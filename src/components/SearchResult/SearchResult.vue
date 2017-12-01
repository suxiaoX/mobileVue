<template>
  <better-scroll  ref="suggest"
                  class="suggest"
                  :data="result"
                  @scrollToEnd="searchMore"
                  :pullup="pullup"
  >
    <ul class="suggest-list">
      <li class="suggest-item" @click="selectItem(item)" v-for="(item, index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading class="loading-more" v-show="hasMore && result.length > 0"></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!result.length && keyword">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
    <router-view></router-view>
  </better-scroll>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Loading from '@/baseCom/Loading/Loading';
import BetterScroll from '@/baseCom/BetterScroll/BetterScroll';
import NoResult from '@/baseCom/NoResult/NoResult';

import { createSong } from 'common/tools/song';
import { debounce } from 'common/tools/util';
import Singer from 'common/tools/singer';
import { search } from 'api/search.js';
import { ERR_OK } from 'api/config.js';

const TYPE_SINGER = 'singer';
const perpage = 20;
export default {
  data () {
    return {
      keyword: this.$store.state.keywords,
      page: 1,
      pullup: true, // 上拉刷新
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
  // created () {
  //   this.$watch('keywords', (newQuery) => {
  //     console.log(newQuery);
  //     if (newQuery) {
  //       console.log(newQuery);
  //       this._search();
  //     }
  //   })
  // },
  computed: {
    ...mapGetters([
      'keywords'
    ])
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong',
      'saveSearchHistory'
    ]),
    _search() {
      this.page = 1;
      this.hasMore = true;
      this.$refs.suggest.scrollTo(0, 0);
      search(this.keywords, this.page, this.showSinger, perpage).then(res => {
        if(res.code === ERR_OK) {
          this.result = this._genResult(res.data);
          this._checkMore(res.data);
        }
      })
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++;
      search(this.keywords, this.page, this.showSinger, perpage).then(res => {
        if(res.code === ERR_OK) {
          this.result = this.result.concat(this._genResult(res.data));
          this._checkMore(res.dada);
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
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        });
        this.setSinger(singer);
      } else {
        this.insertSong(item);
      }

      this.$emit('saveSearch');
    },
    _checkMore(data) {
      if (data) {
        const song = data.song;
        if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
          this.hasMore = false;
        }
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

  .loading-more {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
}
    
</style>