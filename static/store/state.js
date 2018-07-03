/**
 * 编辑页面元素与属性
 * */
export default {
  top: 0,                 // 添加元件的初始纵坐标
  zoom: 100,               // 画布缩放百分比
  type: 'page',           // 选中元素类型
  index: -1,              // 选中元素索引
  uuid: null,             // 选中元素uuid
  counter: 0,             // 容器副本命名时避免重名所用的计数器

  originX: 0,             // 选中元件的横向初始值
  originY: 0,             // 选中元件的纵向初始值
  startX: 0,              // 鼠标摁下时的横坐标
  startY: 0,              // 鼠标摁下时的纵坐标
  moving: false,          // 是否正在移动元件（参考线仅在移动元件时显示）

  animation: [],          // 动画库
  playState: false,       // 动画播放状态

  activeElement: {},      // 选中对象，要么是元件，要么是页面
  page: {
    page: true,
    title: '测试页面',    // 页面 title
    height: 667,         // 画布高度
    endTime: new Date(),   // 截止日期
    backgroundColor: '#f1f1f1',
    backgroundImageUrl: '',
    isUpload: true,
    sort:0,

  },
  widgets: [],            // 元件
  forms: [],
  pageList: [],
  project:{
    projectTitle:'',
    shopId: '1515ewe15',
    projectId: 222,//项目id
    desc: ""
  },
  currentPageId: '',//当前page可视页面的id
  currentPageSort: 0,//当前page排序

  loading: true,
  //页面详情
  pageDetail: {
    "top": 0,
    "zoom": 100,
    "type": "page",
    "index": -1,
    "uuid": null,
    "counter": 0,
    "originX": 0,
    "originY": 0,
    "startX": 0,
    "startY": 0,
    "moving": false,
    "animation": [],
    "playState": false,
    "activeElement": {
      "page": true,
      "title": "页面",
      "height": 667,
      "endTime": "2018-03-26T02:43:12.491Z",
      "backgroundColor": "#f1f1f1",
      "backgroundImageUrl": "",
      "isUpload": true,
      desc: ""
    },
    "page": {
      "page": true,
      "title": "测试页面",
      "height": 667,
      "endTime": "2018-03-26T02:43:12.491Z",
      "backgroundColor": "#f1f1f1",
      "backgroundImageUrl": "",
      desc: "",
      "isUpload": true
    },
  },

}
