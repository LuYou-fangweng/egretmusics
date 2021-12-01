<template>
  <!-- 播放器盒子 -->
  <div class="musicBox">
    <!-- 播放器头部 -->
    <div class="hearder">
      <!-- logo -->
      <div class="Logo">白鹭播放器</div>
      <!-- 搜索框组件 -->
      <SearchBox></SearchBox>
      <div class="a"></div>
    </div>
    <!-- 播放器中部内容 -->
    <div class="main">
      <!-- 左侧列表 -->
      <div class="left">
        <!-- 左侧列表组件 -->
        <MusicList></MusicList>
      </div>
      <!-- 中间专辑内容 -->
      <div class="center">
        <div class="musicsName">白鹭归庭</div>
        <div class="artist">陈致逸</div>
        <AlbumCover class='albumCover'></AlbumCover>
      </div>
      <!-- 右侧评论区 -->
      <div class="right"></div>
    </div>
    <!-- 底部控制栏 -->
    <div class="footer">
      <!-- 控制按钮与进度条 -->
      <div class="tool">
        <ControlButton class="controlButton"></ControlButton>
        <ControlStrip class="controlStrip"></ControlStrip>
      </div>
      <!-- 右下按钮功能区 -->
      <div class="bottombar">
        <!-- 添加至喜欢歌单  -->
        <img class="love" src="../assets/喜欢.svg" alt="喜欢" />
        <!-- 收藏至歌单 -->
        <img class="collect" src="../assets/收藏.svg" alt="收藏" />
        <!-- 下载该歌曲 -->
        <img class="download" src="../assets/下载.svg" alt="下载" />
        <!-- 音量组件 -->
        <GainController class="cainController"></GainController>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MusicList from '@/components/MusicList.vue'
import SearchBox from '@/components/SearchBox.vue'
import ControlButton from '@/components/ControlButton.vue'
import ControlStrip from '@/components/ControlStrip.vue'
import GainController from '../components/GainController.vue'
import AlbumCover from '../components/AlbumCover.vue'

export default {
  name: 'Home',
  components: {
    MusicList,
    SearchBox,
    ControlButton,
    ControlStrip,
    GainController,
    AlbumCover
  },
  data () {
    return {}
  }
}
</script>
<style>
* {
  border: 0px;
  padding: 0px;
}

.musicBox {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  width: 1080px;
  height: 620px;
  box-shadow: 0px 0px 3px 3px rgba(119, 119, 119, 0.527);
  border-radius: 5px;
  background-color: #f7f7f7;
}
.Logo {
  float: left;
  font: bold 32px/40px "楷体";
  text-shadow: 2px 2px 2px rgb(204, 204, 204);
}
.a {
  clear: both;
}
.main {
  display: flex;
}
.left {
  width: 240px;
  height: 480px;
}
.center {
  width: 600px;
  height: 480px;
}
.right {
  width: 240px;
  height: 480px;
}

.footer {
  display: flex;
  height: 100px;
  margin: 0px auto;
  border-top: rgba(155, 155, 155, 0.705) solid 1px;
}
.tool {
  width: 800px;
}

.controlButton {
  margin-left: 395px;
}
.controlStrip {
  margin-left: 160px;
}
.bottombar {
  display: flex;
  width: 280px;
  height: 100px;
}
.bottombar > img {
  width: 46px;
  height: 46px;
  margin: auto 5px;
  /* background-color: blue; */
}
.cainController {
  margin: auto 5px;
}
.musicsName{
  font:700  38px/56px 仿宋,黑体;
  margin-top: 10px;
}
.albumCover{
  margin:0px auto;
  margin-top: 60px;
}
.artist{
   font:400  18px/24px 微软雅黑;
   color:rgb(139, 139, 139);
}
</style>
