// 默认 highForms

var highForms
var highFormsStyle = {}

const install = (Vue, config = {}) => {
  if (install.installed) return
//复制元件集
  highForms = Object.assign({},  config.highForms)
  Object.keys(highForms).forEach(key => {
    Vue.component(key, highForms[key])
    // style panel
    if (highForms[key]['panel']) {
      let panel = Object.assign({}, highForms[key]['panel'], {
        type: key
      });
      Vue.component(panel.name, panel);
      highFormsStyle[panel.name] = panel;
      // remove panel from object
      delete highForms[key]['panel']
    }
  })
}

export default {
  install,
  getHighForms () {
    return highForms
  },
  getHighFormsStyle () {
    return highFormsStyle
  }
}
