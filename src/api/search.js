/* eslint-disable-next-line */
/* eslint-disable */

import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams, options} from './config'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export function search(query, page, zhida, perpage) {
  const url = '/api/searchlist'
  // const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    w: query,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: perpage,
    // n: 20,
    n: perpage,
    p: page,
    remoteplace: 'txt.mqq.all'
    // _: 1537612841753
  })

  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getMvList() {
  const url = '/api/getPlaySongVkey'
  const data = Object.assign({}, {
    g_tk: 5381,
    // loginUin: 2093181912,
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {'comm': {'ct': 24}, 'mv_tag': {'module': 'MvService.MvInfoProServer', 'method': 'GetAllocTag', 'param': {}}, 'mv_list': {'module': 'MvService.MvInfoProServer', 'method': 'GetAllocMvInfo', 'param': {'start': 0, 'size': 20, 'version_id': 7, 'area_id': 15, 'order': 1}}}
  })

  // return jsonp(url, data)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res)
  })
}

//获取歌曲视频
// export function getmv(vid,callback){
// 	let date = new Date().getTime()
// 	axios('/api/getPlaySongVkey',{
// 		params:{
// 			g_tk: 5381,
// 			uin: 0,
// 			format: 'json',
// 			inCharset: 'utf-8',
// 			outCharset: 'utf-8',
// 			notice: 0,
// 			platform: 'h5',
// 			needNewCode: 1,
// 			data: `{'getMVInfo':{'module':'video.VideoDataServer','method':'get_video_info_batch','param':{'vidlist':[vid],'required':['vid','type','name','singers','playcnt','pubdate','uploader_headurl','uploader_nick','uploader_encuin','uploader_uin','uploader_follower_num','uploader_hasfollow','from','isfav','video_switch','desc','sid','gmid','cover_pic_medium']}},'getToplistInfo':{'module':'video.VideoLogicServer','method':'get_hitlist_info','param':{'vid':vid}},'getRecomMV':{'module':'video.VideoLogicServer','method':'rec_video_byvid','param':{'vid':vid,'required':['vid','type','cover_pic_medium','name','singers','uploader_nick','playcnt'],'support':1}}}`,
					
// 			_: date
// 		},
// 		headers:{
// 			'content-type': 'text/plain; charset=utf-8'
// 		}
// 	}).then(response=>{
// 		callback(response)
// 	}).catch(error=>{
// 		callback(error)
// 	})
// }


// //获取视频详情
// export function getMVUrl(vid, callback){
// 	let date = new Date().getTime()
// 	axios('/api/getPlaySongVkey', {
// 		params: {
// 			g_tk: 5381,
// 			uin: 0,
// 			ct: 23,
// 			cv: 0,
// 			format: 'json',
// 			callback: 'qmv_jsonp_6',
// 			data: `{'getMVInfo': {'module': 'video.VideoDataServer', 'method': 'get_video_info_batch', 'param': {'vidlist': [vid], 'required': ['vid', 'sid', 'gmid', 'type', 'name', 'cover_pic', 'video_switch', 'msg'], 'from': 'h5.playsong'}}, 'getMVUrl': {'module': 'gosrf.Stream.MvUrlProxy', 'method': 'GetMvUrls', 'param': {'vids': [vid], 'from': 'h5.playsong'}, 'request_typet': 10001}}`,
// 			_: date
// 		},
// 		headers: {
// 			'content-type': 'text/plain; charset=utf-8'
// 		}
// 	}).then(response => {
//     callback(response)
//   }).catch(error => {
//     callback(error)
//   })
// }

export function getMVUrl(vid) {
  const url = '/api/getPlaySongVkey'
  const data = Object.assign({}, {
    g_tk: 5381,
    // loginUin: 2093181912,
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {'getMVInfo': {'module': 'video.VideoDataServer', 'method': 'get_video_info_batch', 'param': {'vidlist': [vid], 'required': ['vid', 'sid', 'gmid', 'type', 'name', 'cover_pic', 'video_switch', 'msg'], 'from': 'h5.playsong'}}, 'getMVUrl': {'module': 'gosrf.Stream.MvUrlProxy', 'method': 'GetMvUrls', 'param': {'vids': [vid], 'from': 'h5.playsong'}, 'request_typet': 10001}}
  })

  // return jsonp(url, data)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res)
  })
}
