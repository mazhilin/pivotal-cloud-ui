import './home.scss'
import CountTo from 'vue-count-to'

export default {
  name: 'dashboardHome',
  components: {
    CountTo
  },
  data() {
    return {
      amount: [
        {
          list: [
            {
              title: '支付订单数',
              toDay: 1586,
              state: 2, // 1 涨 2 降
              yesterday: 1851,
            },
            {
              title: '支付金额(元)',
              toDay: 11678.24,
              state: 2, // 1 涨 2 降
              yesterday: 45678.52,
            },
            {
              title: '浏览量',
              toDay: 834423,
              state: 2, // 1 涨 2 降
              yesterday: 1453101,
            },
            {
              title: '访客数',
              toDay: 54126,
              state: 2, // 1 涨 2 降
              yesterday: 332521,
            },
          ]
        },
        {
          list: [
            {
              title: '客单价(元)',
              toDay: 75.54,
              state: 1, // 1 涨 2 降
              yesterday: 60.44,
            },
            {
              title: '访问-支付转化率(%)',
              toDay: 1.54,
              state: 2, // 1 涨 2 降
              yesterday: 1.85,
            },
            {
              title: '成交客户数',
              toDay: 640,
              state: 2, // 1 涨 2 降
              yesterday: 985,
            },
            {
              title: '新增会员数',
              toDay: 547,
              state: 1, // 1 涨 2 降
              yesterday: 324,
            },
          ]
        }
      ],
      tabsActive: 'a',
      tabs: [
        {
          label: '全部事项',
          name: 'a'
        },
        {
          label: '店铺基础',
          name: 'b'
        },
        {
          label: '商品体验',
          name: 'c'
        },
        {
          label: '物流体验',
          name: 'e'
        },
        {
          label: '售后体验',
          name: 'f'
        },
        {
          label: '服务体验',
          name: 'g'
        },
        {
          label: '流量表现',
          name: 'h'
        }
      ],
      majorData: [
        {
          title: '待发货订单',
          count: 97632,
        },
        {
          title: '待回复客户数',
          count: 436,
        },
        {
          title: '近期滞销商品',
          count: 2,
        },
        {
          title: '待退款订单',
          count: 0,
        },
        {
          title: '排队中客户数',
          count: 32,
        },
        {
          title: '库存过少商品',
          count: 0,
        },
      ],
      commonNew: [
        {
          color: '#4d90fe',
          title: '发布商品',
          page: 'goodsCreate',
        },
        {
          color: '#ffc700',
          title: '商品管理',
          page: 'goodsList',
        },
        {
          color: '#80c342',
          title: '订单查询',
          page: 'orderList',
        },
        {
          color: '#e94242',
          title: '发布微页面',
          page: 'featureCreate',
        },
        {
          color: '#8fbdd0',
          title: '数据概览',
        },
        {
          color: '#849bd0',
          title: '优惠券',
        },
        {
          color: '#a984d0',
          title: '素材中心',
          page: 'attachment',
        },
        {
          color: '#65b565',
          title: '多人拼团',
        },
      ]
    }
  },
  computed: {},
  mounted() {
    const h = this.$createElement;
    this.$notify({
      title: '温馨提示',
      message: h('div', {style: 'color: #ba3363'}, `本系统，只包含只有纯前端的后台模板+微页面部分的微信小程序案例,如果没有您想要的功能，可联系QQ:2052021114加急开发`),
      duration: 0
    });
  },
  methods: {
    goto(page) {
      if (page) {
        this.$router.push({name: page})
      } else {
        this.$message.success('敬请期待');
      }
    },
  }
}
