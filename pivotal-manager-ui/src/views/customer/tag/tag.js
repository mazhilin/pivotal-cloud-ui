import './tag.scss'
import {customerTagList} from '@/api/customer'

export default {
  name: 'CustomerTag',
  components: {},
  data() {
    return {
      list: [],
      option: {
        isMenuEdit: false,
        isMenuDelete: false,
        isSelection: true,
        isPagination: true,
        paginationTotal: 0,
        paginationCurrent: 1,
        paginationSize: 20,
        menuWidth: 180,
        column: [
          {
            label: '标签名称',
            prop: 'name'
          },
          {
            label: '微信粉丝',
            prop: 'fansNum'
          },
          {
            label: '客户',
            prop: 'customerNum',
            sortable: true
          },
          {
            label: '标签类型',
            prop: 'isAutoTag',
            slotName: 'autoTag'
          },
          {
            label: '打标条件',
            prop: 'isAutoTag',
            slotName: 'ruleTag'
          }
        ]
      },
      listQuery: {},
      chooseAll: false // 当前页全选
    }
  },
  computed: {},
  mounted() {
    this.getList()
  },
  methods: {
    /** 跳转编辑页面*/
    goCreatePage() {
      this.$router.push({
        name: 'customerCreateTag'
      })
    },
    /** 获取客户列表*/
    getList() {
      const par = this.listQuery
      par.page = this.option.paginationCurrent
      par.limit = this.option.paginationSize
      customerTagList(par).then(res => {
        if (res.code === 20000) {
          this.list = res.data.items
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
    }
  }
}
