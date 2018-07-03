<template>
  <div id="mainedit" v-loading="loading" :style="{height:realHeight+'px'}">
    <div class="topbar clearfix">
      <div class="logo fl"><a href="" style="font-size: 20px;color: #ffffff">魔幻秀</a></div>
      <div class="back fl" @click.stop="back()"><a>返回我的作品</a></div>
      <div class="publish fr" @click.stop="publishProject"><a>发布</a></div>
      <div class="preview fr" @click.stop="handlePreview"><a>标题和预览</a></div>
      <div class="save fr" @click.stop="saveProject"><a>保存</a></div>
    </div>
    <div>
      <left-bar></left-bar>
    </div>
    <div id="func">
      <div class="rightbar">
        <div @click.stop="selectRightBar(index)" :class="[{'active':index==0},item.class,'fl f-right'] "
             v-for="item,index in rightBar">
          <a href="javascript:void (0)">{{item.name}}</a>
        </div>

        <!--<div class="interaction fl pr"><a>互动</a><i></i></div>-->
      </div>
    </div>
    <div>
      <div class="phone_con">
        <div class="phone_title">{{project.projectTitle}}</div>
        <div class="phone_screen">
          <viewport></viewport>
        </div>
        <ul id="item_context_menu" class="context_menu" style="display: none;">
          <li>复制</li>
          <li>上移</li>
          <li>下移</li>
          <li>置顶</li>
          <li>置底</li>
          <li>删除</li>
        </ul>
        <ul class="phone_subbar" style="display: none;">
          <li class="el-tooltip item"></li>
          <li class="el-tooltip item"></li>
          <li class="el-tooltip item"></li>
          <li class="el-tooltip item"></li>
        </ul>
      </div> <!----> <!----></div>
    <div class="rightbody">
      <component :is="rightBarView[currentIndex]"></component>
    </div>
    <el-dialog :visible.sync="dialogTableVisible" :width="1000+'px'" custom-class="dialog-body"
               style="margin-bottom: 0;margin-top: -10vh;">
      <div class="previewP">
        <div class="phone_con phone_con2 ">
          <div class="page-title">{{project.projectTitle}}</div>
          <div class="previewC">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                <preview-viewport :draft="JSON.parse(slide.draft)"></preview-viewport>
              </swiper-slide>
              <!--<div class="swiper-pagination" slot="pagination"></div>-->

            </swiper>

          </div>
          <div class="swiper-button-prev">上一页</div>
          <div class="swiper-button-next">下一页</div>
        </div>
      </div>
      <div class="title-page padding-left-50">

        <div class="margin-top-80">标题</div>
        <el-input v-model="project.projectTitle" placeholder="请输入标题" size="small"
                  class="width-250 margin-top-10"></el-input>
        <div class="margin-top-10">描述</div>
        <el-input class="margin-top-10 width-250"
                  type="textarea" placeholder="请输入" v-model="project.desc">
        </el-input>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import store from '../../static/store/index'
  import TemplateVue from './common/rightbar/template/TemplateVue'
  import TextView from './common/rightbar/text/Index'
  import PictureView from './common/rightbar/picture/Index'
  import BackgroundView from './common/rightbar/background/Index'
  import ShapeView from './common/rightbar/shape/Index'
  import MusicView from './common/rightbar/music/Index'
  import FormView from './common/rightbar/form/Index'
  import CommunicateView from './common/rightbar/communicate/Index'
  import formStyleView from './common/widgets/input/style'//表单,index=8
  import PicStyleView from './common/widgets/pic/style'//图片,index=9


  import LeftBar from '../components/common/leftbar/LeftBar'
  import Viewport from './viewport/index'
  import PreviewViewport from './viewport/PreviewIndex'
  import widget from '../../static/plugins/widget'//用于添加文本
  // require styles
  import 'swiper/dist/css/swiper.css'

  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: 'mainT',
    store,
    data() {
      return {
        realHeight: window.innerHeight,
        dialogTableVisible: false,
        currentIndex: 0,
        rightBarView: [TemplateVue, TextView, PictureView, BackgroundView, ShapeView, MusicView, FormView, CommunicateView, formStyleView, PicStyleView],
        rightBar: [
          {name: "模板", class: "template"},
          {name: "文字", class: "text"},
          {name: "图片", class: "picture"},
          {name: "背景", class: "background"},
          {name: "形状", class: "shape"},
          {name: "音乐", class: "music"},
          {name: "表单", class: "form"},
          {name: "互动", class: "interaction pr"},
        ],
        swiperOption: {
          direction: 'vertical',
          pagination: {
            el: '.swiper-pagination'
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          // some swiper options...
        }
      }
    },

    computed: {
      loading() {
        return this.$store.state.loading;
      },
      swiperSlides() {
        return this.$store.state.pageList;
      },
      project() {
        return this.$store.state.project;
      }
    },
    watch: {
      "$store.state.activeElement": function () {
        var activeElementType = this.$store.state.activeElement.type;
        if (activeElementType === "braid-txt") {
          this.currentIndex = 1;
        } else if (activeElementType === "braid-button" || activeElementType === "braid-input") {
          this.currentIndex = 8;
        } else if (activeElementType === "braid-pic") {
          this.currentIndex = 9;
        } else {
          this.currentIndex = 0;
        }
        this.setActivityBar();

      }
    },
    methods: {
      selectRightBar(i) {
        this.currentIndex = i;
        document.querySelectorAll(".f-right").forEach((val, index) => {
          if (i == index) {
            val.classList.add("active")
          } else {
            val.classList.remove("active")

          }
        });
        if (i == 1) {
          var txt = widget.getWidgets()["braid-txt"];
          this.$store.dispatch('addWidget', txt)
        }
      },
      back() {
        let _this = this;
        this.$confirm("退出保存资料吗？", "", {
          confirmButtonText: "保存",
          cancelButtonText: "直接退出",
          type: 'warning'
        }).then(() => {
          _this.save();
          setTimeout(() => {
            _this.$router.go(-1);
          }, 1000);

        }).catch(() => {
          _this.$router.go(-1);
        })
      },
      setActivityBar() {
        let _this = this;
        document.querySelectorAll(".f-right").forEach((val, index) => {
          if (_this.currentIndex == index) {
            if (!val.classList.contains("active")) {
              val.classList.add("active")
            }
          } else {
            val.classList.remove("active")

          }
        })
      },

      saveProject(index) {
        let that = this;
        that.$store.commit("changeLoading", true);
        var newList = this.$store.state.pageList.map((val, index) => {
          if (val.id === this.$store.state.currentPageId) {
            val.draft = JSON.stringify(that.$store.state.pageDetail);
          }
          val.sort = index;
          return val;
        });
        this.$http.post("/page/design/updateSort", newList).then(res => {
          if (index != 0) {
            if (res.data.state === 'ok') {

              that.$message.success("保存成功");
            } else {
              that.$message.error("保存失败")
            }
          }

          setTimeout(() => {
            that.$store.commit("changeLoading", false);
          }, 100);
        }).catch(error => {
          console.log("Error： " + JSON.stringify(error))

        })
      },
      publishProject() {
        this.saveProject(0);

        //发布
      },
      handlePreview(data) {
        let that = this;
        var list = that.$store.state.pageList;

        list.forEach(val => {
          if (val.id === that.$store.state.currentPageId) {
            val.draft = JSON.stringify(this.$store.state.pageDetail);
          }
        });
        that.$store.commit("refreshPageList", list);
        this.dialogTableVisible = !this.dialogTableVisible;
      },
      //项目名称，需修改
      /*    updateBrand() {
            let that = this;
            that.loading = true;
            var postData = {
              'project.name': item.name,
              'project.sorts': 0,
              'project.shop_id': that.shopId,
              id: item.id
            };
            this.$http.post('/page/design/project/save', postData, {emulateJSON: true}).then((response) => {
              setTimeout(() => {
                that.loading = false;
                if (response.body.state === 'ok') {
                  that.$message({
                    type: 'success',
                    message: "更新成功"
                  })
                } else {
                  that.$message.error('创建失败')
                }
              }, 1000);

            })


          },*/
    },
    components: {
      LeftBar, Viewport, PreviewViewport, swiper,
      swiperSlide
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .phone_con2 {
    position: relative;
    top: 0;
    height: 614px;
    width: 306px;
    display: inline-block;
    overflow: hidden
  }

  .page-title {
    position: absolute;
    width: 300px;
    padding: 0 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    color: white;
    height: 20px;
    top: 70px;
    left: 2px;
    background-color: #333;
    z-index: 9;
  }

  .previewP {
    overflow: hidden;
    transform: scale(1);
    width: 600px;
    height: 680px;
    background-color: white;
    display: inline-block;
    border-right: 1px solid #ddd;
  }

  .title-page {
    overflow: hidden;
    width: 350px;
    height: 667px;
    display: inline-block;
  }

  .swiper-container {
    height: 100% !important;
  }

  .previewC {
    position: absolute;
    left: -35px;
    height: 603px;
    transform: scale(0.8);
    top: 35px;
    width: 375px;
  }

  .swiper-button-prev {
    left: 363px !important;
    top: 35% !important;
    background-image: none;
    width: 30px;
    height: 80px;
    padding: 10px 0;
    position: fixed !important;
    background: #1abd9b;
    font-size: 14px;
    color: #fff;
    text-align: center;
    writing-mode: vertical-lr;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .swiper-button-next {
    right: 207px !important;
    width: 30px;
    height: 80px;
    padding: 10px 0;
    writing-mode: vertical-lr;
    background: #1abd9b;
    font-size: 14px;
    position: fixed !important;
    color: #fff;
    text-align: center;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

</style>
