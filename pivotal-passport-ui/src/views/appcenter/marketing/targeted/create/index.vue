<template>
  <div class="app-container-10 container-f0f2f5 app-main targeted-create-container">
    <div class="container-fff app-container-15 app-ele-border-radius-0">
      <div class="targeted-box">
        <div class="targeted-view">
          <img src="https://b.yzcdn.cn/public_files/2018/09/06/a19c445afd4e8975539a573e17a30e35.png" alt="">
        </div>
        <div class="targeted-edit">
          <div>
            <evue-form ref="eVueForm" v-model="obj" :option="option">
              <template v-slot:chooseCoupon>
                <div>
                  <el-button type="text">添加优惠券</el-button>
                </div>
              </template>
            </evue-form>
          </div>
        </div>
      </div>
    </div>
    <div class="create-save-btn app-ele-border-radius-0">
      <div class="create-save-btn-box">
        <el-button size="mini">保存</el-button>
        <el-button size="mini">取消</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import Create from './create'

  export default Create
</script>
