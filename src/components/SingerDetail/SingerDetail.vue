<template>
  <transition name="slide">
    <div class="singer-detail">SingerDetail</div>
  </transition>
</template>
<script>
import { getSingerDetail } from 'api/singer';
import {ERR_OK} from 'api/config';
import { mapGetters } from 'vuex';
import { createSong } from 'common/tools/song';

export default {
  data () {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  mounted () {
    this._getSingerDetail();
  },
  methods: {
    _getSingerDetail () {
      if (!this.singer.id) {
        this.$router.push('/find/singer');
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list);
        }
      })
    },
    _normalizeSongs (list) {
      const ret = [];
      list.forEach((item) => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      });
      return ret
    }
  }
}
</script>
<style lang="scss">
  .singer-detail {
    width: 100%;
    background: red;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s;
  }
    
  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }

</style>
