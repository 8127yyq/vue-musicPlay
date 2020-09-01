<template>
  <div ref="mvurl" class="mvurl">
    <!-- <div class="back" @click="back">
        <i class="icon-back"></i>
    </div> -->
    <h1 class="mv-h1">{{name}}</h1>
    <videoplayer :mp4Url="mp4Url" :mp4Pic="mp4Pic"></videoplayer>
  </div>
</template>

<script type="text/ecmascript-6">
import Videoplayer from 'components/videoplayer/videoplayer'
import { mapGetters, mapMutations } from 'vuex'
import {getMVUrl} from 'api/search'
import {ERR_OK} from 'api/config'

export default {
  data() {
    return {
      mvUrl: [],
      picUrl: [],
      mp4Url: [],
      mp4Pic: [],
      name: []
    }
  },
  computed: {
    vid() {
      return this.$route.params.id
    }
  },
  created() {
    this._getMVUrl(),
    this._getMVPic(),
    this._getName()
  },
  methods: {
    // selecMVList(item) {
    //     let id = this.$route.params.id
    //   },
    _getMVUrl() {
      this.setVid(this.vid)
      getMVUrl(this.vid).then((res) => {
        // if (res.code === ERR_OK) {
        if (res.data && res.data.getMVUrl && res.data.getMVUrl.data) {
          this.mvUrl = res.data.getMVUrl.data
          for (var key in this.mvUrl) {
            var value = this.mvUrl[key]
              if (!value) {
                continue
              }
              var mp4 = value["mp4"]
              if (mp4) {
                // console.log(mp4[1].freeflow_url[0])
                this.mp4Url = mp4[1].freeflow_url[0]
                this.setMvUrl(this.mp4Url)
                return this.mp4Url
              }
          }
        }
        // }
      })
    },
    _getMVPic() {
      getMVUrl(this.vid).then((res) => {
        // if (res.code === ERR_OK) {
        if (res.data && res.data.getMVInfo && res.data.getMVInfo.data) {
          this.picUrl = res.data.getMVInfo.data
          for (var key in this.picUrl) {
            var value = this.picUrl[key]
              if (!value) {
                continue
              }
              var pic = value["cover_pic"]
              if (pic) {
                // console.log(pic)
                this.setMvPic(pic)
                this.mp4Pic = pic
                return this.mp4Pic
              }
          }
        }
        // }
      })
    },
    _getName() {
      getMVUrl(this.vid).then((res) => {
        // if (res.code === ERR_OK) {
        if (res.data && res.data.getMVInfo && res.data.getMVInfo.data) {
          this.picUrl = res.data.getMVInfo.data
          for (var key in this.picUrl) {
            var value = this.picUrl[key]
            if (!value) {
              continue
            }
            var name = value["name"]
            if (name) {
              // console.log(name)
              this.name = name
              return this.name
            }
          }
        }
        // }
      }) 
    },
    // back() {
    //   this.$router.back()
    // },
    ...mapMutations({
      setVid: 'SET_VID',
      setMvUrl: 'SET_MVURL',
      setMvPic: 'SET_MVPIC'
    })
  },
  components: {
    Videoplayer
  },
  watch: {
    $route() { //route.push进来后没有执行获取数据用watch方法查看，有变化再次获取数据。
      this._getMVUrl(),
      this._getMVPic(),
      this._getName()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .mvurl
    position: relative
    .mv-h1
      text-align: center
      padding-top: 15px
</style>