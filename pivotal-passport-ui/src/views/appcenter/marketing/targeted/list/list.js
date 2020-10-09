import './list.scss';

// mock 数据
import {couponList} from '@/api/marketing';

export default {
  name: 'targetedList',
  components: {},
  data() {
    return {
      cards: [
        {
          title: '新客进店有礼',
          desc: `新客进店，赠送专享礼包，拉新从此有的放矢。`,
          router: 'targetedCreate', // 路由
          type: 'newGift' // 类型
        },
        {
          title: '老客进店有礼',
          desc: `老客进店，赠送专享礼包，提升复购率。`,
          router: 'targetedCreate',
          type: 'oldGift'
        },
        {
          title: '裂变优惠券',
          desc: `买家下单得裂变优惠券，分享好友，大家都来买买买。`,
          router: 'splitCreate',
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
    /** 前往编辑页*/
    toPage(item) {
      if (!item.router) {
        this.$message.success('敬请期待');
        return;
      }
      let query = {};
      if (item.type) {
        query['type'] = item.type;
      }
      if (item.id) {
        query['id'] = item.id;
      }
      if (item.copy) {
        query['copy'] = 1;
      }
      this.$router.push({
        name: item.router,
        query: query
      })
    },
    /** 获取列表*/
    getList() {
      const par = this.listQuery
      par.page = this.option.paginationCurrent
      par.limit = this.option.paginationSize
      couponList(par).then(res => {
        if (res.code === 20000) {
          this.list = res.data.items;
          this.option.paginationTotal = res.data.total
        }
      })
    },
    /** 分页回调*/
    paginationChance(ev) {
      let current = ev.data.current
      if (ev.data.size !== this.option.paginationSize) {
        current = 1
      }
      this.option.paginationSize = ev.data.size
      this.option.paginationCurrent = current
      this.getList()
    },
    /** 点击复制*/
    handleCopy(ev) {
      console.log('点击复制', ev);
      this.toPage({
        id: ev.id,
        router: 'couponCreate',
        copy: 1,
      })
    },
    /** 点击编辑*/
    handleEdit(ev) {
      console.log('点击编辑', ev);
      this.toPage({
        id: ev.row.id,
        router: 'couponCreate',
      })
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
