const generate = require('nanoid/generate');

export default {
  // 选中元件与取消选中
  select(state, payload) {
    state.uuid = payload.uuid;
    if (payload.uuid === -1) {
      state.activeElement = state.page;
      state.type = 'page'
    } else {
      let widget = state.widgets.find(w => w.uuid === payload.uuid);
      state.activeElement = widget;
      state.type = widget.type
    }
    console.log("select  " + JSON.stringify(state.uuid))
  },

  // 设置 mousemove 操作的初始值
  initmove(state, payload) {
    state.startX = payload.startX;
    state.startY = payload.startY;
    state.originX = payload.originX;
    state.originY = payload.originY;
    state.moving = true
  },

  // 元件移动结束
  stopmove(state) {
    state.moving = false
  },

  // 移动元件
  /**
   * 设置组件左边距+宽度超过页面宽度，将不再可水平拖动
   * */
  move(state, payload) {
    var target = state.activeElement
    var dx = payload.x - state.startX
    var dy = payload.y - state.startY
    var left = state.originX + Math.floor(dx * 100 / state.zoom)
    var top = state.originY + Math.floor(dy * 100 / state.zoom);
    target.left = left;
    target.top = top;

  },

  // 调整元件尺寸,允许超出左右边
  resize(state, payload) {
    var dx = payload.x - state.startX
    var dy = payload.y - state.startY
    var value

    if (payload.type === 'right') {
      value = state.originX + Math.floor(dx * 100 / state.zoom)
      state.activeElement.width = value > 10 ? value : 10
      return
    }

    if (payload.type === 'down') {
      value = state.originX + Math.floor(dy * 100 / state.zoom)
      state.activeElement.height = value > 10 ? value : 10
      return
    }

    if (payload.type === 'left') {
      var left = state.originX + Math.floor(dx * 100 / state.zoom)
      var width = state.originY - Math.floor(dx * 100 / state.zoom)
      state.activeElement.left = left > 0 ? left : 0
      state.activeElement.width = width > 10 ? width : 10
      return
    }

    if (payload.type === 'up') {
      var top = state.originX + Math.floor(dy * 100 / state.zoom)
      var height = state.originY - Math.floor(dy * 100 / state.zoom)
      state.activeElement.top = top > 0 ? top : 0
      state.activeElement.height = height > 10 ? height : 10
    }
  },

  // 复制元件
  copy(state, payload) {

    if (state.type !== 'page') {
      var copy = Object.assign({}, state.activeElement, {top: state.top, uuid: generate('1234567890abcdef', 10)});

      // 由于容器的名称必须是唯一的，故复制容器需作处理
      if (state.activeElement.isContainer) {
        var name = state.activeElement.name
        if (name) {
          // 设置容器副本的名称
          var copyName = name.split('-')[0] + '-' + state.counter
          copy.name = copyName

          // 复制容器内的图片和文本
          for (var i = 0, len = state.widgets.length; i < len; i++) {
            if (state.widgets[i].belong === name) {
              state.widgets.push(Object.assign({}, state.widgets[i], {belong: copyName})
              )
            }
          }

          state.counter += 1
        }
      }

      state.widgets.push(copy)
    }
  },

  // 更新元件初始 top 值
  updateSrollTop(state, top) {
    state.top = top
  },

  // 页面缩放
  zoom(state, val) {
    state.zoom = 100;
  },

  // 初始化选中对象
  initActive(state) {
    state.activeElement = state.page;

  },

  // 删除选中元件
  deletes(state) {
    console.log(JSON.stringify(state.type))
    var type = state.type;
    if (type === 'page') {
      return false;
    }
    // 删除元件
    var currentIndex = state.widgets.indexOf(state.widgets.find(val => val.uuid === state.uuid));
    console.log("delIndex  " + currentIndex)
    // console.log(JSON.stringify(state.widgets.find(val => val.uuid === state.uuid)))
    console.log(JSON.stringify(state.widgets.length))
    // return false

    state.widgets.splice(currentIndex, 1);

    // 重置 activeElement
    state.activeElement = state.page;
    state.type = 'page'
    state.uuid = -1;

  },

  // 添加组件
  addWidget(state, {data: data = null, item}) {
    let def = {top: 20, uuid: generate('1234567890abcdef', 10)};//默认距离顶部20px
    let setting = JSON.parse(JSON.stringify(item.setting));

    if (setting.isContainer) {
      setting.name = def.uuid
    }
    if (data) {
      data.forEach(function (val) {
        state.widgets.push(Object.assign(setting, val, def))
      })
    } else {
      state.widgets.push(Object.assign(setting, def))
    }
  },


//添加图片组件时设置图片
  addPic(state, data) {
    state.activeElement.src = data;
  },


  // 添加动画
  addAnimation(state) {
    state.animation.push({
      name: 'none',
      duration: 1,
      delay: 0.5,
      iteration: 1,
      // timing: 'linear',
      // direction: 'normal',
      // fill: 'both'
    });

  },
  // 删除动画
  deleteAnimation(state, data) {
    state.animation.splice(data, 1);
  },
//设置动画属性
  setAnimationStyle(state) {
    var arr, s, a;
    console.log(JSON.stringify(state.animation))
    for (let i = 0; i < state.animation.length; i++) {
      s = state.animation[i];
      if (i == 0) {
        a = s.name + "-" + s.duration + "s-" + s.delay + "s-" + s.iteration + "-both running";

      } else {
        a = a + " , " + s.name + "-" + s.duration + "s-" + s.delay + "s-" + s.iteration + "-normal";
      }
    }
    state.activeElement.animation = a;
  },

  setAnimationList(state, data) {
    state.animation = [];
    if (!data) {
      return false;
    }
    var list = data.split(',');
    var a = {}, anStyle;
    for (let i = 0; i < list.length; i++) {
      anStyle = list[i].split('-');
      a.name = anStyle[0];
      a.duration = anStyle[1].split('s')[0];
      a.delay = anStyle[2].split('s')[0];
      a.iteration = anStyle[3];
      state.animation.push(a)
      a = {};
    }

    console.log(JSON.stringify(state.animation))
  },

  // 动画的播放与停止
  setAnimation(state, status) {
    state.playState = status
  },

  // 更新数据
  updateData(state, {uuid, key, value}) {
    let widget = state.widgets.find(w => w.uuid === uuid);
    if (widget) {
      widget[key] = value
    }
  },
  refreshPageList(state, data) {
    state.pageList = data;
  },
  refreshPageDetail(state, data) {
    state.pageDetail = data;
    state.page = data.page;
    state.widgets = data.widgets;//设置内容
  },
  refreshPageId(state, data) {
    state.currentPageId = data.id;
    console.log("id "+data.sort)

    state.currentPageSort = data.sort;
  },
  resetActiveElement(state) {
    state.activeElement = state.page;
  },
  changeLoading(state, data) {
    state.loading = data;
  },
}
