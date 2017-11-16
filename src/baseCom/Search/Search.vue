<template>
  <mt-search
    v-model="value"
    :result.sync="result"
    cancel-text="取消"
    placeholder="搜索">
  </mt-search>
</template>
<script>
import Vue from 'vue'
import { Search } from 'mint-ui'

Vue.component(Search.name, Search)

export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    result () {
      console.log(222)
    }
  }
}
</script>

