<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder" @focus="focus" />
    <i class="icon-dismiss"></i>
  </div>
</template>
<script>
export default {
  data () {
    return {
      query: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  methods: {
    clear() {
      this.query = '';
    },
    setQuery(query) {
      this.query = query;
    },
    blur() {
      this.$refs.query.blur();
    },
    focus() {
      this.$router.push('/search');
    },
    created () {
      this.$watch('query', (newQuery) => {
        this.$emit('query', newQuery);
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/css/variable.scss';
@import '../../assets/css/reset.scss';

.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background: #eee;
  // border-bottom: 1px solid #666;
  // border-radius: 6px;
  
  .icon-search {
    font-size: 24px;
    color: $color-background;
  }
    
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    // background: $color-highlight-background;
    color: #666;
    font-size: $font-size-medium;
    &::placeholder {
      color: $color-text-d;
    }
  }
    
  .icon-dismiss {
    font-size: 16px;
    color: $color-background;
  }
}
    
</style>

