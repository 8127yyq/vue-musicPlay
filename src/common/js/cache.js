import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

// 判断搜索历史是否有重复数据（封装方法）
function insertArray(arr, val, compare, maxLen) {
  // 查找arr是否有重复数据val
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  // 若有重复数据，把重复的删去
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 插入新的数据在前面
  arr.unshift(val)
  // 判断最大保存数量，超过的pop出去
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

// 删除localstorage指定的query数据（封装方法）
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 保存搜索历史记录
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  // 判断重复数据，若item === query，则已经在searches里面
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  // 保存数据在storage里面
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 取出localstorage之前保存的数据
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

// 删除localstorage之前保存的数据
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  // 上面删除query后保存新的数组searches
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 清空localstorage所有历史记录
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

// 写入保存播放歌曲
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}

// 读取保存播放歌曲
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

// 收藏歌曲
export function saveFavorite(song) {
  // 获取收藏歌曲，没有就空数组[]
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 删除收藏歌曲
export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 加载/读取收藏歌曲
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
