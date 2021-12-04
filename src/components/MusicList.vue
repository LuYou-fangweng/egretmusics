<template>
  <div class="musicList">
    <div class="menu">
      <div
        class="network"
        @click="$_chuangeShowMode(1)"
        :class="{ modeActiv: listShowMode === 1 }"
      >
        网络
      </div>
      <div
        class="live"
        @click="$_chuangeShowMode(2)"
        :class="{ modeActiv: listShowMode === 2 }"
      >
        喜欢
      </div>
      <div
        class="collect"
        @click="$_chuangeShowMode(3)"
        :class="{ modeActiv: listShowMode === 3 }"
      >
        收藏
      </div>
    </div>
    <div class="list">
      <div class="networkList" v-show="showMode[0]">
        <ul>
          <li v-for="(item, index) in networkMusicList" :key="item.id">
            <img
              src="../assets/已喜欢.svg"
              class="addLove"
              @click="$_addLoveMusic(index, item.id)"
              :class="{ loveActive: $_queryID(item.id) }"
            />

            <div
              class="musicName"
              :class="{ musicNameActive: index === $store.state.networkIndex }"
              @click="$listeners.playThis(1, index)"
            >
              {{ item.musicName }}
            </div>
            <img src="@/assets/SVG.svg" class="video" />
          </li>
        </ul>
      </div>
      <!-- 我的喜欢歌单 -->
      <div class="loveList" v-show="showMode[1]">
        <ul>
          <li
            v-for="(item, index) in this.$store.state.myLoveMusicList"
            :key="item.id"
          >
            <img
              src="../assets/删除.svg"
              class="delet"
              @click="$_removeLoveMusic(index)"
            />
            <div
              class="musicName"
              :class="{ musicNameActive: index === $store.state.myLoveIndex }"
              @click="$listeners.playThis(2, index)"
            >
              {{ item.musicName }}
            </div>
            <img src="@/assets/SVG.svg" class="video" @click="$_queryID" />
          </li>
        </ul>
      </div>
      <div class="collectList" v-show="showMode[2]"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "musicList",
  props: {},
  data() {
    return {
      listShowMode: 1,
    };
  },

  computed: {
    showMode: function () {
      let a = [];
      if (this.listShowMode === 1) {
        a = [true, false, false];
      } else if (this.listShowMode === 2) {
        a = [false, true, false];
      } else {
        a = [false, false, true];
      }
      return a;
    },
    networkMusicList: function () {
      return this.$store.state.networkMusicList;
    },
  },
  methods: {
    // 改变列表模式序号
    $_chuangeShowMode: function (value) {
      this.listShowMode = value;
    },
    // 将选定网络歌单添加至我的喜欢歌单
    $_addLoveMusic: function (index, id) {
      if (!this.$_queryID(id)) {
        this.$store.commit("addLoveMusic", index);
      } else {
        console.log("本歌曲已经添加至“我的喜欢”！请勿重复添加！");
      }
      /* if((index===this.$store.state.myLoveIndex)&&(index===this.$store.getters.loveListLength)){
        this.$store.commit("reduceLoveIndex");
      } */
    },
    //移除我的喜欢曲库中选定歌曲
    $_removeLoveMusic: function (index) {
      //根据删除歌曲与歌曲焦点的位置判断焦点的移动规则
      if (index < this.$store.state.myLoveIndex) {
        this.$store.commit("reduceLoveIndex");
        this.$store.commit("removeLoveMusic", index);
        return;
      }
      if (index === this.$store.state.myLoveIndex) {
        if (index === this.$store.getters.loveListLength) {
          this.$store.commit("reduceLoveIndex");
          this.$listeners.resetSrc();
          this.$store.commit("removeLoveMusic", index);
          return;
        }
        this.$store.commit("removeLoveMusic", index);
        this.$listeners.resetSrc();
        return;
      }
      this.$store.commit("removeLoveMusic", index);
    },
    //查询ID是否我的喜欢曲库中
    $_queryID: function (id) {
      return this.$store.getters.loveID.includes(id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.musicList {
  width: 240px;
  height: 480px;
}
.menu {
  display: flex;
}
.menu div {
  width: 80px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  border-right: rgba(126, 126, 126, 0.623) solid 1px;
  font-family: "宋体";
}
.menu div:nth-child(3) {
  border-right: 0px;
}
.list {
  position: relative;
  height: 440px;
  width: 240px;
}
.list > div {
  width: 240px;
  height: 440px;
  position: absolute;
  overflow-x: hidden;
  overflow-y: scroll;
}
.list > div::-webkit-scrollbar {
  display: none;
}
.list li {
  display: flex;
  height: 40px;
  margin: 0px auto;
  line-height: 40px;
  font-size: 16px;
  padding-left: 5px;
  padding-right: 5px;
}
.list ul {
  margin: 0px;
}
.networkList li:nth-child(2n + 1),
.loveList li:nth-child(2n + 1) {
  background-color: rgb(222, 235, 247);
}

.networkList li:first-child,
.loveList li:first-child {
  display: none;
}

img {
  width: 24px;
  height: 24px;
  margin: auto 0px;
}
.musicName {
  margin: 0px auto;
  height: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.musicNameActive {
  color: rgb(36, 108, 190);
}
.modeActiv {
  background-color: rgb(236, 240, 253);
}
.delet,
.addLove {
  visibility: hidden;
  opacity: 0.4;
}
.loveList li:hover .delet,
.networkList li:hover .addLove {
  visibility: visible;
}
.loveActive {
  visibility: visible;
  opacity: 1;
}
</style>
