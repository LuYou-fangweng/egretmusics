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
      <SearchBox @changeSRC="changeSRC"></SearchBox>
      <div class="a"></div>
    </div>
    <!-- 播放器中部内容 -->
    <div class="main">
      <!-- 左侧列表 -->
      <div class="left">
        <!-- 左侧列表组件 -->
        <MusicList
          @playThis="playThis"
          @resetSrc="resetSrc"
          ref="Musiclist"
        ></MusicList>
      </div>
      <!-- 中间专辑内容 -->
      <div class="center">
        <div class="musicsName">{{ musicName }}</div>
        <div class="albumName">{{ album }}</div>
        <div class="artist">{{ writer }}</div>
        <AlbumCover class="albumCover" v-show="this.$store.state.lyricShow!==true"></AlbumCover>
        <LyricBox calss='lyricBox' v-show="this.$store.state.lyricShow===true"></LyricBox>
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
          ref="ControlButton"
        ></ControlButton>
        <ControlStrip
          class="controlStrip"
          @changeTime="changeTime"
        ></ControlStrip>
      </div>
      <!-- 右下按钮功能区 -->
      <div class="bottombar">
        <!-- 添加至喜欢歌单  -->
        <img
          class="love"
          :src="require(`../assets/${loveState}`)"
          alt="喜欢"
          @click="loveButton"
        />
        <!-- 收藏至歌单 -->
        <img
          class="collect"
          :src="require(`../assets/${listState}`)"
          alt="收藏"
          @click="showAddBbox"
        />
        <!-- 下载该歌曲 -->
        <img class="download" src="../assets/下载.svg" alt="下载" />
        <!-- 音量组件 -->
        <GainController
          class="cainController"
          @audioTb="audioTb"
        ></GainController>
      </div>
    </div>
    <MusicCollection
      class="musicCollection"
      v-show="this.$store.state.addMusicListBox"
    ></MusicCollection>
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
import LyricBox from "../components/LyricBox.vue";
import MusicCollection from "../components/MusicCollection.vue";
import axios from "axios";

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
    MusicCollection,
    LyricBox,
  },
  data() {
    return {
      showAddListBox: false,
    };
  },
  watch: {
    //监听我的喜欢列表，变动后将列表数据存入硬盘
    myLoveMusicList: function () {
      window.localStorage.setItem(
        "myLoveMusicList",
        JSON.stringify(this.myLoveMusicList)
      );
    },
    //监听当前歌曲ID是否变化，变化时更新封面地址与评论
    musicID:function(val, oldVal){
      if(val!==''){
        // this.cover();
        this.comment();
        this.lyric();
      }
    },
    //监听当前MV播放状态，当MV播放时自动暂停当前音乐
    mvShow:function(val, oldVal){
      if((val===true)&&this.$store.state.playState===true){
      this.playNow();
      }
    }
   
  },
  computed: {
    mvShow:function() {
      return this.$store.state.mvShow;
    },
    musicID:function(){
      return this.$store.getters.nowMusic.id;
    },
    musicSrc: function () {
      let src;
      if (!this.$store.getters.nowMusic.src) {
        src = "";
      } else {
        src = this.$store.getters.nowMusic.src;
      }
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
    myLoveMusicList: function () {
      let m = this.$store.state.myLoveMusicList;
      return m;
    },
    //歌单
    musicList: function () {
      let m = this.$store.state.musicList;
      return m;
    },
    //当前收藏歌单焦点所在的子歌单
    musicListNowChild: function () {
      let c =
        this.$store.state.musicList[this.$store.state.collectionIndex[0]]
          .listMusic;
      return c;
    },
    //歌单序号、所在歌曲序号
    collectionIndex: function () {
      return this.$store.state.collectionIndex;
    },
    //焦点歌曲是否在我的喜欢中，以此决定按钮图片
    loveState: function () {
      let url;
      if (this.queryID(this.$store.getters.nowMusic.id, 0)) {
        url = "已喜欢.svg";
      } else {
        url = "喜欢.svg";
      }
      return url;
    },
    //焦点歌曲是否在歌单中
    listState: function () {
      let url;
      if (this.queryID(this.$store.getters.nowMusic.id, 1)) {
        url = "已收藏.svg";
      } else {
        url = "收藏.svg";
      }
      return url;
    },
  },
  methods: {
     // 获取歌曲歌词
    lyric:function(){  
      let them=this;
      axios
        .get("https://autumnfish.cn/lyric", {
          params: {
          id: them.musicID,
          },
        })
        .then(function (response) {
        // console.log("歌词：");
        //  console.log(response);
         const lyric=response.data.lrc.lyric;
         them.$store.commit("chuangeLyric",lyric);
        //  console.log(them.$store.state.lyric);
         
        })
        .catch(function (err) {
          console.log("网络请求出错！错误详情为：");
          console.log(err);
        })
    },
    //获取歌曲详情，搜索封面 API失效待可用端口
    // cover:function(){
    //   let them=this;
    //   axios
    //     .get("https://autumnfish.cn/song/detail", {
    //       params: {
    //         ids: them.musicID,
    //       },
    //     })
    //     .then(function (response) {
    //       console.log("歌曲详情：");
    //       console.log(response);
    //     })
    //     .catch(function (err) {
    //       console.log("网络请求出错！错误详情为：");
    //       console.log(err);
    //     });
    // },
    //获取歌曲评论
    comment:function(){  
      let them=this;
      axios
        .get("https://autumnfish.cn/comment/music", {
          params: {
            id: them.musicID,
            limit:them.$store.state.limit,
          },
        })
        .then(function (response) {
          /* console.log(response) */;
          const hotComments = response.data.hotComments.map((item) => {
            const { commentId, user,content,timeStr} = item;
            return {
              id:commentId,
              nickname:user.nickname,
              imgSrc:user.avatarUrl,
              content,
              timeStr
            };
        })
        them.$store.commit('chuangeComment', hotComments)
        // console.log(them.$store.state.comment);
        })
        .catch(function (err) {
          console.log("网络请求出错！错误详情为：");
          console.log(err);
        })
    },
    //获取歌曲版权权限状况  API失效待可用端口
    // canPlay:function(){  
    //   let them=this;
    //   axios
    //     .get("https://autumnfish.cn/check/music", {
    //       params: {
    //       id: them.musicID,
    //       },
    //     })
    //     .then(function (response) {
    //      console.log(response);
    //     const canPlay=response.success;
    //     them.$store.commit('chuangeCanPlay', canPlay)
    //     console.log(them.$store.state.canPlay);
    //     })
    //     .catch(function (err) {
    //       console.log("网络请求出错！错误详情为：");
    //       console.log(err);
    //     })
    // },
    //播放模式设定函数，根据设定的列表焦点输出乱序播放的序号
    playModel: function (index) {
      let indexNext = 0;
      switch (index) {
        case 1:
        case 2: {
          if (this.$store.getters.nowLength !== 1) {
            indexNext = Math.ceil(
              (this.$store.getters.nowLength - 1) * Math.random()
            );
          }
          break;
        }
        case 3: {
          let inde = Math.floor(
            this.$store.getters.listID.length * Math.random()
          );
          let id=this.$store.getters.listID[inde]
          for (let i = 0; i < this.$store.state.musicList.length; i++) {
            for (
              let j = 0;
              j < this.$store.state.musicList[i].listMusic.length;
              j++
            ) {
              if (this.$store.state.musicList[i].listMusic[j].id === id) {
                indexNext = [i, j];
                break;
              }
            }
          }
          break;
        }
        default:
          console.length("列表焦点错误！");
      }
      return indexNext;
    },
    //显示歌单添加框map
    showAddBbox: function () {
      this.$store.commit("showAddListBox");
    },
    //更新audio标签的音量与音量数据同步
    audioTb: function () {
      const musicDom = this.$refs.musicDom; //导入audio标签
      //音量数据改变时触发实时修改播放器音量
      musicDom.volume = this.$store.state.volume;
    },

    //获取鼠标点击进度条事件，改变歌曲播放进度
    changeTime: function (e) {
      const musicDom = this.$refs.musicDom;
      let x = (e.offsetX / 550) * this.$store.state.musicLength;
      musicDom.currentTime = x;
    },
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
      const musicDom = this.$refs.musicDom;
      if (this.$store.state.listMode === 1) {
        this.$store.state.networkIndex++;
      }
      if (this.$store.state.listMode === 2) {
        this.$store.state.myLoveIndex++;
      }
      if (this.$store.state.listMode === 3) {
        let i = [];
        i[0] = this.collectionIndex[0];
        i[1] = this.collectionIndex[1];
        if (this.collectionIndex[1] < this.musicListNowChild.length - 1) {
          i[1] += 1;
        } else {
          if (this.collectionIndex[0] < this.musicList.length - 1) {
            i[1] = 0;
            i[0]++;
          } else {
            return;
          }
        }
        this.$store.commit("chuangeCollectionIndex", i);
      }
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
        let i = [];
        i[0] = this.collectionIndex[0];
        i[1] = this.collectionIndex[1];
        if (this.collectionIndex[1] > 0) {
          i[1] -= 1;
        } else {
          if (this.collectionIndex[0] > 0) {
            i[0]--;
            i[1] = this.$store.state.musicList[i[0]].listMusic.length - 1;
          } else {
            return;
          }
        }
        this.$store.commit("chuangeCollectionIndex", i);
      }
      const musicDom = this.$refs.musicDom;
      musicDom.load();
      musicDom.play();
      this.$store.state.playState = true;
      this.log();
    },
    //播放选定库曲目(网络与本地与收藏)
    playThis: function (listMode, index) {
      if (listMode === 1) {
        this.$store.state.networkIndex = index;
      }
      if (listMode === 2) {
        this.$store.state.myLoveIndex = index;
      }
      if (listMode === 3) {
        this.$store.state.collectionIndex = index;
      }
      this.$store.state.listMode = listMode;
      const musicDom = this.$refs.musicDom;
      musicDom.load();
      musicDom.play();
      this.$store.state.playState = true;
      this.log();
    },
    //删除当前播放歌曲时暂停播放并重载SRC
    resetSrc: function () {
      const musicDom = this.$refs.musicDom;
      musicDom.pause();
      this.$store.state.playState = false;
      musicDom.load();
    },
    //重载播放器SRC
    changeSRC: function () {
      const musicDom = this.$refs.musicDom;
      musicDom.load();
    },
    //暂停音乐播放
    pause:function(){
      const musicDom = this.$refs.musicDom;
      musicDom.pause();
    },
    //输入id,查询是否在我的喜欢货歌单中 0搜索我的喜欢，1搜索歌单
    queryID: function (id, mode) {
      let state;
      if (mode === 0) {
        state = this.$store.getters.loveID.includes(id);
      } else {
        state = this.$store.getters.listID.includes(id);
      }
      return state;
    },
    //点击右下角喜欢图标，焦点歌曲未收藏则收藏，已收藏则取消收藏
    loveButton: function () {
      if (this.queryID(this.$store.getters.nowMusic.id, 0) === false) {
        this.$store.commit("addNowToLoveList", this.$store.getters.nowMusic);
      } else {
        const Musiclist = this.$refs.Musiclist;
        let idIndex = this.$store.getters.loveID.indexOf(
          this.$store.getters.nowMusic.id
        );
        Musiclist.$_removeLoveMusic(idIndex);
      }
    },
    //显示当前焦点歌曲的歌单。序号、路径
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
    chuangeVolume: function (value) {
      this.$store.commit("chuangeVolume", value);
    },
  },

  crearte: function () {
  },
  beforeMount: function () {
    // 在视图渲染前，将硬盘中的c存储的歌单写入musicList中；
    let myLoveMusicList = JSON.parse(
      window.localStorage.getItem("myLoveMusicList")
    );
    if (myLoveMusicList) {
      this.$store.state.myLoveMusicList = myLoveMusicList;
    }

    let musicLists = JSON.parse(window.localStorage.getItem("musicLists"));
    if (musicLists) {
      this.$store.state.musicList = musicLists;
    }
     //设置初始播放模式；
    this.$store.commit("chuangePlayMode",1);
    // this.$store.state.playMode=2;
    // console.log(`设置播放模式为：${this.$store.state.playMode}`)
    
  },
  mounted: function () {
    
    const musicDom = this.$refs.musicDom; //导入audio标签
    //导入ControlButton
    const ControlButton=this.$refs.ControlButton;
    musicDom.volume = this.$store.state.volume;
    //audio标签重载SRC时，返回歌曲总时长
    musicDom.onloadedmetadata = () => {
      this.$store.commit("chuangeMusicLength", musicDom.duration);
    };
    //设置初始状态音量
    this.chuangeVolume(0.45);
    //audio标签重每秒更新播放进度
    musicDom.ontimeupdate = () => {
      this.$store.commit("chuangenusicTime", musicDom.currentTime);
    };
    //根据播放模式设置，决定是循序播放(1)、单曲循环()2、乱序播放(3)
    musicDom.onended = () => {
    musicDom.pause();
    this.$store.state.playState=false;
   console.log(`当前播放模式为:${this.$store.state.playMode}`);
      if (this.$store.state.playMode === 1) {
        ControlButton.next();
        return;
      }
      if (this.$store.state.playMode === 2) {
        musicDom.play();
        this.$store.state.playState=true;
        return;
      }
      if (this.$store.state.playMode === 3) {
        if (this.$store.state.listMode === 1) {
          this.$store.commit("changeNetWorkIndex", this.playModel(1));
        }
        if (this.$store.state.listMode === 2) {
          this.$store.commit("changeMyLoveIndex", this.playModel(2));
        }
        if (this.$store.state.listMode === 3) {
          this.$store.state.collectionIndex = this.playModel(3);
        }
        musicDom.load();
        musicDom.play();
        this.$store.state.playState=true;
        this.log();
        return;
      }
    };
  },
  beforeUpdate: function () {
    const musicDom = this.$refs.musicDom;
    musicDom.volume = this.$store.state.volume;
  },
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
  /* opacity: 90%; */
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  width: 1080px;
  /* height: 620px; */
  box-shadow: 0px 0px 3px 3px rgba(119, 119, 119, 0.527);
  border-radius: 10px;
  background-image: linear-gradient(
    to bottom,
    #F2F7FC 0%,
    #F2F7FC 20%,
    #fafafa 32%,
    #fafafa 100%
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
  position: relative;;
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
  margin-left: 405px;
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
.lyricBox{
  position:absolute;
  top:0px;
  left: 50%;
  transform: translate(-50%,120px);
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
.musicCollection {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
