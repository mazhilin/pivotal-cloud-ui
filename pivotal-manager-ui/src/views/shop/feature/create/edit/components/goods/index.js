import './index.scss'
/**
 * 创建新组件之后，在all-can-use-components中添加
 * 必须应用 microCreateMinis
 * 数据必须以formData包含
 * */
import {microCreateMinis} from '../../minis'

/** 商品组件*/
export default {
  name: 'micro-goods-box',
  mixins: [microCreateMinis],
  props: {},
  data() {
    return {
      commonCheckFieldRules: 'checkData', // 当前组件默认的规则判断函数
      mySelfCheckRules: 'mySelfCheckFun', // 我自己的验证规则函数  比如弹窗之类的
      dialogChooseGoods: false,
      isGetChooseData: false, // 是否该是获取选择的数据
      formData: {
        size: 2, // 一行多少个
        show_content: [1, 3, 4],
        goods: [],
        buy_btn_type: 1, // 购买按钮的样式
        button_text: '马上抢'// 购买按钮的文本
      },
      // eVue form 配置
      formOption: {
        column: [
          {
            children: [
              {
                type: 'radio',
                model: 'size',
                itemLabel: '列表样式：',
                inline: true,
                data: [
                  {
                    value: 2,
                    label: '一行两个'
                  },
                  {
                    value: 3,
                    label: '一行三个'
                  }
                ]
              }
            ]
          },
          {
            children: [
              {
                type: 'checkbox',
                model: 'show_content',
                itemLabel: '显示内容：',
                isGroup: true,
                slotNameFormData: [
                  {
                    slotName: 'btn'
                  }
                ],
                data: [
                  {
                    value: 1,
                    label: '商品名称'
                  },
                  {
                    value: 2,
                    label: '商品描述'
                  },
                  {
                    value: 3,
                    label: '商品价格'
                  },
                  {
                    value: 4,
                    label: '购买按钮',
                    slotName: 'btn'
                  }
                ]
              }
            ]
          }
        ]
      },
      // 获取的接口数据
      goodLists: [],
      // 默认数据
      demoGoods: [
        {
          myGoodsType: 1,
          subTitle: '这里是商品描述',
          mainImage: '/img/micro-page/def.png',
          productName: '这里是商品名称',
          price: '90'
        },
        {
          subTitle: '这里是商品描述',
          mainImage: '/img/micro-page/def.png',
          productName: '这里是商品名称',
          price: '90'
        },
        {
          subTitle: '这里是商品描述',
          mainImage: '/img/micro-page/def.png',
          productName: '这里是商品名称',
          price: '90'
        },
        {
          subTitle: '这里是商品描述',
          mainImage: '/img/micro-page/def.png',
          productName: '这里是商品名称',
          price: '90'
        }
      ]
    }
  },
  watch: {
    goodLists: {
      deep: true,
      handler(val) {
        if (val.length) {
          if (!this.goodLists.find(x => x.myGoodsType === 1)) {
            this.formData.goods = []
            val.map(res => {
              this.formData.goods.push(res.id)
            })
          }
        } else {
          this.goodLists = this.demoGoods
        }
      }
    }
  },
  filters: {
    buy_btn_type(val) { // 标题
      let str = ''
      switch (val) {
        case 6:
          str = 'danger'
          break
        case 8:
          str = 'danger'
          break
      }
      return str
    }
  },
  components: {
    chooseGoods: () => import('@/components/choose-goods/index.vue')
  },
  computed: {
    theme() {
      return this.$store.getters.theme
    }
  },
  mounted() {
    this.goodLists = this.demoGoods
    if (this.dataField && this.dataField.goods) {
      if (this.dataField.goods.length) {
        this.getGoodsInfo()
      }
    }
  },
  methods: {
    // 选择商品回调
    chooseGoodsFun($event) {
      if ($event.data.length) {
        if (this.goodLists.find(x => x.myGoodsType === 1)) {
          this.goodLists = []
        }
        this.goodLists = this.goodLists.concat($event.data)
      }
      this.dialogChooseGoods = false
    },
    /** 批量获取商品详情*/
    async getGoodsInfo() {},
    /* 校验*/
    checkData() {
      this.myCheckResult((this.formData.goods.length > 0))
    },
    // 弹出哪个没有填写的
    mySelfCheckFun() {
      if (this.formData.goods.length === 0) {
        this.$message.error('请添加商品')
      }
    }
  }
}
