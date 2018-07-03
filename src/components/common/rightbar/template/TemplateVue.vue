<template>
  <div>
    <div class="temptype clearfix">
      <ul>
        <li :class="[currentType==item.id?'active':'']" @click.stop="selectType(item,index)"
            v-for="item,index in typeList"
            :key="index"><a>{{item.label}}</a>
        </li>

      </ul>
    </div>
    <div infinite-scroll-disabled="busy" infinite-scroll-distance="10" class=" tempwrap">
      <ul>
        <li v-for="item,index in allTemplateData[currentType]" :key="index" @click.stop="useTemplate(item)">
          <img src="https://res.zhangu365.com/syspic/bg/CYrjNppNKZPj_page1.jpg">{{item.name}}
        </li>

      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'templateView',
    data() {
      return {
        currentType: 0,
        typeList: [{id: 0, label: "开业庆典"}, {id: 1, label: "行业峰会"}, {id: 2, label: "行业峰会"}],
        allTemplateData: {},

      }
    },
    created() {
    },
    computed: {},
    methods: {
      selectType(i, t) {
        this.currentType = t;
        this.loadList(i.id);

      },
      loadList(id) {
        let _this = this;
        if (_this.allTemplateData.id) {
          console.log("已添加");
          return false;
        }
        var data = {};
        var list = [];
        for (let i = 0; i < 3; i++) {
          data.name = id + "===" + i;
          list.push(data)
        }
        _this.$set(_this.allTemplateData, id, list)
        console.log(_this.allTemplateData)
        /*  this.http.get('http://oms.hfgjia.cn:9090/api/index/index', {
            params: {

              id: id
            }
          }).then((response) => {
              if (response.data.result == 1) {
                _this.$set(_this.allTemplateData, id, response.data.data)

              } else {

              }
            }
          ).catch((error) => {
          });*/
      },
      useTemplate(item) {
        let _this = this;
        this.$confirm("使用模板将覆盖掉所有内容？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",

        }).then(() => {

        }).catch(() => {

        })
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
