import './delivery.scss'

export default {
  name: 'OrderDelivery',
  components: {
    noTo: () => import('@/components/noTo/index.vue')
  },
  data() {
    return {
      list: [
        {
          title: '测试商品四', // 商品名称
          createdTime: '2019-09-09 18:53:07', // 创建时间
          price: 100, // 价格
          totalStock: 100, // 库存
          visitCountPv: 2, // 访客数
          visitCountUv: 11, // 浏览量
          totalSoldNum: 32, // 总销量
          imageUrl: 'https://img.yzcdn.cn/upload_files/2018/01/22/FnlHRufXMtUI_AbAEP0tux_nDL1T.png' // 商品主图
        },
        {
          title: '测试商品三', // 商品名称
          createdTime: '2019-09-08 18:53:07', // 创建时间
          price: 100, // 价格
          totalStock: 21, // 库存
          visitCountPv: 432, // 访客数
          visitCountUv: 432, // 浏览量
          totalSoldNum: 3, // 总销量
          imageUrl: 'https://img.yzcdn.cn/upload_files/2018/01/22/FnlHRufXMtUI_AbAEP0tux_nDL1T.png' // 商品主图
        },
        {
          title: '测试商品二', // 商品名称
          createdTime: '2019-09-07 18:53:07', // 创建时间
          price: 100, // 价格
          totalStock: 100, // 库存
          visitCountPv: 32, // 访客数
          visitCountUv: 21, // 浏览量
          totalSoldNum: 23, // 总销量
          imageUrl: 'https://img.yzcdn.cn/upload_files/2018/01/22/FnlHRufXMtUI_AbAEP0tux_nDL1T.png' // 商品主图
        },
        {
          title: '测试商品一', // 商品名称
          createdTime: '2019-09-06 18:53:07', // 创建时间
          price: 100, // 价格
          totalStock: 130, // 库存
          visitCountPv: 31, // 访客数
          visitCountUv: 43, // 浏览量
          totalSoldNum: 53, // 总销量
          imageUrl: 'https://img.yzcdn.cn/upload_files/2018/01/22/FnlHRufXMtUI_AbAEP0tux_nDL1T.png' // 商品主图
        }
      ],
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
        menuWidth: 200,
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
            width: 200,
            sortable: true
          },
          {
            label: '库存',
            prop: 'totalStock',
            width: 200,
            sortable: true
          },
          {
            label: '总销量',
            prop: 'totalSoldNum',
            width: 200,
            sortable: true
          },
          {
            label: '创建时间',
            prop: 'createdTime',
            width: 200,
            sortable: true
          }
        ]
      },
      /** 搜索*/
      formObj: {},
      formOption: {
        itemSize: 'small',
        labelWidth: '150px',
        column: [
          {
            span: 5,
            children: [
              {
                itemLabel: '商品名称或编码: ',
                type: 'input',
                model: 'keyWord'
              }
            ]
          },
          {
            span: 5,
            children: [
              {
                itemLabel: '商品分组: ',
                type: 'select',
                model: 'ground',
                clearable: true,
                filterable: true,
                data: [
                  {
                    value: 1,
                    label: '分组1'
                  },
                  {
                    value: 2,
                    label: '分组2'
                  },
                  {
                    value: 3,
                    label: '分组3'
                  }
                ]
              }
            ]
          },
          {
            span: 5,
            children: [
              {
                itemLabel: '商品类型: ',
                type: 'select',
                model: 'type',
                clearable: true,
                filterable: true,
                data: [
                  {
                    value: 1,
                    label: '类型1'
                  },
                  {
                    value: 2,
                    label: '类型2'
                  },
                  {
                    value: 3,
                    label: '类型3'
                  }
                ]
              }
            ]
          },
          {
            span: 7,
            children: [
              {
                itemLabel: '总销量: ',
                type: 'input',
                model: 'OrderTimesMin',
                style: 'width:80px;',
                clearable: true
              },
              {
                type: 'input',
                model: 'OrderTimesMax',
                style: 'width:80px;',
                clearable: true,
                addPre: '-',
                addPreStyle: 'margin-right:10px;margin-left:10px;'
              }
            ]
          },
          {
            span: 7,
            children: [
              {
                itemLabel: '价格: ',
                type: 'input',
                model: 'priceMin',
                style: 'width:80px;',
                clearable: true
              },
              {
                type: 'input',
                model: 'priceMax',
                style: 'width:80px;',
                clearable: true,
                addPre: '-',
                addPreStyle: 'margin-right:10px;margin-left:10px;'
              }
            ]
          },
          {
            span: 7,
            slotName: 'btnList'
          }
        ]
      }
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
