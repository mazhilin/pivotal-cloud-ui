import './index.scss'

export default {
  name: 'choose-goods',
  props: {
    isGetChooseData: {// 是否开始返回数据
      type: Boolean,
      default: false
    }
  },
  watch: {
    isGetChooseData() {
      if (!this.currentChooseGoods.length) {
        this.$message.error('请选择商品')
        return
      }
      this.$emit('chooseGoodsFun', {
        data: this.currentChooseGoods
      })
    }
  },
  data() {
    return {
      list: [
        {
          id: 10,
          productName: '液体颊彩1',
          subTitle: '这里是商品描述',
          price: '1.00',
          mainImage: '/img/common/img_8.jpg',
          comeNum: 0,
          viewNum: 0,
          skuNum: 100,
          salesVolume: 10,
          gtmTime: '2019-08-02 15:30:30'
        },
        {
          id: 11,
          productName: '液体颊彩2',
          subTitle: '这里是商品描述',
          price: '4.00',
          mainImage: '/img/common/img_9.jpg',
          comeNum: 32,
          viewNum: 13,
          skuNum: 120,
          salesVolume: 10,
          gtmTime: '2019-08-02 15:36:30'
        }
      ],
      option: {
        isPagination: true,
        isMenu: false,
        paginationTotal: 10,
        paginationCurrent: 1,
        paginationSize: 10,
        isSelection: true,
        column: [
          {
            label: '商品 价格',
            prop: 'goodsName',
            slotName: 'goodsName'
          },
          {
            label: '访问量',
            prop: 'comeNum',
            slotName: 'comeNum'
          },
          {
            label: '库存',
            prop: 'skuNum',
            sortable: true
          },
          {
            label: '总销量',
            prop: 'salesVolume',
            sortable: true
          },
          {
            label: '创建时间',
            prop: 'gtmTime',
            sortable: true
          }
        ]
      },
      currentChooseGoods: []// 当前选择的
    }
  },
  mounted() {
    for (let i = 0; i < 8; i++) {
      this.list.push({
        id: 12 + 1,
        productName: '液体颊彩' + (12 + 1),
        subTitle: '这里是商品描述',
        price: '4.00',
        mainImage: 'http://cdn.ifnav.com/evue/meizhuang/' + (i + 1) + '.jpg',
        comeNum: 32,
        viewNum: 13,
        skuNum: 120,
        salesVolume: 10,
        gtmTime: '2019-08-02 15:36:30'
      })
    }
  },
  methods: {
    selectionChange(ev) {
      this.currentChooseGoods = ev
    }
  }
}
