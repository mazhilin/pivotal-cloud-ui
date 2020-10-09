import './index.scss'
import {microCreateMinis} from '../../minis'

export default {
  name: 'micro-title-text',
  mixins: [microCreateMinis],
  props: {},
  data() {
    return {
      formData: {
        bg_color: '#fff',
        template_type: '0',
        title: '标题内容',
        desc: '描述内容',
        align: 'left',
        title_size: 14,
        desc_size: '12',
        title_weight: 400,
        desc_weight: 400,
        title_color: '#323233',
        desc_color: '#8c8c8c',
        show_divider: '1',
        is_link: '0',
        link_style: '0',
        link_text: '查看更多',
        link: {}
      },

      // eVue form 配置
      formOption: {
        column: [
          {
            children: [
              {
                type: 'input',
                model: 'title',
                itemLabel: '标题内容：',
                itemProp: 'title',
                itemRules: [
                  {required: true, message: '请输入标题内容', trigger: 'blur'}
                ]
              }
            ]
          },
          {
            children: [
              {
                type: 'input',
                model: 'desc',
                eleType: 'textarea',
                itemLabel: '描述内容：'
              }
            ]
          },
          {
            children: [
              {
                type: 'radio',
                model: 'align',
                itemLabel: '显示位置：',
                inline: true,
                data: [
                  {
                    value: 'left',
                    label: '左显示'
                  },
                  {
                    value: 'center',
                    label: '居中显示'
                  },
                  {
                    value: 'right',
                    label: '右显示'
                  }
                ]
              }
            ]
          },
          {
            children: [
              {
                type: 'radio',
                model: 'title_size',
                itemLabel: '标题大小：',
                inline: true,
                data: [
                  {
                    value: 16,
                    label: '16号'
                  },
                  {
                    value: 14,
                    label: '14号'
                  },
                  {
                    value: 12,
                    label: '12号'
                  }
                ]
              }
            ]
          },
          {
            children: [
              {
                type: 'radio',
                model: 'title_weight',
                itemLabel: '标题粗细：',
                inline: true,
                data: [
                  {
                    value: 400,
                    label: '常规体'
                  },
                  {
                    value: 600,
                    label: '加粗体'
                  }
                ]
              }
            ]
          },
          {
            children: [
              {
                type: 'radio',
                model: 'desc_weight',
                itemLabel: '描述粗细：',
                inline: true,
                data: [
                  {
                    value: 400,
                    label: '常规体'
                  },
                  {
                    value: 600,
                    label: '加粗体'
                  }
                ]
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '标题颜色：',
                type: 'colorPicker',
                model: 'title_color'
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '描述颜色：',
                type: 'colorPicker',
                model: 'desc_color'
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '背景颜色：',
                type: 'colorPicker',
                model: 'bg_color'
              }
            ]
          }
        ]
      },

      commonCheckFieldRules: 'checkData', // 当前组件默认的规则判断函数
      mySelfCheckRules: 'mySelfCheckFun'// 我自己的验证规则函数  比如弹窗之类的
    }
  },
  watch: {},
  components: {},
  computed: {},
  mounted() {
  },
  methods: {
    /**
     * 开始验证
     * */
    submit(vl) {
      this.myCheckResult(vl.status === 1)
    },
    checkData() {
      this.$nextTick(() => {
        if (this.$refs.formData) {
          this.$refs.formData.submit()
        } else {
          this.myCheckResult(true)
        }
      })
    },
    /** 弹窗*/
    mySelfCheckFun() { // 可以选择调用默认规则判断
      this.$nextTick(() => {
        if (this.$refs.formData) {
          this.$refs.formData.submit()
        }
      })
    }
  }
}
