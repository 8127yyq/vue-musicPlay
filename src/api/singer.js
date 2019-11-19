import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams, options} from './config'

// 歌手获取
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    // 三个all代表可以查询所有歌手
    pagesize: 100,
    // 一次可以查询100个数组
    pagenum: 1,
    // 查询现在页数是1
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1664029744
  })

  return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    g_tk: 1664029744,
    singermid: singerId
  })

  return jsonp(url, data, options)
}
// https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1664029744&jsonpCallback=MusicJsonCallbacksinger_track&loginUin=280309453&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yyq&needNewCode=0&singermid=002J4UUk29y8BY&order=listen&begin=0&num=30&songstatus=1

export function getPlaySongVkey(songmid) {
  const url = '/api/getPlaySongVkey'
  const data = Object.assign({}, {
    g_tk: 5381,
    // loginUin: 2093181912,
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {'req_0': {'module': 'vkey.GetVkeyServer', 'method': 'CgiGetVkey', 'param': {'guid': '6048837181', 'songmid': [songmid], 'songtype': [0], 'uin': '0', 'loginflag': 1, 'platform': '20'}}, 'comm': {'uin': '2093181912', 'format': 'json', 'ct': 24, 'cv': 0}}
  })

  // return jsonp(url, data)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data.req_0.data.midurlinfo[0].purl)
  })
}
