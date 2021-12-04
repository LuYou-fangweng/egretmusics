<template>
  <div class="gainController">
    <img src="../assets/音量.svg" alt="音量" class="valume" />
    <div class="number">{{ parseInt($store.state.volume * 100) }}%</div>
    <div class="audio">
      <div class="audioLine_c" ref="audioLine_c"></div>
      <div class="audioLine"></div>
      <div
        class="audioCircle"
        ref="audioCircle"
        @mousedown="move($event)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GainController",
  props: {},
  beforeUpdate: function () {
    const audioLine_c = this.$refs.audioLine_c;
    const audioCircle = this.$refs.audioCircle;
    let h = this.$store.state.volume * 100;
    audioLine_c.style.height = h + "px";
    audioCircle.style.marginBottom = h + "px";
  },
  methods: {
    //拖拽音量控制球，改变印象
    move: function (e) {
      let odiv = e.target;
      let xdY = e.offsetY;

      //求出零点Y坐标
      let oldV =
        e.clientY -
        xdY +
        odiv.style.height * 0.5 +
        (120 - 16 - odiv.offsetTop - odiv.style.height) -
        2;

      document.onmousemove = (e) => {
        //求出新确定点Y坐标
        let newV = e.clientY - xdY + odiv.style.height * 0.5;

        //相减得到小球最后位置相对零点距离，以此求出对应音量
        let dy = oldV - newV;
        if (dy < 0) {
          dy = 0;
        } else if (dy > 100) {
          dy = 100;
        }

        let volume = dy / 100;
        this.$store.commit("chuangeVolume", volume);
        this.$emit("audioTb");
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
  },
};
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
  width: 20px;
  height: 120px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px rgba(172, 172, 172, 0.349);
  background-color: #f7f7f7;
}
.gainController:hover .audio {
  display: block;
}
.audio:active {
  display: block;
}
.audioLine {
  position: absolute;
  bottom: 10px;
  width: 4px;
  height: 100px;
  background-color: rgba(131, 131, 153, 0.452);
  left: 50%;
  transform: translate(-50%);
}
.audioLine_c {
  position: absolute;
  bottom: 10px;
  width: 4px;
  height: 0px;
  background-color: rgb(65, 65, 75);
  left: 50%;
  transform: translate(-50%);
}
.audioCircle {
  position: absolute;
  bottom: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: rgb(95, 105, 116);
  left: 50%;
  transform: translate(-50%);
}
</style>
