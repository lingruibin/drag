<template>
  <div>
    <el-tabs v-model="activeTab" @tab-click="handleClick" :stretch="true" type="card">
      <el-tab-pane label="图片" name="text">
        <div class="texttabs1">
          <ul>
            <li>
              <div class="flex-horziontal">
                <label>层级</label>
                <el-input-number size="small" v-model="activeElement.z" :min="0"></el-input-number>
              </div>
            </li>
            <li>
              <div class="flex-horziontal padding-right-15">
                <label>圆角</label>
                <el-slider input-size="small" :step="1" class="flex-1"
                           v-model="activeElement.borderRadius">
                </el-slider>

              </div>
            </li>
            <li>
              <div class="flex-horziontal padding-right-15">
                <label>透明</label>
                <el-slider input-size="small" :step="1" class="flex-1" :max="100"
                           v-model="activeElement.opacity">
                </el-slider>

              </div>
            </li>
            <li v-show="false">
              <div class="flex-horziontal padding-right-15">
                <label>旋转</label>
                <el-slider input-size="small" class="flex-1" :max="360"
                           v-model="activeElement.rotateNum">
                </el-slider>

              </div>
            </li>
          </ul>


        </div>
      </el-tab-pane>
      <el-tab-pane label="动画" name="animation">
        <component :is="AnimationView"></component>

      </el-tab-pane>
      <el-tab-pane label="跳转" name="link">
        <component :is="LinkView"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import LinkView from '../../link/Index'
  import AnimationView from '../../animation/Index'
  export default {
    name: 'textView',
    data() {
      return {
        activeTab: "text",
        isTxt: true,
        colorList: ["#1ABD9B", "#ffffff", "#45D1D7", "#4B5EB2", "#EEEA00", "#F55B2E", "#D92940", "#000000", "transparent"],
        sizeList: ["12", "14", "16", "18", "20", "22", "24", "26", "28", "30", "32", "34", "40", "50", "60", "70", "80", "100",],
        LinkView:LinkView,
        AnimationView:AnimationView,
      }
    },
    created() {
    },
    computed: {
      activeElement() {
        return this.$store.state.activeElement
      }
    },
    methods: {

      handleClick(tab, event) {
        console.log(tab.index);
      },
      changeColorTab() {
        this.isTxt = !this.isTxt
      },
    },
    components:{LinkView, AnimationView}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .color-system {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin: 15px 2px;

  }
</style>
