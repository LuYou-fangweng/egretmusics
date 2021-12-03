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
      { id: " ", musicName: " ", album: " ", writer: " ", src: "" },
    ],
    // 我的喜欢歌曲列表
    myLoveMusicList: [
      { id: " ", musicName: " ", album: " ", writer: " ", src: "" },
    ],
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
    assignment: (state, arr) => {
      state.networkMusicList = arr;
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
            state.musicList[state.collectionIndex[0]][state.collectionIndex[1]];
      }
      return a;
    },
  },
  modules: {},
});
