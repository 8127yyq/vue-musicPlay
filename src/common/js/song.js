/* eslint-disable prefer-promise-reject-errors */
import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    // 专辑名称
    this.album = album
    // 歌长
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          // 测试获取lyric
          // this.lyric = res.lyric  ---返回的是Base64
          this.lyric = Base64.decode(res.lyric)
          // console.log(this.lyric)
          resolve(this.lyric)
        } else {
          // 没有成功获取到歌词
          reject('no lyric')
        }
      })
    })
  }
}

export function createSong(musicData, songVkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    // MediaMid: musicData.strMediaMid,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${songVkey}`
    // url: `isure.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=739553382&vkey=${vkey}&uin=0&fromtag=38`
    // url: `http://ws.stream.qqmusic.qq.com/C400${musicData.strMediaMid}.m4a?vkey=${vkey}&guid=6048837181&uin=3032&fromtag=999`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
