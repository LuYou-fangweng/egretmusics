<template>
  <div class="musicCollection">
    <div class="collectionHeader">
      <div class="headerText">收藏至歌单</div>
      <div class="close" @click="$_notShowBox"></div>
    </div>
    <div class="addNewList">
      <div class="img add" @click="$_addMusics"></div>
      <input
        type="text"
        v-model="musicListName"
        @keyup.enter="$_addMusics"
        placeholder="新建歌单"
        class="inputText"
      />
    </div>
    <div class="addMyLove">
      <div class="img love" @click="$_addLoveList"></div>
      <div class="_box" @click="$_addLoveList">我的喜欢</div>
    </div>
    <div class="nowLists">
      <ul>
        <li
          @click="$_addMusicList(index)"
          class="listName _box"
          v-for="(item, index) of this.$store.state.musicList"
          :key="index"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicCollection",
  props: {},
  data() {
    return {
      musicListName: "",
    };
  },
  methods: {
    //关闭歌单添加框
    $_notShowBox:function(){
      this.$store.commit("notShowAddListBox");
    },
    //将焦点歌曲添加至新增歌单
    $_addMusics: function () {
      let newList = {};
      newList.name = this.musicListName;
      newList.listMusic = [this.$store.getters.nowMusic];
      this.$store.commit("addNewMusicLists", newList);
      this.musicListName = "";
      this.$_notShowBox();
       //将改动后的歌单存入硬盘
      window.localStorage.setItem("musicLists", JSON.stringify(this.$store.state.musicList));
    },
    //查询ID是否在我的喜欢中
    $_queryID: function (id) {
      return this.$store.getters.loveID.includes(id);
    },
    //将当前焦点歌曲添加至我的喜欢
    $_addLoveList: function () {
      if (this.$_queryID(this.$store.getters.nowMusic.id)) {
        alert("歌曲已经存在“我的喜欢”曲库中！请勿重复添加");
        return;
      }
      this.$store.commit("addNowToLoveList", this.$store.getters.nowMusic);
    },
    //将当前焦点歌曲收藏至至选定的歌单
    $_addMusicList: function (index) {
      //对需要添加歌曲的歌单提取ID，并检验改歌曲是否已经在此歌单中
      let ids = this.$store.state.musicList[index].listMusic.map((item) => {
        return item.id;
      });
      if (ids.includes(this.$store.getters.nowMusic.id)) {
        alert("歌曲已经在此歌单中,请勿重复添加！");
        return;
      }
      //调用函数将当前焦点歌曲添加至对应歌单
      this.$store.commit("addNowList", [this.$store.getters.nowMusic, index]);
      this.$_notShowBox();
       //将改动后的歌单存入硬盘
      window.localStorage.setItem("musicLists", JSON.stringify(this.$store.state.musicList));
    },
  },
};
</script>
<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
.musicCollection {
  width: 480px;
  height: 360px;
  background-color: #f7f7f7;
  font: 300 24px/50px 宋体;
  padding: 5px 10px;
  text-align: left;
  border-radius: 8px;
  border: #dae3f3 solid 1px;
  box-shadow: 2px 1px 4px 2px #68686886;
}
.collectionHeader {
  height: 50px;
  margin: 0px auto;
  display: flex;
}
.headerText {
  font-size: 26px;
  height: 50px;
  width: 440px;
  font-weight: bold;
}
.inputText {
  font-size: 26px;
  border: 0 !important; /*移除边框*/
  -webkit-appearance: none; /*移除谷歌浏览器默认样式*/
  -moz-appearance: none; /*移除火狐浏览器默认样式*/
  outline: 0; /* 移除输入时的边框 */
  width: 350px;
  font: 300 24px/50px 宋体;
}
.close {
  width: 32px;
  height: 32px;
  background: url("../assets/关闭.svg") no-repeat;
  background-size: contain;
  margin: auto 0px;
}

.addNewList {
  display: flex;
  height: 50px;
  margin-bottom: 10px;
}
.add {
  background: url("../assets/添加歌单.svg") no-repeat;
  background-size: contain;
}
.addMyLove {
  display: flex;
  height: 50px;
  margin-bottom: 10px;
}
.love {
  background: url("../assets/我的喜欢歌单.svg") no-repeat;
  background-size: contain;
}
.img {
  width: 50px;
  height: 50px;
  background-color: #d6dce5;
  margin: 0px 20px;
}
.nowLists {
  height: 180px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.nowLists li {
  margin: 5px;
  margin-left: 90px;
}
._box {
  width: 380px;
}
</style>
