<template>
  <div class="link">
    <router-link v-bind:to="'/' + conf">
      <slot name="icon"></slot>
      <span>{{title}}</span>
    </router-link>
  </div>
  
</template>
<script>
export default {
  props: ['conf', 'title']
};
</script>
<style lang="scss">
.link {
  width: 100%;
  height: 100%;

  .router-link-active {
    color: green;
  }
  
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>