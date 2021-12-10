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
  position: relative;
  width: 1980px;
  height: 1080px;
}
.vidio {
  width: 1280px;
  height: 720px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.mask {
  height: 1080px;
  margin: 0px auto;
  background-color: rgba(50, 64, 90, 0.192);
}
</style>
