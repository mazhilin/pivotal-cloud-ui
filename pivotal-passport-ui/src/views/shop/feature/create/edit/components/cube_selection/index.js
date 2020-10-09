import './index.scss'
import {microCreateMinis} from '../../minis'

export default {
  name: 'cube_selection',
  mixins: [microCreateMinis],
  props: {},
  data() {
    return {
      formData: {
        content: '',
        bg_color: '#fff8e9',
        color: '#666666'
      },
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
      this.myCheckResult((this.formData.content !== ''))
    },
    /** 弹窗*/
    mySelfCheckFun() { // 可以选择调用默认规则判断
      this.showCheckForm()
    }
  }
}
