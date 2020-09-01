/* eslint-disable space-before-blocks */
/* eslint-disable indent */
import * as types from './mutation-types'

const mutations = {
    [types.SET_SINGER](state, singer){
      state.singer = singer
    },
    [types.SET_PLAYING_STATE](state, flag) {
      state.playing = flag
    },
    [types.SET_FULL_SCREEN](state, flag) {
      state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state, list) {
      // state.playlist = list
      state.playlist = Object.assign([], list)
    },
    [types.SET_SEQUENCE_LIST](state, list) {
      // state.sequenceList = list
      state.sequenceList = Object.assign([], list)
    },
    [types.SET_PLAY_MODE](state, mode) {
      state.mode = mode
    },
    [types.SET_CURRENT_INDEX](state, index) {
      state.currentIndex = index
    },
    [types.SET_DISC](state, disc) {
      state.disc = disc
    },
    [types.SET_RADIO](state, radio) {
      state.radio = radio
    },
    [types.SET_RADIONAME](state, radioName) {
      state.radioName = radioName
    },
    [types.SET_TOP_LIST](state, topList) {
      state.topList = topList
    },
    [types.SET_TOP_COUNT](state, topCount) {
      state.topCount = topCount
    },
    [types.SET_MV_LIST](state, mvList) {
      state.mvList = mvList
    },
    [types.SET_VID](state, vid) {
      state.vid = vid
    },
    [types.SET_MVURL](state, mvUrl) {
      state.mvUrl = mvUrl
    },
    [types.SET_MVPIC](state, mvPic) {
      state.mvPic = mvPic
    },
    [types.SET_SEARCH_HISTORY](state, history) {
      state.searchHistory = history
    },
    [types.SET_PLAY_HISTORY](state, history) {
      state.playHistory = history
    },
    [types.SET_FAVORITE_LIST](state, list) {
      state.favoriteList = list
    }
}

export default mutations