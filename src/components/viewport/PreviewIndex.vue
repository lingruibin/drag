<template>
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
  <!--</div>-->
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
      },
      showPage(type, href, index) {
        console.log("type  " + type);
        if (type === 'url') {
          window.location.href = href;
        } else if (type == 'none') {
          return false;
        } else {

        }
      },
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

    height: 100%;
    text-align: center;

    overflow-y: auto;
    overflow-x: hidden;
    -ms-overflow-x: hidden;
    background-color: #f1f1f1;
  }

  .screens {
    width: 375px;
    position: relative;
    /*transform: scale(0.8);*/
    /*top: -40px;*/
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
