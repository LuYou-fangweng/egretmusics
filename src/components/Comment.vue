<template >
  <div class="comment">
    <ul>
      <li class="commentList" v-for="item of commentList" :key="item.id">
        <img :src="item.imgSrc" alt="" class="imgs" />
        <div class="commenFont">
          <p class="commenName">{{ item.commenName }}</p>
          <p class="commenText">{{ item.commenText }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {},
  data () {
    return {
      commentList: [
        {
          id: '1',
          commenName: '雪落轩门',
          imgSrc: require('../assets/评论头像.png'),
          commenText: '神行白鹭里，绫雪傲霜华'
        },
        {
          id: '2',
          commenName: '雪落轩门',
          imgSrc: require('../assets/评论头像.png'),
          commenText: '我真的太喜欢凌华了，真的太喜欢了，她是我心目中完美少女的化身'
        },
        {
          id: '3',
          commenName: '雪落轩门',
          imgSrc: require('../assets/评论头像.png'),
          commenText: '若知是梦何须醒，不比真如一相会'
        }
      ]
    }
  },
  methods: {}
}
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
  padding-top:25px;
  padding-bottom:5px;
}
.imgs {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right:8px ;
  border:rgb(212, 212, 212) solid 1px;
 /*  box-shadow: 1px 1px 6px 1px rgb(128, 128, 128); */
}
p{
  margin: 0px;
  padding: 0px;
  text-align: left;
}
.commenFont{
  width: 184px;
}
.commenName{
  font:500 20px/30px 等线（正文）；
}
</style>
