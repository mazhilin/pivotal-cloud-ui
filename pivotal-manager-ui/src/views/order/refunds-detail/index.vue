<template>
  <div class="app-container-10 container-f0f2f5 app-main refunds-detail-container">
    <div class=" container-fff app-container-15 app-ele-border-radius-0">
      <div class="order-detail">
        <!--订单状态-->
        <div class="order-status">
          <div class="order-status-row">
            <div class="row-right">
              <div class="row-right-steps">
                <el-steps :active="active" finish-status="success">
                  <el-step title="买家下单" description="2019-10-21 15:55:50"></el-step>
                  <el-step title="买家付款"></el-step>
                  <el-step title="商家发货"></el-step>
                  <el-step title="交易完成"></el-step>
                </el-steps>
              </div>
            </div>
          </div>
        </div>
        <!--售后维权-->
        <div class="content-region">
          <div class="info-region">
            <div class="region-title">售后维权</div>
            <div class="info-region-goods border-bottom">
              <img class="goods-img" src="http://wangzheshike.xxgushi.com/admin/meizhuang/3.jpg" alt="">
              <div class="goods-info">
                <p>哑光唇釉mini6支装礼盒雾面</p>
                <p>套盒:套组2百搭气场色</p>
              </div>
            </div>
            <div class="border-bottom region-order">
              <div>
                <p>期望结果：</p>
                <p><span>仅退款</span></p>
              </div>
              <div>
                <p>退款金额：</p>
                <p><span>119.90</span> 元</p>
              </div>
              <div>
                <p>维权原因：</p>
                <p> 拍错/多拍/不喜欢</p>
              </div>
              <div>
                <p>维权编号：</p>
                <p> 201913423060912</p>
              </div>
            </div>
            <div class="region-order">
              <div>
                <p>订单编号：</p>
                <p> E20191104324200015</p>
              </div>
              <div>
                <p>付款时间：</p>
                <p> 2019-11-04 22:44:49</p>
              </div>
              <div>
                <p>买 家：</p>
                <p> IAMCKQ</p>
              </div>
              <div>
                <p>物流信息：</p>
                <p>-</p>
              </div>
              <div>
                <p>运 费：</p>
                <p> 0.00 元</p>
              </div>
              <div>
                <p>合计优惠：</p>
                <p> 0.00 元</p>
              </div>
              <div>
                <p>储值卡/礼品卡：</p>
                <p> 0.00 元</p>
              </div>
              <div>
                <p>实付金额：</p>
                <p> 119.90 元</p>
              </div>
            </div>
          </div>
          <div class="state-region">
            <div class="state-region-box">
              <div class="state-title">
                <span class="icon-info">!</span>
                等待商家处理退款申请
              </div>
              <div class="state-desc">
                <p>收到买家仅退款申请，请尽快处理。</p>
                <p>请在<span>6天17小时24分钟15秒</span>处理本次退款，如逾期未处理，将自动同意退款。</p>
              </div>
              <div class="state-btn">
                <el-button type="primary" size="mini">同意买家退款</el-button>
                <el-button size="mini">拒绝退款申请</el-button>
                <el-button size="mini">发货</el-button>
              </div>
            </div>
            <!--evue admin 提醒-->
            <div class="state-remind-region border-top">
              <div class="state-remind">
                <div class="state-remind-title">EvueAdmin提醒：</div>
                <ul>
                  <li>如果未发货，请点击同意退款给买家。</li>
                  <li>如果实际已发货，请主动与买家联系。</li>
                  <li>如果你逾期未处理，视作同意买家申请，系统将自动退款给买家。</li>
                  <li>开启“退款退券”后，如果订单全额退款，优惠券会退还给买家。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!--记录-->
        <div class="safeguard-log">
          <div class="safeguard-log-title">协商记录</div>
          <div class="send-comments">点击发表留言</div>
          <div class="safeguard-log-list">
            <p>买家<span>2019-11-06 09:08:51</span></p>
            <p>卖家<span>2019-11-06 09:08:55</span></p>
          </div>
          <!--总计信息-->
          <div class="order-count">
            <div>
              <p>发起了退款申请,等待商家处理</p>
              <p><span> 退款原因：</span><span> 拍错/多拍/不喜欢</span></p>
              <p><span> 处理方式：</span><span> 仅退款</span></p>
              <p><span> 退款金额：</span><span> 49.90</span></p>
              <p><span> 退款说明：</span><span> 拍错</span></p>
              <p><span> 联系电话：</span><span> 17821212003</span></p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Detail from './refunds-detail'

  export default Detail
</script>
