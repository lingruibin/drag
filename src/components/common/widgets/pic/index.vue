<template>
  <div class="lz-image"
       :class="[ 'animate' , ]"
       :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      width: val.width  + 'px',
      height: val.height  + 'px',
      left: val.belong === 'page' ? val.left + 'px' : '0',
      top: val.belong === 'page' ? val.top +'px' : '0',
      zIndex: val.z,
      animation:formateAnimation,
      opacity:val.opacity/100,
    }">
    <img
      :src="val.src" :style="{
       borderRadius:val.borderRadius+'px',
      borderStyle: val.borderStyle,
      borderColor: val.borderColor,
      borderWidth:val.borderWidth+'px',
      width:'100%',
      height:'100%'
    }">
  </div>
</template>

<script>
  const WIDGET_NAME = 'braid-pic';

  export default {
    name: WIDGET_NAME,
    icon: 'zhan-pic',
    title: '图片',
    panel: null,
    setting: {
      type: WIDGET_NAME,
      isContainer: false,
      isUpload: true,
      hasGuide: true,
      isChild: true,
      dragable: true,
      resizable: true,
      left: 50,
      z: 0,
      src:'',
      pageIndex: '1',
      href: '',// 超链接网址
      linkType: "none",
      belong: 'page',                   // 属于哪个容器
      borderStyle: 'solid',
      borderRadius: 0,
      width: 100,
      height: 100,
      opacity: 100,
      borderWidth: 0,
      borderColor: '#ffffff',
      animation:''
    },
    props: [
      'val', 				// 图片对象
      'w', 			    // 包含块的宽
      'h',  	     	// 包含块的高
      'playState'   // 动画播放状态
    ],
    created() {

    },
    computed:{
      formateAnimation(){
      return this.val.animation? this.val.animation.replace(/-/g,' '):'';
      }
    },
  }
</script>

<style scoped>
  .lz-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    user-select: none;
    -webkit-user-drag: none;
    pointer-events: none;
  }
</style>
