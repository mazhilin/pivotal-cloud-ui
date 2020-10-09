<template>
  <div class="micro-recommendation-list-box">
    <!--预览控制区-->
    <div class="design-preview-controller">
      <div class="nav-content">
        仿苹果app首页，推荐列表
        <img class="img-box" src="http://wangzheshike.xxgushi.com/158428200515842820057rquRz" alt="">
      </div>
    </div>
    <!--编辑工作区-->
    <div class="design-editor-item design-hide-class" v-if="isShowEdit">
      <div class="design-config-editor">
        <div class="design-editor-component-title">值得一看</div>
        <div class="nav-content">
          即将推出，尽请期待
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import index from './index.js';

  export default index;
</script>
