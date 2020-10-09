<template>
  <div class="app-container-10 container-f0f2f5 app-main split-create-container">
    <div class="container-fff app-container-15 app-ele-border-radius-0">
      <div class="split-box">
        <div class="split-edit">
          <div>

            <div class="split-desc-box">
              <div class="split-title">裂变优惠券设置</div>
              <div class="split-title-desc">裂变优惠券，客户完成在线支付，可以获得几个可以分享的优惠券，分享到朋友群，自己和朋友都可以领取。</div>
            </div>

            <evue-form ref="eVueForm" v-model="obj" :option="option">

              <template v-slot:onlyGoods>
                <div>
                  <el-button>选择商品</el-button>
                </div>
                <div>指定商品可用</div>
              </template>
              <el-button size="small" @click="$message.error('你点击了取消按钮')" slot="menuBottom">取消</el-button>
            </evue-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Create from './create'

  export default Create
</script>
