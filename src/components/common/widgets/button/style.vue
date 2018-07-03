<template>
  <div>
    <div class="panel-row">
      <div class="panel-label">背景颜色</div>
      <div class=" ">
        <div class="margin-bottom-5"></div>
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

    </div>
  </div>
</template>

<script>
  export default {
    name: 'braid-button-style',
    props: ['activeElement'],
    methods: {
      addPic() {

      }
    }
  }
</script>
<style scoped>

  .avatar-uploader-icon {
    font-size: 18px;
    color: #8c939d;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    cursor: pointer;
  }

  .avatar-uploader-icon:hover {
    border-color: #409EFF;
  }
</style>
