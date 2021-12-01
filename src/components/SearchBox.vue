<template>
  <div class="searchBox">
    <img src="@/assets/搜索框.svg" alt="搜索框" />
    <input type="text" class="textInput" />
  </div>
</template>

<script>
export default {
  name: 'searchBox',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchBox {
  display: flex;
  width: 400px;
  height: 40px;
  background-color: rgb(201, 230, 243);
  float: right;
  border-radius: 20px;
  padding-left: 10px;
}
.searchBox img {
  height: 30px;
  margin: auto 0px;
}
.textInput {
  width: 260px;
  height: 40px;
  background: rgba(255, 255, 255, 0);
  border: 0 !important; /*移除边框*/
  -webkit-appearance: none; /*移除谷歌浏览器默认样式*/
  -moz-appearance: none; /*移除火狐浏览器默认样式*/
  outline: 0; /* 移除输入时的边框 */
  line-height: 40px;
  font-size: 20px;
  font-family:'宋体'；
}
</style>
