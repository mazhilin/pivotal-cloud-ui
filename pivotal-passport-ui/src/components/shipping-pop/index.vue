<template>
  <div class="shipping-pop-box app-ele-border-radius-0" v-loading="isLoading">
    <div class="pop-title">选择商品</div>
    <!--商品列表-->
    <div v-if="packAge.deliveryOrderDetailList && packAge.deliveryOrderDetailList.length" class="packAge-info">
      <evue-table
        :data="packAge.deliveryOrderDetailList"
        :option="option"
        @selectionChange="selectionChange"
      >
        <template v-slot:title="props">
          <div class="goods">
            <img :src="props.data.sku_image" alt="">
            <div class="goodsName">
              <p>{{props.data.sku_name}}</p>
              <p>{{props.data.sku_spec | skuSpec}}</p>
              <p>规格编码：{{props.data.sku_code}}</p>
            </div>
          </div>
        </template>
        <template v-slot:status="props">
          <span>{{props.data.package ? '已发货':'待发货'}}</span>
        </template>
        <template v-slot:package="props">
          <span>{{props.data.package ? props.data.package.package_code:'-'}}</span>
        </template>
      </evue-table>
    </div>
    <!--配送信息-->
    <!--    <div class="pop-title">配送信息</div>-->
    <div class="delivery-information">
      <p>配送方式：<span>快递</span></p>
      <p>收获人：<span>{{packAge.consignee}}</span></p>
      <p>电话：<span>{{packAge.mobile}}</span></p>
      <p>收获地址：<span>{{packAge.province}}{{packAge.city}}{{packAge.district}}{{packAge.address}}</span></p>
    </div>
    <!--快递公司-->
    <!--    <div class="pop-title" style="margin-top: 30px;">发货方式</div>-->
    <div class="company-info">
      <div>
        <div class="info-left">
          物流公司:
        </div>
        <div class="info-box">
          <el-select v-model="packagePar.transfer_code" placeholder="请选择">
            <el-option
              v-for="item in companyList"
              :key="item.company_code"
              :label="item.company_name"
              :value="item.company_code">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="info-left">
          快递单号:
        </div>
        <div class="info-box">
          <el-input v-model="packagePar.package_code" placeholder="请输入快递单号"></el-input>
        </div>
      </div>
    </div>
    <!--保存按钮-->
    <p class="save-desc">*请仔细填写物流公司及快递单号，发货后24小时内仅支持做一次更正，逾期不可修改</p>
    <div class="save-ok">
      <el-button :disabled="!packagePar.orderDetailIds" type="primary" @click="deliverySave">发货</el-button>
    </div>
  </div>
</template>

