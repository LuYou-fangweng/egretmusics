<template>
  <div class="app">
    <!-- <div class="back"></div> -->
    <div class="backBox">
       <div class="background" :class="{'backgroundActive':this.$store.state.mvShow}"></div>
    </div>
    <router-view class="router" />
    <div class="boxBox">
      <VideoBox class="videoBox"></VideoBox>
    </div>

  </div>
</template>
<script>
import VideoBox from "./components/VideoBox.vue";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    VideoBox,
  },
};
</script>
<style>
html,body{
  border: 0px;
  padding: 0px;
  margin: 0px;
  width: 100vw;
  height: 100vh;

}
/* .router {
} */
/* .boxBox {
  left: 50%;
  transform: translate(-50%);
  position: absolute;
  top:50px;
} */
.backBox{
width: 100%;
height: 100%;
/* perspective: 40px; */
position: absolute;
top: 0px;
left: 0px;
overflow: hidden;

}
.background{
  position:absolute;
  width: 100vw;
  height:100vh;
  top: 50%;
  left: 50%;

  background: url("https://aqbyzdq.oss-cn-guangzhou.aliyuncs.com/ayaka/%E8%83%8C%E6%99%AF1.png") no-repeat;
  filter: blur(5px);
  transition: all 0.3s ease;
  object-fit: cover;
  transform: translate3D(-50%,-50%,0px);

}
.backgroundActive{
  background: url("https://aqbyzdq.oss-cn-guangzhou.aliyuncs.com/ayaka/%E8%83%8C%E6%99%AF2.png") no-repeat;
}
.app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #2c3e50;
  position: relative;
  /* perspective: 20px; */
  height: 100%;
  width: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
