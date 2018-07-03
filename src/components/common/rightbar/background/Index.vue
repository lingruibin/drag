<template>
  <div>
    <div class="rightbody">
      <div class="tabheader3">
        <ul>
          <li class="active">背景</li>
        </ul>
      </div>
      <div class="bgcolorpicker clearfix">
        <div class="lpart">
          <el-color-picker class="width-60 margin-left-0" size="small" type="color"
                           v-model="page.backgroundColor"></el-color-picker>

          <p>纯色背景</p></div>
        <div class="rpart">
          <a :style="{background: item}" :key="index" v-for="item,index in systemBgColor" @click.stop="page.backgroundColor=item,page.backgroundImageUrl=''"></a></div>
      </div>
      <div infinite-scroll-disabled="busy" infinite-scroll-distance="0" class="bgtabs2">
        <div class="bgwrap">
          <ul>
            <li :key="index" v-for="item,index in imgList" @click.stop="page.backgroundImageUrl=item"><img :src="item"></li>

          </ul>
        </div>
      </div>
      <div class="editbg pa"><a>自定义背景</a></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'backgroundView',
    data() {
      return {
        active: 2,
        noData: false,
        systemBgColor: ["rgb(255, 255, 255)", "rgb(201, 245, 255)", "rgb(203, 222, 255)", "rgb(191, 182, 255)", "rgb(215, 182, 255)", "rgb(239, 191, 221)", "rgb(255, 207, 193)", "rgb(255, 232, 197)", "rgb(255, 246, 212)", "rgb(226, 239, 195)", "rgb(219, 219, 219)", "rgb(103, 226, 255)", "rgb(105, 161, 255)", "rgb(106, 85, 255)", "rgb(161, 85, 255)", "rgb(225, 108, 179)", "rgb(255, 131, 95)", "rgb(255, 194, 101)", "rgb(255, 227, 113)", "rgb(192, 224, 115)", "rgb(155, 155, 155)", "rgb(13, 209, 255)", "rgb(15, 103, 255)", "rgb(30, 0, 251)", "rgb(112, 0, 251)", "rgb(221, 22, 144)", "rgb(255, 61, 5)", "rgb(255, 158, 10)", "rgb(255, 209, 24)", "rgb(164, 220, 28)", "rgb(22, 22, 22)", "rgb(0, 145, 178)", "rgb(0, 66, 180)", "rgb(19, 0, 161)", "rgb(72, 0, 161)", "rgb(156, 0, 96)", "rgb(172, 0, 0)", "rgb(175, 105, 0)", "rgb(187, 150, 0)", "rgb(114, 159, 0)"],
        imgList:["http://res.yaoyue365.com/syspic/bg/35e3abac91cfb36d904cda2b91bb7b5d_thumb.jpg","http://res.yaoyue365.com/syspic/bg/9221af4eee79fcfcff8eeaa69c63f28d_thumb.jpg","http://res.yaoyue365.com/syspic/bg/2570464d4c6e6af45f0900e03f7a49b7_thumb.jpg",]
      }
    },
    created() {
    },
    computed: {

      page() {

        return this.$store.state.page;
      }
    },
    methods: {
      loadList() {
        let that = this;
        this.http.get('http://oms.hfgjia.cn:9090/api/index/index', {
          params: {
            pageSize: 100,
            page: 1
          }
        }).then((response) => {
            if (response.data.code == 0) {
              let _list = that.list = response.data.productList;
              that.typeList = response.data.categoryList.map(val => {
                if (!val.parent_id) {
                  return val
                }
              })

            } else {

              if (that.page == 1) {
                that.noData = true;
              }
            }
          }
        ).catch((error) => {
        });
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
