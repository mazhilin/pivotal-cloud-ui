<template>
  <div class="textTemplate">
    <P>
      {{textObj.nameCn}}
      <el-popover
              trigger="hover"
              :content='textObj.remark'>
        <i v-if='textObj.remark' class="el-icon-question" slot="reference"></i>
      </el-popover>
    </P>
    <P class='currentNum' v-if='textObj.currentNum'>
      {{(+textObj.currentNum)?(+textObj.currentNum).toLocaleString():textObj.currentNum}}</P>
    <P class='lastNum'>
      较前一日：
      <span :style='{color: (+textObj.lastDate) > 0 ? "#ff4949" : "#42b555"}'>
                {{!(+textObj.lastDate)? '' : (+textObj.lastDate) > 0 ? "↑" : "↓"}}
                {{textObj.lastDate}}%
            </span>
    </P>
    <P class='lastNum'>
      较上一周：
      <span :style='{color: (+textObj.lastWeek) > 0 ? "#ff4949" : "#42b555"}'>
                {{!(+textObj.lastWeek)? '' : (+textObj.lastWeek) > 0 ? "↑" : "↓"}}
                {{textObj.lastWeek}}%
            </span>
    </P>
  </div>
</template>
<script>
  export default {
    props: {
      textObj: {
        type: Object
      }
    }
  }
</script>
<style lang="scss">
  .textTemplate {
    padding: 20px 0 0 40px;

    p {
      font-size: 14px;

      &.currentNum {
        margin: 5px 0;
        font-size: 28px;
      }

      &.lastNum {
        color: #adadad;
        margin-bottom: 3px;
      }
    }
  }
</style>


