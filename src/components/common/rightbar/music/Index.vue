<template>
  <div>
    <div class="vertical-flex-center">
      敬请期待
    </div>

  </div>
</template>

<script>

  export default {
    name: 'musicView',
    data() {
      return {
        active: 2,
        noData: false

      }
    },
    created() {
    },
    computed: {

      text() {
        return this.currentRate.toFixed(0) + '%'
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
