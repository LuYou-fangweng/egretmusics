<template>
  <div class="vidioBox" v-show="this.$store.state.mvShow">

    <div class="mask" @click="chuangeShow"></div>
    <video
      id="music"
      class="vidio"
      :src="this.$store.state.mvUrl"
      controls="controls"
      ref="videoDom"
    ></video>
  </div>
</template>

<script>
export default {
  name: "VideoBox",
  props: {},
  data() {
    return {};
  },
  methods: {
    chuangeShow: function () {
      const videoDom=this.$refs.videoDom;
      videoDom.pause();
      this.$store.commit("chuangeMvShow");
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vidioBox {
  position: fixed;
  width: 100vw;
  height:100vh;
  top:0px;
  left: 0px;
}
.vidio {
  width: 1280px;
  height: 720px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.mask {
  width: 100vw;
  height: 90vh;
  position: fixed;
  top: 50%;
  left: 0%;
  transform: translate(0, -50%);
  background-color: rgba(50, 64, 90, 0.2);
}
</style>
