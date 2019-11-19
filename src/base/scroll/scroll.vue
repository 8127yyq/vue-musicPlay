<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: null
        },
        listenScroll: {
            type: Boolean,
            default: false
        },
        pullup: {
            type: Boolean,
            default: false
        },
        beforeScroll: {
            type: Boolean,
            default: false
        },
        refreshDelay: {
            type: Number,
            default: 20
        }
    },
    mounted() {
        setTimeout(() => {
            this._initScroll()
        },20)
    },
    methods: {
        _initScroll() {
            if(!this.$refs.wrapper) {
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            })

            if (this.listenScroll) {
                let me = this
                this.scroll.on('scroll', (pos) => {
                    // 写成：this.$emit('scroll', pos)，this是指this.scroll.on('scroll', (pos) => {})里的'scroll'
                    // 监听到scroll事件和位置，pos是个对象有X和Y轴的属性
                    me.$emit('scroll', pos)
                })
            }
            if (this.pullup) {
                // scrollEnd：scroll停止，scrollToEnd：scroll滚动到底部
                this.scroll.on('scrollEnd', () => {
                    if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                        // 小于(this.scroll.maxScrollY + 50)快滚动到底部
                        this.$emit('scrollToEnd')
                    }
                })
            }
            if (this.beforeScroll) {
                this.scroll.on('beforeScrollStart', () => {
                    this.$emit('beforeScroll')
                })
            }
        },
        enable() {
            this.scroll && this.scroll.enable()
        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        scrollTo() {
            // 接收参数到scroll，因此用apply
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
           this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments) 
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh()
            }, this.refreshDelay)
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>