import './index.scss'

export default {
  name: 'material-list-images',
  props: {
    isGetChooseImages: {// 是否返回选择的图片
      type: Boolean,
      default: false
    },
    canChooseImagesNum: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      /** 图片列表*/
      imageList: [
        {
          id: 2,
          img: 'http://wangzheshike.xxgushi.com/admin/img_2.jpg',
          title: '化妆品2'
        },
        {
          id: 3,
          img: 'http://wangzheshike.xxgushi.com/admin/img_3.jpg',
          title: '化妆品3'
        },
        {
          id: 4,
          img: 'http://wangzheshike.xxgushi.com/admin/img_4.jpg',
          title: '化妆品4'
        },
        {
          id: 5,
          img: 'http://wangzheshike.xxgushi.com/admin/img_5.jpg',
          title: '化妆品5'
        },
        {
          id: 6,
          img: 'http://wangzheshike.xxgushi.com/admin/img_6.jpg',
          title: '化妆品6'
        },
        {
          id: 7,
          img: 'http://wangzheshike.xxgushi.com/admin/img_7.jpg',
          title: '化妆品7'
        },
        {
          id: 8,
          img: 'http://wangzheshike.xxgushi.com/admin/img_8.jpg',
          title: '化妆品8'
        },
        {
          id: 9,
          img: 'http://wangzheshike.xxgushi.com/admin/img_9.jpg',
          title: '化妆品9'
        },
        {
          id: 10,
          img: 'http://wangzheshike.xxgushi.com/admin/img_10.jpg',
          title: '化妆品10'
        },
        {
          id: 11,
          img: 'http://wangzheshike.xxgushi.com/admin/meizhuang/1.jpg',
          title: 'OLY01'
        },
        {
          id: 12,
          img: 'http://wangzheshike.xxgushi.com/admin/meizhuang/2.jpg',
          title: 'OLY02'
        },
        {
          id: 13,
          img: 'http://wangzheshike.xxgushi.com/admin/meizhuang/3.jpg',
          title: 'OLY03'
        },
        {
          id: 14,
          img: 'http://wangzheshike.xxgushi.com/admin/meizhuang/4.jpg',
          title: 'OLY04'
        },
        {
          id: 15,
          img: 'http://wangzheshike.xxgushi.com/admin/meizhuang/5.jpg',
          title: 'OLY05'
        },
        {
          id: 16,
          img: 'http://wangzheshike.xxgushi.com/admin/meizhuang/6.jpg',
          title: 'OLY06'
        },
        {
          id: 17,
          img: 'http://wangzheshike.xxgushi.com/admin/meizhuang/7.jpg',
          title: 'OLY07'
        },
        {
          id: 18,
          img: 'http://wangzheshike.xxgushi.com/admin/meizhuang/8.jpg',
          title: 'OLY08'
        },
        {
          id: 19,
          img: 'http://wangzheshike.xxgushi.com/admin/huodong.png',
          title: '活动图'
        },
        {
          id: 20,
          img: 'http://wangzheshike.xxgushi.com/admin/fenlei.png',
          title: '分类'
        }
      ],
      /** 选中的图片*/
      chooseImages: []
      /** end 选中的图片*/
    }
  },
  watch: {
    isGetChooseImages() { // 返回选择之后的图片
      if (!this.chooseImages.length) {
        this.$message.error('请选择图片')
        return
      }
      this.$emit('chooseImagesEnd', {
        data: this.chooseImages
      })
      this.chooseImages = []
    }
  },
  components: {},
  computed: {},
  mounted() {
  },
  methods: {
    /** 选择模式选择图片*/
    chooseImageFun($item) {
      console.log($item)
      if (this.canChooseImagesNum === 1) {
        this.chooseImages = []
      }
      /** 判断是否已经存在*/
      const $index = this.chooseImages.findIndex(x => x.id === $item.id)
      if (this.canChooseImagesNum > 1 && $index >= 0) {
        this.chooseImages.splice($index, 1)
      } else {
        if (this.chooseImages.length >= this.canChooseImagesNum) {
          this.$message.error(`只能选择${this.canChooseImagesNum}张图片`)
          return
        }
        this.chooseImages.push($item)
      }
    }
  }
}
