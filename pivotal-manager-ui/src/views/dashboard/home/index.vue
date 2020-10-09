<template>
  <div class="app-container-10 container-f0f2f5 app-main dashboard-home-container">
    <div class=" container-fff app-container-20 app-ele-border-radius-0">
      <div class="header">
        <div class="header-title">实时概况 <p>更新时间：2019-11-06 10:53:55</p></div>
      </div>
      <div class="home-box">
        <div class="home-box-row">
          <div class="box-col" v-for="(amountItem,amountIndex) in amount" :key="amountIndex">
            <div class="box-col-item" v-for="(item,index) in amountItem.list" :key="index">
              <div class="overview-data-item">
                <div class="data-item-title">
                  {{item.title}}
                </div>
                <div class="data-item-amount">
                  <span class="amount-today"><count-to :start-val="0" :end-val="item.toDay" :duration="2000"/></span>
                  <i class="amount-icon el-icon-bottom" v-if="item.state === 2"></i>
                  <i class="amount-icon el-icon-top" v-if="item.state === 1"></i>
                </div>
                <div class="data-item-amount-yesterday">
                  昨日：<span>{{item.yesterday}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class=" container-fff app-container-20 app-ele-border-radius-0 main-widget-container">
      <div class="main-widget-box">
        <div class="main-widget-left">
          <div class="header">
            <div class="header-title">智能助手</div>
          </div>
          <div class="progress-block">
            <el-progress type="circle" :stroke-width="10" :percentage="25" :show-text="false"></el-progress>
            <div class="progress-text">
              <p><span>11</span>项</p>
              <p>待处理</p>
            </div>
          </div>
          <div class="main-btn">
            <el-button type="primary" size="mini">去处理</el-button>
          </div>
        </div>
        <div class="main-widget-right">
          <!--tabs-->
          <div class="home-tabs">
            <el-tabs type="border-card" v-model="tabsActive">
              <el-tab-pane v-for="(item,index) in tabs" :key="index" :name="item.name"
                           :label="item.label"></el-tab-pane>
            </el-tabs>
          </div>
          <!--tabs content-->
          <div class="home-tabs-content">
            <div class="major-data-block">
              <div v-for="(item,index) in majorData" :key="index">
                <span class="major-data-title">{{item.title}}</span>
                <span class="major-data-count">{{item.count}}</span>
              </div>
            </div>
            <div class="main-assistant-item-block">
              <div class="main-assistant-item" v-for="(item,index) in 4" :key="index">
                <span class="item-desc">未创建客户分群
                 <span class="sub-desc">通过对客户行为、属性的分析，更好的针对不同客户进行运营管理</span>
                </span>
                <el-button type="text" class="item-btn">立即创建</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--常用功能-->
    <div class=" container-fff app-container-20 app-ele-border-radius-0 main-widget-container">
      <div class="header">
        <div class="header-title">常用功能</div>
      </div>
      <div class="home-new-common">
        <div class="home-new-common-item" v-for="(item,index) in commonNew"
             :key="index" @click="goto(item.page)">
          <i :style="'background:'+item.color"></i>{{item.title}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Home from './home'

  export default Home
</script>
