// 异步操作或对mutations进行封装
/* eslint-disable indent */
import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, clearSearch, deleteSearch, savePlay, saveFavorite, deleteFavorite} from 'common/js/cache'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({commit, state}, {list, index}) {
  // 点击列表播放-music-list.vue
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}) {
  // 随机播放-music-list.vue
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  // 从第一个播放：0
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // 查找当前列表中是否有待插入的歌曲并返回其索引
  let fpIndex = findIndex(playlist, song)
  // 因为是插入歌曲，所以索引+1
  currentIndex++
  // 插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)
  // 如果已经包含了这首歌
  if (fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      // 删除这首歌索引 eg.[1,2,3] 插入2：[1,2,3,2] 删2：[1,3,2]
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      // 增加这首歌索引 eg.[1,3,4] 插入2：[1,2,3,4]
      playlist.splice(fpIndex + 1, 1)
    }
  }

  // 在当前播放里找到索引再+1，就是应该插入的歌位置
  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  // 查看是否有插入的这首歌
  let fsIndex = findIndex(sequenceList, song)

  sequenceList.splice(currentSIndex, 0, song)

  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      // 插入在后面
      sequenceList.splice(fsIndex, 1)
    } else {
      // 插入在前面
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 永久保存搜索历史记录
export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

// 删除localstorage之前保存的某一条数据
export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

// 清空localstorage所有历史记录
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

// 删除播放列表和显示歌曲列表一首歌
export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 找歌(播放列表)
  let pIndex = findIndex(playlist, song)
  // 删歌
  playlist.splice(pIndex, 1)
  // 找歌(显示的歌曲列表)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  // 当前播放歌曲在删除的歌曲之后，或删除的是最后一首歌，currentIndex索引减一
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  // 判断列表是否已删空，空列表不再播放歌曲
  // if (!playlist.length) {
  //   commit(types.SET_PLAYING_STATE, false)
  // } else {
  //   commit(types.SET_PLAYING_STATE, true)
  // }
  // 与上面源码一意思，判断列表是否已删空
  const playingState = playlist.length > 0
  commit(types.SET_PLAYING_STATE, playingState)
}

// 清空播放列表和清空显示歌曲列表
export const deleteSongList = function ({commit}) {
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_PLAYING_STATE, false)
}

// 保存播放过的歌曲
export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

// 收藏歌曲
export const saveFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

// 删除收藏歌曲
export const deleteFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}
