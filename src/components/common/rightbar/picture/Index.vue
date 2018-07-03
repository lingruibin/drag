<template>
  <div>
    <div class="pictype clearfix">
      <ul>
        <li :class="[currentType===item.id?'active':'']" @click.stop="selectType(item,index)"
            v-for="item,index in typeList"
            :key="index"><a>{{item.name}}</a>
        </li>

      </ul>
    </div>
    <div infinite-scroll-disabled="busy" infinite-scroll-distance="0" class="pictabs2">
      <div class="picwrap">
        <ul>
          <li v-for="item,index in allPictureData[currentType]" :key="index" @click.stop="usePicture(item.path)">
            <img :src="item.path">
          </li>
          <li @click.stop="usePicture('http://img3.3lian.com/2013/c2/78/d/38.jpg')"><img
            src="http://img3.3lian.com/2013/c2/78/d/38.jpg"/></li>
          <li @click.stop="usePicture('http://pic21.photophoto.cn/20111011/0006019003288114_b.jpg')"><img
            src="http://pic21.photophoto.cn/20111011/0006019003288114_b.jpg"/></li>
          <li
            @click.stop="usePicture('http://res.zhangu365.com/sys/svg/Default/shape07.svg')">
            <img src="http://res.zhangu365.com/sys/svg/Default/shape07.svg"/></li>
        </ul>
      </div>

    </div>

  </div>
</template>

<script>
  import widget from '../../../../../static/plugins/widget'//用于添加图片
  export default {
    name: 'pictureView',
    data() {
      return {
        currentType: "",
        typeList: [],
        allPictureData: {},

      }
    },
    created() {
      // this.loadTypeList();
    },
    computed: {},
    methods: {
      selectType(i) {
        this.currentType = i.id;
        this.loadList(i.id);

      },
      loadTypeList() {
        let that = this;
        this.$http.get('/page/api/getCategoryListByType', {
          params: {
            pageSize: 100,
            page: 1
          }
        }).then((response) => {
            if (response.data.state === 'ok') {
              that.typeList = response.data.data;
              that.currentType = that.typeList[0].id;
              that.loadList();
            } else {

            }
          }
        ).catch((error) => {
        });
      },
      loadList() {
        let _this = this;
        let id = _this.currentType;
        if (_this.allPictureData.id) {
          console.log("已添加");
          return false;
        }
        this.$http.get('/page/api/getFileListByPid', {
          params: {
            pageSize: 100,
            page: 1,
            pid: id
          }
        }).then((response) => {
            if (response.data.state === 'ok') {
              _this.$set(_this.allPictureData, id, response.data.data);
              console.log(_this.allPictureData)

            } else {

            }
          }
        ).catch((error) => {
        });
      },
      usePicture(url) {

        var pic = widget.getWidgets()["braid-pic"];
        this.$store.dispatch('addWidget',  pic);
        this.$store.commit("addPic", url);
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
