<template>
  <div class="searchBox">
    <img src="@/assets/搜索框.svg" alt="搜索框" @click="$_searchMusic" />
    <input
      type="text"
      class="textInput"
      placeholder="请在此搜索想要寻找的音乐"
      v-model="searchText"
      @keyup.enter="$_searchMusic"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "searchBox",
  props: {},
  data: function () {
    return { searchText: "" };
  },
  watch: {
    //监听输入框内容，输入框清空时清空网络歌单列表，并重置歌单播放焦点为0
    searchText: function (val, oldVal) {
      if (val === "") {
       this.$store.commit("clearNetworkMusicList")
       this.$store.commit("changeNetWorkIndex",0)
      }
    },
  },
  methods: {
    //网络请求，根据输入关键字搜索歌曲
    $_searchMusic: function () {
      const them = this;
      /* axios
              .get("https://autumnfish.cn/search?keywords=" + them.searchText) */
      //搜索歌曲
      axios
        .get("https://autumnfish.cn/search", {
          params: {
            keywords: them.searchText,
            limit:100,
          },
        })
        .then(function (response) {
          // 对返回数据进行提取，选取ID、歌名、专辑、作者、URL信息。S
          // let t= response.data.result.songs;
          // console.log(t);
        if(response.status!==200){
          alert(response.mes);
          return;
        }
        console.log(response);
          const searchMusicList = response.data.result.songs.map((item) => {
            let cname=item.artists.map(function(itemw){return itemw.name}).join(" ");
            const { name: musicName, id, album,mvid } = item;
            return {
              id,
              musicName,
              album: album.name,
              writer: cname,
              src: `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
              mvid,
              coverID:album.id,
            };
          });
          searchMusicList.unshift( { id: "", musicName: "", album: "", writer: "", src: "" ,mvid:'',coverID:''});
          //若歌曲焦点在网络歌单而且在播放时，暂停播放

          them.$store.commit("assignment", searchMusicList);
          // console.log(them.$store.state.networkMusicList);
          //将网络歌单焦点设置为1
          them.$store.commit("changeNetWorkIndex",1);
          if(them.$store.state.listMode===1){
            them.$emit("pause");
            them.$emit("changeSRC");
          }

        })
        .catch(function (err) {
          console.log("网络请求出错！错误详情为：");
          console.log(err);
        });
    },
  },
};
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
  font-family: "宋体";
}
</style>
