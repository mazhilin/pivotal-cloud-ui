import './index.scss'
/**
 * 创建新组件之后，在all-can-use-components中添加
 * 必须应用 microCreateMinis
 * 数据必须以formData包含
 * */
import {microCreateMinis} from '../../minis'

/** 头部配置*/
export default {
  name: 'micro-header-box',
  mixins: [microCreateMinis],
  props: {},
  data() {
    return {
      formData: {
        title: '',
        description: '',
        category: '',
        gmtStart: ''
      },
      id: '',
      commonCheckFieldRules: 'checkData', // 当前组件默认的规则判断函数
      mySelfCheckRules: 'mySelfCheckFun'// 我自己的验证规则函数  比如弹窗之类的
    }
  },
  watch: {},
  components: {},
  computed: {},
  mounted() {
  },
  methods: {
    /**
     * 开始验证
     * */
    checkData() {
      this.myCheckResult((this.formData.title !== ''))
    },
    /** 弹窗*/
    mySelfCheckFun() { // 可以选择调用默认规则判断
      this.showCheckForm()
      this.$message.error('请填写完整信息')
    }

  }
}
