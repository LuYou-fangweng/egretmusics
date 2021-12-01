<template>
  <div class="gainController">
    <img src="../assets/音量.svg" alt="音量" class="valume" />
    <div class="number">100%</div>
    <div class="audio">
      <div class="audioLine"></div>
      <div class="audioLine_c"></div>
      <div class="audioCircle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GainController',
  props: {}
}
</script>
<style scoped>
.gainController {
  width: 150px;
  height: 80px;
  display: flex;
}
.valume {
  width: 46px;
  height: 46px;
  margin: auto 0px;
}
.number {
  margin: auto 0px;
  width: 50px;
  height: 46px;
  line-height: 46px;
  text-align: center;
  font-size: 22px;
  color: rgba(112, 112, 112, 0.39);
}
.audio {
  display: none;
  position: relative;
  top: -100px;
  left: -80px;
  width: 30px;
  height: 120px;
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px rgba(172, 172, 172, 0.349);
  background-color: #f7f7f7;
}
.gainController:hover .audio{
  display:block;
}
.audioLine {
  position: absolute;
  bottom: 15px;
  width: 4px;
  height: 90px;
  background-color: rgba(131, 131, 153, 0.452);
  left: 50%;
  transform: translate(-50%);
}
.audioLine_c {
  position: absolute;
  bottom: 15px;
  width: 4px;
  height: 20px;
  background-color: rgb(65, 65, 75);
  left: 50%;
  transform: translate(-50%);
}
.audioCircle {
  position: absolute;
  bottom: 7px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: rgb(95, 105, 116);
  left: 50%;
  transform: translate(-50%);
}
</style>
