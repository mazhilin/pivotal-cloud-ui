<template>
  <div class="choose-goods">
    <evue-table  :data="list" :option="option" @currentRowChange="currentRowChange"></evue-table>
  </div>
</template>
<script>
  import index from './index.js'

  export default index
</script>
