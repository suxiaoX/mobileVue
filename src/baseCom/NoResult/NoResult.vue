<template>
  <div class="no-result">
    <div class="no-result-icon">
      <i class="icon-close"></i>
    </div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/variable.scss';
  @import '../../assets/css/reset.scss';

  .no-result {
    text-align: center;

    .no-result-icon {
      width: 86px;
      height: 90px;
      margin: 0 auto;
      background-size: 86px 90px;

      i {
        font-size: 50px;
      }
    }

    .no-result-text {
      margin-top: 30px;
      font-size: $font-size-medium;
      // color: $color-text-d;
    }
  }
    
</style>