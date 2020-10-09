import './index.scss';
/**
 * 创建新组件之后，在all-can-use-components中添加
 * 必须应用 microCreateMinis
 * 数据必须以formData包含
 * */
import {microCreateMinis} from '../../minis';

/**导航配置*/
export default {
  name: 'micro-tab-nav-box',
  mixins: [microCreateMinis],
  props: {},
  data() {
    return {
      isGetChooseFeature: false,//是否可以返回微页面
      dialogChoosePages: false,//微页面弹窗
      isShowChooseImgBtn: false,//是否显示出选择图片的按钮
      /**选择图片的弹窗*/
      isGetChooseImages: false,
      dialogChooseImgVisible: false,
      setTypeList: [//模式
        {
          type: 1,
          title: '图片店招',
        },
        {
          type: 2,
          title: '图文店招',
        },
        {
          type: 3,
          title: '文字店招',
        },
      ],
      formData: {
        set: {
          type: 1,//模板类型   1图片 2 图文 3 文字
          bg_color: '#fff',//背景颜色
          font_color: '#222',//字体颜色
        },//配置
        nav: [],
      },
      demoNav: [
        {
          title: 'demoA',
        },
        {
          title: 'demoB',
        },
        {
          title: 'demoC',
        },
        {
          title: 'demoD',
        },
        {
          title: 'demoE',
        },
      ],
      currentNav: 0,
      showNav: [],
      id: '',
      commonCheckFieldRules: 'checkData',//当前组件默认的规则判断函数
      mySelfCheckRules: 'mySelfCheckFun',//我自己的验证规则函数  比如弹窗之类的
      errorTitle: '请填写完整信息',
    }
  },
  watch: {
    formData: {
      deep: true,
      handler(res) {
        if (res.nav.length) {
          this.showNav = res.nav;
        } else {
          this.showNav = this.demoNav;
        }
      }
    }
  },
  components: {
    // 图片
    chooseImages: () => import('@/components/choose-images/index.vue'),
    chooseFeature: () => import('@/components/choose-feature/index.vue')
  },
  computed: {},
  mounted() {
    if (this.formData.nav.length) {
      this.showNav = this.formData.nav;
    } else {
      this.showNav = this.demoNav;
    }
  },
  methods: {
    /** 添加导航*/
    addNav() {
      this.formData.nav.push({
        title: '', // nav 标题
        id: '', // id
        microTitle: '', //微页面的名称
        img: '',
      })
    },
    choosePage(index, img = false) {
      console.log('index==', index);
      this.currentNav = index;
      if (img) { // 选择图片
        this.dialogChooseImgVisible = true;
      } else {
        this.dialogChoosePages = true;
      }
    },
    //选择微页面回调
    chooseChooseFeaturesFun($event) {
      this.formData.nav[this.currentNav].id = $event.data.id;
      this.formData.nav[this.currentNav].microTitle = $event.data.title;
      this.dialogChoosePages = false;
    },
    /**选择图片的回调*/
    chooseImagesEnd($item) {
      this.dialogChooseImgVisible = false;
      if ($item.data && $item.data.length) {//img
        this.formData.nav[this.currentNav].img = $item.data[0].img;
      }
    },
    /**获取所有返回的图片*/
    returnAllImg(all) {
      this.isShowChooseImgBtn = (all.data.length)
    },
    /**
     * 开始验证
     * */
    checkData() {
      let is = true;
      if (!this.formData.nav.length) {
        is = false;
        this.errorTitle = '请添加导航';
      }
      this.myCheckResult(is);
    },
    /**弹窗*/
    mySelfCheckFun() { //可以选择调用默认规则判断
      this.showCheckForm();
      this.$message.error(this.errorTitle);
    },

  },
}
