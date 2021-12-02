<template>
  <div class="controlButton">
    <div class="playOrder"></div>
    <div class="previous"></div>
    <div class="play yuan" @click='playNow'></div>
    <div class="next"></div>
    <div class="contentChanges"></div>
  </div>
</template>

<script>
export default {
  name: 'ControlButton',
  props: {},
  data () {
    return {
      playState: false
    }
  },
  methods:{
    playNow:function(){
      this.$emit('playNow');
    }
  }
}
</script>

<style scoped>
.controlButton {
  height: 64px;
  width: 260px;
  display: flex;
  justify-content: space-around;
}
.controlButton div {
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
.play:hover {
  background-color: rgb(211, 211, 211);
}
.playOrder,
.contentChanges {
  height: 34px;
  width: 34px;
}
.playOrder {
  background: url("../assets/顺序播放.svg");
}
.previous {
  background: url("../assets/上一首.svg");
}
.next {
  background: url("../assets/下一首.svg");
}
</style>