<script>
  import {companyList, deliveryInfo, logisticsDelivery} from '@/api/order';

  /** 发货弹窗*/
  export default {
    name: 'shippingPop',
    props: {
      orderId: {
        type: Number,
        default: null
      },
      dialogShow: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        isLoading: false, //是否正在加载
        companyList: [],
        /** 保存物流详情*/
        packagePar: {
          orderDetailIds: '', // 订单明细ID
          orderId: '',//订单ID
          transfer_code: '',//快递公司编码
          transfer_name: '',//快递公司名称
          package_code: '',//包裹单号
        },
        list: [],
        option: {
          isMenu: false,
          isSelection: true,
          column: [
            {
              label: '商品',
              prop: 'title',
              slotName: 'title'
            },
            {
              label: '单价(元)',
              prop: 'sku_price'
            },
            {
              label: '数量',
              prop: 'sku_quantity'
            },
            {
              label: '状态',
              slotName: 'status'
            },
            {
              label: '运单号',
              slotName: 'package'
            },
          ]
        },
        packAge: {},
      }
    },
    watch: {
      dialogShow() {
        this.initData();
      }
    },
    filters: {
      /** 规格*/
      skuSpec(val) {
        let text = '';
        let skuSpec = JSON.parse(val);
        for (let ol in skuSpec) {
          text = text ? text + " " + skuSpec[ol] : skuSpec[ol];
        }
        return text;
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      initData() {
        this.packagePar.orderId = this.orderId;
        this.getDeliveryInfo();
        this.getCompanyList();
      },
      /** 选择商品*/
      selectionChange(ev) {
        console.log('ev==3', ev)
        /** 先清空订单明细ID*/
        this.packagePar.orderDetailIds = '';
        let ids = [];
        if (ev.length) {
          let isPass = true;//是否可以提交，判断重复发货
          for (let ol of ev) {
            if (ol.package_id) {
              isPass = false;
              break;
            } else {
              ids.push(ol.id)
            }
          }
          if (!isPass) {
            this.$message.error('重复发货');
            return;
          }
          this.packagePar.orderDetailIds = ids.join(',');
        }
      },
      /** 获取快递公司的列表*/
      getCompanyList() {
        let res = {
          "code": 1,
          "msg": "",
          "data": [{
            "company_code": "ems",
            "company_name": "EMS",
            "create_time": 2019,
            "sort": 100,
            "show_state": 1
          }, {
            "company_code": "huitongkuaidi",
            "company_name": "百世快递",
            "create_time": 2019,
            "sort": 100,
            "show_state": 1
          }, {
            "company_code": "shentong",
            "company_name": "申通快递",
            "create_time": 2019,
            "sort": 100,
            "show_state": 1
          }, {
            "company_code": "shunfeng",
            "company_name": "顺丰速运",
            "create_time": 2019,
            "sort": 150,
            "show_state": 1
          }, {
            "company_code": "tiantian",
            "company_name": "天天快递",
            "create_time": 2019,
            "sort": 100,
            "show_state": 1
          }, {
            "company_code": "yuantong",
            "company_name": "圆通速递",
            "create_time": 2019,
            "sort": 100,
            "show_state": 1
          }, {
            "company_code": "yunda",
            "company_name": "韵达快递",
            "create_time": 2019,
            "sort": 100,
            "show_state": 1
          }, {"company_code": "zhongtong", "company_name": "中通快递", "create_time": 2019, "sort": 100, "show_state": 1}]
        };
        if (res.code === 1) {
          this.companyList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      },
      /** 获取包裹列表*/
      getDeliveryInfo() {
        this.isLoading = true;
        let res = {
          "code": 1,
          "msg": "",
          "data": {
            "consignee": "张三1",
            "city": "广州市",
            "address": "新港中路397号",
            "district": "海珠区",
            "mobile": "020-81167888",
            "order_id": 15750975633000,
            "province": "广东省",
            "user_id": 2487,
            "deliveryOrderDetailList": [
              {
                "id": 15750975636898,
                "order_id": 15750975633000,
                "user_id": 2487,
                "order_detail_status": 0,
                "refund_detail_status": 0,
                "product_id": 20,
                "product_code": "",
                "package_id": 0,
                "sku_id": 0,
                "sku_code": "",
                "sku_name": "商品名2222",
                "sku_spec": "{\"30\":\"白色\",\"35\":\"大\"}",
                "sku_image": "http:\/\/wangzheshike.xxgushi.com\/15706754641570675464UlnLcf",
                "sku_quantity": 1,
                "assign_num": 1,
                "package_num": 0,
                "origin_price": "0.00",
                "sku_price": "21.00",
                "display_price": "0.00",
                "promotion_amount": "0.00",
                "coupon_amount": "0.00",
                "points_amount": "0.00",
                "real_amount": "0.00",
                "sale_mode": 1,
                "detail_type": 1,
                "is_canceled": 0,
                "supplier_id": "0",
                "tenant_id": 99999,
                "modified_name": "",
                "creator_name": "IAMCKQ",
                "create_time": 1575097563,
                "modified_id": 0,
                "modified_time": 0,
                "package": null
              },
              {
                "id": 15750975636898,
                "order_id": 15750975633000,
                "user_id": 2487,
                "order_detail_status": 0,
                "refund_detail_status": 0,
                "product_id": 20,
                "product_code": "",
                "package_id": 1123221,
                "sku_id": 0,
                "sku_code": "",
                "sku_name": "商品名2222",
                "sku_spec": "{\"30\":\"白色\",\"35\":\"大\"}",
                "sku_image": "http:\/\/wangzheshike.xxgushi.com\/15706754641570675464UlnLcf",
                "sku_quantity": 1,
                "assign_num": 1,
                "package_num": 0,
                "origin_price": "0.00",
                "sku_price": "21.00",
                "display_price": "0.00",
                "promotion_amount": "0.00",
                "coupon_amount": "0.00",
                "points_amount": "0.00",
                "real_amount": "0.00",
                "sale_mode": 1,
                "detail_type": 1,
                "is_canceled": 0,
                "supplier_id": "0",
                "tenant_id": 99999,
                "modified_name": "",
                "creator_name": "IAMCKQ",
                "create_time": 1575097563,
                "modified_id": 0,
                "modified_time": 0,
                "package": {
                  package_code: 'SF32333293847'
                }
              }
            ]
          }
        };
        if (res.code === 1) {
          this.packAge = res.data;
          this.isLoading = false;
        }
      },
      /** 点击发货*/
      deliverySave() {
        console.log('---', this.packagePar)
        let packagePar = this.packagePar;
        if (!packagePar.package_code || !packagePar.transfer_code) {
          this.$message.error('请填写快递信息');
          return;
        }
        packagePar.transfer_name = this.companyList.find(c => c.company_code === packagePar.transfer_code).company_name;
        console.log('发给后端的信息', packagePar)
        setTimeout(() => {
          this.$message.success('发货成功');
          this.packagePar.package_code = '';
          this.packagePar.transfer_name = '';
          this.packagePar.transfer_code = '';
          this.getDeliveryInfo();
          /** 返回给父级*/
          this.$emit('deliveryEd', res);
        }, 1000)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .shipping-pop-box {
    font-size: 12px;

    .pop-title {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .goods {
      display: flex;

      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        object-position: center;
      }

      .goodsName {
        flex: 1;
        padding-top: 5px;
        padding-left: 5px;

        p {
          line-height: 18px;
        }
      }
    }

    .delivery-information {
      p {
        margin-bottom: 6px;

        span {
          font-weight: bold;
        }
      }
    }

    .packAge-info {
      margin-bottom: 20px;
    }

    .company-info {
      margin-top: 20px;

      > div {
        display: flex;
        margin-bottom: 10px;
      }

      .info-left {
        width: 60px;
        line-height: 36px;
      }

      .info-box {
        flex: 1;

        .el-input--medium {
          font-size: 14px;
          width: 300px;
        }
      }
    }

    .save-desc {
      margin-top: 20px;
      color: rgba(34, 34, 34, 0.5);
    }

    .save-ok {
      margin-top: 30px;
    }
  }

</style>
