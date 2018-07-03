<template>
  <div class="texttabs2">
    <div class="animbtn"><a class="addanimbtn" @click.stop="addAnimation">添加动画</a> <a class="previewanimbtn" v-show="false"
                                                                                      @click.stop="previewAnimation">预览动画</a>
    </div>
    <div class="animcollapse">
      <div class="ivu-collapse" v-for="animationItem,index in animationList" v-bind:key="index">
        <div class="ivu-collapse-item bg-white relative">
          <div class="ivu-collapse-header" @click.stop="openCollapse($event,index)">
            <i class="ivu-icon ivu-icon-arrow-right-b"></i> 动画{{index+1}}
            <a class="delanimbtn" @click.stop="deleteAnimation"></a></div>
          <div class="ivu-collapse-content margin-top-5 " data-old-padding-top="" data-old-padding-bottom=""
               data-old-overflow=""
               style="">
            <el-select v-model="animationItem.name" placeholder="请选择" @change="handleChange" size="small"
                       class="width_100p margin-bottom-15">
              <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div class="numberblock  flex-between-vertical">
              <div class="inputtime"><span>时间</span>
                <el-input-number v-model="animationItem.duration" controls-position="right" size="mini" class="width-80"@change="handleChange"
                                 :step="0.1" :min="1"></el-input-number>
              </div>
              <div class="inputdelay"><span>延迟</span>
                <el-input-number v-model="animationItem.delay" controls-position="right" size="mini" class="width-80"@change="handleChange"
                                 :step="0.1" :min="0"></el-input-number>
              </div>
            </div>
            <div class="numberblock  flex-between-vertical">
              <div class="inputtime"><span>次数</span>
                <el-input-number v-model="animationItem.iteration" controls-position="right" size="mini"@change="handleChange"
                                 class="width-80"
                                 :min="1"></el-input-number>
              </div>
              <!-- <div class="inputdelay"><span>延迟</span>
                 <el-input-number v-model="animationItem.delay" controls-position="right" size="mini" class="width-80"
                                  :min="0"></el-input-number>
               </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

  export default {
    name: 'Main',
    data() {
      return {

        active: 2,
        noData: false,
        options: [{
          "value": "none",
          "label": "无效果"
        }, {
          "value": "fadeIn",
          "label": "基础"
        },
          {
            "value": "fadeInLeft",
            "label": "左侧淡入"
          },
          {
            "value": "fadeInRight",
            "label": "右侧淡入"
          },
          {
            "value": "fadeInUp",
            "label": "向上淡入"
          },
          {
            "value": "fadeInDown",
            "label": "向下淡入"
          },
          {
            "value": "flash",
            "label": "闪烁"
          }]
      }
    },
    created() {
    },
    computed: {
      activeElement() {
        return this.$store.state.activeElement
      },
      animationList() {
        return this.$store.state.animation;
      }

    },
    methods: {
      addAnimation() {
        this.$store.commit("addAnimation");
        this.$store.commit("setAnimationStyle");
      },
      deleteAnimation() {
        this.$store.commit("deleteAnimation");
        this.$store.commit("setAnimationStyle");
      },
      previewAnimation() {
        this.$store.commit("setAnimationStyle");
      },
      handleChange() {
        this.$store.commit("setAnimationStyle");
      },
      openCollapse(e, i) {
        document.querySelectorAll(".ivu-collapse-item").forEach(function (val, index) {
          if (i == index) {
            if (!val.classList.contains("ivu-collapse-item-active")) {
              val.classList.add("ivu-collapse-item-active")
            } else {
              val.classList.remove("ivu-collapse-item-active")
            }
          } else {
            val.classList.remove("ivu-collapse-item-active")
          }

        });


      }, loadList() {
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
<style scoped lang="less">
  .ivu-collapse-item {
    .ivu-collapse-content {
      display: none;
    }
  }

  .ivu-collapse-item-active {
    .ivu-collapse-content {
      display: block !important;
    }
  }

</style>
