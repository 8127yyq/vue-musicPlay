<template>
  <div class="radio" ref="radio">
    <h1 class="list-title" @select="selectRadio">{{radioState.name}}电台</h1>
    <div class="back" @click="back">
        <i class="icon-back"></i>
    </div>
    <radios></radios>
  </div>
</template>

<script type="text/ecmascript-6">
import Radios from 'components/radios/radios'
import {mapGetters, mapMutations} from 'vuex'

  export default {
    computed:{
      // radioState:function(){
      //   return this.$store.getters.radio
      // },
      ...mapGetters({
        radioState: 'radio'
      }),
      radioId() {
        return this.radioState.radioList[0].radioId
      }
    },
    methods: {
      selectRadio(item) {
        id = this.$route.params.id
      },
      back() {
        this.$router.back()
      }
    },
    components: {
      Radios
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .radio
    position: fixed
    z-index: 100
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
    .list-title
      height: 55px
      line-height: 65px
      text-align: center
      font-size: 18px
      color: $color-theme
</style>