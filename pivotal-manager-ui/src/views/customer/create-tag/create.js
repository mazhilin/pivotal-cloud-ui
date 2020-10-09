import './create.scss'
/** 用户标签*/
export default {
  name: 'CustomerCreateTag',
  components: {},
  data() {
    return {
      /** eVue form 配置*/
      formObj: {
        isAutoTag: 1 // 标签类型
      },
      formOption: {
        itemSize: 'small',
        column: [
          {
            children: [
              {
                itemLabel: '标签名称: ',
                type: 'input',
                model: 'name',
                itemProp: 'name',
                itemRules: [
                  {required: true, message: '请输入名称', trigger: 'blur'}
                ],
                clearable: true
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '标签类型: ',
                type: 'radio',
                model: 'isAutoTag',
                inline: true,
                data: [
                  {
                    value: 1,
                    label: '手动便签'
                  },
                  {
                    value: 2,
                    label: '自动便签'
                  }
                ]
              }
            ]
          },
          {
            slotName: 'isAutoTag'
          }
        ]
      },
      /** 规则*/
      formRule: {
        logic2And: 1 // 必须满足所有被选中的条件
      },
      formRuleOption: {
        itemSize: 'small',
        column: [
          {
            children: [
              {
                itemLabel: '交易条件: ',
                type: 'radio',
                model: 'isAutoTag',
                inline: true,
                data: [
                  {
                    value: 1,
                    label: '手动便签'
                  },
                  {
                    value: 2,
                    label: '自动便签'
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  computed: {},
  mounted() {
  },
  methods: {}
}
