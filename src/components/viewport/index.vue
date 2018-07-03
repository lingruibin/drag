<template>
  <div class="holder " id="viewport" style="overflow: hidden">

    <div class="screens " id="screen"
         :style="{
        backgroundColor: backgroundColor,
        height: height + 'px',
        backgroundImage:bgImage,
        backgroundSize:'100% 100%'
      }">

      <!-- 组件 -->
      <component
        :is="val.type"
        :data-title="val.type"
        class=" cursor-point"
        :class="{'g-active': id === val.uuid}"
        v-for="val in widgetStore"
        :key="val.uuid"
        :val="val"
        :h="height"
        :w="375"
        :data-type="val.type"
        :data-uuid="val.uuid"
        :playState="playState">
        <component
          v-if="val.isContainer"
          :is="child.type"
          :data-title="child.type"
          class="layer layer-child cursor-point"
          :class="{'g-active': id === child.uuid}"
          v-for="child in getChilds(val.name)"
          :key="child.uuid"
          :val="child"
          :h="height"
          :w="375"
          :data-type="child.type"
          :data-uuid="child.uuid"
          :playState="playState"/>
      </component>

      <!-- 参考线 -->
      <ref></ref>

      <!-- 尺寸控制器 -->
      <control></control>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ref from './ref-lines.vue'
  import control from './size-control.vue'
  import {move} from '../../../static/mixins'
  import widgetsForm from '../../components/common/widgets/index'
  import widget from '../../../static/plugins/widget'
  import widgets from '../common/widgets/index'

  export default {
    name: 'viewport',
    // store,
    data() {
      return {}
    },

    created() {
      // 注册 widgets
      Vue.use(widget, {
        widgets: widgets
      });
      /* //注册表单
       Vue.use(forms, {
         forms: this.forms
       });
       //注册高级表单
       Vue.use(highForms, {
         highForms: this.highForms
       });

       // 初始化已有数据
       if (this.value) {
         store.replaceState(this.value)
       }
       //绑定方法
       store.$on('save', () => {
         this.$emit('save', store.state)
       });
       store.$on('preview', () => {
         this.$emit('preview', store.state)
       });
       store.$on('selectPage', (item) => {
         this.$emit('selectPages', item, store.state)
       })*/

    },

    mixins: [move],

    props: [],

    mounted() {
      // 采用事件代理的方式监听元件的选中操作
      document
        .getElementById('screen')
        .addEventListener('mousedown', this.handleSelection, false);
      // Delete 删除选中元件
      document.addEventListener(
        'keyup',
        e => {
          e.stopPropagation()
          if (e.keyCode === 46) {
            this.dele()
          }
        },
        true
      )
    },

    methods: {
      // 删除元件
      dele() {
        this.$store.commit('deletes')
      },
      handleSelection(e) {
        var target = e.target;
        console.log(target)
        //判断有无自定义属性，找到需要选中的元素
        while ((!target.getAttribute("id")) && !target.getAttribute("data-type")) {
          target = target.parentNode;
        }
        var type = target.getAttribute('data-type');
        if (type) {
          var uuid = target.getAttribute('data-uuid');

          // 设置选中元素
          this.$store.commit('select', {
            uuid: uuid || -1
          });

          // 绑定移动事件：只有从属于 page 的，除背景图以外的元件才能移动
          target = this.$store.state.activeElement;
          if (target.belong === 'page' && target.dragable) {
            this.initmovement(e) // 参见 mixins
          }
          this.$store.commit('setAnimationList', target.animation);

        } else {
          // 取消选中元素
          this.$store.commit('select', {
            uuid: -1
          })
        }

      },


      // 获取子组件
      getChilds(name) {
        return this.$store.state.widgets.filter(
          item => item.belong === name
        )
      }
    },

    computed: {
      // 已添加的组件
      widgetStore() {
        return this.$store.state.widgets.filter(item => item.belong === 'page')
      },

      // 画布高度
      height() {
        return this.$store.state.page.height;
      },

      // 页面背景色
      backgroundColor() {
        return this.$store.state.page.backgroundColor
      },
      bgImage() {
        return 'url(' + this.$store.state.page.backgroundImageUrl + ')';
      },
      setTitle() {
        return this.$store.state.page.title
      },

      // 选中项id
      id() {
        // var type = this.$store.state.type
        // var index = this.$store.state.index
        // index = index >= 0 ? index : ''
        // return type + index
        return this.$store.state.uuid
      },

      // 动画播放状态
      playState() {
        return this.$store.state.playState
      }
    }, components: {
      ref: ref, // 参考线
      control: control // 尺寸控制
    },

  }
</script>

<style scoped>
  .holder {
    /*display: flex;*/
    height: 100%;
    text-align: center;
    /*flex-direction: column;*/
    /*align-items: center;*/
    overflow-y: auto;
    overflow-x: hidden;
    -ms-overflow-x: hidden;
    font-size: 0;
    border: 1px solid #f5f5f5;
    border-width: 0 1px;
    /* background-image: linear-gradient(
       45deg,
       #f5f5f5 25%,
       transparent 0,
       transparent 75%,
       #f5f5f5 0
     ),
     linear-gradient(
       45deg,
       #f5f5f5 25%,
       transparent 0,
       transparent 75%,
       #f5f5f5 0
     );*/
    /*background-position: 0 0, 13px 13px;*/
    /*background-size: 26px 26px;*/

    background-color: #f1f1f1;
  }

  .screens {
    width: 375px;
    position: relative;
    transform: scale(1);
  }

  .title {
    background-color: #000000;
    height: 40px;
    width: 375px;
    color: white;
    margin-top: 80px;
    font-size: 13px;
    line-height: 40px;
    text-align: center;
    margin-bottom: -25px;
  }
</style>
