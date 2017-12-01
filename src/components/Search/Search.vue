<template>
  <div class="search">
    <div class="shortcut-wrapper" v-show="!this.$store.state.keywords">
      <better-scroll ref="shortcut" class="shortcut">
        <div class="hot-key">
          <h3 class="title">热门搜索</h3>
          <ul>
            <li class="item" @click="addKeywords(item.k)" v-for="(item, index) in hotKey" :key="index">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
        <div class="search-history">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear">
              <i class="icon-clear" @click="clearSearchHistory"></i>
            </span>
          </h1>
          <search-list @delete="deleteSearchHistory" @select="addKeywords" :searches="searchHistory"></search-list>
        </div>
      </better-scroll>
    </div>
    <div class="search-result" v-show="this.$store.state.keywords" ref="searchResult">
      <search-result ref="suggest" @delete="deleteSearchHistory" @saveSearch="saveSearch"></search-result>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Loading from '@/baseCom/Loading/Loading';
import BetterScroll from '@/baseCom/BetterScroll/BetterScroll';
import SearchResult from '@/components/SearchResult/SearchResult';
import SearchList from '@/baseCom/SearchList/SearchList'
import { getHotKey } from 'api/search.js';
import { ERR_OK } from 'api/config.js';

const TYPE_SINGER = 'TYPE_SINGER';
const perpage = 20;

export default {
  data () {
    return {
      query: this.$store.state.keywords,
      hotKey: [],
      page: 1,
      hasMore: true
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
    SearchResult,
    SearchList
  },
  created () {
    this._getHotkey();
  },
  computed: {
    ...mapGetters([
      'keywords',
      'searchHistory'
    ])
  },
  methods: {
    saveSearch() {
      this.saveSearchHistory(this.keywords);
    },
    _getHotkey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    addKeywords(keyword) {
      this.setKeywords(keyword);
    },
    ...mapMutations({
      setKeywords: 'SET_KEYWORDS'
    }),
     ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  }
}
</script>
<style lang="scss">
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';
@import '../../assets/css/base.scss';
.search{
  .search-box-wrapper{
    margin: 20px;
  }
  .shortcut-wrapper{
    position: fixed;
    top: 48px;
    bottom: 0;
    width: 100%;
    .shortcut{
      height: 100%;
      overflow: hidden;
      .hot-key{
        margin: 0 20px 20px 20px;
        .title{
          margin-bottom: 20px;
          font-size: $font-size-medium;
          // color: $color-text-l;
        }
        .item{
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
      .search-history{
        position: relative;
        margin: 0 20px;
        .title{
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          // color: $color-text-l;
          .text{
            flex: 1;
          }
          .clear{
            .icon-clear{
              font-size: $font-size-medium;
              // color: $color-text-d;
            }
          }
        }
      }
    }
  }
  .search-result{
    position: fixed;
    width: 100%;
    top: 45px;
    bottom: 0;
    background: $color-background;
  }
}
</style>
