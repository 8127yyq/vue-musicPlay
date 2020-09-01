<template>
    <transition name="slide">
        <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getMusicList} from 'api/rank'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import {getPlaySongVkey} from 'api/singer'

export default {
    computed: {
        title() {
            return this.radioName
        },
        bgImage() {
            if (this.songs.length) {
                return this.songs[0].image
            }
            return ''
            // return this.topCount.picUrl
        },
        topId() {
            return this.topCount.id
        },
        ...mapGetters([
            'topCount',
            'radio',
            'radioName'
        ])
    },
    created() {
        this._getMusicList()
    },
    data() {
        return {
            songs: [],
            rank: false
        }
    },
    methods: {
        _getMusicList() {
            if (!this.topId) {
                this.$router.back()
                return
            }
            getMusicList(this.topId).then((res) => {
                if (res.code === ERR_OK) {
                     this.songs = this._normalizeSongs(res.songlist)
                }
            })
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((item) => {
                const musicData = item.data
                if (musicData.songid && musicData.albummid) {
                    // ret.push(createSong(musicData))
                    getPlaySongVkey(musicData.songmid).then((res) => {
                        if (res) {
                            ret.push(createSong(musicData, res))
                        }
                    })
                }
            })
            return ret
        }
    },
    watch: {
        $route() { //route.push进来后没有执行获取数据用watch方法查看，有变化再次获取数据。
            this._getMusicList()
        }
    },
    components: {
        MusicList
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>