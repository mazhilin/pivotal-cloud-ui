import './create.scss';
import configSet from './config-set'

export default {
  name: 'couponCreate',
  components: {},
  data() {
    return {
      isShow: true,
      couponType: 'reward', // 优惠券类型 reward满减券、discount折扣券、random随机券
      headerTitle: '优惠券',
      id: null,
      obj: {
        prm_id: 2000,//发券活动ID 1000 限时折扣 1010 满N元减送 1011 满N件减送 1020 第N件M折 1030 打包一口价 1040 加价购 1050 优惠套装 2000 优惠券 2010 优惠券码
        condition_type: 1, // 0-无此设置 1-满减 2-满折 3-([优惠券]满减金额)随机立减
        is_full: 0, // 适用商品
        type_limit: 1, //使用门槛
        use_time: 0, //用券时间
        quota: 0, //每人限领次数
        quota_model: 0, //每人限领次数模型
        amount_limit: '', // 使用门槛
        disprice: '', // 减免
        discountRate: '', // 打折
        min_random: '', // 范围内随机最小
        max_random: '', // 范围内随机最大
        min_time: '', // 开始日期
        max_time: '', // 结束日期
        directions: '', // 结束日期
      },
      option: configSet.formOption,
      showText: {
        discountsContent: '', // 优惠内容
        useTimeContent: '', // 使用时间
      },
    }
  },
  watch: {
    $route() {
      this.init();
    },
    /** obj watch*/
    obj: {
      deep: true,
      handler(val) {
        let descContent = ''; //优惠内容
        switch (val.is_full) { // 适用商品
          case 0: // 全部商品可用
            descContent = '全部商品可用';
            break;
          case 1: //指定商品可用
            descContent = '部分商品可用';
            break;
          case 2: //指定商品不可用
            descContent = '部分商品不可用';
            break;
        }
        if (val.amount_limit) { //门槛金额
          descContent = `${descContent},满${val.amount_limit}元`;

          /** 随机券随机金额校验*/
          if (this.couponType === 'random') {
            if (val.min_random && val.max_random) {
              this.$refs.eVueForm.validateField('min_random');
            }
          }
        }
        let $discountsContent = this.conditionTypeFun(val);
        if ($discountsContent) { // 当前优惠内容
          this.showText.discountsContent = $discountsContent;
          descContent = `${descContent},${$discountsContent}`;
        }
        this.showText.useTimeContent = this.useTimeFun(val);
        val.directions = descContent;
        if (val.quota_model === 0) {
          val.quota = 0;
        }
      }
    }
  },
  filters: {},
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.couponType = this.$route.query.type || 'reward';
      // 优惠券类型couponType =  reward满减券、discount折扣券、random随机券
      //condition_type  0-无此设置 1-满减 2-满折 3-([优惠券]满减金额)随机立减
      this.obj.condition_type = this.couponType === 'discount' ? 2 : this.couponType === 'random' ? 3 : 1;
      /** 特殊处理随机券规则*/
      if (this.couponType === 'random') {
        configSet.otherModel.random.children[0].itemRules = this.randomItemRules();
        configSet.otherModel.random.children[1].itemRules = this.randomItemRulesMaxRandom();
      }
      this.setEVueFormOption();
      console.log('-----couponType=', this.couponType);
    },
    /** 随机券的规格判断*/
    randomItemRules() {
      return [
        {
          validator: (rule, value, callback) => {
            value = Number(value);
            let maxRandomValue = Number(this.obj.max_random); // 最大的随机值
            if (value === '') {
              callback(new Error('请输入优惠内容'));
            } else if (value <= 0 || value > 10000 || maxRandomValue > 10000 || maxRandomValue <= 0) {
              callback(new Error('面值必须大于等于 0.01 元, 且不能超过10000元'));
            } else if (value >= maxRandomValue) {
              callback(new Error('优惠券面值范围的上限必须大于下限'));
            } else if (value >= this.obj.amount_limit) {
              callback(new Error('优惠券面值不能大于满减金额'));
            } else {
              callback();
            }
          }, trigger: 'blur'
        }
      ]
    },
    // 最大随机值校验
    randomItemRulesMaxRandom() {
      return [
        {
          validator: () => { // 检验min_random 字段
            this.$refs.eVueForm.validateField('min_random');
          }, trigger: 'blur'
        }
      ]
    },
    /** 当前优惠内容*/
    conditionTypeFun(obj) {
      let text = '-';
      if (obj.type_limit && obj.amount_limit)
      //      condition_type: 0, // 0-无此设置 1-满减 2-满折 3-([优惠券]满减金额)随机立减
        switch (obj.condition_type) {
          case 1: //满减
            if (obj.disprice) {
              if (this.amountLimitAndDisprice()) {
                text = `满${obj.amount_limit}减${obj.disprice}元`;
              }
            }
            break;
          case 2: // 满折
            if (obj.discountRate) {
              text = `满${obj.amount_limit}打${obj.discountRate}折`;
            }
            break;
          case 3: // 随机立减
            if (obj.min_random && obj.max_random) {
              text = `随机减去${obj.min_random}元至${obj.max_random}元`;
            }
            break;
        }
      return text;
    },
    /** 模板的使用時間文本*/
    useTimeFun(obj) {
      let text = '-';
      switch (obj.use_time) {
        case 0: //选择日期范围
          if (obj.min_time && obj.max_time) {
            text = `${obj.min_time} - ${obj.max_time}`;
          }
          break;
        case 1: // 领券当日起
          if (obj.validity_days) {
            text = `领券当日起${obj.validity_days}天内可用`;
          }
          break;
      }
      return text;
    },
    /** 重新设置eVue form option*/
    setEVueFormOption() {
      const index = this.option.column.findIndex(co => co.couponType);
      if (index >= 0) {
        // 默认满减送 reward
        let newsType = configSet.otherModel.reward;
        switch (this.couponType) {
          case "discount"://discount折扣券
            newsType = configSet.otherModel.discount;
            break;
          case 'random'://random随机券
            newsType = configSet.otherModel.random;
            break;
        }
        this.isShow = false;
        this.option.column[index] = newsType;
        this.$forceUpdate();
        setTimeout(() => {
          this.isShow = true;
        }, 100);
      }
    },
    /** 满减金额和减免金额判断*/
    amountLimitAndDisprice() {
      let is = true;
      console.log(this.obj.amount_limit, this.obj.disprice);
      if (this.obj.amount_limit < this.obj.disprice) {
        this.$message.closeAll();
        this.$message.error('减免金额不能大于门槛金额');
        is = false;
      }
      return is;
    },
    /** 点击保存*/
    submit() {
      this.$refs.eVueForm.submit();
    },
    /** 保存的数据*/
    pushData(ev) {
      if (ev.status === 1) {
        if (!this.amountLimitAndDisprice()) {
          return;
        }
        let $data = ev.data;
        if ($data.use_time === 0) { // 选择日期范围
          $data.validity_days = 0;
          if ($data.min_time && $data.max_time) { // 转时间戳
            $data.min_time = new Date($data.min_time).getTime() / 1000;
            $data.max_time = new Date($data.max_time).getTime() / 1000;
          } else {
            this.$message.error('请选择日期范围');
            return;
          }
        } else {
          $data.min_time = 0;
          $data.max_time = 0;
        }
        /** 提交数据*/
        if (this.id) {
          $data['id'] = this.id;
        }
        console.log('提交数据：', $data);
      }
    },
  }
}
