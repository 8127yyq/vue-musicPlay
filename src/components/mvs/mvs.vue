<template>
  <div ref="mvs" class="mvs">
    <div class="back" @click="back">
        <i class="icon-back"></i>
    </div>
    <mv-list></mv-list>
  </div>
</template>

<script type="text/ecmascript-6">
import MvList from 'components/mv-list/mv-list'
export default {
  methods: {
    selecMVList(item) {
        let id = this.$route.params.id
      },
    back() {
      // this.$router.back()
      this.$router.push('/search')
    }
  },
  components: {
    MvList
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .mvs
    position: fixed
    z-index: 1
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
</style>