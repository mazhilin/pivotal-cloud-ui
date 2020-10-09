import './refunds.scss'

export default {
  name: 'OrderRefunds',
  components: {
    Pagination: () => import('@/components/Pagination')
  },
  data() {
    return {
      total: 10,
      listQuery: {
        page: 1,
        size: 20,
      },
      /** 搜索*/
      formObj: {
        tabs: 'a',
        dataType: 1,
        limit: 20,
        page: 1
      },
      formOption: {
        itemSize: 'small',
        labelWidth: '150px',
        column: [
          {
            span: 5,
            children: [
              {
                itemLabel: '订单编号: ',
                type: 'input',
                model: 'goodsCode',
                clearable: true,
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
            span: 5,
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
            span: 5,
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
            span: 14,
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
            span: 5,
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
            span: 5,
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
            span: 14,
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
            span: 5,
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
            span: 5,
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
          label: '待商家处理',
          name: 'b'
        },
        {
          label: '待买家处理',
          name: 'c'
        }
      ],
    }
  },
  computed: {},
  methods: {
    /** 跳转编辑页面*/
    goCreatePage() {
      this.$router.push({
        name: 'goodsCreate'
      })
    }
  }
}
