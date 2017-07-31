<template>
  <div>
    <left-layout/>
    <router-view class="main-container"/>
  </div>
</template>
<style >
  .main-container {
    position: fixed;
    left: 250px;
    right: 0px;
    bottom: 0px;
    top: 0px;
  }
  @import './css/DPlayer.min.css';
</style>
<script>
  import LeftLayout from './components/LeftLayout.vue'
  import { mapActions } from 'vuex'

  export default {
    components: {
      LeftLayout
    },
    methods: {
      ...mapActions([
        'setLabels',
        'setGitHubUser'
      ])
    },
    mounted: function () {
      this.$nextTick(function () {
        this.$gitHubApi.getUserInfo(this).then(this.$http.spread((userResp, labelResp) => {
          this.setGitHubUser(userResp.data)
          this.setLabels(labelResp.data)
        }))
      })
    }
  }
</script>
