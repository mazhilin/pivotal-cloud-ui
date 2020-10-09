import './index.scss'
import draggable from 'vuedraggable'

export default {
  name: 'micro-all-can-use-components',
  props: {
    /**
     * 结构
     * hideTheseComponents = [{type: 'config',isHide:true}]
     * */
    hideTheseComponents: {// 隐藏这些组件
      type: Array,
      default: () => []
    },
    showTheseComponents: {// 显示这些组件
      type: Array,
      default: () => []
    },
    isShowAllComponents: {// 是否隐藏所有组件
      type: Boolean,
      default: true
    }
  },
  components: {
    draggable
  },
  watch: {
    hideTheseComponents: {
      deep: true,
      handler() {
        this.hideComponents()
      }
    },
    showTheseComponents: {
      deep: true,
      handler() {
        this.showComponents()
      }
    },
  },
  data() {
    return {
      componentLists: [// 所有可用的组件
        {
          type: 'config', // 组件名称标识
          title: '配置',
          isHide: true, // 是否隐藏选择
          isHeader: true, // 是否为头部
          routerPath: () => import('../header/index.vue')// 路由地址
        },
        {// 公共广告头部配置
          type: 'config_common_ad',
          title: '配置',
          isHide: true, // 是否隐藏选择
          isHeader: true, // 是否为头部
          routerPath: () => import('../header_ad/index.vue')
        },
        {
          type: 'title_text',
          title: '标题文本',
          routerPath: () => import('../title-text/index.vue')
        },
        {
          type: 'notice',
          title: '公告',
          routerPath: () => import('../notice/index.vue')
        },
        {
          type: 'goods',
          title: '商品',
          routerPath: () => import('../goods/index.vue')
        },
        {
          type: 'classification_list',
          title: '商品分类',
          isHide: true,
          routerPath: () => import('../classification-list/index.vue')
        },
        {
          type: 'image_ad',
          title: '图片广告',
          routerPath: () => import('../image_ad/index.vue')
        },
        {
          type: 'tab_nav',
          title: '导航分类',
          routerPath: () => import('../tab-nav/index.vue')
        },
        {
          type: 'daily_recommendation',
          title: '今日推荐',
          routerPath: () => import('../daily-recommendation/index.vue')
        },
        {
          type: 'deserve_look',
          title: '值得一看',
          routerPath: () => import('../deserve-look/index.vue')
        },
        {
          type: 'recommendation_list',
          title: '推荐列表',
          routerPath: () => import('../recommendation-list/index.vue')
        },
        {
          type: 'recommendation_animation',
          title: '动效滚动',
          routerPath: () => import('../recommendation-animation/index.vue')
        },
      ],
      isDrag: true
    }
  },
  mounted() {
    this.$emit('retAllCanUseComponents', this.componentLists)
    this.hideComponents();
    this.showComponents();
  },
  methods: {
    cloneDog({type}) {
      return this.componentLists.find(x => x.type === type)
    },
    /** 添加组件*/
    addComponent(item) {
      this.$emit('addComponent', item)
    },
    /** 隐藏组件*/
    hideComponents() {
      if (this.hideTheseComponents.length) { // 判断是否隐藏这些组件，那么其他的组件均显示（除了isHeader的）
        this.componentLists.map(res => {
          if (!res.isHeader) {
            this.$set(res, 'isHide', false)
          }
        });
      }
      this.isShowOrHide(this.hideTheseComponents, true)
    },
    showComponents() {
      if (this.showTheseComponents.length) { // 判断是否显示这些组件，那么其他的组件均隐藏
        this.componentLists.map(res => {
          if (!res.isHeader) {
            this.$set(res, 'isHide', true)
          }
        });
      }
      this.isShowOrHide(this.showTheseComponents, false)
    },
    isShowOrHide($data, isHide) {
      if (!$data.length) return;
      $data.map(res => {
        if (res.type) {
          const $index = this.componentLists.findIndex(x => x.type === res.type)
          if ($index >= 0) {
            this.$set(this.componentLists[$index], 'isHide', isHide)
          }
        }
      })
    }

  }
}
