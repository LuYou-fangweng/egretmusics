import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    //基本数据示例
    /* networkMusicList: [
      {
        id: "",
        musicName: "", // 歌名
        albumName: "", // 专辑名
        writer:"",// 艺术家
        src: "", // 歌曲地址
        coverSrc: "", // 封面地址
        MV: "", // 是否有MV
        MV_Src: "", // MV视频地址
      },
    ], */
    // 网络歌曲列表
    networkMusicList: [
      { id: "", musicName: " ", album: " ", writer: " ", src: "" },
    ],
    // 我的喜欢歌曲列表
    myLoveMusicList: [
      { id: "", musicName: " ", album: " ", writer: " ", src: "" },
    ],
    //我的收藏歌曲列表
    musicList: [{ name: "我的收藏", listMusic: [] }],

    inputText: "", //搜索框输入内容
    listMode: 1, //当前歌曲所在歌单状态
    playState: false, //true播放 false暂停

    networkIndex: 0, //网络歌单当前序号
    myLoveIndex: 0, //我的喜欢歌单当前序号
    collectionIndex: [0, 0], //收藏歌单当前歌单号、序号
    playMode: 1, //1：顺序循环 2：单曲循环  3：随机

    // 评论区信息
    comment: [
      {
        imgs: "", // 头像链接
        commenName: "", // 姓名
        commenText: "", // 评论内容
      },
    ],
  },
  mutations: {
    //导入网络歌曲列表
    assignment: (state, arr) => {
      state.networkMusicList = arr;
    },
    //将选定网络歌单添加至我的喜欢歌单
    addLoveMusic:(state,index)=>{
      state.myLoveMusicList.push(state.networkMusicList[index])
    },
    //将选定我的喜欢歌曲从列表中删除
    removeLoveMusic:(state,index)=>{
      state.myLoveMusicList.splice(index,1);
    },
     //我的喜欢歌单焦点序号+1
     addLoveIndex:function(state){
      state.myLoveIndex++
     },
    //我的喜欢歌单焦点序号-1
    reduceLoveIndex:function(state){
     state.myLoveIndex--
    },
    //清空网络歌曲列表
    clearNetworkMusicList:function(state){
        state.networkMusicList = [
        { id: "", musicName: "", album: "", writer: "", src: "" },
      ];
    },
    //重置网络歌单焦点至特定序号
    changeNetWorkIndex:function(state,index){
      state.networkIndex=index;
    }
  },
  actions: {},
  getters: {
    //根据焦点歌曲所在列表与序号，返回歌曲的信息
    nowMusic: (state) => {
      let a;
      switch (state.listMode) {
        case 1:
          a = state.networkMusicList[state.networkIndex];
          break;
        case 2:
          a = state.myLoveMusicList[state.myLoveIndex];
          break;
        case 3:
          a =
            state.musicList[state.collectionIndex[0]][state.collectionIndex[1]];
      }
      return a;
    },
    //返回我的喜欢曲库歌曲ID数组供查重
    loveID:(state)=>{
      let ids= state.myLoveMusicList.map(function(item){return item.id});
      return ids;
    },
    //我的喜欢曲库歌曲数量（含开头空列表）
    loveListLength:function(state){
      let l=state.myLoveMusicList.length-1;
      return l;
    },
    //当前歌单模式列表长度
    nowLength:function(state){
      switch(state.listMode){
        case 1:return state.networkMusicList.length;
        case 2:return state.myLoveMusicList.length;
      }

    },
    //当前焦点歌曲序号
    nowIndex:function(state){
      switch(state.listMode){
        case 1:return state.networkIndex;
        case 2:return state.myLoveIndex;
      }
    }
  },
  modules: {},
});
