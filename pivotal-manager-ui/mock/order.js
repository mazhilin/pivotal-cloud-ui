import Mock from 'mockjs'

const List = [];

const Year = new Date().getFullYear();
const Month = new Date().getMonth() + 1;
for (let i = 0; i < 30; i++) {

  let buyNum = Mock.mock({
    goodsNum: '@integer(1, 4)',
  });
  let goods = [];
  let payAmount = 0;
  for (let k = 0; k < buyNum.goodsNum; k++) {
    let one = Mock.mock({
      goodsPrice: '@integer(1, 1000)',
      goodsQuantity: '@integer(1, 2)',
    });
    payAmount += one.goodsQuantity * one.goodsPrice;
    goods.push(Mock.mock({
      goodsSpec: '@title(2, 4)',
      goodsName: '@title(2, 4)',
      img: "http://wangzheshike.xxgushi.com/admin/meizhuang/1.jpg",
      goodsQuantity: one.goodsQuantity,
      goodsPrice: one.goodsPrice,
      status: '@integer(1, 8)'
    }));
  }
  List.push(Mock.mock(
    {
      id: '@increment', // 订单号
      createTime: `${Year}-${Month}-@integer(1, 30)`, //下单时间
      consignee: '@title(1, 2)',// 收货人名称
      userName: '@title(1, 2)',//用户名称
      mobile: /^1[385][1-9]\d{8}/, // 手机号码
      tradeCount: '@integer(0, 1000)', // 累计消费金额
      showStatus: '@integer(1, 5)',
      buyerRemark: i === 1 ? '请尽量发货快点，谢谢！' : '',
      sellerRemark: i === 2 ? '拍下满减' : '',
      payAmount: payAmount,
      goods: goods
    }
  ))
}


export default [
  {
    url: '/order/list',
    type: 'get',
    response: config => {
      const {importance, categoryId, page = 1, limit = 20, sort} = config.query;

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false;
        if (categoryId && item.categoryId !== +categoryId) return false;
        return true
      });
      if (sort === '-id') {
        mockList = mockList.reverse()
      }
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  }
]
