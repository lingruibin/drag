<template>
  <div
    class="lz-container"
    :class="[ 'animate' , ]"
    :style="{
      display: val.display,
      position: 'absolute',
      width: val.width / 3.5 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / 3.5 + '%',
      top: val.top +'px',
      zIndex: val.z,
       backgroundColor: val.bgColor,
      backgroundImage: 'url(' + val.backPic + ')',
      flexDirection: val.dir,
      justifyContent: val.justify,
      alignItems: val.align,
      borderRadius:val.borderRadius+'px',
      borderStyle: val.borderStyle,
      borderColor: val.borderColor,
      borderWidth:val.borderWidth+'px',
      maxWidth:'350px',
    }">

    <!-- 子组件 -->
    <slot></slot>
  </div>
</template>

<script>
  import stylec from './style.vue'

  const WIDGET_NAME = 'braid-container'

  export default {
    name: WIDGET_NAME,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layout"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
    title: '容器',
    panel: stylec,
    setting: {
      type: WIDGET_NAME,
      isContainer: true,
      hasGuide: true,
      isUpload: false,
      isChild: false,
      dragable: true,
      resizable: true,
      name: '',
      width: 300,
      height: 300,
      left: 50,
      top: 0,
      z: 0,
      display: 'flex',
      bgColor: '',
      backPic: '',
      backPicUrl: '',
      radius: 0,
      borderColor: '',
      borderWidth: 0, borderStyle: 'solid',
      borderRadius: 0,
      dir: 'row',
      justify: 'flex-start',
      align: 'flex-start',
      belong: 'page',
      animationName: ''
    },
    props: ['h', 'val', 'playState']
  }
</script>

<style scoped>
  .lz-container {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
</style>
