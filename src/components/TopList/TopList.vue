<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgImg" :songs="songs"></music-list>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex';
import { getMusicList } from 'api/rank.js';
import { ERR_OK } from 'api/config';
import { createSong } from 'common/tools/song';
import MusicList from '@/components/MusicList/MusicList';
export default {
  data () {
    return {
      songs: [],
      rank: true
    }
  },
  components: {
    MusicList
  },
  created () {
    this._getMusicList();
  },
  computed: {
    ...mapGetters([
      'topList'
    ]),
    title() {
      return this.topList.topTitle
    },
    bgImg() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    }
  },
  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/find/rank')
        return
      }
      getMusicList(this.topList.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist);
        }
      })
    },
     _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        const musicData = item.data
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

</style>
