<template>
  <div class="comment">
    <transition-group tag="ul">
      <li class="commentList" v-for="item of commentList" :key="item.id">
        <img :src="item.imgSrc" alt="" class="imgs" />
        <div class="commenFont">
          <p class="commenName">{{ item.nickname }}</p>
          <p class="commenText">{{ item.content }}</p>
          <p class="time">{{ item.timeStr }}</p>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {},
  data() {
    return {};
  },
  computed: {
    commentList: function () {
      return this.$store.state.comment;
    },
  },
  methods: {},
};
</script>
<style scoped>
.comment {
  width: 240px;
  height: 480px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.comment::-webkit-scrollbar {
  display: none;
}
.commentList {
  display: flex;
  width: 240px;
  border-bottom: rgb(214, 214, 214) solid 1px;
  padding-top: 25px;
  padding-bottom: 5px;
}
.imgs {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 8px;
  border: rgb(212, 212, 212) solid 1px;
  /*  box-shadow: 1px 1px 6px 1px rgb(128, 128, 128); */
}
p {
  margin: 0px;
  padding: 0px;
  text-align: left;
}
.commenFont {
  width: 184px;
}
.commenName {
  font: 500 20px/30px 等线（正文）；;
}
.v-leave-to,
.v-enter {
  opacity: 0;
  transform: translateY(50px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}

/* 下面的 .v-move 和 .v-leave-active 配合使用，能够实现列表后续的元素，渐渐地漂上来的效果
    */
/* .v-move {
  transition:all 1s ease;
} */
/* .v-leave-active {
  position: absolute;
} */
/* .v-enter-active {
  transition: all 1s;
} */
</style>
