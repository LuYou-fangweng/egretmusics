<template>
  <div class="controlButton">
    <img
      :src="require(`../assets/${modeImg}`)"
      alt="播放模式"
      class="playOrder"
      @click="chuangePlayMode"
    />
    <div class="previous" @click="prev"></div>
    <div
      class="play yuan"
      :class="{ playActive: $store.state.playState == true }"
      @click="$listeners.playNow()"
    ></div>
    <div class="next" @click="next"></div>
    <div
      class="contentChanges"
      :class="{ contentChangesActive: this.$store.state.lyricShow === true }"
      @click="chuangelyricShow"
    ></div>
  </div>
</template>

<script>
export default {
  name: "ControlButton",
  props: {},
  data() {
    return {
      playState: false,
    };
  },
  computed: {
    modeImg: function () {
      if (this.$store.state.playMode === 1) {
        return "顺序播放.svg";
      }
      if (this.$store.state.playMode === 2) {
        return "循环播放.svg";
      }
      if (this.$store.state.playMode === 3) {
        return "乱序播放.svg";
      }
    },
  },
  methods: {
    //控制歌词是否显示
    chuangelyricShow: function () {
      this.$store.commit("chuangelyricShow");
    },
    //修改播放播放模式
    chuangePlayMode: function () {
      let i = this.$store.state.playMode;
      if (i < 3) {
        i++;
      } else {
        i = 1;
      }
      this.$store.commit("chuangePlayMode", i);
    },
    //上一首
    prev: function () {
      if (this.$store.state.listMode == 3) {
        this.$listeners.prev();
        return;
      }
      if (this.$store.getters.nowIndex > 1) {
        this.$listeners.prev();
      }
    },
    //下一首
    next: function () {
      if (this.$store.state.listMode == 3) {
        this.$listeners.next();
        return;
      }
      if (this.$store.getters.nowIndex < this.$store.getters.nowLength - 1) {
        this.$listeners.next();
      }
    },
  },
};
</script>

<style scoped>
.controlButton {
  height: 64px;
  width: 260px;
  display: flex;
  justify-content: space-around;
}
.controlButton div,
.controlButton img {
  background-size: contain;
  margin: auto 0px;
}
.yuan {
  border-radius: 50%;
}
.previous,
.next {
  height: 26px;
  width: 26px;
}
.play {
  height: 58px;
  width: 58px;
  background: url("../assets/播放.svg");
}
.playActive {
  height: 58px;
  width: 58px;
  background: url("../assets/暂停.svg");
}
.play:hover {
  background-color: rgb(211, 211, 211);
}
.playOrder,
.contentChanges {
  height: 35px;
  width: 35px;
  background-size: contain;
}
.contentChanges{
  background: url("../assets/歌词未激活 .svg") no-repeat center center;
}
.contentChangesActive {
  background: url("../assets/歌词激活.svg") no-repeat center center;
}

.previous {
  background: url("../assets/上一首.svg");
}
.next {
  background: url("../assets/下一首.svg");
}
</style>
