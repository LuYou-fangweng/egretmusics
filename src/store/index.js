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
    //将当前播放歌曲去信息添加至我的喜欢
    addNowToLoveList: function (state, value) {
      state.myLoveMusicList.push(value)
    },
    //将当前播放歌曲的信息添加至选定的歌单
    addNowList: function (state, [value, index]) {
      state.musicList[index].listMusic.push(value)
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
    deletMusic:function(state,[index1,index2]){
    state.musicList[index1].listMusic.splice(index2,1)
    },
    //删除指定歌单
    deletlist:function(state,index){
      state.musicList.splice(index,1)
    },
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
            state.musicList[state.collectionIndex[0]].listMusic[state.collectionIndex[1]];
      }
      return a;
    },
    //返回我的喜欢曲库歌曲ID数组供查重
    loveID: (state) => {
      let ids = state.myLoveMusicList.map(function (item) { return item.id });
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
      }

    },
    //当前焦点歌曲序号map
    nowIndex: function (state) {
      switch (state.listMode) {
        case 1: return state.networkIndex;
        case 2: return state.myLoveIndex;
      }
    }
  },
  modules: {},
});
