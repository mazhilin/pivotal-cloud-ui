import './list.scss';

// mock 数据
import {couponList} from '@/api/marketing';

export default {
  name: 'couponList',
  components: {},
  data() {
    return {
      cards: [
        {
          title: '满减券',
          desc: `例：满100元减20元</br>便于合理控制活动成本`,
          router: 'couponCreate', // 路由
          type: 'reward' // 类型
        },
        {
          title: '折扣券',
          desc: `例：满100元打9折</br>提高店铺销量和客单价`,
          router: 'couponCreate',
          type: 'discount'
        },
        {
          title: '随机金额券',
          desc: `获得金额随机的优惠券</br>增加活动趣味性`,
          router: 'couponCreate',
          type: 'random'
        },
      ],
      /** 搜索*/
      formObj: {
        ground: 1,
        type: 1,
      },
      /** 搜索配置*/
      formOption: {
        itemSize: 'small',
        labelWidth: '150px',
        column: [
          {
            span: 8,
            children: [
              {
                itemLabel: '优惠券名称: ',
                type: 'input',
                model: 'keyWord',
                placeholder: '请输入优惠券名称',
              }
            ]
          },
          {
            span: 8,
            children: [
              {
                itemLabel: '优惠券状态: ',
                type: 'select',
                model: 'ground',
                filterable: true,
                data: [
                  {
                    value: 1,
                    label: '全部状态'
                  },
                  {
                    value: 2,
                    label: '未开始'
                  },
                  {
                    value: 3,
                    label: '进行中'
                  },
                  {
                    value: 4,
                    label: '已结束'
                  }
                ]
              }
            ]
          },
          {
            span: 24,
            children: [
              {
                itemLabel: '优惠券类型: ',
                type: 'select',
                model: 'type',
                filterable: true,
                data: [
                  {
                    value: 1,
                    label: '全部类型'
                  },
                  {
                    value: 2,
                    label: '满减卷'
                  },
                  {
                    value: 3,
                    label: '折扣券'
                  },
                  {
                    value: 4,
                    label: '随机金额券'
                  },
                  {
                    value: 5,
                    label: '社区团团券'
                  }
                ]
              }
            ]
          },
          {
            span: 24,
            slotName: 'btnList'
          }
        ]
      },
      list: [],
      option: {
        menuDeleteOption: {
          type: 'text'
        },
        menuEditOption: {
          type: 'text'
        },
        isPagination: true,
        paginationTotal: 0,
        paginationCurrent: 1,
        paginationSize: 20,
        menuWidth: 150,
        column: [
          {
            label: '优惠券名称',
            prop: 'title',
          },
          {
            label: '类型',
            prop: 'type',
          },
          {
            label: '优惠内容',
            prop: 'content',
            width: 200,
          },
          {
            label: '状态',
            prop: 'status',
            width: 100,
          },
          {
            label: '已领取/剩余',
            prop: 'inNm',
          },
          {
            label: '已使用',
            prop: 'use',
            sortable: true
          },
          {
            label: '支付金额(元)',
            prop: 'price',
            sortable: true
          },
          {
            label: '客单价',
            prop: 'onePrice',
            sortable: true
          }
        ]
      },
      listQuery: {}
    }
  },
  computed: {},
  mounted() {
    this.getList();
  },
  methods: {
    /** 获取列表*/
    getList() {
      const par = this.listQuery
      par.page = this.option.paginationCurrent;
      par.limit = this.option.paginationSize;
      couponList(par).then(res => {
        if (res.code === 20000) {
          this.list = res.data.items;
          this.option.paginationTotal = res.data.total;
        }
      })
    },
    /** 分页回调*/
    paginationChance(ev) {
      let current = ev.data.current;
      if (ev.data.size !== this.option.paginationSize) {
        current = 1
      }
      this.option.paginationSize = ev.data.size;
      this.option.paginationCurrent = current;
      this.getList()
    },
    /** 点击复制*/
    handleCopy(ev) {
      console.log('点击复制', ev);
      this.commonPushPage('couponCreate', {
        id: ev.id,
        copy: 1,
      });
    },
    /** 点击编辑*/
    handleEdit(ev) {
      console.log('点击编辑', ev);
      this.commonPushPage('couponCreate', {
        id: ev.row.id,
      });
    },
    /** 点击删除*/
    handleDelete(ev) {
      console.log('点击删除', ev)
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(ev.$index, 1);
        this.$message.success('删除成功');
      }).catch(() => {
      });
    },
  }
}
