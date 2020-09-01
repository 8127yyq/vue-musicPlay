<template>
  <div ref="radios" class="radios">
     <scroll ref="radioList" class="toplist" :data="radioState.radioList">
      <div class="radio-list">
          <ul>
            <li v-for="(item, i) in radioState.radioList" :key="i" class="item" @click="selectItem(item)">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.radioImg"/>
              </div>
              <div class="text">
                <h2 class="name" v-html="item.radioName"></h2>
              </div>
            </li>
          </ul>
          <div class="loading-container" v-show="!radioState.radioList.length">
              <loading></loading>
          </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import MusicList from 'components/music-list/music-list'
import {playlistMixin} from 'common/js/mixin'
import {mapGetters, mapMutations} from 'vuex'
import {getTopList} from 'api/rank'
import {ERR_OK} from 'api/config'

  export default {
    mixins: [playlistMixin],
    created() {
      this._getTopList()
    },
    data() {
      return {
        topList: [],
        topCount: []
      }
    },
    computed:{
      ...mapGetters({
        radioState: 'radio'
      }),
      radioId() {
        return this.radioState.radioList[0].radioId
      }
      // topCount: {
      //   get() {
      //     const idx = Math.floor(Math.random() * this.topList.length)
      //     return this.topCount = this.topList[idx]
      //   },
      //   set() {}
      // }
    },
    methods: {
      selectItem(item) {
        const idx = Math.floor(Math.random() * this.topList.length)
        let topCount = this.topList[idx]
        this.$router.push({
            path: `/radio/list/${topCount.id}`
        })
        this.setTopCount(topCount)
        this.setRadioName(item.radioName)
      },
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.radios.style.bottom = bottom
        this.$refs.radioList.refresh()
      },
      _getTopList() {
        getTopList().then((res) => {
          if (res.code === ERR_OK) {
            this.topList = res.data.topList
          }
        })
      },
      ...mapMutations({
        setTopCount: 'SET_TOP_COUNT',
        setRadioName: 'SET_RADIONAME'
      }),
      back() {
        this.$router.back()
      }
    },
    watch: {
      radioState(val) {
        console.log(val)
      }
    },
    components: {
      Scroll,
      Loading,
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .radios
    position: fixed
    bottom: 0
    top: 60px
    width: 100%
    .toplist
      height: 100%
      overflow: hidden
      .radio-list
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
        .loading-container
          position: absolute
          width: 100%
          top: 50%
          transform: translateY(-50%)
</style>