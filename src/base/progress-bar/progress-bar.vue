<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd"
      >
      <!-- prevent阻止拖到浏览器 -->
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {prefixStyle} from 'common/js/dom'

const transform = prefixStyle('transform')
// 按钮小圆球的宽度
const progressBtnWidth = 16

export default {
    props: {
        percent: {
            type: Number,
            default: 0
        }
    },
    created() {
        this.touch = {}
    },
    methods: {
        progressTouchStart(e) {
            // 初始化touch
            this.touch.initiated = true
            // e.touches[0].pageX第一个手指移动的横向坐标
            this.touch.startX = e.touches[0].pageX
            // 记录现在的audio进度条
            this.touch.left = this.$refs.progress.clientWidth
        },
        progressTouchMove(e) {
            if (!this.touch.initiated) {
                return
            }
            const deltaX = e.touches[0].pageX - this.touch.startX
            // 手指移动后的总进度条（大于0且小于bar的宽度）
            const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
            this._offset(offsetWidth)
        },
        progressTouchEnd() {
            this.touch.initiated = false
            this._triggerPercent()
        },
        progressClick(e) {
            // 点击偏移播放。
            const rect = this.$refs.progressBar.getBoundingClientRect()
            const offsetWidth = e.pageX - rect.left
            this._offset(offsetWidth)
            // 点击progressBtn，e.offsetX获取不对。以上getBoundingClientRect函数：获取progressBar到屏幕边界的距离。
            // this._offset(e.offsetX)
            this._triggerPercent()
        },
        _offset(offsetWidth) {
            // pregress的宽度设置
            this.$refs.progress.style.width = `${offsetWidth}px`
            // 小球偏移设置
            this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
        },
        _triggerPercent() {
            const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
            const precent = this.$refs.progress.clientWidth / barWidth
            this.$emit('precentChange', precent)
        }
    },
    watch: {
        percent(newPercent) {
            if (newPercent >= 0 && !this.touch.initiated) {
                // bar总长度
                const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
                // 播放的偏移量%
                const offsetWidth = newPercent * barWidth
                this._offset(offsetWidth)
            }
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>