<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder" @focus="focus" />
    <i class="icon-dismiss" @click="clear" v-show="query"></i>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';

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
  // computed: {
  //   ...mapGetters([
  //     'keywords'
  //   ])
  // },
  methods: {
    ...mapMutations({
      setKeywords: 'SET_KEYWORDS'
    }),
    clear() {
      this.query = '';
    },
    setQuery(query) {
      this.setKeywords(query);
    },
    blur() {
      this.$refs.query.blur();
    },
    focus() {
      const query = this.$refs.query.value;
      this.$router.push('/search');
      this.$emit('show', true);
      if (query) {
        this.setQuery(query);
      }
    }
  },
  created () {
    this.$watch('query', (newQuery) => {
      console.log(newQuery);
      // if (newQuery.length > 0) {
      //   this.setKeywords(newQuery);
      // }
    })
  },
  // mounted () {
  //   this.$watch('query', (newQuery) => {
  //   console.log(newQuery);
  //   // if (newQuery.length > 0) {
  //   //   this.setKeywords(newQuery);
  //   // }
  //   })
  // },
   computed: {
    ...mapGetters([
      'keywords'
    ])
  },
  watch: {
    query(newValue) {
      this.setKeywords(newValue);
    },
    keywords(newValue) {
      this.query = newValue;
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
  position: relative;
  // border-bottom: 1px solid #666;
  // border-radius: 6px;
  
  .icon-search {
    font-size: 24px;
    color: $color-background;
    position: absolute;
    left: 12px;
  }
    
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: normal;
    height: 26px;
    // background: $color-highlight-background;
    color: #666;
    font-size: $font-size-medium;
    border-radius: 26px;
    padding-left: 25px; 
    &::placeholder {
      color: #989;
    }
  }
    
  .icon-dismiss {
    font-size: 16px;
    color: $color-background;
    position: absolute;
    right: 20px;
  }
}
    
</style>

