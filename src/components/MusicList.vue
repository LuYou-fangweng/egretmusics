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
              :class="{
                musicNameActive:
                  index === $store.state.networkIndex &&
                  $store.state.listMode === 1,
              }"
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
              :class="{
                musicNameActive:
                  index === $store.state.myLoveIndex &&
                  $store.state.listMode === 2,
              }"
              @click="$listeners.playThis(2, index)"
            >
              {{ item.musicName }}
            </div>
            <img src="@/assets/SVG.svg" class="video" @click="$_queryID" />
          </li>
        </ul>
      </div>
      <!-- 我的收藏歌单 -->
      <div class="collectList" v-show="showMode[2]">
        <ul>
          <li v-for="(item, index) of this.$store.state.musicList" :key="index">
            <div class="listHeader">
              <div class="documens"></div>
              <div class="musicListName">{{ item.name }}</div>
              <div class="deletList" @click="$_deletlist(index)"></div>
            </div>
            <!-- 各歌单中歌曲详情 -->
            <div class="listParticulars">
              <ul>
                <li
                  class="Particulars"
                  v-for="(item_1, index_1) of item.listMusic"
                  :key="item_1.id"
                >
                  <img
                    src="../assets/删除.svg"
                    class="delet"
                    @click="$_deletMusic(index, index_1)"
                  />
                  <div
                    class="musicName"
                    @click="$listeners.playThis(3, [index, index_1])"
                    :class="{
                      musicNameActive:
                        index === $store.state.collectionIndex[0] &&
                        index_1 === $store.state.collectionIndex[1] &&
                        $store.state.listMode === 3,
                    }"
                  >
                    {{ item_1.musicName }}
                  </div>
                  <img src="@/assets/SVG.svg" class="video" />
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
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
    //删除指定歌单中的歌曲并根据删除位置改变歌单焦点
    $_deletMusic: function (v1, v2) {
      // console.log("进入删除函数");
      let i = [];
      // i[0]=this.$store.state.collectionIndex[0];
      // i[1]=this.$store.state.collectionIndex[1];
      Object.assign(i, this.$store.state.collectionIndex);
      // console.log(`删除前焦点i:${i}，删除点[${v1},${v2}]`);
      if (v1 === i[0]) {
        if (v2 < i[1]) {
          console.log(`执行序号-1`);
          i[1]--;
        } else {
          if (v2 === i[1]) {
            if (v2 === this.$store.state.musicList[i[0]].listMusic.length - 1) {
              if (v2 === 0) {
                while (
                  i[0] > 0 &&
                  this.$store.state.musicList[i[0] - 1].listMusic.length === 0
                ) {
                  i[0]--;
                }
                if (v1 === 0) {
                  // console.log("判断需要转移歌单模式");
                  // this.$store.commit("chuangeListMode", 1);
                  this.$store.state.listMode = 1;
                  console.log("转移至网络歌单");
                  this.$store.commit("changeNetWorkIndex", 0);
                  console.log("焦点为0");
                  this.$store.commit("deletMusic", [v1, v2]);
                  this.$listeners.resetSrc();
                  //将改动后的歌单存入硬盘
                  window.localStorage.setItem(
                    "musicLists",
                    JSON.stringify(this.$store.state.musicList)
                  );
                  return;
                }
                i[0]--;
                i[1] = this.$store.state.musicList[i[0]].listMusic.length;
              }
              i[1]--;
              // console.log(`删除后焦点i:${i}，删除点[${v1},${v2}]`);
              this.$store.commit("chuangeCollectionIndex", i);
            }

            this.$store.commit("deletMusic", [v1, v2]);
            this.$listeners.resetSrc();
            //将改动后的歌单存入硬盘
            window.localStorage.setItem(
              "musicLists",
              JSON.stringify(this.$store.state.musicList)
            );
            return;
          }
        }
      }
      // console.log(`删除后焦点i:${i}，删除点[${v1},${v2}]`);
      this.$store.commit("chuangeCollectionIndex", i);
      this.$store.commit("deletMusic", [v1, v2]);
      //将改动后的歌单存入硬盘
      window.localStorage.setItem(
        "musicLists",
        JSON.stringify(this.$store.state.musicList)
      );
    },
    //删除指定歌单
    $_deletlist: function (index) {
      if (index === 0) {
        return;
      }
      let i = [];
      Object.assign(i, this.$store.state.collectionIndex);
      if (index < i[0]) {
        i[0]--;
      }
      if (index === i[0]) {
        if (this.$store.state.musicList[0].listMusic.length !== 0) {
          this.$store.commit("chuangeCollectionIndex", [0, 0]);
        } else {
          this.$store.state.listMode = 1;
          this.$store.commit("changeNetWorkIndex", 0);
        }
        this.$listeners.resetSrc();
      }
      this.$store.commit("deletlist", index);
      //将改动后的歌单存入硬盘
      window.localStorage.setItem(
        "musicLists",
        JSON.stringify(this.$store.state.musicList)
      );
    },
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
.networkList li,
.loveList li,
.listParticulars li {
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
.listParticulars li:hover .delet,
.networkList li:hover .addLove {
  visibility: visible;
}
.loveActive {
  visibility: visible;
  opacity: 1;
}
.collectList li {
}
.listHeader {
  display: flex;
  height: 50px;
}
.documens {
  width: 50px;
  height: 50px;
  background: url("../assets/文件夹-关闭.svg") no-repeat;
  background-size: contain;
}
.musicListName {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-weight: 400;
  width: 150px;
  text-align: left;
  font-family: 楷体;
}
.deletList {
  width: 40px;
  height: 50px;
  background: url("../assets/删减歌单.svg") no-repeat center center;
  background-size: contain;
  opacity: 0%;
}
.listHeader:hover .deletList {
  opacity: 80%;
}
.collectList li:nth-child(1) .deletList {
  display: none;
}
</style>
