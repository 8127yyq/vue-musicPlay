<template>
  <scroll class="listview" 
          :data="data" 
          ref="listview"
          :listenScroll="listenScroll"
          :probeType="probeType"
          @scroll="scroll"
  >
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item" @click="selectItem(item)">
            <img class="avatar" :src="item.avatar"/>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" 
         @touchstart="onShortcutTouchStart" 
         @touchmove.stop.prevent="onShortcutTouchMove"
    >
      <ul>
        <li v-for="(item, index) in shortcutList" 
            class="item"
            :class="{'current': currentIndex===index}"
            :data-index="index"
        >
        <!-- 当currentIndex和index相等，则右边字体高亮 -->
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {getData} from 'common/js/dom'

// 样式定义每一个元素的高度，通过字体高度差计算后为18
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
  created() {
    // touch不需被观测它的变化，因此不创建在props或data里
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    // 监听实时滚动不节流方式，需更改scroll的probeType=1
    this.probeType = 3
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  props:{
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle() {
      // 拉动‘热门’上面不显示
      if (this.scrollY > 0) {
        return ''
      }
      // 判断this.data[this.currentIndex]有无，有取title，无取空值
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title:''
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      // this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 0) 等于以下一行
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      // 偏差除以18，再取整(可以获0 = math.floor())
      let dalta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      // anchorIndex字符串 + 数字 = 新的字符串 这里要的是整型数
      let anchorIndex = parseInt(this.touch.anchorIndex) + dalta
      this._scrollTo(anchorIndex)
    },
    refresh() {
      this.$refs.listview.refresh()
    },
    scroll(pos){
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        // 点击右边字体多出的黑色部分，不需要变化
        return
      }
      // 滑动右边字体多出的黑色部分
      if (index < 0) {
        // ‘热’上面，不需要变化
        index = 0
      }else if (index > this.listHeight.length - 2) {
        // ‘z’下面
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      // 0： 函数的动画时间为0
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      // 遍历计算每个元素高度
      for (let i=0; i < list.length; i++) {
        // 获取每个group的元素item
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      // llistHeight是比右侧元素height多一个
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      // 第一种情况，当滚动到顶部，newY>0。在滚动时候Y是负值。
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 第二种情况，在中间部分滚动。listHeight.length - 1遍历到最后一个减一，肯定保证有height2
      for(let i=0; i < listHeight.length - 1; i++) {
        // 获取下限
        let height1 = listHeight[i]
        // 获取上限
        let height2 = listHeight[i + 1]
        // 这行没有判断情况：if (!height2 || (-newY > height1 && -newY < height2)) {}其中！height2代表这是最后一个。
        // -newY >= height1，这里用'>='是因：第一个元素0时候是高亮的
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 第三种情况，当滚动到底部且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
    diff (newVal) {
      let fixedTop = (newVal>0 && newVal<TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
