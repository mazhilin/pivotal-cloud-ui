/**
 * form 表单数据 处理
 * */
export const formOptionMixins = {
  name: 'formOption',
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  mounted() {
  },
  methods: {
    /** 设置 formOption里面的参数值
     *  @param modelKey 字段key作为唯一的标识
     *  @param obj 需要修改的参数 {key:value}
     * */
    setFormOption(modelKey, obj) {
      if (modelKey && obj) {
        if (this.formOption.column.length) {
          this.formOption.column.map(res => {
            if (res.children && res.children.length) {
              for (let ol of res.children) {
                if (ol['model'] === modelKey) { // 字段类型
                  for (let sl in obj) {
                    for (let sa in ol) {
                      if (sl === sa) { // 是否含有相同的字段
                        ol[sa] = obj[sl]
                      }
                    }
                  }
                  break;
                }
              }
            }
          })
        }
      }
    },
  },
};
