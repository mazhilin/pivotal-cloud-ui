<template>
  <div class="app-container-10 container-f0f2f5 app-ele-border-radius-0 app-main customer-list-container detail">
    <!--基本信息-->
    <div class="container-fff app-container-15 app-ele-border-radius-0 margin-button-10">
      <div class="title">基本信息</div>
      <div class="display-flex info-content">
        <div class="item">
          <div class="portrait">
            <img src="http://wangzheshike.xxgushi.com/admin/default-avatar.png" alt="">
          </div>
          <div>
            <p>姓名：IAMNAME</p>
            <p>昵称：未知</p>
            <p>成为客户：2019-10-13</p>
            <div class="display-flex remarks">
              <p>备注：无</p>
              <el-button class="el-button-edit edit" type="text">编辑</el-button>
            </div>
          </div>
        </div>
        <div class="item">
          <div>
            <p>最近浏览：未浏览</p>
            <p>最近收货地址：未知</p>
          </div>
        </div>
        <div class="item">
          <p>手机号：13670310584</p>
        </div>
      </div>
    </div>
    <!--客户资料-->
    <div class="container-fff app-container-15 app-ele-border-radius-0 margin-button-10">
      <div class="display-flex title">
        <div>客户资料</div>
        <el-button size="mini" class="el-button-edit" type="text">编辑</el-button>
      </div>
      <div class="display-flex info-content">
        <div class="item">
          <div>
            <p>性别：其他</p>
          </div>
        </div>
        <div class="item">
          <div>
            <p>生日：无</p>
          </div>
        </div>
        <div class="item">
          <p>地区：无</p>
        </div>
        <div class="item">
          <p>微信号：无</p>
        </div>
      </div>
    </div>
    <!--标签信息-->
    <div class="container-fff app-container-15 app-ele-border-radius-0 margin-button-10">
      <div class="display-flex title">
        <div>标签信息</div>
        <el-button size="mini" class="el-button-edit" type="text">编辑</el-button>
      </div>
      <div v-if="false" class="display-flex info-content">
        <div class="none-label">暂无标签</div>
      </div>
      <div class="tag-container">
        <el-tag v-for="(item,index) in 3" :key="index" class="tag-item">linlw{{ item }}</el-tag>
      </div>
    </div>
    <!--资产信息-->
    <div class="container-fff app-container-15 app-ele-border-radius-0 margin-button-10 assets-information">
      <div class="display-flex title">
        <div>资产信息</div>
      </div>
      <div class="info-content display-flex">
        <div class="item assets-item display-flex-j-c">
          <div>
            <div>
              <span>可用权益卡数&nbsp;|</span><el-button class="el-button-edit" type="text">管理卡</el-button>
            </div>
            <div class="number">0</div>
          </div>
        </div>
        <div class="item assets-item display-flex-j-c">
          <div>
            <div>
              <span>存值余额</span>
            </div>
            <div class="number">¥ 0.00</div>
            <el-button type="text" class="continue-book">去续订</el-button>
          </div>
        </div>
        <div class="item assets-item display-flex-j-c">
          <div>
            <div>
              <span>可用优惠卷/码</span>
            </div>
            <div class="number">0</div>
          </div>
        </div>
        <div class="item assets-item display-flex-j-c">
          <div>
            <div>
              <span>可用积分&nbsp;|</span><el-button class="el-button-edit" type="text">给积分</el-button>
            </div>
            <div class="number">0</div>
          </div>
        </div>
      </div>
    </div>
    <!--会员权益-->
    <div class="container-fff app-container-15 app-ele-border-radius-0 margin-button-10">
      <div class="display-flex title">
        <div>会员权益</div>
        <el-button size="mini" class="el-button-edit" type="text">编辑</el-button>
      </div>
      <div class="display-flex info-content">
        <div class="none-label">暂无权益</div>
      </div>
    </div>
    <!--交易统计-->
    <div class="container-fff app-container-15 app-ele-border-radius-0 margin-button-10 assets-information transaction">
      <div class="display-flex title">
        <div>交易统计</div>
        <el-button size="mini" class="el-button-edit" type="text">累计订单</el-button>
      </div>
      <div class="info-content display-flex">
        <div class="item assets-item display-flex-j-c">
          <div>
            <div>
              <span>最近下单时间</span>
            </div>
            <div class="number">无</div>
          </div>
        </div>
        <div class="item assets-item display-flex-j-c">
          <div>
            <div>
              <span>客单价</span>
            </div>
            <div class="number">¥ 0.00</div>
          </div>
        </div>
        <div class="item assets-item display-flex-j-c">
          <div>
            <div>
              <span>累计消费金额</span>
            </div>
            <div class="number">¥ 0.00</div>
          </div>
        </div>
        <div class="item assets-item display-flex-j-c">
          <div>
            <div>
              <span>累计消费订单数</span>
            </div>
            <div class="number">0</div>
          </div>
        </div>
        <div class="item assets-item display-flex-j-c">
          <div>
            <div>
              <span>累计退款金额</span>
            </div>
            <div class="number">¥ 0.00</div>
          </div>
        </div>
        <div class="item assets-item display-flex-j-c">
          <div>
            <div>
              <span>累计退款订单数</span>
            </div>
            <div class="number">0</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import List from './detail'

  export default List
</script>
