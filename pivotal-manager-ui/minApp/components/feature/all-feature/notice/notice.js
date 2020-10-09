Component({
  properties: {
    dataField: {
      type: Object,
      value: {},
    },
    will: {//需要获取的类型 默认首页
      type: String,
      value: 'home',//home 首页 ，feature 微页面  传 化名ID , goods 商品详情页，传商品ID ,ad 公共广告
    },
  },
  data: {},
  methods: {},
  ready() {
  }
});