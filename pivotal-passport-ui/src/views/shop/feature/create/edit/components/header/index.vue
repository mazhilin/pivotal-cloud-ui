<!--结构必须如下 创建新组件是可以复制以下html-->
<!--
<div class="自定义class">
  <div class="design-preview-controller">
     预览区域
  </div>
  <div class="design-editor-item design-hide-class" v-if="isShowEdit">
      <div class="design-config-editor">
      <div class="design-editor-component-title">组件名称(如果为顶部配置组件可以不要该dom)</div>
      编辑区域
      </div>
  </div>
</div>
-->
<template>
  <div class="micro-header-box">
    <!--预览控制区-->
    <div class="design-preview-controller">
      <div class="preview-header">
        <div class="preview-header-title">{{ formData.title || '微页面标题' }}</div>
      </div>
    </div>
    <!--编辑工作区-->
    <div v-show="isShowEdit" class="design-editor-item design-hide-class">
      <div class="design-config-editor">
        <el-form ref="formData" :model="formData" label-width="100px">
          <el-form-item
            label="页面名称:"
            prop="title"
            :rules="{
              required: true, message: '页面名称不能为空', trigger: 'blur'
            }"
          >
            <el-input v-model="formData.title" placeholder="请输入名称" size="small" />
          </el-form-item>
          <el-form-item label="页面描述:">
            <el-input v-model="formData.description" size="small" placeholder="用户通过微信分享给朋友时，会自动显示页面描述" />
          </el-form-item>
          <el-form-item label="是否定时发布:">
            <el-switch
              v-model="formData.isTimeRelease"
              :disabled="id!==''"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </el-form-item>
          <el-form-item
            v-if="formData.isTimeRelease"
            label="定时发布时间:"
            prop="gmtStart"
            :rules="{
              required: true, message: '发布时间不能为空', trigger: 'blur'
            }"
          >
            <el-date-picker
              v-model="formData.gmtStart"
              :disabled="id!==''"
              size="mini"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
            />
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
