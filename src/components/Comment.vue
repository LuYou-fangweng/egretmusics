<template >
  <div class="comment">
    <ul>
      <li class="commentList" v-for="item of commentList" :key="item.id">
        <img :src="item.imgSrc" alt="" class="imgs" />
        <div class="commenFont">
          <p class="commenName">{{ item.nickname }}</p>
          <p class="commenText">{{ item.content }}</p>
          <p class="time">{{ item.timeStr }}</p>
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
      
    }
  },
  computed:{
    commentList:function(){
      return this.$store.state.comment
    }
  },
  methods: {
    
  }
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
