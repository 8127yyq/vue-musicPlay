<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <!-- <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" @click="loadImage" :src="item.picUrl"/>
              </a>
            </div>
          </slider>
        </div> -->
        <div class="radio-list">
          <h1 class="radio-title">最新电台推荐</h1>
          <ul>
            <li class="radio-item" v-for="item in radioList"
                v-html="item.name"  @click="selectRadio(item)"
            ></li>
          </ul>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item" @click="selectItem(item)">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl"/>
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {mapMutations} from 'vuex'
  import {getRecommend, getDiscList, getRadioList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {playlistMixin} from 'common/js/mixin'

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        // recommends: [],
        discList: [],
        radioList: []
      }
    },
    created() {
      // this._getRecommend()
      this._getDiscList()
      this._getRadioList()
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      selectItem(item) {
        this.$router.push({
          path: `recommend/${item.dissid}`
        })
        // 更改disc在state
        this.setDisc(item)
      },
      selectRadio(item) {
        this.$router.push({
          path: `radio/${item.type}`
        })
        // 更改radio在state
        this.setRadio(item)
      },
      // _getRecommend() {
      //   getRecommend().then((res) => {
      //     if (res.code === ERR_OK) {
      //       this.recommends = res.data.slider
      //     }
      //   })
      // },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },
      _getRadioList() {
        getRadioList().then((res) => {
          if (res.code === ERR_OK) {
            this.radioList = res.data.data.groupList
          }
        })
      },
      loadImage() {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      },
      ...mapMutations({
        setDisc:'SET_DISC',
        setRadio: 'SET_RADIO'
      })
    },
    components: {
      Slider,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .radio-list
        margin: 0 20px 0px 20px
        overflow: hidden
        .radio-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .radio-item
          display: inline-block
          width: 20%
          height: 100%
          padding: 2% 3%
          margin: 0 3% 3% 3%
          border-radius: 6px
          background: $color-highlight-background
          text-align: center
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
