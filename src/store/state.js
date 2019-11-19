/* eslint-disable indent */
import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  // 全屏
  fullScreen: false,
  // 播放列表
  playlist: [],
  // 展示的歌曲列表
  sequenceList: [],
  // 歌曲播放模式
  mode: playMode.sequence,
  // 当前播放索引
  currentIndex: -1,
  disc: {},
  topList: {},
  // 搜索历史  // searchHistory: [] 需要获取之前搜索过的历史
  searchHistory: loadSearch(),
  // 播放历史-初始值读取缓存
  playHistory: loadPlay(),
  // 收藏的歌曲-初始值读取缓存
  favoriteList: loadFavorite()
  }

  export default state