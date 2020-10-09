import './create.scss';
import configSet from './config-set'

export default {
  name: 'couponCreate',
  components: {},
  data() {
    return {
      steps: 1,
      id: null,
      obj: {
        user: 0, // 参与用户身份
        active_type: 0, // 活动类型
        inNumbers: 0, // 参与次数
        dayNum: 1,//一天一次
        onesNum: 1,//每人一共次
        unWinningWords: '很遗憾，没有中奖',//未中奖设置 提示语
        point: 0,// 积分
        noLuckUser: 1,// 仅送给未中奖用户送积分
      },
      option: configSet.formOption,
      steps2: configSet.steps2,
    }
  },
  watch: {
    $route() {
    },
    /** obj watch*/
    obj: {
      deep: true,
      handler(val) {
      }
    }
  },
  filters: {},
  computed: {},
  mounted() {
  },
  methods: {
    /** 点击保存*/
    submit() {
      if (this.steps === 1) { // 取消

      } else { // 上一步
        this.steps = 1;
      }
    },
    /** 保存的数据*/
    eSteps1pushData(ev) {
      if (ev.status === 1) { // 验证通过
        this.steps = 2;
      }
    },
    /** 点击下一步*/
    nextBtn() {
      if (this.steps === 1) { // 处于第一步
        console.log('点击下一步');
        this.$refs.eVueForm.submit();
      } else {  // 点击完成
        console.log('点击完成');
        this.$refs.eSteps2.submit();
      }
    },
    //点击完成后
    eSteps2PushData(ev) {
      if (ev.status === 1) { // 验证通过
        console.log('保存数据：', ev)
      }
    },

  }
}
