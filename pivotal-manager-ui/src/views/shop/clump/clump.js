import './clump.scss'

export default {
  name: 'FeatureClump',
  components: {
    microCreate: () => import('@/views/shop/feature/create/edit/index.vue'),
  },
  data() {
    return {
      clumpType: '',
      tabs: [
        {
          name: 'productCatalog',
          label: '分类',
          title: '商品分类',
          desc: '小程序的商品分类页',
        },
        {
          name: 'ad',
          isSwitch: 0,
          label: '公共广告',
          title: '公共广告',
          desc: '公共广告便于你快速地在各类页面中放置统一的广告，建议添加商品、公告、营销等内容',
        },
        {
          name: 'cart',
          isSwitch: 0,
          label: '购物车广告',
          title: '购物车广告',
          desc: '放置在小程序购车的顶部，为了防止购车的内容顶到最底部，请不要配置太高的图片或者太多内容',
        },
        {
          name: 'business',
          isSwitch: 0,
          label: '商务合作',
          title: '商务合作',
          desc: '个人中心的商务合作',
        },
        {
          name: 'about',
          isSwitch: 0,
          label: '关于我们',
          title: '关于我们',
          desc: '个人中心的关于我们',
        },
        {
          name: 'drying',
          isSwitch: 0,
          label: '晒单奖励',
          title: '晒单奖励',
          desc: '个人中心的晒单奖励，对晒单有什么奖励作出描述',
          set: '设置封面',
          id: '',
        },
        {
          name: 'service',
          label: '服务广告',
          title: '服务广告',
          desc: '放置个人中心的我的服务底部的广告，一般为某个商品、活动页，例如：商品-会员卡购买推荐',
          id: '',
        },
      ],
      microId: null,
      isLoading: false, //显示
      isSwitch: false, //显示滚动条
    }
  },
  computed: {},
  filters: {
    configComponents(val) {
      let configCm = [{type: 'config'}];
      if (val === 'ad') {
        configCm = [{type: 'config_common_ad',}]
      }
      return configCm;
    },
    showTheseComponents(val) {
      let useCm = [];
      if (val === 'productCatalog') {
        useCm = [{type: 'classification_list', isHide: false}];
      }
      return useCm;
    },
    hideTheseComponents(val) {
      let useCm = [];
      if (val !== 'productCatalog') {
        useCm = [{type: 'classification_list', isHide: true}];
      }
      return useCm;
    },
  },
  mounted() {
    setTimeout(() => {
      this.clumpType = 'productCatalog';
    }, 100);
  },
  watch: {
    clumpType(val) {
      if (val === 'service') { // 服務廣告

      }
      if (val === 'drying') { //晒单奖励

      }
    }
  },
  methods: {
    /** 获取当前的列表*/
    tabFind($keyword = '') {
      if (!$keyword) {
        $keyword = this.clumpType;
      }
      return this.tabs.find(item => item.name === $keyword);
    },
    /** 判断是否含有该字段*/
    isHasOwnProperty(obj, key) {
      return (obj.hasOwnProperty(key));
    },
    changeSwitch() {
      let switchVal = this.tabs.find(item => item.name === this.clumpType)['isSwitch'];
      hideFeature({keyword: this.clumpType, is_display: switchVal}).then(res => {
        this.$message[res.code === 1 ? 'success' : 'error'](res.msg);
      })
    },
    /** 获取微页面的详情*/
    returnInfo(val) {
      this.isSwitch = val.code === 1;
    },
    //微页面编辑返回的值
    returnData(val) {
      if (val.type !== 1) {
        return;
      }
      let $data = val.data;
      const $par = {
        pageData: JSON.stringify($data),
        title: $data[0].dataField.title || '微标题',
        keyword: this.clumpType,
      };
      console.log('保存的数据：', $data);
      console.log('保存到数据字符串', JSON.stringify($data));
    },
  }
}
