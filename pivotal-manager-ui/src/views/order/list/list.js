import './list.scss'
import {orderList} from '@/api/order'

export default {
  name: 'OrderList',
  components: {
    //点击发货
    shippingPop: () => import('@/components/shipping-pop/index.vue'),
    Pagination: () => import('@/components/Pagination/index'),
  },
  data() {
    return {
      dialogShippingPop:false, //显示发货弹窗
      list: [],
      option: {
        menuDeleteOption: {
          type: 'text'
        },
        menuEditOption: {
          type: 'text'
        },
        isPagination: true,
        paginationTotal: 4,
        paginationCurrent: 1,
        paginationSize: 20,
        menuWidth: 150,
        column: [
          {
            label: '商品 价格',
            prop: 'title',
            slotName: 'title'
          },
          {
            label: '访问量',
            prop: 'visitCountUv',
            slotName: 'visitCountUv',
            width: 180,
            sortable: true
          },
          {
            label: '库存',
            prop: 'totalStock',
            width: 180,
            sortable: true
          },
          {
            label: '总销量',
            prop: 'totalSoldNum',
            width: 180,
            sortable: true
          },
          {
            label: '创建时间',
            prop: 'createdTime',
            width: 180,
            sortable: true
          }
        ]
      },
      /** 搜索*/
      formObj: {
        tabs: 'a',
        dataType: 1,
        limit: 20,
        page: 1
      },
      total: 0,
      formOption: {
        itemSize: 'small',
        labelWidth: '150px',
        column: [
          {
            children: [
              {
                itemLabel: '订单搜索: ',
                type: 'select',
                model: 'dataType',
                clearable: true,
                filterable: true,
                data: [
                  {
                    value: 1,
                    label: '订单号'
                  },
                  {
                    value: 2,
                    label: '外部单号'
                  },
                  {
                    value: 3,
                    label: '收货人姓名'
                  },
                  {
                    value: 4,
                    label: '收货人手机号'
                  },
                  {
                    value: 5,
                    label: '收货人手机号后四位'
                  }
                ]
              },
              {
                type: 'input',
                model: 'keyWord'
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '下单时间: ',
                type: 'datePicker',
                model: 'startTime&endTime',
                eleType: 'datetimerange',
                rangeSeparator: '至',
                startPlaceholder: '开始日期',
                endPlaceholder: '结束日期',
                clearable: true,
                format: 'yyyy-MM-dd HH:mm:ss',
                valueFormat: 'yyyy-MM-dd HH:mm:ss',
              },
            ]
          },
          {
            span: 6,
            children: [
              {
                itemLabel: '商品名称: ',
                type: 'input',
                model: 'goodsName',
                clearable: true,
              }
            ]
          },
          {
            span: 6,
            children: [
              {
                itemLabel: '订单类型: ',
                type: 'select',
                model: 'orderType',
                clearable: true,
                filterable: true,
                data: [
                  {
                    value: 1,
                    label: '全部'
                  },
                  {
                    value: 2,
                    label: '类型1'
                  },
                  {
                    value: 3,
                    label: '类型2'
                  },
                  {
                    value: 4,
                    label: '类型3'
                  },
                  {
                    value: 5,
                    label: '类型4'
                  }
                ]
              }
            ]
          },
          {
            span: 12,
            children: [
              {
                itemLabel: '维权状态: ',
                type: 'select',
                model: 'orderStatus',
                clearable: true,
                filterable: true,
                data: [
                  {
                    value: 1,
                    label: '全部'
                  },
                  {
                    value: 2,
                    label: '维权1'
                  },
                  {
                    value: 3,
                    label: '维权2'
                  },
                  {
                    value: 4,
                    label: '维权3'
                  },
                  {
                    value: 5,
                    label: '维权4'
                  }
                ]
              }
            ]
          },
          {
            span: 6,
            children: [
              {
                itemLabel: '订单状态: ',
                type: 'select',
                model: 'state',
                clearable: true,
                filterable: true,
                data: [
                  {
                    value: 1,
                    label: '全部'
                  },
                  {
                    value: 2,
                    label: '订单1'
                  },
                  {
                    value: 3,
                    label: '订单2'
                  },
                  {
                    value: 4,
                    label: '订单3'
                  },
                  {
                    value: 5,
                    label: '订单4'
                  }
                ]
              }
            ]
          },
          {
            span: 6,
            children: [
              {
                itemLabel: '配送方式: ',
                type: 'select',
                model: 'express',
                clearable: true,
                filterable: true,
                data: [
                  {
                    value: 1,
                    label: '全部'
                  },
                  {
                    value: 2,
                    label: '快递发货'
                  },
                  {
                    value: 3,
                    label: '上门自提'
                  },
                  {
                    value: 4,
                    label: '同城配送'
                  }
                ]
              }
            ]
          },
          {
            span: 12,
            children: [
              {
                itemLabel: '付款方式: ',
                type: 'select',
                model: 'payType',
                clearable: true,
                filterable: true,
                data: [
                  {
                    value: 1,
                    label: '全部'
                  },
                  {
                    value: 2,
                    label: '微信'
                  },
                  {
                    value: 3,
                    label: '支付宝'
                  }
                ]
              }
            ]
          },
          {
            span: 6,
            children: [
              {
                itemLabel: '订单来源: ',
                type: 'select',
                model: 'orderSource',
                clearable: true,
                filterable: true,
                data: [
                  {
                    value: 1,
                    label: '全部'
                  },
                  {
                    value: 2,
                    label: '微信小程序'
                  },
                  {
                    value: 3,
                    label: '支付宝小程序'
                  }
                ]
              }
            ]
          },
          {
            span: 6,
            children: [
              {
                itemLabel: '是否加星: ',
                type: 'select',
                model: 'orderStar',
                clearable: true,
                filterable: true,
                data: [
                  {
                    value: 1,
                    label: '全部'
                  },
                  {
                    value: 2,
                    label: '加星'
                  },
                  {
                    value: 3,
                    label: '不加'
                  }
                ]
              }
            ]
          },
          {
            slotName: 'btnList'
          }
        ]
      },
      tabs: [
        {
          label: '全部',
          name: 'a'
        },
        {
          label: '待付款',
          name: 'b'
        },
        {
          label: '待发货',
          name: 'c'
        },
        {
          label: '已发货',
          name: 'd'
        },
        {
          label: '已完成',
          name: 'e'
        },
        {
          label: '已关闭',
          name: 'f'
        },
        {
          label: '退款中',
          name: 'g'
        },
      ],
    }
  },
  computed: {},
  mounted() {
    this.getList()
  },
  filters: {
    refundStatusFilter(val) {
      let str = '';
      switch (val) {
        case 0:
          str = '买家发起维权';
          break;
        case 1:
          str = '商家拒绝维权';
          break;
        case 2:
          str = '商家接受维权';
          break;
        case 3:
          str = '买家发货';
          break;
        case 4:
          str = '商家没有收到货';
          break;
        case 5:
          str = '商家换货中';
          break;
        case 6:
          str = '商家接受维权';
          break;
        case 7:
          str = '维权结束';
          break;
        case 8:
          str = '维权关闭';
          break;
      }
      return str;
    },
    orderStatus(val) {
      let str = '';
      switch (val) {
        case 0:
          str = '等待买家付款';
          break;
        case 1:
          str = '等待商家发货';
          break;
        case 2:
          str = '商家已发货';
          break;
        case 3:
          str = '已完成';
          break;
        case 4:
          str = '已关闭';
          break;
        case 5:
          str = '退款中';
          break;
      }
      return str;
    }
  },
  methods: {
    /** 获取列表*/
    getList() {
      const par = this.formObj;
      orderList(par).then(res => {
        console.log('res==', res);
        if (res.code === 20000) {
          this.list = res.data.items;
          this.total = res.data.total
        }
      })
    },
    /** 页码改变*/
    handleChange(ev) {
      console.log('ev===', ev);
      this.formObj.limit = ev.limit;
      this.formObj.page = ev.page;
      this.getList();
    },
  }
}
