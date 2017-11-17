<template>
  <div>
    <div>
      <h4>搜索列表</h4>
      <ul>
        <li v-for="value in 30" :key="value">选项{{value}}</li>
      </ul>
    </div>
  </div>
</template>
<script>

export default {
}
</script>
<style>

li {
  display: block;
  margin: 20px 0;
}
</style>