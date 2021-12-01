<template>
  <div id="app">
    <!-- <div class="back"></div> -->
    <div id="nav">
      <router-link to="/">播放器</router-link> |
      <router-link to="/about">备注</router-link>
    </div>
    <router-view class="router"/>
  </div>
</template>

<style>
.router{
  margin: 10px auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
