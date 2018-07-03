<template>
  <div
    class="txt"
    v-html="val.text"
    :class="[ 'animate' , ]"
    contenteditable="true"
    @blur="(e) => updateText(e, val.uuid)"
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      left: val.belong === 'page' ? val.left   + 'px' : '0',
      top: val.belong === 'page' ? val.top +'px' : '0',
      width: val.width  + 'px',
      minHeight: val.height   + 'px',
      overflow:'hidden',
      letterSpacing:val.letterSpacing+'px',
      opacity:val.opacity/100,
      zIndex: val.z,
      lineHeight: val.lineHeight,
      height:val.height  + 'px',
      fontSize: val.fontSize + 'px',
      color: val.color,
      fontWeight: val.fontWeight ? 'bold': 'normal',
       borderRadius:val.borderRadius+'px',
      borderStyle: val.borderStyle,
      borderColor: val.borderColor,
      borderWidth:val.borderWidth+'px',
      backgroundColor:val.bgColor,
       animation:formateAnimation,
      display:'inline-flex',
      alignItems:'center',
      justifyContent:val.justifyContent,

    transform:'rotate('+val.rotateNum+'deg)',
    }">
  </div>
</template>

<script>
  import braidTxtStyle from './style.vue'

  const WIDGET_NAME = 'braid-txt';

  export default {
    name: WIDGET_NAME,
    icon: 'zhan-wenzi',
    title: '内容',
    panel: braidTxtStyle,
    setting: {
      type: WIDGET_NAME,
      isContainer: false,
      isUpload: false,
      hasGuide: true,
      isChild: true,
      dragable: true,
      resizable: true,
      width: 300,
      letterSpacing: 0,
      rotateNum: 0,
      linkType:"none",
      opacity: 100,
      borderWidth: 0,
      borderColor: '#ffffff',
      height: 50,
      justifyContent: 'center',
      left: 50,
      top: 0,
      z: 0,
      lineHeight: 1.6,
      fontSize: 14,
      fontWeight: false,
      color: '#000000',
      textAlign: 'left',
      text: '编辑内容',
      borderStyle: 'solid',
      borderRadius: 0,
      href: '',
      pageIndex: '1',
      belong: 'page',
      animation:'',
      bgColor: '#ffffff',
    },
    // 属性含义参照 widgets/pic/index.vue
    props: ['val', 'h', 'w', 'playState'],
    computed:{
      formateAnimation(){
        return this.val.animation? this.val.animation.replace(/-/g,' '):'';
      }
    },
    methods: {
      updateText(e, uuid) {
        let text = e.target.innerHTML
        this.$store.commit('updateData', {
          uuid: uuid,
          key: 'text',
          value: text
        })
      }
    }
  }
</script>

<style scoped>
  .txt {
    outline: none;
    font-size: 28px;
  }
</style>
