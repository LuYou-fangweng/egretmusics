<template>
  <div class="albumCover">
    <div
      class="record"
      :class="{ recordActive: $store.state.playState === true }"
      @click="$_changeMode"
    >
      <img  :src="coverSrc" class="cover">
    </div>
    <div
      class="probe"
      :class="{ probeActive: $store.state.playState === true }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "AlbumCover",
  props: {},
  data() {
    return {
      // playStare: false 测试状态用数据
    };
  },
  computed:{
  coverSrc:function(){
    let src=require('../assets/默认封面.png');
    if(this.$store.state.musicCover!==''){
      src=this.$store.state.musicCover;
    }
    return src;
  }
  },
  methods: {
    $_changeMode: function () {
      this.playStare = !this.playStare;
    },
  },
};
</script>
<style scoped>
.albumCover {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  box-shadow: 3px 2px 4px 2px rgba(92, 92, 92, 0.664);
}
.record {
  margin-top: 45px;
  width: 296px;
  height: 296px;
  border-radius: 50%;
  border: rgb(27, 27, 27) solid 2px;
  background-color: rgb(36, 36, 36);
  /* box-shadow: 3px 3px 4px 2px rgba(92, 92, 92, 0.664); */
  animation: rotateMove 18s infinite linear;
  animation-fill-mode: forwards;
  animation-play-state: paused;
}
.cover {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: rgb(20, 20, 20) solid 5px;
  margin: 0px auto;
  margin-top: 50%;
  transform: translate(0%, -50%);
  background: url("../assets/默认封面.png");
}
.probe {
  position: absolute;
  top: -45px;
  left: 45%;
  background: url("../assets/探针.svg") no-repeat;
  width: 120px;
  height: 130px;
  background-size: contain;
  transform: rotate(-40deg);
  transform-origin: 14px 14px;
  transition: all 1s ease;
}
.probeActive {
  transform: rotate(0deg);
}
@keyframes rotateMove {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.recordActive {
  animation-play-state: running;
}
</style>
