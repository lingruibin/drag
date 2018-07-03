<template>
  <div
    :class="[ 'animate' , ]"
    v-html="val.text"
    contenteditable="false" @blur="(e) => updateText(e, val.uuid)"
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      left: val.belong === 'page' ? val.left  + 'px' : '0',
      top: val.belong === 'page' ? val.top +'px' : '0',
      width: val.width  + 'px',
      minHeight: val.height  + 'px',
        height:val.height  + 'px',
      zIndex: val.z,
      // lineHeight: val.lineHeight,
      fontSize: val.fontSize + 'px',
       letterSpacing:val.letterSpacing+'px',
      display:'inline-flex',
      alignItems:'center',
      color: val.color,
       backgroundColor: val.bgColor,
        animation:formateAnimation,
      textAlign: val.textAlign,
      fontWeight: val.fontWeight ? 'bold': 'normal',
       borderRadius:val.borderRadius+'px',
      borderStyle: val.borderStyle,
      borderColor: val.borderColor,
      borderWidth:val.borderWidth+'px',
      paddingLeft:val.paddingLeft+'px',
      paddingRight:val.paddingRight+'px',
      paddingTop:val.paddingTop+'px',
      paddingBottom:val.paddingBottom+'px',
      overflow:'hidden',
      whiteSpace:'nowrap',
      opacity:val.opacity/100,

    }">
    <!--<input :value="val.text" :placeholder="val.placeholder"    @blur="(e) => updateText(e, val.uuid)"

    />-->

  </div>
</template>

<script>
  import braidInputStyle from './style.vue'

  const WIDGET_NAME = 'braid-input'

  export default {
    name: WIDGET_NAME,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-type"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>',
    title: '输入框',
    panel: braidInputStyle,
    setting: {
      type: WIDGET_NAME,
      isContainer: false,
      isUpload: false,
      hasGuide: true,
      isChild: true,
      dragable: true,
      resizable: true,
      width: 250,
      borderWidth: 0,
      borderColor: '#d8e4f0',
      height: 36,
      left: 75,
      top: 0,
      z: 0,
      lineHeight: 1.6,
      fontSize: 12,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 4,
      opacity: 100,
      paddingBottom: 4,
      fontWeight: false, letterSpacing:0,
      color: '#000000',
      bgColor: '#ffffff',
      textAlign: 'left',
      text: '姓名',
      borderStyle: 'solid',
      borderRadius: 4,
      belong: 'page', animation:'',


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
        let text = e.target.innerHTML;
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
  input {
    outline: none;
    font-size: 14px;
    width: 100%;
    height: 100%;
  }
</style>
