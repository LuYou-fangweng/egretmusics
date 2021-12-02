<template>
  <div class="musicList">
    <div class="menu">
      <div class="network" @click="$_chuangeShowMode(1)" :class="{'modeActiv':listShowMode===1}">网络</div>
      <div class="live" @click="$_chuangeShowMode(2)" :class="{'modeActiv':listShowMode===2}">喜欢</div>
      <div class="collect" @click="$_chuangeShowMode(3)" :class="{'modeActiv':listShowMode===3}">收藏</div>
    </div>
    <div class="list">
      <div class="networkList" v-show="showMode[0]">
        <ul>
          <li v-for="item in networkMusicList" :key="item.id">
            <img src="@/assets/歌曲图标.svg" class="djbf" />
            <div class="musicName">{{ item.musicName }}</div>
            <img src="@/assets/SVG.svg" class="video" />
          </li>
        </ul>
      </div>
      <div class="liveList" v-show="showMode[1]"></div>
      <div class="collectList" v-show="showMode[2]"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'musicList',
  props: {},
  data () {
    return {
      listShowMode: 1,
    }
  },
 
  computed: {
    showMode: function () {
      let a = []
      if (this.listShowMode === 1) {
        a = [true, false, false]
      } else if (this.listShowMode === 2) {
        a = [false, true, false]
      } else {
        a = [false, false, true]
      }
      return a
    },
    networkMusicList:function(){
      return this.$store.state.networkMusicList;
    }
  },
  methods: {
    $_chuangeShowMode: function (value) {
      this.listShowMode = value
    }
  }
}
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
li {
  display: flex;
  height: 40px;
  margin: 0px auto;
  line-height: 40px;
  font-size: 16px;
  padding-left: 5px;
  padding-right: 5px;
}
.networkList li:nth-child(2n + 1),
.liveList li:nth-child(2n + 1) {
  background-color: rgb(222, 235, 247);
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
.modeActiv{
background-color:rgb(236, 240, 253);
}
</style>
