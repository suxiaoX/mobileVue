<template>
  <div class="hello">
    <mt-header fixed :title="msg">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/" slot="left">
        <mt-button @click="handleClose">&nbsp;关闭</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <!-- <Search /> -->
  </div>
</template>
<script>
import Vue from 'vue';
import navbar from '@/components/Navbar/navbar';
import Search from '@/baseCom/Search/Search';
import { Header, Button } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome'
    }
  },
  components: {
    navbar,
    Search
  },
  methods: {
    handleClose () {
      console.log('hahah')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// @import '../../static/css/icon.scss';

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  // color: #42b983;
}
.mint-button-icon {
  vertical-align: -1px;
  display: inline-block;
  margin-right: -5px;
}
</style>