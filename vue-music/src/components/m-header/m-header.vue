<template>
  <div class="m-header">
    <div class="icon"></div>
    <div class="text">Chicken Music</div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {}
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable.styl'
  @import '../../common/stylus/mixin'
  .m-header
    position relative
    height 44px
    text-align center
    color: $color-theme
    text-align center
    font-size 0
    padding-top 5px
    box-sizing border-box
    .icon
      display inline-block
      width 30px
      height 32px
      background url("default.png")
      vertical-align top
      background-size 100%
      margin-right 6px
    .text
      display inline-block
      color $color-text
      vertical-align top
      font-size $font-size-large
      margin-top 10px
</style>
