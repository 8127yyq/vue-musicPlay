<template>
  <div class="MV-recommend">
    <h1 class="title">MV推荐</h1>
    <div class="mvscroll" ref="mvscroll">
      <ul class="mv-ul" ref="mvUl">
        <li class="mv-item" v-for="item in MvList" @click="selecMVList(item)">
          <div class="mv-img">
            <img width="150" height="100" :src="item.picurl"/>
          </div>
          <div class="mv-text">
            <h2 class="mv-name" v-html="item.title"></h2>
            <div class="mv-singer">
              <div v-for="sin in item.singers">
                <p v-html="sin.name"></P>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll"
import {getMvList} from 'api/search'
import {ERR_OK} from 'api/config'
import {mapMutations} from 'vuex'

export default {
  data() {
    return {
      MvList: []
    }
  },
  created() {
    this._getMvList(),
    this.$nextTick(() => {
      this.perScroll()
    })
  },
  methods: {
    _getMvList(){
      getMvList().then((res) => {
        // if (res.code === ERR_OK) {
        this.MvList = res.data.mv_list.data.list
        //   console.log(res)
        // }
      })
    },
    selecMVList(item) {
      this.$router.push({
        path: `/search/list/${item.vid}`
      })
      // 更改radio在state
      this.setMvList(item)
    },
    perScroll() {
      // li子元素，每个子元素的宽度为160px
      let width = 20 * 160
      this.$refs.mvUl.style.width = width + "px";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.mvscroll, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      })
    },
    ...mapMutations({
      setMvList: 'SET_MV_LIST'
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .MV-recommend
    position: relative
    margin: 0 20px
    .title
      display: flex
      align-items: center
      height: 40px
      font-size: $font-size-medium
      color: $color-text-l
    .mvscroll
      height: 100%
      width: 100%
      overflow: hidden
      .mv-ul
        display: flex
        // flex-wrap: wrap 自动换行
        .mv-item
          display: flex
          flex-direction: column
          box-sizing: border-box
          align-items: center
          padding: 0 0px 20px 5px
          .mv-img
            flex: 1
            width: 150px
            padding: 0 5px 5px 0
            vertical-align: text-top
          .mv-text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            overflow: hidden
            font-size: $font-size-medium
            text-align: center
            line-height: 15px
            .mv-name
              margin-bottom: 10px
              color: $color-text
              flex-wrap: wrap
            .mv-singer
              color: $color-text-d
</style>