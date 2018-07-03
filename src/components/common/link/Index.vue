<template>
  <div class="texttabs1">
    <ul>
      <li>
        <div class="flex-horziontal">
          <label>类型</label>
          <el-select v-model="activeElement.linkType" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </li>
      <li v-show="activeElement.linkType==='url'">
        <div class="flex-horziontal">
          <label>网址</label>
          <el-input size="small" v-model="activeElement.href" class="width-200"></el-input>
        </div>
      </li>
      <li v-show="activeElement.linkType!=='none'&&activeElement.linkType!=='url'">
        <div class="flex-horziontal">
          <label>页面</label>
          <el-input size="small" v-model="activeElement.pageIndex" class="width-200"></el-input>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    name: 'Main',
    data() {
      return {
        options: [{label:"无",value:'none'},{label:"网址",value:'url'},{label:"页面",value:'0'}],
        active: 2,
        noData: false

      }
    },
    created() {
    },
    computed: {
      activeElement() {
        return this.$store.state.activeElement
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
