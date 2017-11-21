<template>
  <div class="scrollWrapper">
    <div class="bottomInput">
      <div class="footer-info">
        <!-- <i class="icon-mine"></i> -->
        <partial-link conf="find" title="发现音乐">
           <i slot="icon" class="icon-music"></i>
        </partial-link>
      </div>
      <div class="footer-info">
        <partial-link conf="myMusic" title="我的音乐">
          <i slot="icon" class="icon-playlist"></i>
        </partial-link>
      </div>
      <div class="footer-info">
        <partial-link conf="amigo" title="朋友动态">
          <i slot="icon" class="icon-loop"></i>
        </partial-link>
      </div>
      <div class="footer-info">
        <partial-link conf="user" title="账号">
          <i slot="icon" class="icon-mine"></i>
        </partial-link>
      </div>
    </div>
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
.scrollWrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.bottomInput {
  position: fixed;
  border-top: 1px solid #999;
  background: #fff;
  height: 44px;
  // line-height: 44px;
  bottom:0;
  left:0;
  right: 0;
  display: flex;
  justify-content: space-around;

  .footer-info {
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
