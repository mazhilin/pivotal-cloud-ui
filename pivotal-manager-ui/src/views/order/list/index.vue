<template>
  <div class="app-container-10 container-f0f2f5 app-main order-list-container">
    <div class=" container-fff app-container-15 app-ele-border-radius-0">
      <!--搜索-->
      <div class="order-search">
        <evue-form v-model="formObj" :option="formOption">
          <template v-slot:btnList>
            <div class="type-btn">
              <el-button type="primary" size="mini">确定</el-button>
              <el-button size="mini">导出</el-button>
              <el-button size="mini">查看已生成报表</el-button>
              <el-button type="text" size="mini">清空筛选条件</el-button>
            </div>
          </template>
        </evue-form>
      </div>
      <!--tabs-->
      <div class="order-tabs">
        <el-tabs type="border-card" v-model="formObj.tabs">
          <el-tab-pane v-for="(item,index) in tabs" :key="index" :name="item.name" :label="item.label"></el-tab-pane>
        </el-tabs>
      </div>
      <!--列表-->
      <div class="order-list">
        <div class="list-header">
          <div class="list-header-item goods-cell">商品</div>
          <div class="list-header-item price-cell">单价(元) / 数量</div>
          <div class="list-header-item aftermarket-cell">售后</div>
          <div class="list-header-item customer-cell">买家 / 收货人</div>
          <div class="list-header-item express-cell">配送方式</div>
          <div class="list-header-item pay-price-cell">实付金额(元)</div>
          <div class="list-header-item state-cell">订单状态</div>
          <div class="list-header-item operation-cell">操作</div>
        </div>
      </div>
      <!--内部-->
      <div class="container-static">
        <div class="order-list-body">
          <div class="list-item" v-for="(item,index) in list" :key="index">
            <div class="container-static">
              <div class="list-item-header">
                <div class="list-item-header-row">
                  <div>
                    <div class="order-no">订单号：{{item.id}}</div>
                    <span class="book-time-wrap">下单时间：{{item.createTime}}</span>
                    <div class="circle-dot-wrap">微信小程序</div>
                  </div>

                  <div>
                    <a class="new-window" href="javascript:void(0)" @click="$router.push({name:'orderDetail'})">查看详情</a>
                    <div class="remark-content-wrap">
                      <a class="new-window" href="javascript:void(0)">备注</a>
                    </div>
                  </div>
                </div>
              </div>
              <table class="list-item-body-table">
                <tbody class="list-item-body" v-if="item.goods&&item.goods.length>0">
                <tr class="list-item-row" v-for="(one,i) in item.goods" :key="i">
                  <td class="goods-cell">
                    <div class="goods-item-cell">
                      <img class="goods-info__img" :src="one.img" alt="">
                      <div class="goods-info__info">
                        <div class="goods-title">
                          <a href="javascript:" class="new-window" :title="one.goodsName">{{one.goodsName}}</a>
                        </div>
                        <div class="goods-skus">
                          <span class="goods-sku">{{one.goodsSpec.replace(/[{}]/g, '')}}</span>
                        </div>
                        <div class="goods-tags"></div>
                      </div>
                      <div class="goods-info__price">
                        <div>{{Number(one.goodsPrice).toFixed(2) }}</div>
                        <div>{{one.goodsQuantity}}件</div>
                      </div>
                    </div>
                  </td>
                  <td class="aftermarket-cell">

                    <div class="aftermarket">
                      <a href="javascript:" style="display:block;">{{one.status|refundStatusFilter}}</a>
                    </div>
                  </td>
                  <td class="customer-cell" v-if="i===0" :rowspan="item.goods.length">
                    <div class="user-info">
                      <p style=" color: #38f;cursor: pointer;" @click="$router.push({name:'customerDetail'})">
                        {{item.userName}} </p>
                      <p class="user-name">{{item.consignee}}</p>
                      <p>{{item.mobile}}</p></div>
                  </td>
                  <td class="express-cell" v-if="i===0" :rowspan="item.goods.length">
                    快递
                  </td>
                  <td class="pay-price-cell" v-if="i===0" :rowspan="item.goods.length">
                    <div><span>{{Number(item.payAmount).toFixed(2)}}</span></div>
                  </td>
                  <td v-if="i===0" :rowspan="item.goods.length" class="state-cell">
                    <div class="order-state">
                      <div><p>{{item.showStatus|orderStatus}}</p></div>
                    </div>
                  </td>
                  <td v-if="i===0" :rowspan="item.goods.length" class="operation-cell">
                    <div class="deal-btn">
                      <el-button size="mini" @click="dialogShippingPop=true">发货</el-button>
                    </div>
                  </td>
                </tr>
                <tr class="buyerremark-row" v-if="item.buyerRemark">
                  <td :colspan="7">买家备注：{{item.buyerRemark}}</td>
                </tr>
                <tr class="remark-row" v-if="item.sellerRemark">
                  <td :colspan="7">卖家备注：{{item.sellerRemark}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
      <!--分页-->
      <Pagination :limit="formObj.limit" :total="total" :page="formObj.page"
                  @pagination="handleChange"></Pagination>
      <!-- 订单发货-->
      <el-dialog
        custom-class="up-dialog"
        :close-on-click-modal="false"
        top="10vh"
        title="订单发货"
        :visible.sync="dialogShippingPop"
        width="80%">
        <div class="up-video-comment">
          <shipping-pop @deliveryEd="getList" :dialogShow="dialogShippingPop" :orderId="Number(orderId)"></shipping-pop>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import List from './list'

  export default List
</script>
