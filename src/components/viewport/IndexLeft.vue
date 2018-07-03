<template>
  <div class="holder "   style="overflow: hidden">

    <div class="screens"
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

        v-for="val in widgetStore"
        :key="val.uuid"
        :val="val"
        :h="height"
        :w="375"
        :data-type="val.type"
        :data-uuid="val.uuid"
        >
        <component
          v-if="val.isContainer"
          :is="child.type"
          :data-title="child.type"
          class="layer layer-child cursor-point"

          v-for="child in getChilds(val.name)"
          :key="child.uuid"
          :val="child"
          :h="height"
          :w="375"
          :data-type="child.type"
          :data-uuid="child.uuid"
          />
      </component>

    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
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

    },

    mixins: [],

    props: ['draft'],


    mounted() {

    },

    methods: {

      // 获取子组件
      getChilds(name) {
        return this.draft.widgets.filter(
          item => item.belong === name
        )
      }
    },

    computed: {
      // 已添加的组件
      widgetStore() {
        return this.draft.widgets.filter(item => item.belong === 'page')
      },

      // 画布高度
      height() {
        return this.draft.page.height;
      },

      // 页面背景色
      backgroundColor() {
        return this.draft.page.backgroundColor
      },
      bgImage() {
        return 'url(' + this.draft.page.backgroundImageUrl + ')';
      },
      setTitle() {
        return this.draft.page.title
      },


    }

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
