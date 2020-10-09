<template>
  <div class="app-container-10 container-f0f2f5 app-main coupon-create-container">
    <div class="container-fff app-container-15 app-ele-border-radius-0">
      <div class="coupon-box">
        <div class="coupon-view">
          <div class="header-img">
            <img src="/img/micro-page/micro-create-header.png" alt="">
            <div class="header-title"><span>{{headerTitle}}</span></div>
          </div>

          <div class="coupon-view-rule">
            <div class="coupon-name">{{obj.title || '优惠券名称'}}</div>
            <div class="coupon-body">
              <!-- discountsContent 优惠内容-->
              <div class="coupon-price-view" :data-amountLimit="obj.amount_limit">
                {{showText.discountsContent}}
              </div>
              <div class="coupon-price-view">{{obj.amount_limit ? `满${obj.amount_limit}元`: '无限制'}}</div>
            </div>
          </div>
          <div class="coupon-view-foot"></div>
          <div class="coupon-view-use">
            <div class="coupon-view-use-title">使用说明</div>
            <p>{{obj.name || '优惠券名称'}}
              使用时间：{{showText.useTimeContent}}
              优惠内容：{{obj.directions || '-'}}
            </p>
          </div>
        </div>
        <div class="coupon-edit">
          <div v-if="isShow">
            <evue-form ref="eVueForm" v-model="obj" :option="option" @submit="pushData">

              <template v-slot:onlyGoods>
                <div>
                  <el-button>选择商品</el-button>
                </div>
                <div>指定商品可用</div>
              </template>

              <template v-slot:onlyGoodsNoUse>
                <div>
                  <el-button>选择商品</el-button>
                </div>
                <div>指定商品不可用</div>
              </template>

              <template v-slot:onlyUsers>
                <div>
                  <el-button>选择客户身份</el-button>
                </div>
                <div>请指定客户身份</div>
              </template>
            </evue-form>
          </div>
        </div>
      </div>
    </div>
    <div class="create-save-btn app-ele-border-radius-0">
      <div class="create-save-btn-box">
        <el-button type="primary" size="mini" @click="submit">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Create from './create'

  export default Create
</script>
