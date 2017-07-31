<template>
  <div :video="video"
    :autoplay="autoplay"
    @play="play"
    ref="player">
  </div>
</template>
<style  scoped>

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
          url: 'https://api.prprpr.me/dplayer/video/bilibili?aid=4156336',
          pic: 'https://i1.hdslb.com/bfs/archive/2e100f6b73a9576afe0b6a0120b011160d6ce5fa.jpg'
        },
        danmaku: {
          id: 'zy00000002',
          api: 'https://api.prprpr.me/dplayer/',
          addition: ['https://api.prprpr.me/dplayer/bilibili?aid=4156336']
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
