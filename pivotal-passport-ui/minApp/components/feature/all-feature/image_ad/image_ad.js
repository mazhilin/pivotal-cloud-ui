const app = getApp();
Component({
  properties: {
    indicatorDots: {
      type: Boolean,
      value: true,
    },
    autoPlay: {
      type: Boolean,
      value: true,
    },
    circular: {
      type: Boolean,
      value: true,
    },
    interval: {
      type: Number,
      value: 3000,
    },
    duration: {
      type: Number,
      value: 500,
    },
    dataField: {
      type: Object,
      value: {
        indicator: 0,
        imageList: [],
      },
    },
    will: {//需要获取的类型 默认首页
      type: String,
      value: 'home',//home 首页 ，feature 微页面  传 化名ID , goods 商品详情页，传商品ID ,ad 公共广告
    },
  },
  data: {
    dpr: 375 / 491,
    swiperCurrent: 0,
  },
  methods: {
    /**
     * 点击事件
     */
    adFun(ev) {
      console.log('点击事件', ev)
    },
    /**轮播Index*/
    swiperEnd(ev) {
      this.setData({
        swiperCurrent: ev.detail.current || 0,
      });
    },
  },
  ready() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          dpr: res.screenWidth / 491,
        });
      }
    });
  }
});
