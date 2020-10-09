<template>
  <div class="choose-goods">
    <evue-table :data="list" :option="option" @selectionChange="selectionChange">
      <template v-slot:goodsName="props">
        <div class="goods">
          <img :src="props.data.mainImage" alt="">
          <div class="goodsName">
            <p>{{ props.data.productName }}</p>
            <span>{{ props.data.price }}</span>
          </div>
        </div>
      </template>
      <template v-slot:comeNum="props">
        <p>访客数:{{ props.data.viewNum }}</p>
        <p>浏览量:{{ props.data.comeNum }}</p>
      </template>
    </evue-table>
  </div>
</template>
<script>
  import index from './index.js'

  export default index
</script>
