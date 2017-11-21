<template>
  <div id="app"  @touchmove.prevent>
    <m-header></m-header>
    <router-view></router-view>
    <m-footer></m-footer>
  </div>
</template>

<script>
import mHeader from  '@/components/mHeader/mHeader';
import mFooter from  '@/components/mFooter/mFooter';

export default {
  name: 'app',
  components: {
    mHeader,
    mFooter
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
  padding-bottom: 45px;
}
</style>
