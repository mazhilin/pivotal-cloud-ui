<template>
  <transition :name="transitionName">
    <div>
      <img :src="errGif" width="100">
      <p>即将上线哦，先自己前往<a target="_blank" href="https://www.youzan.com/">有赞体验</a>一下哈，等不及的请加QQ:2052021114咨询</p>
    </div>
  </transition>
</template>

<script>
  import errGif from '@/assets/401_images/401.gif'

  export default {
    name: 'NoTo',
    props: {},
    data() {
      return {
        transitionName: 'fade',
        errGif: errGif + '?' + +new Date()
      }
    },
    mounted() {
    }
  }
</script>
