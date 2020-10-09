<template>
  <div class="tableTemplate">
    <evue-table :data="tableData" :option="option[optionType]">
      <template v-slot:goodsName="props">
        <div class="goods">
          <img :src="props.data.img" alt="">
          <div class="goodsName">
            <p>{{props.data.goodsName}}</p>
            <span>{{props.data.price}}</span>
          </div>
        </div>
      </template>
    </evue-table>
  </div>
</template>
<script>
  export default {
    props: {
      optionType: {
        type: Number,
        default: 1,
      },
      tableData: { // 数据列表
        type: Array
      }
    },
    data() {
      return {
        option: {
          1: { //TOP5访问排名
            isMenu: false,
            column: [
              {
                label: '商品 价格',
                prop: 'goodsName',
                slotName: 'goodsName',
              },
              {
                label: '访客数',
                prop: 'views'
              },
              {
                label: '支付访问率',
                prop: 'viewsRate',
              },
            ],
          },
          2: { //TOP5支付排名
            isMenu: false,
            column: [
              {
                label: '商品 价格',
                prop: 'goodsName',
                slotName: 'goodsName',
              },
              {
                label: '支付件数',
                prop: 'views'
              },
              {
                label: '支付金额',
                prop: 'price',
              },
            ],
          },
        }
      }
    },
    methods: {
      gotoItemAnalysis(row) {
      }
    },
  }
</script>
<style lang="scss">
  .tableTemplate {
    .el-table td {
      padding: 0;
    }
  }

  .goods {
    display: flex;

    img {
      width: 60px;
      height: 60px
    }

    .goodsName {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      padding-top: 5px;

      p {
        color: #38f;
        cursor: pointer
      }

      span {
        color: #f60
      }
    }
  }

  .cell {
    padding: 0;
    width: 100%;

    .cellBox {
      width: 100%;
      height: 100%;
      position: relative;
      text-align: center;

      &.source {
        background-color: #f7f8fa;
        line-height: 40px;
        text-align: center;
      }

      &.alignRight {
        text-align: right;
        line-height: 40px;
      }

      &.alignLeft {
        text-align: left;
        line-height: 40px;
      }

      &.imgBox {
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;

        .img {
          width: 50px;
          height: 50px;

          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }

        .a {
          text-align: left;
          padding-left: 5px;
          text-overflow: ellipsis;
          flex: 1;
        }
      }

      a {
        color: #4f98fe;
      }

      p {
        color: #4f98fe;
        cursor: pointer;

        &:hover {
          color: #6786b1;
        }
      }

      span {
        float: left;

        &.text {
          width: 5em;
          margin-right: 5px;
          line-height: 40px;
        }

        &.box {
          margin-top: 12px;
          height: 15px;
          background-color: #409eff;
        }

        &.source-box {
          position: absolute;
          top: 1px;
          left: 1px;
          height: 38px;
          background-color: rgba(4, 128, 253, 0.259);
        }
      }
    }
  }
</style>


