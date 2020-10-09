let reward = { // 默认满减送 reward
  couponType: 1,//作为标记 不同的优惠券类型，更换当前组
  children: [
    {
      itemLabel: '优惠内容 : ',
      type: 'input',
      model: 'disprice',
      itemProp: 'disprice',
      itemRules: [
        {required: true, message: '请输入满减金额', trigger: 'blur'}
      ],
      addPre: '减免',
      must: true,
      addPreStyle: 'margin-right:10px',
      addEndStyle: 'margin-left:10px',
      addEnd: '元',
    }
  ]
};
/** 优惠券创建*/
export default {
  /** 多种模式*/
  otherModel: {
    reward: reward,
    discount: { // discount折扣券
      couponType: 1,
      children: [
        {
          itemLabel: '优惠内容 : ',
          type: 'input',
          model: 'discountRate',
          addPre: '打',
          must: true,
          addPreStyle: 'margin-right:10px',
          addEndStyle: 'margin-left:10px',
          addEnd: '折',
          itemProp: 'discountRate',
          itemRules: [
            {
              validator: (rule, value, callback) => {
                let reg = /^((1\.[1-9]{1})|(([1-9]{1})(\.\d{1})?))$/;
                if (!reg.test(value)) { //(value <= 0 || value > 9.9
                  callback(new Error(' 请输入正确的折扣，如：3.1,请勿超过9.9折'));
                } else {
                  callback();
                }
              }, trigger: 'blur'
            }
          ],
        }
      ]
    },
    random: {//随机券
      couponType: 1,
      children: [
        {
          itemLabel: '优惠内容 : ',
          type: 'input',
          model: 'min_random',
          addPre: '范围内随机',
          must: true,
          style: 'width:80px;',
          addPreStyle: 'margin-right:10px',
          addEndStyle: 'margin-left:10px',
          addEnd: '至',
          itemProp: 'min_random',
          itemRules: [],
        },
        {
          type: 'input',
          model: 'max_random',
          style: 'width:80px;',
          addEnd: '元',
          addEndStyle: 'margin-left:10px;',
        }
      ]
    }
  },
  /** form的配置*/
  formOption: {
    itemSize: 'small',
    column: [
      {
        title: '基本信息',
      },
      {
        children: [
          {
            itemLabel: '优惠券名称 : ',
            type: 'input',
            model: 'title',
            itemProp: 'title',
            itemRules: [
              {required: true, message: '请填写优惠券名称', trigger: 'blur'}
            ],
            clearable: true,
            placeholder: '如：庆国庆优惠券，最多10个字',
          },
        ]
      },
      {
        children: [
          {
            itemLabel: '发放总量 : ',
            type: 'input',
            model: 'total_num',
            itemProp: 'total_num',
            desc: '修改优惠券总量时只能增加不能减少，请谨慎设置',
            itemRules: [
              {required: true, message: '请输入优惠券总量', trigger: 'blur'}
            ],
            clearable: true,
            placeholder: '最多50000张',
          },
        ]
      },
      {
        children: [
          {
            itemLabel: '适用商品 : ',
            type: 'radio',
            model: 'is_full',
            desc: '若活动商品中存在分销商品，优惠后可能造成利润受损',
            slotNameFormData: [
              {
                slotName: 'onlyGoods'
              },
              {
                slotName: 'onlyGoodsNoUse'
              },
            ],
            data: [
              {
                value: 0,
                label: '全部商品可用',
              },
              {
                value: 1,
                label: '指定商品可用',
                slotName: 'onlyGoods',
              },
              {
                value: 2,
                label: '指定商品不可用',
                slotName: 'onlyGoodsNoUse',
              },
            ],
          }
        ],
      },
      {
        children: [
          {
            itemLabel: '使用门槛 : ',
            type: 'input',
            model: 'amount_limit',
            clearable: true,
            addEnd: '元',
            addPre: '满',
            addEndStyle: 'margin-left:10px;',
            addPreStyle: 'margin-right:10px;',
            itemProp: 'amount_limit',
            itemRules: [
              {required: true, message: '请输入使用门槛', trigger: 'blur'}
            ],
          }
        ],
      },
      { // 默认是满减券
        ...reward
      },
      {
        children: [
          {
            itemLabel: '用券时间 : ',
            type: 'radio',
            model: 'use_time',
            style: 'margin-bottom:10px;',
            must: true,
            data: [
              {
                value: 0,
                children: [//子选项
                  {
                    itemLabel: '选择日期范围：',
                    type: 'datePicker',
                    model: 'min_time&max_time',
                    eleType: 'daterange',
                    startPlaceholder: '开始日期',
                    endPlaceholder: '结束日期',
                    rangeSeparator: '至',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    valueFormat: 'yyyy-MM-dd HH:mm:ss',
                  },
                ],
              },
              {
                value: 1,
                children: [
                  {
                    type: 'input',
                    model: 'validity_days',
                    clearable: true,
                    addPre: '领券当日起',
                    addPreStyle: 'margin-right:10px;',
                    addEnd: '天内可用',
                    addEndStyle: 'margin-left:10px;',
                  }
                ],
              },
            ],
          }
        ]
      },
      {
        title: '领取和使用规则'
      },
      {
        children: [
          {
            itemLabel: '每人限领次数 : ',
            type: 'radio',
            model: 'quota_model', //前端显示
            data: [
              {
                value: 0,
                label: '不限次数',
              },
              {
                value: 1,
                children: [
                  {
                    itemLabel: '请选择： ',
                    type: 'select',
                    model: 'quota',
                    data: [
                      {
                        value: 1,
                        label: 1
                      },
                      {
                        value: 2,
                        label: 2
                      },
                      {
                        value: 3,
                        label: 3
                      },
                      {
                        value: 4,
                        label: 4
                      },
                      {
                        value: 5,
                        label: 5
                      },
                      {
                        value: 10,
                        label: 10
                      },
                    ],
                  },
                ],
              },
            ],
          }
        ]
      },
      {
        children: [
          {
            itemLabel: '使用说明 : ',
            type: 'input',
            model: 'directions',
            eleType: 'textarea',
            itemProp: 'directions',
            itemRules: [
              {required: true, message: '请填写使用说明', trigger: 'blur'}
            ],
            placeholder: '使用说明',
          }

        ]
      },
    ]
  },

}
