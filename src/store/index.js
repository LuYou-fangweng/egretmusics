import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    //基本数据示例
    
    // 网络歌曲列表
    networkMusicList: [
      { id: "", musicName: " ", album: " ", writer: " ", src: "" },
    ],
    // 我的喜欢歌曲列表
    myLoveMusicList: [
      { id: "", musicName: " ", album: " ", writer: " ", src: "" },
    ],
    //我的收藏歌曲列表
    musicList: [{ name: "我的收藏(默认)", listMusic: [] }],

    inputText: "", //搜索框输入内容
    listMode: 1, //当前歌曲所在歌单状态
    playState: false, //true播放 false暂停

    networkIndex: 0, //网络歌单当前序号
    myLoveIndex: 0, //我的喜欢歌单当前序号
    collectionIndex: [0, 0], //收藏歌单当前歌单号、序号
    playMode: 1, //1：顺序循环 2：单曲循环  3：随机
    musicLength: 0,//歌曲时间长度
    nusicTime: 0,//歌曲播放进度
    volume: 0,//歌曲音量
    addMusicListBox: false,//歌单添加框显示状态

    musicslength:60,//搜索歌单默认结果数量
    limit:30,//默认评论数

    mvUrl:'',//,mv播放地址
    mvShow:false,//mv播放器遮罩层

    musicCover:'',//封面

    canPlay:true,//是否有版权可播放
   

    // 评论区信息
    comment: [],

    lyric:'',//歌词信息

    
  },
  mutations: {
    //改变遮罩层
    chuangeMvShow:function(state){
      state.mvShow=!state.mvShow;
    },
    //导入歌词
    chuangeLyric:function(state,value){
      state.lyric=value;
     },
    //导入MV地址
    chuangeMvUrl:function(state,value){
     state.mvUrl=value;
    },
    //导入网络歌曲列表
    assignment: (state, arr) => {
      state.networkMusicList = arr;
    },
    //将选定网络歌单添加至我的喜欢歌单
    addLoveMusic: (state, index) => {
      state.myLoveMusicList.push(state.networkMusicList[index])
    },
    //将选定我的喜欢歌曲从列表中删除
    removeLoveMusic: (state, index) => {
      state.myLoveMusicList.splice(index, 1);
    },
    //我的喜欢歌单焦点序号+1
    addLoveIndex: function (state) {
      state.myLoveIndex++
    },
    //我的喜欢歌单焦点序号-1
    reduceLoveIndex: function (state) {
      state.myLoveIndex--
    },
    //清空网络歌曲列表
    clearNetworkMusicList: function (state) {
      state.networkMusicList = [
        { id: "", musicName: "", album: "", writer: "", src: "" },
      ];
    },
    //重置网络歌单焦点至特定序号
    changeNetWorkIndex: function (state, index) {
      state.networkIndex = index;
    },
     //重置我的喜欢曲库焦点至特定序号
     changeMyLoveIndex: function (state, index) {
      state.myLoveIndex = index;
    },
    //改变歌曲总长度
    chuangeMusicLength: function (state, value) {
      state.musicLength = value;
    },
    //改变当前歌曲播放进度数字
    chuangenusicTime: function (state, value) {
      state.nusicTime = value;
    },
    //改变音量
    chuangeVolume: function (state, value) {
      state.volume = value;
    },
    //对收藏歌单添加新的歌单
    addNewMusicLists: function (state, newList) {
      state.musicList.push(newList);
    },
    //将当前播放歌曲信息添加至我的喜欢
    addNowToLoveList: function (state, value) {
      state.myLoveMusicList.push(value)
    },
    //将当前播放歌曲的信息添加至选定的歌单(未知BUG不能使用)
    // addNowList: function (state, [value, index]) {
    //   state.musicList[index].listMusic.push(value)
    // },
    addNowList: function (state, [value, index]) {
      let list = [];
      Object.assign(list, state.musicList[index].listMusic)
      list.push(value);
      state.musicList[index].listMusic = list;
    },
    //显示歌单添加框
    showAddListBox: function (state) {
      state.addMusicListBox = true;
    },
    //关闭歌单添加框
    notShowAddListBox: function (state) {
      state.addMusicListBox = false;
    },
    //删除指定歌单的指定歌曲
    deletMusic: function (state, [index1, index2]) {
      state.musicList[index1].listMusic.splice(index2, 1)
    },
    //删除指定歌单
    deletlist: function (state, index) {
      state.musicList.splice(index, 1)
    },
    //改变收藏歌单序号
    chuangeCollectionIndex: function (state, index) {
      state.collectionIndex = index;
    },
    //改变歌曲焦点模式
    chuangeListMode: function (state, index) {
      state.listMode = index;
    },
    //改变播放模式
    chuangePlayMode:function(state,index){
     state.playMode=index;
    },
    //更新评论
    chuangeComment:function(state,index){
    state.comment=index;
    },
    chuangeCanPlay:function(state,index){
      state.canPlay=index;
      },

  },
  actions: {},
  getters: {
    //根据焦点歌曲所在列表与序号，返回歌曲的信息
    nowMusic: function (state) {
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
            state.musicList[state.collectionIndex[0]].listMusic[state.collectionIndex[1]];
      }
      return a;
    },
    //返回我的喜欢曲库歌曲ID数组供查重
    loveID: (state) => {
      let ids = state.myLoveMusicList.map(function (item) { return item.id });
      return ids;
    },
    //返回歌单中歌曲的ID数组供查重
    listID: (state) => {
      let ids = [];
      for (let i = 0; i < state.musicList.length; i++) {
        // for (let j = 0; j < state.musicList[i].listMusic.length; j++) {
        //   ids.push(state.musicList[i].listMusic[j].id);
        ids.push(...state.musicList[i].listMusic.map(function (item) { return item.id }));
      }
      return ids;
    },
  //我的喜欢曲库歌曲数量（含开头空列表）
  loveListLength: function (state) {
    let l = state.myLoveMusicList.length - 1;
    return l;
  },
  //当前歌单模式列表长度
  nowLength: function (state) {
    switch (state.listMode) {
      case 1: return state.networkMusicList.length;
      case 2: return state.myLoveMusicList.length;
      case 3: return state.musicList[state.collectionIndex[0]].listMusic.length;
    }

  },
  //当前焦点歌曲序号map
  nowIndex: function (state) {
    switch (state.listMode) {
      case 1: return state.networkIndex;
      case 2: return state.myLoveIndex;
      case 3: return state.collectionIndex[1];
    }
  }
},
  modules: {},
});
