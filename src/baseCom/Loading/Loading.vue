<template>
<div>
  <mt-spinner type="fading-circle" color="blue"></mt-spinner>
  <div>加载中...</div>
</div>
</template>

<script>
import Vue from 'vue';
import { Spinner } from 'mint-ui';

Vue.component(Spinner.name, Spinner);
export default {
}
</script>
<style lang="scss">

</style>


