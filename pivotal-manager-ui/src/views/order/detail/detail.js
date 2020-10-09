import './detail.scss'

export default {
  name: 'OrderDetail',
  components: {
    //点击发货
    shippingPop: () => import('@/components/shipping-pop/index.vue')
  },
  data() {
    return {
      dialogShippingPop: false,//显示订单发货弹窗
      orderId: null,
      active: 2,
      packageList: [
        {
          isPackage: true,
          transfer_name: '顺丰速运',
          package_code: 'SF332323156643',
          list: [
            {
              title: "商品1",
              price: 2,
              package_id: 3232323,
              number: 1,
              origin_price: 4,
              discounts: 0.5,
              endPrice: 2,
              btn: 1,
              sku_spec: '红色',
              sku_code: '34673123578211',
              status: 1,
              imageUrl: "http://wangzheshike.xxgushi.com/admin/meizhuang/1.jpg"
            }
          ],
        },
        {
          list: [
            {
              title: "商品3",
              price: 32,
              number: 1,
              origin_price: 33,
              discounts: 25,
              endPrice: 32,
              btn: 1,
              sku_spec: '黑色',
              sku_code: '34673123578211',
              status: 1,
              imageUrl: "http://wangzheshike.xxgushi.com/admin/meizhuang/1.jpg"
            }
          ],
        }
      ],
      goodsItem: ['商品', '单价(元)', '数量', '小计(元)', '发货状态'],
    }
  },
  computed: {},
  methods: {
    /** 获取订单详情*/
    getDetail() {
    },
    onCopy(item) {
      if (item.text) {
        this.$message({
          message: '复制成功',
          type: 'success'
        });
      }
    },
  }
}
