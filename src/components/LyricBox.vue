<template>
  <div class="lyricBox">
    <div class="mobileBox" ref="lyricArr">
      <transition-group tag="ul"  calss="lyricUl">
      <li v-for="item of lyricArr" :key="item.index">
        <p :class="{ lyricActive: item.index=== indexActive}">
          {{ item.lyricText }}
        </p>
      </li>
    </transition-group>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "LyricBox",
  props: {},
  data() {
    return {
      lyricArr: [],//歌词数组
      indexActive: null,//高亮歌词数组序号
      mesosphere:5,//设定中间层，高亮歌词位置
    };
  },
  watch: {
    //监听歌词是否改变，冰赋值给本地数据
    lyric: function (val, oldVal) {
      if (val !== oldVal) {
        this.lyricArr = this.lyricDispose(this.lyric);
      }
    },
    //监听时间变化，如果时间变化则输出应该高亮的歌词行号
    nusicTime: function (val, oldVal) {
      if(this.lyricArr===[]){return;}

      let a = this.lyricArr.filter((item,index)=>{
        if(((item.enterTime < this.nusicTime) && (item.endTime > this.nusicTime))||!item.endTime){
          return item;
        }
      });
      if(a.length===0){return;}
      this.indexActive =a[0].index;
    },
  },
  computed: {
    lyric: function () {
      return this.$store.state.lyric;
    },
    nusicTime: function () {
      return this.$store.state.nusicTime;
    },
  },
  methods: {
    //歌词信息处理函数，将字符串转化为带有行号、开始时间、结束时间、对应歌词的对象数组
    lyricDispose: function (text) {
      if (text === "") {
        console.log("未监测到歌词，停止初始化");
        return;
      }
      // console.log("进入歌词处理函数");
      let arr = text.split("\n");
      arr.pop();
      let arr_lyric = [];
      let index = 0;
      let timeStr, lyrictext, timeArr, time;
      for (let item of arr) {
        timeStr = item.slice(0, 11);
        lyrictext = item.slice(11);
        timeArr = timeStr.slice(1, -1).split(":");
        time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
        arr_lyric.push({
          index: index,
          enterTime: time,
          endTime: "",
          lyricText: lyrictext,
        });
        index++;
      }
      let l = arr_lyric.length;
      for (let i = 0; i < l - 1; i++) {
        arr_lyric[i].endTime = arr_lyric[i + 1].enterTime;
      }
      arr_lyric[l - 1].endTime = this.$store.state.musicLength;
      // console.log(arr_lyric);
      return arr_lyric;
    },
  },
  mounted: function () {},
  beforeUpdate: function () {
    //歌播放进度更新，计算行数是否达到需要上移的情况
    const lyricArrDom=this.$refs.lyricArr;
    let h=0;
    if(this.indexActive>(this.mesosphere-1)){
      h=(this.indexActive+1-this.mesosphere)*40;
    }
    lyricArrDom.style.transform=`translateY(-${h}px)`;
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin: 0px;
  padding: 0px;
}
/* Vuex 列表动画设置 */
/* .v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(80px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
} */

/* 下面的 .v-move 和 .v-leave-active 配合使用，能够实现列表后续的元素，渐渐地漂上来的效果
    */
/* .v-move {
  transition: all 0.6s ease;
}
.v-leave-active {
  position: absolute;
} */

.lyricBox {
  width: 600px;
  height: 360px;
  overflow: hidden;
}
.lyricUl{
transform: translateY(0px);
}
.lyricBox li {
  min-height: 40px;
  font: 400 20px/40px 楷体;
  color: rgb(116, 116, 116);
}
.lyricActive {
  color: rgb(0, 162, 255);
  font-size: 25px;
}
.mobileBox{
  transition: all 0.5s;
}
p{
  transition: all 0.5s;
}
</style>
