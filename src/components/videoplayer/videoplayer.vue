<template>
    <div class="video">
    	<!-- 使用组件 -->
      <video-player  class="video-player vjs-custom-skin"
           ref="videoPlayer"
           :playsinline="true"
           :options="playerOptions"
      ></video-player>
    </div>
</template>

<script type="text/ecmascript-6">
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
// import 'video.js/dist/lang/zh-CN'
import 'vue-video-player/src/custom-theme.css'
import { mapGetters } from 'vuex'

  export default {
	name: 'videoplayer',
	components: {
		videoPlayer
  },
  props: [
    'mp4Pic',
    'mp4Url'
  ],
	data () {
		return {
			fileAreaHeight: 100,
			fileType: 'mp4', // 资源的类型
      // fileUrl: '', // 资源的路径地址
      // filePic: ''
		}
	},
	computed: {
	    playerOptions () {		// 使用计算属性
	      const playerOptionsObj = {
	        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
	        autoplay: false, // 如果true,浏览器准备好时开始回放。
	        muted: false, // 默认情况下将会消除任何音频。
	        loop: false, // 导致视频一结束就重新开始。
	        // preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
	        language: 'zh-CN',
	        // aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
	        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
	        sources: [{
	          type: 'video/' + this.fileType,	// 资源格式写法：'video/mp4'，否则控制台会出现notSupportedMessage设置的错误
	          src: this.mp4Url // url地址
	        }],
	        poster: this.mp4Pic, // 你的封面地址
	        // width: document.documentElement.clientWidth,
	        height: this.fileAreaHeight,	// 设置高度，fluid需要设置成flase
	        notSupportedMessage: '此视频暂无法播放...', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
	        controlBar: {
	          timeDivider: true,
	          durationDisplay: true,
	          remainingTimeDisplay: false,
	          fullscreenToggle: true  //全屏按钮
	        }
	      }
	      return playerOptionsObj
      }
    },
    watch: {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .video
    position: relative
    padding: 5px
    padding-top: 70px
    .vjs-poster
      transform: scale(2)
    .vjs-tech
      transform: scale(2)
    .video-js .vjs-big-play-button /*对播放按钮的样式进行设置*/
      width: 80px
      height: 100%
      border-radius: 1em
</style>