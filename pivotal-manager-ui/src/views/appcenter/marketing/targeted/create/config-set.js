/** 发券宝创建*/
export default {
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
            itemLabel: '活动名称 : ',
            type: 'input',
            model: 'title',
            itemProp: 'title',
            itemRules: [
              {required: true, message: '请输入活动名称', trigger: 'blur'}
            ],
            clearable: true,
            placeholder: '请输入活动名称',
          },
        ]
      },
      {
        children: [
          {
            itemLabel: '活动时间 : ',
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
        title: '页面设置',
        desc: '新客进店有礼，首次进入以下页面时，自动发放优惠券',
      },
      {
        children: [
          {
            itemLabel: '选择页面 :',
            type: 'checkbox',
            model: 'page',
            isGroup: true,
            data: [
              {
                value: 1,
                label: '店铺主页',
              },
              {
                value: 2,
                label: '商品详情页',
              },
            ],
          },
        ]
      },
      {
        title: '优惠券设置'
      },
      {
        children: [
          {
            itemLabel: '选择优惠券 :',
            must: true,
            slotName: 'chooseCoupon',
            desc: '最多可添加6张优惠券',
          },
        ]
      },
    ]
  },

}
