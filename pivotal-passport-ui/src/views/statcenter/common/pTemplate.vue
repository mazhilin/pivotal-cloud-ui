<template>
  <div class="pTemplate">
    <p> {{paramObj.name}} &nbsp;
      <el-popover
              title="指标说明"
              trigger="hover"
              :content='paramObj.remark'>
        <i v-if='paramObj.remark' class="el-icon-question" slot="reference"></i>
      </el-popover>
    </p>
    <p> {{(+paramObj.num) ? (+paramObj.num).toLocaleString() : paramObj.num}}</p>
  </div>
</template>
<script>
  export default {
    props: {
      paramObj: {
        type: Object
      }
    }
  }
</script>

<style lang="scss">
  .pTemplate {
    padding: 10px;

    p {
      &:nth-child(1) {
        color: #aaa;
      }

      &:nth-child(2) {
        font-size: 18px;
        color: #000;
        font-weight: 600;
      }
    }
  }
</style>

