<template>
  <!-- 播放器盒子 -->
  <div class="musicBox">
    <audio id="music" class="musicDom" ref="musicDom">
      <source :src="musicSrc" type="audio/mp3" />
    </audio>
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
        <MusicList @playThis="playThis"></MusicList>
      </div>
      <!-- 中间专辑内容 -->
      <div class="center">
        <div class="musicsName">{{ musicName }}</div>
        <div class="albumName">{{ album }}</div>
        <div class="artist">{{ writer }}</div>
        <AlbumCover class="albumCover"></AlbumCover>
      </div>
      <!-- 右侧评论区 -->
      <div class="right">
        <Comment class="comment"></Comment>
      </div>
    </div>
    <!-- 底部控制栏 -->
    <div class="footer">
      <!-- 控制按钮与进度条 -->
      <div class="tool">
        <ControlButton
          class="controlButton"
          @playNow="playNow"
          @next="next"
          @prev="prev"
          @playThis="playThis"
        ></ControlButton>
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
import MusicList from "@/components/MusicList.vue";
import SearchBox from "@/components/SearchBox.vue";
import ControlButton from "@/components/ControlButton.vue";
import ControlStrip from "@/components/ControlStrip.vue";
import GainController from "../components/GainController.vue";
import AlbumCover from "../components/AlbumCover.vue";
import Comment from "../components/Comment.vue";

export default {
  name: "Home",
  components: {
    MusicList,
    SearchBox,
    ControlButton,
    ControlStrip,
    GainController,
    AlbumCover,
    Comment,
  },
  data() {
    return {};
  },
  watch: {
    // musicSrc() {
    //   let musicDom = this.$refs.musicDom;
    //   musicDom.load();
    // },
  },
  computed: {
    musicSrc: function () {
      let src = this.$store.getters.nowMusic.src;
      return src;
    },
    musicName: function () {
      let musicName = this.$store.getters.nowMusic.musicName;
      return musicName;
    },
    album: function () {
      let album = this.$store.getters.nowMusic.album;
      return album;
    },
    writer: function () {
      let writer = this.$store.getters.nowMusic.writer;
      return writer;
    },
  },
  methods: {
    // 播放或暂停当前焦点歌曲
    playNow: function () {
      const musicDom = this.$refs.musicDom;
      if (this.$store.state.playState == false) {
        this.$store.state.playState = true;
        /* musicDom.load(); */
        musicDom.play();
        /* console.log("正在尝试播放"); */
        this.log();
      } else {
        this.$store.state.playState = false;
        musicDom.pause();
      }
    },
    //下一首
    next: function () {
      if (this.$store.state.listMode === 1) {
        this.$store.state.networkIndex++;
      }
      if (this.$store.state.listMode === 2) {
        this.$store.state.myLoveIndex++;
      }
      if (this.$store.state.listMode === 3) {
        // this.$store.state.collectionIndex[1]++;
      }
      const musicDom = this.$refs.musicDom;
      musicDom.load();
      musicDom.play();
      this.$store.state.playState = true;
      this.log();
    },

    //上一首
    prev: function () {
      if (this.$store.state.listMode === 1) {
        this.$store.state.networkIndex--;
      }
      if (this.$store.state.listMode === 2) {
        this.$store.state.myLoveIndex--;
      }
      if (this.$store.state.listMode === 3) {
        // this.$store.state.collectionIndex[1]--;
      }
      const musicDom = this.$refs.musicDom;
      musicDom.load();
      musicDom.play();
      this.$store.state.playState = true;
      this.log();
    },
    //播放选定库曲目(网络与本地)
    playThis: function (listMode, index) {
      if (listMode === 1) {
        this.$store.state.networkIndex = index;
      } else {
        this.$store.state.myLoveIndex = index;
      }
      this.$store.state.listModel = listMode;
      const musicDom = this.$refs.musicDom;
      musicDom.load();
      musicDom.play();
      this.$store.state.playState = true;
      this.log();
    },

    log: function () {
      switch (this.$store.state.listMode) {
        case 1: {
          console.log(
            "正在播放的歌曲为：网络歌曲：" + this.$store.state.networkIndex
          );
          console.log("路径为：" + this.musicSrc);
          break;
        }
        case 2: {
          console.log(
            "正在播放的歌曲为：我的喜欢：" + this.$store.state.myLoveIndex
          );
          console.log("路径为：" + this.musicSrc);
          break;
        }
        case 3: {
          console.log(
            "正在播放的歌曲为：" +
              this.$store.state.musicList[this.$store.state.collectionIndex[0]]
                .name +
              ":" +
              this.$store.state.collectionIndex[1]
          );
          console.log("路径为：" + this.musicSrc);
          break;
        }
        default:
          console.log("状态代码出错！");
      }
    },
  },
  mounted() {},
};
</script>
<style>
* {
  border: 0px;
  padding: 0px;
}
.musicDom {
  display: none;
}
ul {
  list-style: none;
}

.musicBox {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  width: 1080px;
  height: 620px;
  box-shadow: 0px 0px 3px 3px rgba(119, 119, 119, 0.527);
  border-radius: 5px;
  background-image: linear-gradient(
    to bottom,
    #f2f7fc 0%,
    #f2f7fc 20%,
    #f7f7f7 32%,
    #f7f7f7 100%
  );
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
.musicsName {
  height: 56px;
  font: 700 38px/56px 仿宋, 黑体;
  margin-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.albumCover {
  margin: 0px auto;
  margin-top: 50px;
}
.artist {
  height: 20px;
  font: 400 16px/20px 微软雅黑;
  color: rgb(139, 139, 139);
}
.albumName {
  height: 20px;
  font: 400 16px/20px 宋体;
  color: rgb(80, 80, 80);
  font-style: italic;
}
</style>
