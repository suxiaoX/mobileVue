<template>
<div class="find">
  <div class="find-link">
    <partial-link conf="find/recommend" title="推荐"></partial-link>
    <partial-link conf="find/singer" title="歌手"></partial-link>
    <partial-link conf="find/rank" title="排行"></partial-link>
    <partial-link conf="find/radio" title="主播电台"></partial-link>
  </div>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</div>
</template>
<script>
import PartialLink from '@/baseCom/PartialLink/PartialLink'
export default {
  components: {
    PartialLink
  }
}
</script>
<style lang="scss">
.find {
  padding-top: 45px;
  position: relative;

  .find-link {
    width: 100%;
    height: 44px;
    line-height: 44px;
    background: #eee;
    position: fixed;
    top: 40px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    box-sizing: border-box;
    

    .link {
      padding: 0 15px;
    }
    a {
      box-sizing: border-box;
    }
    .router-link-active {
      border-bottom: 2px solid green;
    }
  }
}
</style>
