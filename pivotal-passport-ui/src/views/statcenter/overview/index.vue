<template>
  <div class="app-container-10 container-f0f2f5 app-main statcenter-overview-container">
    <div class=" container-fff app-container-15 app-ele-border-radius-0">
      <div class="data-title">
        实时概况 &nbsp;
        <el-popover
                trigger="hover">
          <div>
            <p>支付金额: 当天现货支付金额 + 定金金额 + 尾款金额(不剔除退款金额);</p>
            <p>访客数: 页面被访问的去重人数，一个人在统计时间范围内访问多次只记为一个;</p>
            <p>浏览量: 所有页面被访问的次数，一个人在统计时间内访问多次记为多次;</p>
<!--            <p>支付订单数: 成功支付的订单数，一个订单对应唯一一个订单号（拼团在成团时计入付款订单，不剔除退款订单）;</p>-->
<!--            <p>支付人数: 当天现货支付人数 + 支付定金人数 + 支付尾款人数的去重买家人数;</p>-->
<!--            <p>退款成功金额:退款成功的订单累加的退款金额;</p>-->
<!--            <p>退款成功订单数:退款成功的订单数量;</p>-->
<!--            <p>客单价: 支付总金额 / 支付人数;</p>-->
<!--            <p>访客支付转换率: 支付人数 / 访客数;</p>-->
            <p>待退款订单数: 目前状态为退款中的订单数量;</p>
            <p>待发货订单数: 目前状态为待发货的订单数量;</p>
            <p>支付定金金额: 当天所有付款定金总和;</p>
            <p>支付尾款金额: 当天所有付款尾款总和;</p>
            <p>支付定金人数: 当天所有支付定金人数;</p>
            <p>支付尾款人数: 当天所有支付尾款人数;</p>
          </div>
          <i class="el-icon-question" slot="reference"></i>
        </el-popover>
        <el-button size="mini" type="primary" plain @click='getPayDataOnTime'>刷新</el-button>
      </div>
      <div class="data-top-current">
        <div class="data-top-current-chart">
          <div class="data-top-current-chart-text">
            <p>支付金额</p>
            <p>88888</p>
            <p>昨日全天: 323232323</p>
          </div>
          <div class="data-top-current-chart-box">
            <v-chart style='width:100%;height:100%;' :autoresize='true' :options='currentOptions'></v-chart>
          </div>
        </div>
        <div class="data-top-current-num">
          <div class="data-top-current-num-text" v-for="(item, index) in currentNum" :key='index'>
            <p>{{item.name}}</p>
            <p>{{item.num}}</p>
            <p v-if='!item.show'>昨天全天: {{item.lastNum}}</p>
          </div>
        </div>
      </div>
      <div class="data-tad-title" ref='dataTadTitle'>
      <span v-for='item in tabArr' :key='item.val' class='tabBtn' :class='currentTab === item.val?"active":""'
            @click='clickTabFn(item.val)'>{{item.cn}}</span>
       <!-- <div class="data-tad-title-right">
          <span>时间筛选 : </span>
          <el-select v-model="timeRange" placeholder="请选择">
            <el-option label="自然天" value="date"></el-option>
            &lt;!&ndash; <el-option label="自然周" value="week"></el-option> &ndash;&gt;
            &lt;!&ndash; <el-option label="自然月" value="month"></el-option> &ndash;&gt;
            &lt;!&ndash; <el-option label="自然季度" value="quarter"></el-option> &ndash;&gt;
          </el-select>
          <div class='date-picker-box' v-if='timeRange !== "quarter"'>
            <el-date-picker
                    v-model="queryForm.queryTime"
                    type="date"
                    class='time'
                    :clearable='false'
                    format="yyyy年MM月dd日"
                    value-format='yyyy-MM-dd'
                    @change="init"
                    placeholder="选择时间">
            </el-date-picker>
          </div>
          <div class='date-picker-box' v-if='timeRange === "quarter"'>
            <el-date-quarter v-model="queryForm.quarterTime" @changeFn="quarterChangeFn"></el-date-quarter>
          </div>
        </div>-->
      </div>
      <div v-if='currentTab === 1'>
        <div class="data-title">核心指标</div>
        <div class="data-core-index">
          <div class="data-core-index-box" ref='parentBox'>
            <div class="show-box" ref='childBox'
                 :style='{left: currentLeft + "px",width: childBoxWidth*coreIndexList.length + 1 + "px"}'>
              <div class='data-core-index-text' :class='item.isActive?"active":""' v-for='(item,index) in coreIndexList'
                   :key='index' @click='clickCoreIndexBtn(item)'>
                <text-template :textObj='item'></text-template>
                <i v-if='item.isActive' class="el-icon-check"></i>
              </div>
            </div>
          </div>
          <span class='leftBtn' v-if='coreIndexList.length > 4' @click='leftBtnFn'><i
                  class="el-icon-arrow-left"></i></span>
          <span class='rightBtn' v-if='coreIndexList.length > 4' @click='rightBtnFn'><i
                  class="el-icon-arrow-right"></i></span>
        </div>
        <div class="data-core-index-chart">
          <v-chart style='width:100%;height:100%;' :autoresize='true' :options='coreOptions'></v-chart>
        </div>
        <div class="data-title">流量看板</div>
        <div class="data-traffic-kanban data-traffic-kanban-one">
          <h3>流量质量指标</h3>
          <div class="data-traffic-kanban-chart">
            <div v-for="(item,index) in trafficIndexList" :key="index">
              <div class='text-box'>
                <text-template :textObj='item.chartText'></text-template>
              </div>
              <div class='chart-box'>
                <v-chart style='width:100%;height:100%;' :autoresize='true' :options='item.chartOption'></v-chart>
              </div>
            </div>
          </div>
        </div>
        <div class="data-traffic-kanban data-traffic-kanban-two">
          <h3>流量转化</h3>
          <div class="data-traffic-kanban-chart">
            <div v-for='(item,index) in percentList' :key='index'>
              <el-progress type="circle" :width='160' :stroke-width='12'
                           :color='item.progressBox.color' :percentage="item.progressBox.currentNum"></el-progress>
              <text-template :textObj='item.chartText'></text-template>
            </div>
          </div>
        </div>
        <div class="data-title">商品看板</div>
        <div class="data-commodity-kanban">
          <div class="data-commodity-kanban-list">
            <h3>TOP5访问排名</h3>
            <div class="tableBox">
              <table-template :tableData='RankingTop5'></table-template>
            </div>
          </div>
          <div class="data-commodity-kanban-list">
            <h3>TOP5支付排名</h3>
            <div class="tableBox">
              <table-template :option-type='2' :tableData='payTableData'></table-template>
            </div>
          </div>
        </div>
        <div class="data-title">客户看板</div>
        <div class="data-commodity-kanban data-client-kanban">
          <div class="data-commodity-kanban-list">
            <h3>访客量</h3>
            <div class="fans-text">
              <div class="fans-text-box" v-for='(item,index) in wxIndexList' :key='index'>
                <text-template :textObj='item'></text-template>
              </div>
            </div>
            <div class="fans-chart">
              <v-chart style='width:100%;height:100%;' :autoresize='true' :options='wxOption'></v-chart>
            </div>
          </div>
          <div class="data-commodity-kanban-list">
            <h3>店铺会员</h3>
            <div class="fans-text">
              <div class="fans-text-box" v-for='(item,index) in wyIndexList' :key='index'>
                <text-template :textObj='item'></text-template>
              </div>
            </div>
            <div class="fans-chart">
              <v-chart style='width:100%;height:100%;' :autoresize='true' :options='wyOption'></v-chart>
            </div>
          </div>
        </div>
        <div class="data-customer">
          <h3>
            成交客户 &nbsp;
            <el-popover
                    trigger="hover">
              <div>
                <p>新客数：过去2年没有购买，在筛选时间内首次在店铺付款的客户数量;</p>
                <p>老客数：过去2年购买过，在筛选时间内在店铺再次付款的客户数量;</p>
                <p>老成交客户占比：老成交客户数 / 全部成交客户数;</p>
                <p>新成交客户占比：新成交客户数 / 全部成交客户数;</p>
              </div>
              <i class="el-icon-question" slot="reference"></i>
            </el-popover>
          </h3>
          <div class="data-traffic-kanban-chart">
            <div>
              <v-chart style='width:100%;height:100%;' :autoresize='true' :options='tradingVolumeOption'></v-chart>
            </div>
            <div>
              <v-chart style='width:100%;height:100%;' :autoresize='true' :options='tradingNumberOption'></v-chart>
            </div>
            <div class='data-customer-text'>
              <p>老成交客户占比</p>
              <div v-for='(item,index) in tradingTextObj' :key='index'>
                <p>{{item.name}}</p>
                <p>{{item.currentNum}}</p>
                <p>
                  {{item.comparison}} :
                  <span :style='{color: (+item.lastNum) > 0 ? "#ff4949" : "#42b555"}'>
                                    {{(+item.lastNum) > 0 ? "↑" : "↓"}}
                                    {{item.lastNum}}%
                                </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if='currentTab === 2'>
        <div class="data-title">销售目标</div>
        <div class="data-sales-target-box">
          <div class="data-sales-target">
            <div class="data-sales-target-text" v-for='(item,index) in sellNumber' :key='index'>
              <p>{{item.name}}</p>
              <p>{{(+item.num)?(+item.num).toLocaleString():item.num}}</p>
            </div>
          </div>
          <div class="data-sales-target">
            <p> 本月销售进度 <span style='color:#409eff;'> 配置目标</span></p>
            <p>-</p>
            <el-slider disabled :max='currentSellTarget' v-model="currentSell"></el-slider>
            <p>{{sellNumber && sellNumber.length !== 0 ?sellNumber[0].num:''}}/{{currentSellTarget}}</p>
          </div>
        </div>
        <div class="data-sales-target-chart">
          <v-chart style='width:100%;height:100%;' :autoresize='true' :options='sellOption'></v-chart>
        </div>
        <div class="data-title">退货看板</div>
        <div class="data-sales-return-kanban">
          <div class="data-sales-return" v-for='(item,index) in sellArr' :key='index'>
            <h3>
              {{item.name}}
              <el-popover
                      trigger="hover"
                      :content='item.remark'>
                <i v-if='item.remark' class="el-icon-question" slot="reference"></i>
              </el-popover>
            </h3>
            <div class="data-sales-return-box">
              <div class="data-sales-return-text">
                <p>本日</p>
                <p>{{item.currentNum}}</p>
              </div>
              <div class="data-sales-return-text">
                <p>前一日</p>
                <p>{{item.yesterNum}}</p>
              </div>
            </div>
            <div class="data-sales-return-chart">
              <v-chart style='width:100%;height:100%;' :autoresize='true' :options='item.paySessionOption'></v-chart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Overview from './overview'

  export default Overview
</script>
