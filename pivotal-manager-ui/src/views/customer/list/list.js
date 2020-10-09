import './list.scss'
// mock 数据
import {customerList} from '@/api/customer'

export default {
  name: 'CustomerList',
  components: {},
  data() {
    const pickerOptions = {
      disabledDate(time) {
        return time.getTime() + 12 * 60 * 60 * 1000 > Date.now()
      }
    }
    return {
      lookBigImgCover: false, // 查看大图
      imagesUrl: '', // 需要查看大图的地址
      currentCustomerType: 0,
      visibleList: {
        tag: {} // 改标签
      },
      customerType: [ // 客户类型
        {
          name: '新增客户',
          type: 1,
          number: 0 // 客户数量
        },
        {
          name: '新增客户',
          type: 2,
          tooltip: '最近30天新增并且没有任何交易记录的客户', // 提示
          number: 0
        },
        {
          name: '兴趣人群',
          type: 3,
          tooltip: '近7天有加购行为，但没有成功付款的客户', // 提示
          number: 0
        },
        {
          name: '微信互动粉丝',
          type: 3,
          tooltip: '48小时内有在公众号内发生过互动行为的粉丝', // 提示
          number: 0
        }
      ],
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
            label: '客户',
            prop: 'name',
            slotName: 'name'
          },
          {
            label: '权益卡',
            prop: 'card',
            width: 180
          },
          {
            label: '积分',
            prop: 'points',
            width: 180,
            sortable: true
          },
          {
            label: '储值余额',
            prop: 'storedBalance',
            width: 180,
            sortable: true
          },
          {
            label: '购买次数',
            prop: 'buyCount',
            width: 180,
            sortable: true
          },
          {
            label: '累计消费金额',
            prop: 'tradeCount',
            width: 180,
            sortable: true
          },
          {
            label: '上次消费时间',
            prop: 'lastTradeTime',
            width: 180
          }
        ]
      },
      /** 搜索*/
      formObj: {},
      formOption: {
        itemSize: 'small',
        submitBtn: true,
        emptyBtn: true,
        emptyType: 'text',
        submitTxt: '确定',
        emptyTxt: '清空筛选条件',
        column: [

          {
            children: [
              {
                itemLabel: '购买次数: ',
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
            children: [
              {
                itemLabel: '客单价: ',
                type: 'input',
                model: 'unitPriceMin',
                style: 'width:120px;',
                clearable: true,
                prepend: '¥'
              },
              {
                type: 'input',
                model: 'unitPriceMax',
                style: 'width:120px;',
                clearable: true,
                prepend: '¥',
                addPre: '-',
                addPreStyle: 'margin-right:10px;margin-left:10px;'
              }
            ]
          },
          {
            span: 5,
            children: [
              {
                itemLabel: '关键词: ',
                type: 'input',
                model: 'keyWord',
                clearable: true,
                placeholder: '手机号/微信昵称/姓名'
              }
            ]
          },
          {
            span: 5,
            children: [
              {
                itemLabel: '客户身份: ',
                type: 'select',
                model: 'customerType',
                placeholder: '全部',
                clearable: true,

                data: [
                  {
                    value: 1,
                    label: '普通会员'
                  },
                  {
                    value: 2,
                    label: 'VIP'
                  }
                ]
              }
            ]
          },
          {
            span: 12,
            children: [
              {
                itemLabel: '标签: ',
                type: 'select',
                model: 'tagId',
                placeholder: '全部',
                clearable: true,
                data: [
                  {
                    value: 1,
                    label: '标签A'
                  },
                  {
                    value: 2,
                    label: '标签B'
                  }
                ]
              }
            ]
          },
          {
            span: 5,
            children: [
              {
                itemLabel: '性别: ',
                type: 'select',
                model: 'gender',
                placeholder: '全部',
                clearable: true,
                data: [
                  {
                    value: 1,
                    label: '男'
                  },
                  {
                    value: 2,
                    label: '女'
                  }
                ]
              }
            ]
          },
          {
            span: 19,
            children: [
              {
                itemLabel: '积分: ',
                type: 'input',
                model: 'pointMin',
                style: 'width:80px;',
                clearable: true,
                addEnd: '分',
                addEndStyle: 'margin-left:10px;'
              },
              {
                type: 'input',
                model: 'pointMax',
                style: 'width:80px;',
                clearable: true,
                addPre: '-',
                addEnd: '分',
                addEndStyle: 'margin-left:10px;',
                addPreStyle: 'margin-right:10px;'
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '上次消费时间: ',
                type: 'datePicker',
                model: 'gmtLastOrderMin&gmtLastOrderMax',
                eleType: 'datetimerange',
                rangeSeparator: '至',
                startPlaceholder: '开始日期',
                endPlaceholder: '结束日期',
                clearable: true,
                pickerOptions: pickerOptions,
                format: 'yyyy-MM-dd HH:mm:ss',
                valueFormat: 'yyyy-MM-dd HH:mm:ss'
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '成为客户时间: ',
                type: 'datePicker',
                model: 'gmtVipMin&gmtVipMax',
                eleType: 'datetimerange',
                rangeSeparator: '至',
                startPlaceholder: '开始日期',
                endPlaceholder: '结束日期',
                clearable: true,
                pickerOptions: pickerOptions,
                format: 'yyyy-MM-dd HH:mm:ss',
                valueFormat: 'yyyy-MM-dd HH:mm:ss'
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '成为会员时间: ',
                type: 'datePicker',
                model: 'gmtCreateMin&gmtCreateMax',
                eleType: 'datetimerange',
                rangeSeparator: '至',
                startPlaceholder: '开始日期',
                endPlaceholder: '结束日期',
                clearable: true,
                pickerOptions: pickerOptions,
                format: 'yyyy-MM-dd HH:mm:ss',
                valueFormat: 'yyyy-MM-dd HH:mm:ss'
              }
            ]
          },
          {
            span: 5,
            children: [
              {
                itemLabel: '来源渠道: ',
                type: 'select',
                model: 'qu',
                placeholder: '全部',
                clearable: true,
                data: [
                  {
                    value: 1,
                    label: '渠道A'
                  },
                  {
                    value: 2,
                    label: '渠道B'
                  }
                ]
              }
            ]
          },
          {
            span: 5,
            children: [
              {
                itemLabel: '来源方式: ',
                type: 'select',
                model: 'quType',
                placeholder: '全部',
                clearable: true,
                data: [
                  {
                    value: 1,
                    label: '方式A'
                  },
                  {
                    value: 2,
                    label: '方式B'
                  }
                ]
              }
            ]
          },
          {
            span: 5,
            children: [
              {
                itemLabel: '地域: ',
                type: 'select',
                model: 'address',
                placeholder: '全部',
                clearable: true,
                data: [
                  {
                    value: 1,
                    label: '地域A'
                  },
                  {
                    value: 2,
                    label: '地域B'
                  }
                ]
              }
            ]
          }
        ]
      },
      listQuery: {},
      /** 新增客户*/
      addNewCustomer: false, // 新增客户弹窗
      addObj: {
        isVip: 1, // 会员身份
        mobile: '' // 手机号
      },
      addOption: {
        itemSize: 'small',
        submitBtn: true,
        emptyBtn: true,
        submitTxt: '确定',
        emptyTxt: '取消',
        submitType: 'primary',
        column: [
          { // 客户身份
            children: [
              {
                type: 'radio',
                model: 'isVip',
                inline: true,
                itemLabel: '客户身份: ',
                must: true,
                data: [
                  {
                    value: 1,
                    label: '非会员'
                  },
                  {
                    value: 2,
                    label: '会员'
                  }
                ]
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '手机号码: ',
                type: 'input',
                model: 'mobile',
                itemProp: 'mobile',
                itemRules: [
                  {required: true, message: '请输入手机号码', trigger: 'blur'}
                ],
                clearable: true
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '姓名: ',
                type: 'input',
                model: 'name',
                clearable: true
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '标签：',
                type: 'select',
                model: 'tag',
                clearable: true,
                filterable: true,
                data: [
                  {
                    value: 1,
                    label: '标签1'
                  },
                  {
                    value: 2,
                    label: '标签2'
                  },
                  {
                    value: 3,
                    label: '标签3'
                  }
                ]
              }
            ]
          },
          {
            children: [
              {
                type: 'radio',
                model: 'gender',
                inline: true,
                itemLabel: '客户身份: ',
                must: true,
                data: [
                  {
                    value: 1,
                    label: '男'
                  },
                  {
                    value: 2,
                    label: '女'
                  }
                ]
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '生日：',
                type: 'datePicker',
                model: 'birthday',
                placeholder: '请选择日期',
                pickerOptions: {
                  disabledDate(time) {
                    return time.getTime() > Date.now()
                  }
                }
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '地域：',
                type: 'select',
                model: 'address',
                clearable: true,
                filterable: true,
                data: [
                  {
                    value: 1,
                    label: '地域1'
                  },
                  {
                    value: 2,
                    label: '地域2'
                  },
                  {
                    value: 3,
                    label: '地域3'
                  }
                ]
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '备注: ',
                type: 'input',
                eleType: 'textarea',
                rows: 2,
                placeholder: '请不要超过200字',
                maxLength: 200,
                model: 'desc'
              }
            ]
          }
        ]
      }
    }
  },
  computed: {},
  mounted() {
    this.getList()
  },
  methods: {
    /** 获取客户列表*/
    getList() {
      const par = this.listQuery
      par.page = this.option.paginationCurrent
      par.limit = this.option.paginationSize
      customerList(par).then(res => {
        if (res.code === 20000) {
          this.customerType[0].number = res.data.total * par.limit
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
    },
    /** 设置修改显示弹窗的状态
     *  标签
     * */
    setVisible(type, index) {
      if (this.visibleList[type].hasOwnProperty(index)) {
        this.visibleList[type][index] = !this.visibleList[type][index]
      } else {
        this.$set(this.visibleList[type], index, true)
      }
    },
    /** 新增客户点击确定*/
    addSubmit(ev) {
      if (ev.status === 1) {
        this.$message.success('新增成功')
        this.list.unshift(ev.data)
        this.addEmptyChange()
      }
    },
    /** 新增客户点击取消*/
    addEmptyChange() {
      this.addNewCustomer = false
      this.$refs.addForm.resetFields()
    }
  }
}
