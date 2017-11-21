<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" ref="list"></list-view>
  </div>
</template>
<script>
import ListView from '@/baseCom/ListView/ListView';
import { getSingerList } from 'api/singer';
import { ERR_OK } from 'api/config';
import Singer from 'common/tools/singer';

const HOT_NAME = '热门';
const HOT_SINGER_LEN = 10;

export default {
  data() {
    return {
      singers: []
    }
  },
  components: {
    ListView
  },
  mounted () {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._sortList(res.data.list);
        }
      })
    },
    _sortList(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      // 处理数据，取我们需要的
      list.forEach((item, index) => {
        // 添加热门数据
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          )
        }
        // 增加A-Z
        const key = item.Findex;

        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }

        map[key].items.push(
          new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        )
      });
      // 为了得到有序列表，我们需要处理 map
      const ret = [];
      const hot = [];

      for (const key in map) {
        const val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }

      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      })

      return hot.concat(ret);
    }


  }
}
</script>
