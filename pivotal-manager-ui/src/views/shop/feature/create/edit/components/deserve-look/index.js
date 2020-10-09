import './index.scss';
import {microCreateMinis} from '../../minis';

/**模范苹果app值得一看*/
export default {
  name: 'micro-deserve-look-box',
  mixins: [microCreateMinis],
  props: {},
  data() {
    return {
      formData: {},
      commonCheckFieldRules: 'checkData',//当前组件默认的规则判断函数
      mySelfCheckRules: 'mySelfCheckFun',//我自己的验证规则函数  比如弹窗之类的
      errorTitle: '请填写完整信息',
    }
  },
  watch: {
    formData: {
      deep: true,
      handler(res) {
        console.log(res);
      }
    }
  },
  components: {},
  computed: {},
  mounted() {
  },
  methods: {
    /**
     * 开始验证
     * */
    checkData() {
      let is = true;
      this.myCheckResult(is);
    },
    /**弹窗*/
    mySelfCheckFun() {
      this.$message.error(this.errorTitle);
    },
  },
}
