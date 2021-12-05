<template>
  <div class="musicCollection">
    <div class="collectionHeader">
      <div class="headerText">收藏至歌单</div>
      <div class="close"></div>
    </div>
    <div class="addNewList">
      <div class="img add"></div>
      <input type="text" placeholder="新建歌单" class="inputText" />
    </div>
    <div class="addMyLove">
      <div class="img love"></div>
      <div class="_box">我的喜欢</div>
    </div>
    <div class="mowLists">
      <ul>
        <li
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
    return {};
  },
  methods: {},
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
  border:#DAE3F3 solid 1px;
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
.mowLists li {
  margin:5px;
  margin-left: 90px;
}
._box {
  width: 380px;
}
</style>
