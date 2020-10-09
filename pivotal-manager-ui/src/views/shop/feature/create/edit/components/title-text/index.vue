<template>
  <div class="micro-title-text">
    <div class="design-preview-controller">
      <div class="title-text-content" :style="{background:formData.bg_color,textAlign:formData.align}">
        <div
          class="title-text-title"
          :style="{color:formData.title_color,fontSize:formData.title_size+'px',fontWeight:formData.title_weight}"
        >
          {{ formData.title }}
        </div>
        <div
          class="title-text-desc"
          :style="{color:formData.desc_color,fontSize:formData.desc_size+'px',fontWeight:formData.desc_weight}"
        >
          {{ formData.desc }}
        </div>
      </div>
    </div>
    <div v-show="isShowEdit" class="design-editor-item design-hide-class">
      <div class="design-config-editor">
        <div class="design-editor-component-title">标题文本</div>
        <div style="padding: 20px 0;background: #fff">
          <evue-form ref="formData" v-model="formData" :option="formOption" @submit="submit" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import index from './index.js'

  export default index
</script>
