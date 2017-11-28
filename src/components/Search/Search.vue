<template>
  <div class="search">
    <div class="shortcut-wrapper">
      <better-scroll ref="shortcut" class="shortcut">
        <div class="hot-key">
          <h3 class="title">热门搜索</h3>
          <ul>
            <li class="item" v-for="(item, index) in hotKey" :key="index">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
      </better-scroll>
    </div>
    <div class="search-result">
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
import Loading from '@/baseCom/Loading/Loading';
import BetterScroll from '@/baseCom/BetterScroll/BetterScroll';
import { getHotKey, search } from 'api/search.js';
import { ERR_OK } from 'api/config.js';

const TYPE_SINGER = 'TYPE_SINGER';
const perpage = 20;

export default {
  data () {
    return {
      query: '',
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
    BetterScroll
  },
  created () {
    this._getHotkey();
  },
  computed: {
    
  },
  methods: {
    _getHotkey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    search() {
      this.page = 1;
      this.hasMore = true;
      search(this.query, this.page, this.showSinger, perpage).then(res => {
        if(res.code === ERR_OK) {
          console.log(res.data);
        }
      })
    }
  },
  watch: {
    query(newQuery) {
      if (newQuery) {
        this.search();
        console.log(2121212)
      }
    }
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
          color: $color-text-l;
          .text{
            flex: 1;
          }
          .clear{
            .icon-clear{
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
  }
  .search-result{
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
  }
}
</style>
