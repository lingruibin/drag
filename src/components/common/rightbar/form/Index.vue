<template>
  <div>
    <ul class="flex-wrap-content">
      <li v-for="item ,index in widgets" v-show="item.name!=='braid-txt'&&item.name!=='braid-pic'">
        <div class="widgets-container" @click.stop="addWidgets(item)">
          <i class="el-icon-edit"></i>
          <label>{{item.title}}</label>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
  import widget from '../../../../../static/plugins/widget'

  export default {
    name: 'formView',
    data() {
      return {}
    },
    created() {
    },
    computed: {

      widgets() {
        return widget.getWidgets();
      }
    },
    methods: {
      addWidgets(item) {
        this.$store.dispatch('addWidget', item)
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .flex-wrap-content {
    justify-content: space-between;
    padding: 20px;
    li {
      width: 48%;
      text-align: center;
      margin-bottom: 20px;
      .widgets-container {
        cursor: pointer;
        border: 1px solid #ececec;
        display: inline-flex;
        width: 100px;
        height: 100px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: color .2s ease;
        .content {
          color: #696969;
        }
      }
      .widgets-container:hover {
        background-color: #1abd9b;
        color: #ffffff;
      }
    }
  }

</style>
