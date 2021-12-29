<template>
  <div id="app">
    <!-- <div class="back"></div> -->
    <div class="background" :class="{'backgroundActive':this.$store.state.mvShow}"></div>
    <div id="nav">
      <router-link to="/">播放器</router-link> |
      <router-link to="/about">备注</router-link>
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
.router {
  margin: 10px auto;
}
/* .boxBox {
  left: 50%;
  transform: translate(-50%);
  position: absolute;
  top:50px;
} */
.background{
  position:fixed;
  width: 100vw;
  height:100vh;
  top: 0;
  left: 0;
  background: url("./assets/背景1.png") no-repeat;
   filter: blur(15px);
   transition: all 0.5s ease;
  object-fit: cover;
  /* transform: translateZ(10px); */

}
.backgroundActive{
  background: url("./assets/背景2.png") no-repeat;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  /* perspective: 20px; */
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
