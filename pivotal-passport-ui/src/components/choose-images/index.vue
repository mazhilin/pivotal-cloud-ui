<template>
  <div class="choose-images">
    <div class="images-list">
      <div v-for="(item,index) in imageList" :key="index" class="image-item">
        <div
          class="image-box pointer"
          :style="{backgroundImage:'url('+item.img+')'}"
        />
        <div
          :class="['attachment-selected',{active:chooseImages.find(x=>x.id === item.id)}]"
          @click="chooseImageFun(item)"
        >
          <i class="el-icon-check" />
          <span class="after" />
        </div>
        <div class="image-title">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import index from './index.js'

  export default index
</script>
