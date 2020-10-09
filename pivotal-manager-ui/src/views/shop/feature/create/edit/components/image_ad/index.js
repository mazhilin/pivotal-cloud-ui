import './index.scss'
/**
 * 创建新组件之后，在all-can-use-components中添加
 * 必须应用 microCreateMinis
 * 数据必须以formData包含
 * */
import '../../directive/index'
import {microCreateMinis} from '../../minis'
import {SlickList, SlickItem, HandleDirective} from 'vue-slicksort'
import draggable from 'vuedraggable'

/** 图片广告*/
export default {
  name: 'micro-image-ad-box',
  mixins: [microCreateMinis],
  directives: {handle: HandleDirective},
  data() {
    return {
      commonCheckFieldRules: 'checkData', // 当前组件默认的规则判断函数
      mySelfCheckRules: 'mySelfCheckFun', // 我自己的验证规则函数  比如弹窗之类的
      hotScale: 392 / 500,
      typeList: [
        {
          title: '一行一个'
        },
        {
          title: '轮播海报'
        },
        {
          title: '横向滑动'
        },
        {
          title: '绘制热区'
        }
      ],
      dialogHot: false, // 是否显示热区
      dialogChooseGoods: false, // 选择商品
      isGetChooseData: false, // 开始返会商品
      cacheImage: false, // 是否是正在编辑热区的
      /** 选择图片的弹窗*/
      dialogChooseImgVisible: false, // 显示选择图片
      isGetChooseImages: false, // 返回图片
      canChooseImagesNum: 1, // 可以添加的图片数量
      isChangeImg: false, // 是否为更换图片模式
      currentEditIndex: 0, // 当前编辑的图片
      currentHotEditIndex: 0, // 当前编辑的热区
      formData: {
        indicator: 1, // 选择模板:
        imageList: []
      },
      cacheImageActiveBox: [], // 缓存当前box list
      boxItem: {// 盒子模板
        link: '',
        type: '',
        title: '',
        left: 0,
        top: 0,
        translateX: 0,
        translateY: 0,
        width: 102,
        height: 102
      },
      linkList: [
        {
          type: 1,
          title: '商品详情页',
          link: ''
        },
        {
          type: 2,
          title: '购物车',
          link: ''
        },
        {
          type: 3,
          title: '个人中心',
          link: ''
        },
        {
          type: 4,
          title: '活动页',
          link: ''
        }
      ],
      commandInfo: {} // 选择跳转的信息
    }
  },
  watch: {},
  components: {
    draggable,
    SlickList,
    SlickItem,
    chooseGoods: () => import('@/components/choose-goods/index.vue'),
    chooseImages: () => import('@/components/choose-images/index.vue')
  },
  filters: {
    typeNameFilter(val) {
      let str = ''
      switch (val) {
        case 1:
          str = '商品详情页'
          break
        case 2:
          str = '购物车'
          break
        case 3:
          str = '个人中心'
          break
        case 4:
          str = '活动页'
          break
      }
      return str
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    /** 切换模板*/
    changeIndicator(index) {
      /*  if (this.formData.imageList.length && index + 1 !== this.formData.indicator) {
          this.formData.imageList.map(res => {
            res.activeBoxs = []
            if (this.formData.indicator === 4) { // 切换为热区模式，清空link title type
              res.link = ''
              res.title = ''
              res.type = ''
            }
          })
        }*/
      this.formData.indicator = index + 1
    },
    /** 显示添加热区*/
    showHotAreaPop(index) {
      this.dialogHot = true
      this.currentEditIndex = index
      this.cacheImageActiveBox = JSON.parse(JSON.stringify(this.formData.imageList[this.currentEditIndex].activeBoxs))
    },
    /** 点击添加热区*/
    addHotArea() {
      this.cacheImageActiveBox.push(JSON.parse(JSON.stringify(this.boxItem)))
    },
    /** 保存热区*/
    saveHotBox() {
      this.formData.imageList[this.currentEditIndex].activeBoxs = this.cacheImageActiveBox
      this.dialogHot = false
    },
    /** 更换图片*/
    changeImg(index) {
      this.isChangeImg = true
      this.currentEditIndex = index
      this.dialogChooseImgVisible = true
      this.canChooseImagesNum = 1
    },
    /** choose图片的回调*/
    chooseImagesEnd($item) {
      this.dialogChooseImgVisible = false
      const $imgData = $item.data
      if ($imgData.length) {
        if (this.isChangeImg) { // 更换图片模式
          this.formData.imageList[this.currentEditIndex].url = $imgData[0].img
          this.formData.imageList[this.currentEditIndex].title = $imgData[0].productName
          return
        }
        $imgData.map(res => {
          this.formData.imageList.push({
            url: res.img,
            title: '',
            link: '',
            type: '',
            activeBoxs: []
          })
        })
      }
    },
    // 选择商品回调
    chooseGoodsFun($event) {
      if ($event.data.length) {
        this.setLinkInfo({
          title: $event.data[0].productName,
          link: $event.data[0].id
        })
      }
      this.dialogChooseGoods = false
    },
    /** 设置跳转信息*/
    setLinkInfo(obj) {
      if (this.isCacheImage) { // 热区弹窗编辑模式
        this.cacheImageActiveBox[this.currentHotEditIndex].title = obj.title
        this.cacheImageActiveBox[this.currentHotEditIndex].link = obj.link
        this.cacheImageActiveBox[this.currentHotEditIndex].type = this.commandInfo.type
        this.$forceUpdate()
        return
      }
      if (this.formData.indicator === 4) { // 热区非弹窗编辑模式
        this.formData.imageList[this.currentEditIndex].activeBoxs[this.currentHotEditIndex].title = obj.title
        this.formData.imageList[this.currentEditIndex].activeBoxs[this.currentHotEditIndex].link = obj.link
        this.formData.imageList[this.currentEditIndex].activeBoxs[this.currentHotEditIndex].type = this.commandInfo.type
      } else {
        this.formData.imageList[this.currentEditIndex].title = obj.title
        this.formData.imageList[this.currentEditIndex].link = obj.link
        this.formData.imageList[this.currentEditIndex].type = this.commandInfo.type
      }
      this.$forceUpdate()
    },
    /** 选择跳转路径*/
    command(eve) {
      this.isCacheImage = eve.isCacheImage || false
      this.commandInfo = eve.linkItem

      if (eve.hasOwnProperty('currentHotEditIndex')) {
        this.currentHotEditIndex = eve.currentHotEditIndex
      }
      if (eve.hasOwnProperty('currentEditIndex')) {
        this.currentEditIndex = eve.currentEditIndex
      }

      if (eve.linkItem.type === 1) {
        this.dialogChooseGoods = true
        return
      }
      this.setLinkInfo({
        title: this.commandInfo.title,
        link: this.commandInfo.link
      })
    },
    /* 校验*/
    checkData() {
      if (this.formData.imageList.length) {
        this.formData.imageList.map(res => {
          if (Number(this.formData.indicator) === 4) { // 切换为热区模式，清空link title type
            res.link = ''
            res.title = ''
            res.type = ''
          } else { // 非热区模式
            res.activeBoxs = []
          }
        })
        // this.formData.imageList = [];
      }
      const isPass = (this.formData.imageList.length > 0)
      this.myCheckResult(isPass)
    },
    // 弹出哪个没有填写的
    mySelfCheckFun() {
      if (this.formData.imageList.length === 0) {
        this.$message.error('请添加图片！')
      }
    }
  }
}
