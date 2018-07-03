/**
 * 操作项，可自己实现
 * */

export default {
  addWidget({state, commit, store}, item) {

      commit('addWidget', {item})
      // 设置选中
      commit('select', {
        uuid: state.widgets[state.widgets.length - 1].uuid
      })

  },
  save({state, store}) {
    store.$emit('save', state)
  },
  preview({store}) {
    store.$emit('preview')
  },

}
