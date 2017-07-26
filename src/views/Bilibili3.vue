<template>
  <div :video="video"
    :autoplay="autoplay"
    @play="play"
    ref="player">
  </div>
</template>
<style  scoped>
  @import '../css/DPlayer.min.css';
</style>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import DPlayer from 'DPlayer'
  export default {
    switchVideo: true,
    props: {
      autoplay: {
        type: Boolean,
        default: false
      },
      theme: {
        type: String,
        default: '#d6504f'
      },
      loop: {
        type: Boolean,
        default: true
      },
      lang: {
        type: String,
        default: 'zh'
      },
      screenshot: {
        type: Boolean,
        default: false
      },
      hotkey: {
        type: Boolean,
        default: true
      },
      preload: {
        type: String,
        default: 'auto'
      }
      // video: {
      //   type: Object,
      //   required: true,
      //   validator (value) {
      //     return typeof value.url === 'string'
      //   }
      // }
    },
    data () {
      return {
        video: {
          url: 'https://api.prprpr.me/dplayer/video/bilibili?aid=274287',
          pic: 'http://upload-images.jianshu.io/upload_images/2141706-3ba6760af1a7a194.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
        },
        danmaku: {
          id: 'zy00000003',
          api: 'https://api.prprpr.me/dplayer/',
          addition: ['https://api.prprpr.me/dplayer/bilibili?aid=274287']
        }
      }
    },
    methods: {
      play () {
        console.log('play callback')
      },
      ...mapActions([
        'setSwitchVideo'
      ])
    },
    components: {

    },
    computed: {
      ...mapGetters([
        'switchVideo'
      ])
    },
    mounted () {
      // this.$http.post('https://api.imjad.cn/bilibili/?aid=4156336&page=1&quality=2').then((res) => {
      //   this.video.url = res.data.durl[0].url
      // }).catch((error) => {
      //   console.log(error)
      // })
      const player = this.dp = new DPlayer({
        element: this.$el,
        autoplay: this.autoplay,
        theme: this.theme,
        loop: this.loop,
        lang: this.lang,
        screenshot: this.screenshot,
        hotkey: this.hotkey,
        preload: this.preload,
        danmaku: {
          id: this.danmaku.id,
          api: this.danmaku.api,
          addition: this.danmaku.addition
        },
        video: {
          url: this.video.url,
          pic: this.video.pic,
          type: 'normal'
        }
      })
      player.on('play', () => {
        this.$emit('play')
      })

      player.on('pause', () => {
        this.$emit('pause')
      })

      player.on('canplay', () => {
        this.$emit('canplay')
      })

      player.on('playing', () => {
        this.$emit('playing')
      })

      player.on('ended', () => {
        this.$emit('ended')
      })

      player.on('error', () => {
        this.$emit('error')
      })
    }
  }
</script>
