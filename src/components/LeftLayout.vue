<template>
  <div class="left-layout-container" v-if="gitHubUser">
  <img @click="home" class="avatar" src="/static/img/avatar.png">
    <div class="login-name">Justice_Eternal</div>
   <!--  <div class="bio">{{gitHubUser.bio}}</div> -->
    <ul class="other-site">
      <li v-for="site in thirdPartySite" :key="site.url" @click="openThirdPartySite(site.url)">
        <img :src="site.img">
      </li>
    </ul>
    <ul class="left-menu">
      <a-player autoplay :music="{
      title: '宫崎骏动漫组曲',
      author: 'HOHO-十有八九',
      url: 'http://link1.5sing.kugou.com/35037559/v4YBAFXmQ2OAOG7EABDMZNMnuhQ127.mp3',
      pic: 'http://upload-images.jianshu.io/upload_images/2141706-945d958d28df27c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
      }"></a-player>
      <router-link :class="isBlog ? 'selected-menu':''" tag="li" to="/Blog">谱曲资源站</router-link>
      <router-link :class="isInstruction ? 'selected-menu':''" tag="li" to="/instruction">使用说明</router-link>
      <router-link :class="isAboutMe ? 'selected-menu':''" tag="li" to="/AboutMe">关于JE</router-link>
      <el-row class="tac">
        <col :span="8">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
              <template slot="title">视频欣赏</template>
                <el-menu-item index="1-1"><router-link  to="/Bilibili">南里沙</router-link></el-menu-item>
                <el-menu-item index="1-2"><router-link  to="/Bilibili1">千本樱</router-link></el-menu-item>
                <el-menu-item index="1-3"><router-link  to="/Bilibili2">Flower Dance</router-link></el-menu-item>
                <el-menu-item index="1-4"><router-link  to="/Bilibili3">未闻花名</router-link></el-menu-item>
                <el-menu-item index="1-5"><router-link  to="/Bilibili4">Fate</router-link></el-menu-item>
            </el-submenu>
          </el-menu>
        </col>
      </el-row>
    </ul>
    <div v-if="showQQGroup" class="qq-group">
      <span>JE乐谱制作</span>
      <span> QQ群</span>
      <img src="/static/img/qq-group.png">
    </div>
  </div>
</template>
<style lang="scss" scoped>
  $indicator-color: #d6504f;

  .left-layout-container {
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    width: 249px;
    background-color: #ffffff;
    border-right: 1px solid #eeeeee;
  }

  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    margin-top: 50px;
    margin-left: 90px;
    cursor: pointer;
  }

  .login-name {
    text-align: center;
    margin: 10px auto;
    margin-bottom: 12px;
    font-size: 14px;
    height: 16px;
    line-height: 16px;
    color: #4b595f;
  }

  .bio {
    text-align: center;
    margin: 0px auto;
    font-size: 13px;
    height: 18px;
    line-height: 18px;
    color: #849aa4;
  }

  .other-site {
    list-style: none;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    li {
      cursor: pointer;
      margin-right: 20px;
      img {
        width: 20px;
        height: 20px;
      }
    }
    li:last-child {
      margin-right: 0px;
    }
  }

  .left-menu {
    // 上面总的高度为 290px，下面 QQ 群的 margin + 高度为 240px
    height: calc(100% - 290px - 240px);
    min-height: 150px;
    list-style: none;
    color: #4b595f;
    margin-bottom:100px;
    .a-player {
      margin-left:auto;
      margin-right:auto;
      margin-bottom:20px;
    }

    li {
      width: 249px;
      height: 60px;
      line-height: 60px;
      margin-top:20px;
      cursor: pointer;
      font-size: 16px;
      &:before {
        width: 4px;
        height: 100%;
        content: '';
        margin-right: 69px;
        float: left;
        display: table;
      }
      &:hover {
        &:before {
          background-color: $indicator-color;
        }
      }
    }
  }

  .selected-menu {
    background-color: #e5f1fc;
    color: $indicator-color;
    &:before {
      background-color: $indicator-color;
    }
  }

  .qq-group {
    margin-top: 20px;
    margin-left: 80px;
    margin-bottom: 20px;
    height: 140px;
    width: 90px;
    span {
      display: block;
      width: 100%;
      height: 15px;
      line-height: 15px;
      font-size: 12px;
      text-align: center;
      color: #849aa4;
      margin-bottom: 10px;
    }
    span:first-child {
      color: #4b595f;
    }
    img {
      width: 90px;
      height: 90px;
    }
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  import VueAplayer from 'vue-aplayer'
  export default {
    data () {
      return {
        aplayer: null,
        narrow: true,
        autoplay: true,
        showlrc: false,
        mutex: true,
        fold: false,
        speed: 1,
        theme: '#d6504f',
        mode: 'circulation',
        preload: 'metadata',
        listmaxheight: '200px',
        music: [{
          id: 0,
          title: '宫崎骏动漫组曲',
          author: 'HOHO-十有八九',
          url: 'http://link1.5sing.kugou.com/35037559/v4YBAFXmQ2OAOG7EABDMZNMnuhQ127.mp3',
          pic: 'http://upload-images.jianshu.io/upload_images/2141706-945d958d28df27c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
          lrc: 'loading'
        }]
      }
    },
    components: {
      'a-player': VueAplayer
    },
    computed: {
      ...mapGetters([
        'gitHubUser',
        'showQQGroup',
        'thirdPartySite'
      ]),
      isBlog () {
        return this.$route.name && this.$route.name.startsWith('Blog')
      },
      isAboutMe () {
        return this.$route.name === 'AboutMe'
      },
      isBilibili () {
        return this.$route.name === 'Bilibili'
      },
      isInstruction () {
        return this.$route.name === 'instruction'
      }
    },
    methods: {
      home () {
        this.$router.push('/')
      },
      openThirdPartySite (url) {
        window.open(url)
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
