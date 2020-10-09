<template>
  <div class="app-container-10 container-f0f2f5 app-main order-detail-container">
    <div class=" container-fff app-container-15 app-ele-border-radius-0">
      <div class="order-detail">
        <div class="order-warp">
          订单号：E201910211555503232 <span>下单时间：2019-10-21 15:55:50</span> <span>支付流水号：WA1576192659480434829</span> <span>普通订单</span>
          <span>微信-商家小程序</span>
        </div>
        <!--订单状态-->
        <div class="order-status">
          <div class="order-status-row">
            <div class="row-left">
              <div class="row-status-title">买家已付款，等待商家发货</div>
              <div class="row-desc">买家已付款至待结算账户，请尽快发货，否则买家有权申请退款。</div>
              <div class="row-btn">
                <el-button type="primary" size="mini" @click="dialogShippingPop=true">发货</el-button>
              </div>
            </div>
            <div class="row-right">
              <div class="row-right-steps">
                <el-steps :active="active" finish-status="success">
                  <el-step title="买家下单" description="2019-10-21 15:55:50"></el-step>
                  <el-step title="买家付款" description="2019-10-21 15:57:20"></el-step>
                  <el-step title="商家发货"></el-step>
                  <el-step title="交易完成"></el-step>
                </el-steps>
              </div>
            </div>
          </div>
          <div class="order-desc">
            <span>温馨提示：</span>
            <div class="order-desc-list">
              <p>如果无法发货，请及时与买家联系并说明情况后进行退款；</p>
              <p>买家申请退款后，须征得买家同意后再发货，否则买家有权拒收货物；</p>
              <p>买家付款后超过7天仍未发货，将有权申请客服介入发起退款维权；</p>
            </div>
          </div>
        </div>
        <!--收货人信息-->
        <div class="order-consignee">
          <div class="order-consignee-item">
            <div class="consignee-item-title">收货人信息 <span>修改</span> <span
              v-clipboard:copy="'辽宁省 沈阳市 浑南区 xxx区,小涵, 137*****554'"
              v-clipboard:success="onCopy">复制</span></div>
            <div class="consignee-item-content">
              <p><span>收货人:</span> <span>小涵</span></p>
              <p><span>联系电话:</span> <span>137*****554</span></p>
              <p><span>收货地址:</span> <span>辽宁省 沈阳市 浑南区 xxx区</span></p>
            </div>
          </div>
          <div class="order-consignee-item">
            <div class="consignee-item-title">配送信息</div>
            <div class="consignee-item-content">
              <p><span>配送方式:</span> <span>快递</span></p>
            </div>
          </div>
          <div class="order-consignee-item">
            <div class="consignee-item-title">付款信息</div>
            <div class="consignee-item-content">
              <p><span>实付金额:</span> <span>50.90</span></p>
              <p><span>付款方式:</span> <span>微信支付</span></p>
              <p><span>付款时间:</span> <span>2019-10-22 16:33:56</span></p>
            </div>
          </div>
          <div class="order-consignee-item">
            <div class="consignee-item-title">买家信息</div>
            <div class="consignee-item-content">
              <p><span>买家:</span> <span>IAM</span></p>
              <p><span>买家留言:</span> <span>-</span></p>
            </div>
          </div>
        </div>
        <!--商品列表-->
        <!--商品列表-->
        <div class="order-goods-list">
          <div class="list-item-box box-header">
            <div v-for="(item,index) in goodsItem" :key="index">{{item}}</div>
          </div>
          <div class="goods-list-item" v-for="(item,index) in packageList" :key="index">
            <div v-if="item.isPackage" class="package-list">
              <div>{{`包裹 - ${index+1}`}}</div>
              <div>{{item.transfer_name}} <span class="package_code">运单号：{{item.package_code}}</span></div>
            </div>
            <div v-else class="package-list no-package">
              <div>以下商品未发货</div>
            </div>
            <div class="list-item-box" v-for="(listItem,listIndex) in item.list" :key="listIndex">
              <div>
                <div class="goods">
                  <img :src="listItem.imageUrl" alt="">
                  <div class="goodsName">
                    <p @click="$router.push({name:'goodsCreate',query:{id:listItem.product_id}})">
                      {{listItem.title}}</p>
                    <p>{{listItem.sku_spec}}</p>
                    <p>规格编码：{{listItem.sku_code}}</p>
                  </div>
                </div>
              </div>
              <!--单价(元)-->
              <div>
                <div>{{listItem.price}}</div>
              </div>
              <!--数量-->
              <div>
                <div>{{listItem.number}}</div>
              </div>
              <!--小计-->
              <div>
                <div>
                  <p>{{listItem.endPrice}}</p>
                  <p style="text-decoration: line-through;color: #ccc" v-if="listItem.origin_price * 1 >0">
                    {{listItem.origin_price}}</p>
                </div>
              </div>
              <!-- 发货状态-->
              <div>
                {{listItem.package_id ? '已发货' : '未发货'}}
              </div>
            </div>
          </div>
        </div>


        <!--总计信息-->
        <div class="order-count">
          <div>
            <p><span>商品总价：</span> <span>￥34.00</span></p>
            <p><span>运费：</span> <span>￥0.00</span></p>
            <p><span>礼品卡/储值卡：</span> <span>￥0.00</span></p>
            <p class="order-get"><span>实收金额：</span> <span>￥34.00</span></p>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单发货-->
    <el-dialog
      custom-class="up-dialog"
      :close-on-click-modal="false"
      top="10vh"
      title="订单发货"
      :visible.sync="dialogShippingPop"
      width="80%">
      <div class="up-video-comment">
        <shipping-pop @deliveryEd="getDetail" :dialogShow="dialogShippingPop" :orderId="Number(orderId)"></shipping-pop>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Detail from './detail'

  export default Detail
</script>
