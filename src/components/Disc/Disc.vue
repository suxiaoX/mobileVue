<template>
  <transition>
    <music-list :title="title" :bgImage="bgImg" :songs="songs"></music-list>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex';
import { getSongList } from 'api/recommend';
import { ERR_OK } from 'api/config';
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
      'disc'
    ]),
    title() {
      return this.disc.dissname
    },
    bgImg() {
      return this.disc.imgurl
    }
  },
  created () {
    this._getSongList();
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/find/recommend');
        return
      }
      getSongList(this.disc.dissid).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist);
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>
<style lang="scss">
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
    
</style>
