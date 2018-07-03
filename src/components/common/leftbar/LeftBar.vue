<template>
  <div>
    <div id="pagelist">
      <div class="pagetabs">
        <ul>
          <li class="active">页面</li>
        </ul>
      </div>
      <div class="leftbar">
        <ul id="pagelistID" class="thumbwrap">
          <div>
            <li :class="[computePageId===item.id?'active':'','thumb'] " draggable="false" style="" v-bind:key="item.id"
                v-for="item ,index in pageList" @click.stop="selectPage(item,index)">
              <p> 页面{{index+1}}</p>
              <div class="wrap pr">
                <div class=" page">
                  <view-port-active style="pointer-events: none" v-if="computePageId===item.id"></view-port-active>
                  <view-port style="pointer-events: none" :draft="JSON.parse(item.draft)" v-else></view-port>
                </div>
                <div class="oprate clearfix" v-show="computePageId===item.id">
                  <label class="copy cursor-point" draggable="false" @click.stop="copyPage(item,index)"></label>
                  <label class="delete cursor-point" draggable="false" @click.stop="deletePage(item,index)"></label>
                </div>
              </div>
            </li>

          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import ViewPortActive from '../../viewport/index'
  import ViewPort from '../../viewport/IndexLeft'
  import dataList from '../../../assets/data'

  export default {
    name: 'Main',
    data() {
      return {
        active: 2,
        noData: false,

        allPageInfoMap: {},
      }
    },
    created() {
      this.getPageList()
    },
    computed: {
      pageList() {
        return this.$store.state.pageList;
      },
      computePageId() {
        return this.$store.state.currentPageId;
      },
      projectId() {
        return this.$store.state.project.projectId
      },
    },
    methods: {
      getPageList() {
        let that = this;

        let data = dataList;
        that.$store.commit("refreshPageList", data.data.list);
        that.$store.commit("refreshPageId", data.data.list[0]);
        that.$store.commit("refreshPageDetail", JSON.parse(data.data.list[0].draft));
        that.$store.commit("changeLoading", false);

      },
      /**
       * 创建页面(复制方式)
       * @param shopId:商户ID,
       * @param projectId:项目ID,
       * @param id:当前页面ID,没有的话为空
       * @param name:当前页面名称,没有的话为空
       *
       * */
      copyPage(item, index) {
        let _this = this;
        _this.addPage(item, index);


      },
      //删除页面，更新页面列表
      deletePage(item, index) {
        let _this = this;
        if (_this.$store.state.pageList.length <= 1) {
          _this.$message({
            type: 'warning',
            message: '至少保留一个页面!'
          });
          return false;
        }
        this.$confirm('此操作将永久删除该页面, 是否继续?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

              var list = _this.$store.state.pageList;
              list.splice(index, 1);

              // console.log(newList)
              _this.$store.commit("refreshPageList", list);
              var newIndex = index - 1 > 0 ? index - 1 : 0;
              list[newIndex].sort = newIndex;
              _this.$store.commit("refreshPageId", list[newIndex]);
              _this.$store.commit("refreshPageDetail", JSON.parse(list[newIndex].draft));


        }).catch(() => {

        });
      },


      //添加頁面
      addPage(item, index) {

        let that = this;
        // that.$store.commit("changeLoading", true);
        item.shopId = that.$store.state.project.shopId;
        item.id = (parseInt(item.id))+1;
        item.projectId = that.$store.state.project.projectId;
        item.sort = index + 1;
        item.name = "页面";

            var list = that.$store.state.pageList;
            list.splice(index + 1, 0, item);


            var newList = list.map((val, index) => {
              val.sort = index;
              return val;
            });
            that.$store.commit("refreshPageList", newList);
            // console.log(that.$store.state.pageList)

            that.$store.commit("refreshPageId", item);
            that.$store.commit("refreshPageDetail", JSON.parse(item.draft));

          that.$store.commit("changeLoading", false);

      },
      //切换页面

      selectPage(item, index) {
        let that = this;
        // that.$store.commit("changeLoading", true);
        // this.$http.get("/page/design/save",
        //   {
        //     params: {
        //       shopId: that.$store.state.project.shopId,
        //       name: name,
        //       id: that.$store.state.currentPageId,
        //       projectId: this.$store.state.project.projectId,
        //       sort: that.$store.state.currentPageSort,
        //       draft: JSON.stringify(this.$store.state.pageDetail)
        //     },
        //   }
        // ).then(res => {
        //   if (res.data.state === 'ok') {
            var list = that.$store.state.pageList;
            list.some(val => {
              if (val.id === that.$store.state.currentPageId) {
                val.draft = JSON.stringify(this.$store.state.pageDetail);
                return false;
              }
            });

            that.$store.commit("refreshPageList", list);
            that.$store.commit("refreshPageId", item);
            that.$store.commit("resetActiveElement");
            that.$store.commit("refreshPageDetail", JSON.parse(item.draft));

        //
        //   } else {
        //     that.$message.error(res.body.msg)
        //
        //   }
        //   that.$store.commit("changeLoading", false)
        //
        //
        // }).catch(error => {
        //
        // })

      },

    },
    components: {ViewPort, ViewPortActive}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .page {
    height: 603px;
    width: 377px;
    transform-origin: 0px 0px 0px;
    transform: scale(0.36);
    position: absolute;
    left: -1px;
  }

  .oprate {
    position: absolute;
    bottom: 0;
    height: 35px;
    width: 100%;
    background: rgba(0, 0, 0, .3);
    z-index: 9999;
  }
</style>
