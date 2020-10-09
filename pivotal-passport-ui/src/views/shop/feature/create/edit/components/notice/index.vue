<template>
  <div class="micro-notice-box">
    <div class="design-preview-controller">
      <div class="notice-content" :style="{background:formData.bg_color,color:formData.color}">
        <span class="iconfont_ckq ckq_notice" /> <!--<i></i>-->{{ formData.content || '如果过长，将会在手机上滚动显示' }}
      </div>
    </div>
    <div v-show="isShowEdit" class="design-editor-item design-hide-class">
      <div class="design-config-editor">
        <div class="design-editor-component-title">公告</div>
        <el-form ref="formData" :model="formData" label-width="100px">
          <el-form-item
            label="公告:"
            prop="content"
            :rules="{
              required: true, message: '请填写公告内容', trigger: 'blur'
            }"
          >
            <el-input v-model="formData.content" size="small" placeholder="请填写内容，如果过长，将会在手机上滚动显示" />
          </el-form-item>
          <el-form-item label="背景颜色:">
            <el-color-picker v-model="formData.bg_color" />
            <el-button class="reColor" @click="formData.bg_color='#fff8e9'">重置</el-button>
          </el-form-item>
          <el-form-item label="文字颜色:">
            <el-color-picker v-model="formData.color" />
            <el-button class="reColor" @click="formData.color='#666666'">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import index from './index.js'

  export default index
</script>
