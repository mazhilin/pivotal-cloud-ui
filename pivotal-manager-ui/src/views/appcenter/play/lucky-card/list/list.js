import './list.scss';

// mock 数据
import {luckyCardList} from '@/api/marketing';

export default {
  name: 'couponList',
  components: {},
  data() {
    return {
      /** 搜索*/
      formObj: {
        keyword: '',
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
            label: '活动名称',
            prop: 'title',
            slotName:'title',
          },
          {
            label: '活动时间',
            prop: 'createdTime',
          },
          {
            label: '状态',
            prop: 'status',
          },
          {
            label: '抽奖次数',
            prop: 'number',
          },
          {
            label: '活动奖品',
            prop: 'gift',
          },
          {
            label: '抽奖人数',
            prop: 'users',
          },
          {
            label: '中奖人数',
            prop: 'luckyNumber',
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
      const par = this.listQuery;
      par.page = this.option.paginationCurrent;
      par.limit = this.option.paginationSize;
      luckyCardList(par).then(res => {
        console.log('res===', res)
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
    /** 点击编辑*/
    handleEdit(ev) {
      console.log('点击编辑', ev);
      this.commonPushPage('luckyCardCreate', {
        id: ev.row.id,
      })
    },
    /** 点击删除*/
    handleDelete(ev) {
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
