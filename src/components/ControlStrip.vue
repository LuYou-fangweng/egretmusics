<template>
  <div class="controlStrip">
    <div class="time">00:32/03:21</div>
    <div class="jdt">
      <div class="timeStrip"></div>
      <div class="strip"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ControlStrip',
  props: {}
}
</script>

<style scoped>
.controlStrip {
  display: flex;
  height:36px;
}
.time{
  width: 85px;
  height: 18px;;
}
.jdt{
  margin-top:9px;
  position: relative;
   width: 550px;
  height:6px;
}
.timeStrip{
  position: absolute;
  width: 50px;
  height:6px;
  background-color: #0084e2;
}
.strip {
  position: absolute;
  width: 550px;
  height:6px;
  background-color: rgba(68, 68, 68, 0.185);
}
</style>
