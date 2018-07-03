// 默认 forms

var forms
var formsStyle = {}

const install = (Vue, config = {}) => {
  if (install.installed) return
//复制元件集
  forms = Object.assign({},  config.forms)
  Object.keys(forms).forEach(key => {
    Vue.component(key, forms[key])
    // style panel
    if (forms[key]['panel']) {
      let panel = Object.assign({}, forms[key]['panel'], {
        type: key
      });
      Vue.component(panel.name, panel);
      formsStyle[panel.name] = panel;
      // remove panel from object
      delete forms[key]['panel']
    }
  })
}

export default {
  install,
  getForms () {
    return forms
  },
  getFormsStyle () {
    return formsStyle
  }
}
