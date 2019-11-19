<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" 
              :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset"/>
              <!-- progress-background：内圆，progress-bar：外圆。r：半径，cx、cy：坐标，viewBox跟直径相对应 -->
              <!-- stroke-dasharray：描边和描边距离， stroke-dashoffset：描边偏移-->
    </svg>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        radius: {
            type: Number,
            default: 100
        },
        percent: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            dashArray: Math.PI * 100
        }
    },
    computed: {
        dashOffset() {
            return (1 - this.percent) * this.dashArray
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-circle
    position: relative
    circle
      stroke-width: 8px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: $color-theme-d
      &.progress-bar
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-theme
</style>