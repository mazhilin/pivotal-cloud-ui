const app = getApp();
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
  data: {
    goods: [],
    nGoods: [],
    state: { //显示状态
      productName: false, //1
      sellingPoint: false,//2
      price: false,//3
      buyBtn: false,//4
    },
  },
  methods: {
    /**梳理数据*/
    carding() {
      let dataField = this.data.dataField;
      //全部几列
      let columnNum = dataField.size || 2;
      let cur = 1;
      let cell_1 = [];
      let cell_2 = [];
      let cell_3 = [];
      this.data.goods.map((li, index) => {
        if (cur === 1) {
          cell_1.push(li);
        } else if (cur === 2) {
          cell_2.push(li);
        } else if (cur === 3) {
          cell_3.push(li);
        }
        cur++;
        if (cur > columnNum) {
          cur = 1;
        }
        if (index === this.data.goods.length - 1) {
          this.data.nGoods.push(cell_1, cell_2);
          if (cell_3.length) {
            this.data.nGoods.push(cell_3);
          }
          this.setData({
            nGoods: this.data.nGoods,
          });
        }
      });
      // console.log('---', this.data);
    },
    /**添加点击商品事件、可做跳转*/
    goodsFun(ev) {
      let item = ev.currentTarget.dataset.item;
      console.log('item=', item);
    }
  },
  ready() {
    let data = this.data.dataField;
    this.setData({
      state: { //显示状态
        productName: (data.show_content.find(x => x * 1 === 1)), //1
        sellingPoint: (data.show_content.find(x => x * 1 === 2)),//2
        price: (data.show_content.find(x => x * 1 === 3)),//3
        buyBtn: (data.show_content.find(x => x * 1 === 4)),//4
      },
    });
    if (data.goods.length) {
      this.setData({
        goods: [
          {
            "id": 10,
            "productName": "液体颊彩1",
            "subTitle": "这里是商品描述",
            "price": "1.00",
            "mainImage": "http://cdn.ifnav.com/evue/meizhuang/7.jpg",
            "comeNum": 0,
            "viewNum": 0,
            "skuNum": 100,
            "salesVolume": 10,
            "gtmTime": "2019-08-02 15:30:30"
          }, {
            "id": 11,
            "productName": "液体颊彩2",
            "subTitle": "这里是商品描述",
            "price": "4.00",
            "mainImage": "http://cdn.ifnav.com/evue/meizhuang/8.jpg",
            "comeNum": 32,
            "viewNum": 13,
            "skuNum": 120,
            "salesVolume": 10,
            "gtmTime": "2019-08-02 15:36:30"
          }, {
            "id": 13,
            "productName": "液体颊彩13",
            "subTitle": "这里是商品描述",
            "price": "4.00",
            "mainImage": "http://cdn.ifnav.com/evue/meizhuang/1.jpg",
            "comeNum": 32,
            "viewNum": 13,
            "skuNum": 120,
            "salesVolume": 10,
            "gtmTime": "2019-08-02 15:36:30"
          }, {
            "id": 13,
            "productName": "液体颊彩13",
            "subTitle": "这里是商品描述",
            "price": "4.00",
            "mainImage": "http://cdn.ifnav.com/evue/meizhuang/2.jpg",
            "comeNum": 32,
            "viewNum": 13,
            "skuNum": 120,
            "salesVolume": 10,
            "gtmTime": "2019-08-02 15:36:30"
          }],
      });
      this.carding();
    }
  }
});
