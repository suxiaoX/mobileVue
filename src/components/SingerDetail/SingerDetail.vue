<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImg" :songs="songs"></music-list>
  </transition>
</template>
<script>
import { getSingerDetail } from 'api/singer';
import { ERR_OK } from 'api/config';
import { mapGetters } from 'vuex';
import { createSong } from 'common/tools/song';
import MusicList from '@/components/MusicList/MusicList';

export default {
  data () {
    return {
      songs: []
    }
  },
  components: {
    MusicList
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title() {
      return this.singer.name;
    },
    bgImg() {
      return this.singer.avatar;
    }
  },
  mounted () {
    
  },
  created () {
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
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s;
  }
    
  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }

</style>
