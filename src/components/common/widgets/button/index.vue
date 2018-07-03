<template>
  <button
    v-html="val.text"
    :class="[ 'animate' , ]"
    contenteditable="false"
    @blur="(e) => updateText(e, val.uuid)"
    :style="{
      position: 'absolute',
     left: val.belong === 'page' ? val.left   + 'px' : '0',
      top: val.belong === 'page' ? val.top +'px' : '0',
      width: val.width  + 'px',
    height: val.height   + 'px',
      zIndex: val.z,
       backgroundColor: val.bgColor,
        letterSpacing:val.letterSpacing+'px',
        animation:formateAnimation,
      backgroundImage: 'url(' + val.backPic + ')',
      color: val.color,
      borderRadius:val.borderRadius+'px',
      borderStyle: val.borderStyle,
      borderColor: val.borderColor,
      borderWidth:val.borderWidth+'px',
      backgroundSize:'100% 100%',
       fontSize: val.fontSize + 'px',
        opacity:val.opacity/100,
    }"></button>
</template>

<script>
  import stylec from './style.vue';

  const WIDGET_NAME = 'braid-button';

  export default {
    name: WIDGET_NAME,
    icon: 'zhan-bars',
    title: '按钮',
    panel: stylec,
    setting: {
      type: WIDGET_NAME,
      isContainer: false,
      isUpload: false,
      hasGuide: true,
      isChild: true,
      dragable: true,
      resizable: true,
      name: '',
      width: 250,
      height: 36,
      left: 75,
      opacity: 100, letterSpacing: 0,
      top: 0,
      fontSize: 14,
      borderWidth: 0,
      borderColor: '#ffffff',
      borderStyle: 'solid',
      borderRadius: 0,
      z: 0,
      bgColor: '#000000',
      backPic: '',

      backPicUrl: '',
      color: '#ffffff',
      text: '按钮',
      belong: 'page',
      animation: '',
    },
    props: ['h', 'val', 'playState'],
    computed: {
      formateAnimation() {
        return this.val.animation ? this.val.animation.replace(/-/g, ' ') : '';
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
  .lz-container {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
</style>
