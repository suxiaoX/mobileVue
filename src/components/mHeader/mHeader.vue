<template>
  <div class="head">
    <search-box @show="show"></search-box>
    <!-- <mt-header fixed :title="msg"> -->
      <!-- <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/" slot="left">
        <mt-button @click="handleClose">&nbsp;关闭</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button> -->
    <!-- </mt-header> -->
    <!-- <Search /> -->
    <div class="cancle" @click="cancle()" v-show="showCancle">取消</div>
  </div>
</template>
<script>
// import Vue from 'vue';
// import navbar from '@/components/Navbar/navbar';
// import Search from '@/baseCom/Search/Search';
import { mapMutations, mapGetters } from 'vuex';
import SearchBox from '@/baseCom/SearchBox/SearchBox';
// import { Header, Button } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Button.name, Button);

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome',
      showCancle: false
    }
  },
  components: {
    SearchBox
  },
  methods: {
     ...mapMutations({
      setKeywords: 'SET_KEYWORDS'
    }),
    show(bool) {
      this.showCancle = bool;
    },
    cancle() {
      this.showCancle = false;
      this.$router.go(-1);
      // this.setKeywords('');
    }
  },
  computed: {
    ...mapGetters([
      'keywords'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// @import '../../static/css/icon.scss';
.head {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  display: flex;
  align-items: center;
  background: #eee;
  
  .cancle {
    width: 10%;
    padding-right: 10px;
  }
}
// h1, h2 {
//   font-weight: normal;
// }
// ul {
//   list-style-type: none;
//   padding: 0;
// }
// li {
//   display: inline-block;
//   margin: 0 10px;
// }
// a {
//   // color: #42b983;
// }
// .mint-button-icon {
//   vertical-align: -1px;
//   display: inline-block;
//   margin-right: -5px;
// }
</style>