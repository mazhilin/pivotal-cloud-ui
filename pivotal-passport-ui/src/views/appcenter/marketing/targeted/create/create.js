import './create.scss';
import configSet from './config-set'

export default {
  name: 'targetedCreate',
  components: {},
  data() {
    return {
      dialogChooseCoupon: true, // 显示选择优惠券的页面
      isShow: true,
      activeType: 'newGift', // 活动类型  newGift新客进店有礼 oldGift老客进店有礼
      headerTitle: '优惠券',
      obj: {
        page: [1]
      },
      option: configSet.formOption,
    }
  },
  watch: {
    $route() {
      this.activeType = this.$route.query.type || 'newGift';
    },
  },
  computed: {},
  mounted() {
    this.activeType = this.$route.query.type || 'newGift';
  },
  methods: {
    /** 点击保存*/
    submit(ev) {
      console.log('点击保存==', ev)
    },
  }
}
