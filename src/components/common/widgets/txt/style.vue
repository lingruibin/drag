<template>

  <div>
    <div class="panel-row">
      <div class="panel-label">背景颜色</div>
      <div class=" ">

        <div class=" width_100p flex-horziontal">
          <el-input v-model="activeElement.bgColor" class="width-180">
          </el-input>
          <el-color-picker class="width-60 margin-left-5" size="small" type="color"
                           v-model="activeElement.bgColor"></el-color-picker>
        </div>
      </div>

    </div>
    <div class="panel-row">
      <div class="panel-label">字体样式</div>
      <div class=" ">
        <div class="margin-bottom-5">颜色</div>
        <div class=" width_100p flex-horziontal">
          <el-input v-model="activeElement.color" class="width-180">
          </el-input>
          <el-color-picker class="width-60 margin-left-5" size="small" type="color"
                           v-model="activeElement.color"></el-color-picker>
        </div>
      </div>
      <div class="margin-top-20">
        <div class=" width_100p ">
          <div class="margin-bottom-5">大小</div>
          <el-slider class="flex-1"
                     v-model="activeElement.fontSize" :step="1" :max="40":min="12"
                     show-input>
          </el-slider>
        </div>
      </div>

      <div class="margin-top-10">
        <div class=" width_100p ">
          <div class="margin-bottom-5">对齐</div>
          <div>
            <el-radio-group v-model="activeElement.textAlign">
              <el-radio label="left">左对齐</el-radio>
              <el-radio label="center">居中</el-radio>
              <el-radio label="right">右对齐</el-radio>
            </el-radio-group>

          </div>
          <!-- <div>
            <el-radio-group v-model="activeElement.justifyContent">
              <el-radio label="flex-start">左对齐</el-radio>
              <el-radio label="center">居中</el-radio>
              <el-radio label="flex-end">右对齐</el-radio>
            </el-radio-group>

          </div>-->

        </div>
      </div>
      <div class="panel-row">
        <div class="panel-label">边距</div>

        <div class="">
          <div class="flex-horziontal width_100p ">
            <span class="margin-right-10">左边距</span>
            <el-slider class="flex-1"
                       v-model="activeElement.paddingLeft" :step="1" :max="50"
                       show-input>
            </el-slider>
          </div>
        </div>
        <div class="margin-top-10">
          <div class="flex-horziontal width_100p ">
            <span class="margin-right-10">右边距</span>
            <el-slider class="flex-1"
                       v-model="activeElement.paddingRight" :step="1" :max="50"
                       show-input>
            </el-slider>
          </div>
        </div>
        <div class="margin-top-10">
          <div class="flex-horziontal width_100p ">
            <span class="margin-right-10">上边距</span>
            <el-slider class="flex-1"
                       v-model="activeElement.paddingTop" :step="1" :max="40"
                       show-input>
            </el-slider>
          </div>
        </div>
        <div class="margin-top-10">
          <div class="flex-horziontal width_100p ">
            <span class="margin-right-10">下边距</span>
            <el-slider class="flex-1"
                       v-model="activeElement.paddingBottom" :step="1" :max="40"
                       show-input>
            </el-slider>
          </div>
        </div>

      </div>
    </div>
  </div>


</template>

<script>
  export default {
    name: 'braid-txt-style',
    props: ['activeElement']
  }
</script>
