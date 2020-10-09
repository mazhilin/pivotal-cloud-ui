import './attachment.scss'
// mock 数据
import {imageList, categoryList} from '@/api/images'

export default {
  name: 'attachment',
  components: {},
  props: { // 作为组件形式
    isChooseModel: { // 是否为选择图片模式
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowPushGroupPop: false,
      isShowSetGroupName: false, // 是否设置分组名称
      newGroupName: '', // 新增分组名称
      lookBigImgCover: false, // 查看大图
      imagesUrl: '',
      visibleList: {// 修改显示
        title: {}, // 改名
        group: {} // 分组
      },
      /** 分组*/
      group: [],
      list: [],
      demoSize: 4,
      listQuery: {
        categoryId: 1, // 当前分组ID
        page: 1,
        limit: 20
      }
    }
  },
  computed: {},
  watch: {
    isShowSetGroupName(val) {
      if (val) {
        this.newGroupName = this.group.find(x => x.id === this.listQuery.categoryId)['name']
      }
    }
  },
  mounted() {
    this.categoryList()
  },
  methods: {
    /** 获取分组*/
    categoryList() {
      categoryList().then(res => {
        console.log(res)
        if (res.code === 20000) {
          this.group = res.data
          if (res.data.length) {
            this.listQuery.categoryId = res.data[0].id
            this.getList()
          }
        }
      })
    },
    /** 获取列表*/
    getList() {
      imageList(this.listQuery).then(res => {
        console.log(res)
        if (res.code === 20000) {
          this.list = res.data.items
        }
      })
    },
    searchList(item) {
      this.listQuery.page = 1
      this.listQuery.categoryId = item.id
      this.getList()
    },
    /** 新增分组*/
    pushGroup(type) {
      if (type === 2) {
        this.group.push({
          id: this.demoSize,
          name: this.newGroupName,
          number: 0
        })
      }
      this.demoSize++
      this.isShowPushGroupPop = false
      this.newGroupName = ''
    },
    /** 保存名称*/
    setGroupName(type) {
      if (type === 2) {
        this.group.find(x => x.id === this.listQuery.categoryId)['name'] = this.newGroupName
      }
      this.isShowSetGroupName = false
      this.newGroupName = ''
    },
    /** 设置修改显示弹窗的状态
     *  改名
     *  分组
     * */
    setVisible(type, index) {
      if (this.visibleList[type].hasOwnProperty(index)) {
        this.visibleList[type][index] = !this.visibleList[type][index]
      } else {
        this.$set(this.visibleList[type], index, true)
      }
    },
    /** 复制成功*/
    onCopy() {
      this.$message.success('复制成功')
    }
  }
}
