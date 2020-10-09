import './index.scss'
/**
 * 创建新组件之后，在all-can-use-components中添加
 * 必须应用 microCreateMinis
 * 数据必须以formData包含
 * */
import {microCreateMinis} from '../../minis'

/** 头部配置*/
export default {
  name: 'micro-header-ad-box',
  mixins: [microCreateMinis],
  props: {},
  data() {
    return {
      commonCheckFieldRules: 'checkData', // 当前组件默认的规则判断函数
      title: '[页面标题]',
      positions: [
        {title: '页面头部', label: 1},
        {title: '页面底部', label: 2}
      ],
      pages: [
        {title: '微页面', label: 1},
        // {title: '微页面分类', label: 2},
        {title: '商品详情', label: 3}
        // {title: '商品分组', label: 4},
        // {title: '店铺主页', label: 5},
      ],
      formData: {
        position: 1,
        page: [1, 3]
      }
    }
  },
  watch: {},
  components: {},
  computed: {
    theme() {
      return this.$store.getters.theme
    }
  },
  mounted() {
  },
  methods: {
    /**
     * 开始验证
     * */
    checkData() {
      this.myCheckResult(true)
    }
  }
}
