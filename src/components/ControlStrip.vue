<template>
  <div class="controlStrip">
    <div class="time">
      {{ $store.state.nusicTime | gshsj }}/{{
        $store.state.musicLength | gshsj
      }}
    </div>
    <div class="jdt">
      <div class="timeStrip" ref="timeStripDom"></div>
      <div class="strip" @click="$_changeTime"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ControlStrip",
  props: {},
  dara() {
    return {
      // timeStripDom:null,
    };
  },
  filters: {
    gshsj: function (date) {
      let min = parseInt(date / 60);
      let scen = parseInt(date % 60);
      /*  if(min<10&&min>=0){min="0"+min;}
      if(scen<10&&min>=0){scen="0"+min;} */
      return min + ":" + scen;
    },
  },
  methods: {
   $_changeTime:function(e){
    this.$emit("changeTime",e)
   }
  },
  mounted: function () {},
  beforeUpdate: function () {
    let l = parseInt(
      (this.$store.state.nusicTime / this.$store.state.musicLength) * 550
    );
    this.$refs.timeStripDom.style.width = l + "px";
  },
};
</script>

<style scoped>
.controlStrip {
  display: flex;
  height: 36px;
}
.time {
  width: 85px;
  height: 18px;
}
.jdt {
  margin-top: 9px;
  position: relative;
  width: 550px;
  height: 6px;
}
.timeStrip {
  position: absolute;
  width: 0px;
  height: 6px;
  background-color: #0084e2;
  transition: all 1s linear;
}
.strip {
  position: absolute;
  width: 550px;
  height: 6px;
  background-color: rgba(68, 68, 68, 0.185);
}
</style>
