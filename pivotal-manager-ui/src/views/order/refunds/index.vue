<template>
  <div class="app-container-10 container-f0f2f5 app-main order-refunds-container">
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
        <div class="list-header margin-box">
          <div class="list-header-item goods-cell">商品</div>
          <div class="list-header-item list-header-col-3">发货状态</div>
          <div class="list-header-item list-header-col-3">订单金额(元)</div>
          <div class="list-header-item list-header-col-3">退款金额(元)</div>
          <div class="list-header-item list-header-col-3">申请时间</div>
          <div class="list-header-item list-header-col-3">退款状态</div>
          <div class="list-header-item list-header-col-2">操作</div>
        </div>
      </div>
      <!--列表-->
      <div class="order-list-block">
        <div class="order-item" v-for="(item,index) in 10" :key="index">
          <div class="order-item-header">
            <span>退款编号：20191104195121230010715</span>
            <span>订单编号：<span @click="$router.push({name:'orderDetail'})">E2019110412221507150000{{item}}</span></span>
            <span><i></i>仅退款</span>
          </div>
          <div class="order-item-content">
            <div class="list-header">
              <div class="list-header-item goods-cell">【2件9折3件8折】[库库小店] 收藏家单色眼影</div>
              <div class="list-header-item list-header-col-3">未发货</div>
              <div class="list-header-item list-header-col-3">49.90</div>
              <div class="list-header-item list-header-col-3">49.90</div>
              <div class="list-header-item list-header-col-3">2019-11-04 19:51:20</div>
              <div class="list-header-item list-header-col-3">退款成功</div>
              <div class="list-header-item list-header-col-2">
                <el-button type="text" @click="$router.push({name:'orderRefundsDetail'})">查看详情</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--分页-->
      <!--@pagination="getAttachmentList"-->
      <div class="pagination-page">
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Refunds from './refunds'

  export default Refunds
</script>
