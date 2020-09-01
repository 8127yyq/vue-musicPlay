// 对state进行映射
import state from './state'

/* eslint-disable indent */
export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

// 这里是个函数，类似计算属性。判断逻辑
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

export const disc = state => state.disc

export const radio = state => state.radio

export const radioName = state => state.radioName

export const topList = state => state.topList

export const topCount = state => state.topCount

export const mvList = state => state.mvList

export const vid = state => state.vid

export const mvUrl = state => state.mvUrl

export const mvPic = state => state.mvPic

export const searchHistory = state => state.searchHistory

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList