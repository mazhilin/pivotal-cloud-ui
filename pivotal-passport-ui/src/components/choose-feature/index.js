import './index.scss'

export default {
  name: 'choose-feature',
  props: {
    isGetChooseData: {// 是否开始返回数据
      type: Boolean,
      default: false
    }
  },
  watch: {
    isGetChooseData() {
      if (!this.currentchooseFeatures.id) {
        this.$message.error('请选择微页面');
        return
      }
      this.$emit('chooseChooseFeaturesFun', {
        data: this.currentchooseFeatures
      })
    }
  },
  data() {
    return {
      list: [],
      option: {
        isPagination: true,
        isMenu: false,
        paginationTotal: 10,
        paginationCurrent: 1,
        paginationSize: 10,
        highlightCurrentRow: true,
        column: [
          {
            label: '名称格',
            prop: 'title',
          },
          {
            label: '创建时间',
            prop: 'gtmTime'
          }
        ]
      },
      currentchooseFeatures: {}// 当前选择的
    }
  },
  mounted() {
    for (let i = 0; i < 8; i++) {
      this.list.push({
        id: i,
        title: '微页面' + i,
        gtmTime: '2019-08-02 15:30:30'
      })
    }
  },
  methods: {
    /** 单选*/
    currentRowChange(ev) {
      this.currentchooseFeatures = ev
    }
  }
}
