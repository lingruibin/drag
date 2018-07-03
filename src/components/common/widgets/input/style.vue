<template>
  <div>
    <el-tabs v-model="activeTab" @tab-click="handleClick" :stretch="true" type="card">
      <el-tab-pane label="表单" name="text">
        <div class="texttabs1">
          <ul>
            <li>
              <div class="flex-horziontal">
                <label>层级</label>
                <el-input-number size="small" v-model="activeElement.z" :min="0"></el-input-number>
              </div>
            </li>
            <li v-show="activeElement.typeList!=='braid-button'">
              <div class="flex-horziontal">
                <label>内容</label>
                <el-input size="small" v-model="activeElement.text" class="width-200"></el-input>
              </div>
            </li>
            <li>
              <div class="flex-horziontal">
                <label>字体</label>
                <el-select v-model="activeElement.fontSize" placeholder="请选择" size="small">
                  <el-option
                    v-for="item in sizeList"
                    :key="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
            </li>
            <li>
              <div class="subtabheader">
                <ul>
                  <li :class="[{'active':isTxt}]" @click.stop="changeColorTab()">文字</li>
                  <li :class="[{'active':!isTxt}]" @click.stop="changeColorTab()">背景</li>
                </ul>

              </div>
              <div class="colortab flex-horziontal ">
                <ul class="flex-horziontal padding-left-5" v-show="isTxt">
                  <li :class="['color-system',{'nocolor':index==colorList.length-1}]" :style="{backgroundColor: item}"
                      v-for="item,index in colorList" @click.stop="activeElement.color=item"></li>
                  <el-color-picker class="width-60 margin-left-0" size="small" type="color"
                                   v-model="activeElement.color"></el-color-picker>
                </ul>
                <ul class="flex-horziontal padding-left-5" v-show="!isTxt">
                  <li :class="['color-system',{'nocolor':index==colorList.length-1}]" :style="{backgroundColor: item}"
                      v-for="item,index in colorList" @click.stop="activeElement.bgColor=item"></li>
                  <el-color-picker class="width-60 margin-left-0" size="small" type="color"
                                   v-model="activeElement.bgColor"></el-color-picker>
                </ul>

              </div>
            </li>


            <li class="active bg-grey-200 padding-5">边框</li>
            <li>
              <div class="flex-horziontal padding-right-15">
                <label>宽度</label>
                <el-slider class="flex-1"
                           v-model="activeElement.borderWidth" :step="1" :max="parseInt(activeElement.height)/4">
                </el-slider>

              </div>
            </li>
            <li>
              <div class="flex-horziontal padding-right-15">
                <label>颜色</label>
                <el-color-picker class="width-60 margin-left-5" size="small" type="color"
                                 v-model="activeElement.borderColor"></el-color-picker>
              </div>
            </li>
            <li>
              <div class="flex-horziontal padding-right-15">
                <label>样式</label>
                <el-select v-model="activeElement.borderStyle" placeholder="请选择" size="small">
                  <el-option
                    v-for="item in borderStyleData" :label="item.val" :key="item.key"
                    :value="item.key">
                  </el-option>
                </el-select>
              </div>
            </li>
            <li class="active bg-grey-200 padding-5">其他</li>
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

    </el-tabs>
  </div>
</template>

<script>
  import AnimationView from '../../animation/Index'

  export default {
    name: 'textView',
    data() {
      return {
        activeTab: "text",
        isTxt: true, AnimationView: AnimationView,
        colorList: ["#1ABD9B", "#ffffff", "#45D1D7", "#4B5EB2", "#EEEA00", "#F55B2E", "#D92940", "#000000", "transparent"],
        sizeList: ["12", "14", "16", "18", "20", "22", "24", "26", "28", "30", "32", "34", "40", "50", "60", "70", "80", "100",],
        borderStyleData: [{
          key: "solid",
          val: "实线"
        }, {
          key: "dashed",
          val: "虚线"
        }, {
          key: "dotted",
          val: "点状"
        }, {
          key: "double",
          val: "双线"
        }],
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
    }, components: {AnimationView}
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
