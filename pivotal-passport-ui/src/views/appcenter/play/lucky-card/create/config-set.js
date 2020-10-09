/** 刮刮乐创建*/
export default {
  /** form的配置*/
  formOption: {
    labelWidth: '120px',
    itemSize: 'small',
    column: [
      {
        title: '基本信息',
      },
      {
        children: [
          {
            itemLabel: '活动名称 : ',
            type: 'input',
            model: 'title',
            itemProp: 'title',
            itemRules: [
              {required: true, message: '请填写活动名称', trigger: 'blur'}
            ],
            clearable: true,
            placeholder: '请填写活动名称',
          },
        ]
      },
      {
        children: [
          {
            itemLabel: '活动时间：',
            must: true,
            type: 'datePicker',
            model: 'min_time&max_time',
            eleType: 'daterange',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            rangeSeparator: '至',
            format: 'yyyy-MM-dd HH:mm:ss',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
          }
        ]
      },
      {
        children: [
          {
            itemLabel: '参与用户身份 : ',
            type: 'radio',
            model: 'user',
            slotNameFormData: [
              {
                slotName: 'otherUser'
              },
            ],
            data: [
              {
                value: 0,
                label: '所有用户',
              },
              {
                value: 1,
                label: '部分用户',
                slotName: 'otherUser',
              },
            ],
          }
        ]
      },
      {
        children: [
          {
            itemLabel: '活动类型 : ',
            type: 'radio',
            model: 'active_type',
            data: [
              {
                value: 0,
                label: '无限制抽签',
              },
              {
                value: 1,
                label: '积分抽奖，消耗',
                children: [//子选项
                  {
                    type: 'input',
                    model: 'point',
                    clearable: true,
                    addEnd: '积分',
                    addEndStyle: 'margin-left:10px;',
                  }
                ],
              },
            ],
          }
        ]
      },
      {
        children: [
          {
            itemLabel: '参与次数 : ',
            type: 'radio',
            model: 'inNumbers',
            slotNameFormData: [
              {
                slotName: 'dayN'
              },
              {
                slotName: 'onesN'
              },
            ],
            data: [
              {
                value: 0,
                label: '一天N次',
                slotName: 'dayN',
              },
              {
                value: 1,
                label: '一人N次',
                slotName: 'onesN',
              },
            ],
          }
        ]
      },
    ]
  },
  /** 第二步驟的配置*/
  steps2: {
    labelWidth: '120px',
    itemSize: 'small',
    column: [
      {
        title: '奖品设置',
      },
      {
        slotName: 'prizesSlotName',
      },
      {
        title: '未中奖设置',
      },
      {
        children: [
          {
            itemLabel: '提示语 : ',
            type: 'input',
            model: 'unWinningWords',
            itemProp: 'unWinningWords',
            itemRules: [
              {required: true, message: '请填写提示语', trigger: 'blur'}
            ],
            clearable: true,
            placeholder: '请填写提示语',
          },
        ]
      },
      {
        title: '参与送积分',
      },
      { // 送积分
        slotName: 'pointSlotName',
      },
    ]
  },

}
