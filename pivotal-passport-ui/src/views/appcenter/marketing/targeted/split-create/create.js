import './create.scss';

export default {
  name: 'splitCreate',
  components: {},
  data() {
    return {
      obj: {},
      option: {
        itemSize: 'small',
        submitBtn: true,
        emptyType: 'text',
        submitType:'primary',
        column: [
          {
            children: [
              {
                itemLabel: '活动名称 : ',
                type: 'input',
                model: 'name',
                itemProp: 'name',
                itemRules: [
                  {required: true, message: '请输入1-20个字的活动名称', trigger: 'blur'}
                ],
                clearable: true,
                placeholder: '请输入活动名称',
              },
            ]
          },
          {
            children: [
              {
                itemLabel: '活动时间: ',
                type: 'datePicker',
                must: true,
                model: 'gmtLastOrderMin&gmtLastOrderMax',
                eleType: 'datetimerange',
                rangeSeparator: '至',
                startPlaceholder: '开始日期',
                endPlaceholder: '结束日期',
                clearable: true,
                format: 'yyyy-MM-dd HH:mm:ss',
                valueFormat: 'yyyy-MM-dd HH:mm:ss',
              },
            ]
          },
          {
            children: [
              {
                itemLabel: '单次下单可分享的优惠券数: ',
                labelWidth: '200px',
                must: true,
                type: 'select',
                model: 'number',
                data: [
                  {
                    value: 2,
                    label: '2'
                  },
                  {
                    value: 3,
                    label: '3'
                  },
                  {
                    value: 4,
                    label: '4'
                  },
                  {
                    value: 5,
                    label: '5'
                  },
                  {
                    value: 6,
                    label: '6'
                  },
                  {
                    value: 7,
                    label: '7'
                  },
                  {
                    value: 8,
                    label: '8'
                  },
                  {
                    value: 9,
                    label: '9'
                  },
                  {
                    value: 10,
                    label: '10'
                  },
                ],
              },
            ]
          },
        ]
      }
    }
  },
  watch: {
    $route() {
      this.couponType = this.$route.query.type || 'reward';
      this.setEVueFormOption();
    },
  },
  computed: {},
  mounted() {
  },
  methods: {
    /** 点击保存*/
    submit(ev) {
      console.log('点击保存==', ev)
    }
  }
}
