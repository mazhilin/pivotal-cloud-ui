import './edit.scss'
import {SlickList, SlickItem, HandleDirective} from 'vue-slicksort'
// mock 数据
// import {detail} from '@/api/feature';

/**
 * 作为组件时传入说明
 *  props 解析看下文
 *  currentConfigComponents  默认配置顶部项的组件  默认为config组件
 *  currentUseComponents 正在预览区的组件  默认 []
 * */
export default {
  name: 'micro-create',
  directives: {handle: HandleDirective},
  props: {
    isShowPushAdd: {// 是否显示插入的模式
      type: Boolean,
      default: true
    },
    isShowClose: {// 是否关闭的模式
      type: Boolean,
      default: true
    },
    hideTheseComponents: {// 隐藏这些组件 结构如：[{type: 'config',isHide:true}]
      type: Array,
      default: () => []
    },
    showTheseComponents: {// 显示这些组件 结构如：[{type: 'config',isHide:true}]
      type: Array,
      default: () => []
    },
    isShowAllComponents: {// 是否隐藏所有组件
      type: Boolean,
      default: true
    },
    saveBtn_title_1: { // 按钮1的文本
      type: String,
      default: '保存'
    },
    saveBtn_title_2: { // 按钮2的文本
      type: String,
      default: '保存并继续'
    },
    saveBtn_title_3: { // 按钮3的文本
      type: String,
      default: '更多操作'
    },
    isShowSaveBtn_1: {// 是否显示 上架 按扭
      type: Boolean,
      default: true
    },
    isShowSaveBtn_2: {// 是否显示 保存并继续 按扭
      type: Boolean,
      default: true
    },
    isShowSaveBtn_3: {// 是否显示 更多操作 按扭
      type: Boolean,
      default: true
    },
    // 是否需要返回最后保存的值，在当前页面被用作组件的时候可使用
    isNeedReturnSaveData: {
      type: Boolean,
      default: false
    },
    /** 配置顶部项的组件*/
    currentConfigComponents: {
      type: Array,
      default: () => [{type: 'config'}] // 配置项不能删除、排序
    },
    /** 其他的组件传过来只能使用的组件*/
    currentCanUseComponents: {
      type: Array,
      default: () => [] //
    },
    microId: { // 主要运用于其他的调用微页面组件获取详情使用，具体可参考：公告广告
      type: Number,
      default: null
    },
    microKeyWord: { //微页面 主要运用于其他的调用微页面组件获取详情使用，具体可参考：微集合
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isSaving: false, // 是否正在保存
      isCheckMySelf: false, // 在规则判断不通过改变通知子组件
      isStartCheckFieldRules: false, // 是否开始校验所有组件的规则
      isMoveIng: true, // 是否正在移动
      isDrag: false, // 是否拖动了位置
      appendPosition: {
        index: '',
        position: 'bottom', // 默认底部
        theRefs: null
      }, // 插入组件的位置
      isShowEditorAllComponents: false, // 是否显示插入组件区域，永远与isShowEdit相反
      isShowEdit: false, // 是否显示组件的编辑区
      componentLists: [], // 所有可用的组件
      configComponentsShow: true,
      /** 正在编辑的组件*/
      currentEditConfigComponentsShow: 0,
      /** 正在编辑的组件*/
      currentEditComponent: 0,
      currentUseComponents: [],
      id: null,
      /** 配置顶部项的组件*/
      configComponents: [{type: 'config'}],

      // 所有每次校验的结果
      allCheckResult: [],
      saveType: 2, // 保存的类型=> 2保存 1上架 3更多操作

      scrollTopHeight: 0,
      setOther: {// 设置
        viewTheme: '#ff7a5a',
        bgColor: '#fff', // 背景
        dragCursor: 'all-scroll', // 显示的图标 all-scroll
        componentOperation: false// 是否操作组件
      }

    }
  },
  watch: {
    microId(val) {
      if (val) {
        this.id = val;
        this.getInfo()
      }
    },
    // 通过微页面关键字获取详情
    microKeyWord(val) {
      if (val) {
        this.id = null;
        this.currentUseComponents = [];
        /** todo 测试数据*/
        if (val !== 'productCatalog') {
          this.microKeyWord = 'other'
        }
        this.getInfo()
      }
    },
    currentUseComponents(val) {
      this.$nextTick(() => {
        this.$emit('currentUseComponentsChange', val)
      })
    }
  },
  components: {
    allCanUseComponents: () => import('./components/all-can-use-components/index.vue'),
    SlickList,
    SlickItem,
    RightPanel: () => import('../RightPanel')
  },
  computed: {},
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.id = id;
      this.getInfo()
    } else {
      this.configComponents = JSON.parse(JSON.stringify(this.currentConfigComponents));
    }
    const h = this.$createElement;
    this.$notify({
      title: '温馨提示',
      message: h('div', {style: 'color: #ba3363'}, `一下为简单的微页面数据展示，如果想看数据接口，直接点击保存，查看浏览器控制台`),
      duration: 10000,
      position: 'bottom-left'
    });
  },
  methods: {
    /** 关闭组件管理*/
    componentOperation() {
      this.setOther.componentOperation = false
    },
    /**
     * 获取所有可用的组件
     * */
    allCanUseComponents($list) {
      if ($list) {
        this.componentLists = $list
      } else {
        this.$message.success('没有可用的组件')
      }
    },
    /**
     *  添加组件
     *  */
    addComponent(item) {
      const scrollBox = document.getElementById('scrollbar');
      this.scrollTopHeight = scrollBox.scrollTop;
      const allCurrentUseComponents = this.currentUseComponents;
      this.currentUseComponents = [];
      const $par = {type: item.type};
      const $appendPositionIndex = this.appendPosition.index
      if ($appendPositionIndex !== '') { // 插入模式
        const $in = this.appendPosition.position === 'top' ? $appendPositionIndex : $appendPositionIndex + 1;
        allCurrentUseComponents.splice($in, 0, item);
        this.currentEditComponent = $in
      } else {
        allCurrentUseComponents.push($par);
        this.currentEditComponent = allCurrentUseComponents.length - 1
      }
      setTimeout(() => {
        // 重置插入位置为空
        this.$forceUpdate();
        this.currentUseComponents = allCurrentUseComponents;
        this.appendPosition.index = '';
        this.reSetIsShowEdit();
        scrollBox.scrollTop = this.scrollTopHeight
        // console.log('this.scrollTopHeight===', this.scrollTopHeight);
      }, 5)
    },

    /**
     * 插入
     * */
    appendComponents($position = 'bottom', $index, theRefs) {
      this.appendPosition = {
        index: $index,
        position: $position, // 默认底部
        theRefs: theRefs // 默认底部
      }
      this.reSetIsShowEdit(false)
    },
    /**
     * 重置isShowEdit
     * */
    reSetIsShowEdit($is = true, isReSetOperation = true) {
      this.configComponentsShow = false;
      this.isShowEdit = $is;
      this.isShowEditorAllComponents = !this.isShowEdit;
      if (isReSetOperation) {
        this.componentOperation()
      }
    },
    /**
     * 点击某个组件
     * $isConfigComponents =  1 时为顶部
     * */
    clickComponent($item, $index, $isConfigComponents = 0) {
      if ($isConfigComponents === 1) {
        this.currentEditConfigComponentsShow = $index
        this.configComponentsShow = true
        this.isShowEdit = false
        this.isShowEditorAllComponents = false
      } else {
        this.currentEditComponent = $index
        this.reSetIsShowEdit()
      }
      this.componentOperation()
    },
    /**
     * 移除某个组件
     * */
    popBtn($type, item, ref, index) {
      if ($type === 2) { // 确定
        const $currentUseComponents = this.currentUseComponents;
        $currentUseComponents.splice(index, 1);
        this.currentUseComponents = [];
        setTimeout(() => {
          this.currentUseComponents = $currentUseComponents
        }, 5)
      }
      this.$refs[ref][0].showPopper = false;
      this.isShowEditorAllComponents = false
    },
    // 监听某个组件的变化
    componentsValueChanceFromConfig($val) {
      if ($val) {
        this.configComponents[$val.current].dataField = $val.dataField
      }
    },
    componentsValueChance($val) {
      if ($val) {
        this.currentUseComponents[$val.current].dataField = $val.dataField
      }
    },
    // 拖拽
    sortStart() {
      this.setOther.dragCursor = 'all-scroll';
      this.isMoveIng = true
    },
    // 拖动过程，改变鼠标样式
    sortMove() {
    },
    // 结束拖拽
    sortEnd(val) {
      this.isDrag = (val.oldIndex !== val.newIndex);
      this.currentEditComponent = val.newIndex;
      this.isMoveIng = false
    },
    // 拖拽之后的结果
    sortInput(val, isReSet = true) {
      if (this.isDrag) {
        this.currentUseComponents = []
        setTimeout(() => {
          this.currentUseComponents = val
        }, 5)
        this.appendPosition.index = ''
      }
      this.isDrag = false
      this.configComponentsShow = false
      this.reSetIsShowEdit(true, isReSet)
    },
    /** 右边组件的拖拽*/
    componentsSortInput(val) {
      this.isDrag = true
      this.sortInput(val, false)
    },
    /**
     * 保存事件 先校验
     * */
    save($type) {
      // console.log('保存事件--', $type)
      this.saveType = $type
      this.allCheckResult = []
      this.isStartCheckFieldRules = !this.isStartCheckFieldRules// 开始校验
    },
    /** 所有的正在编辑的校验结果*/
    everyComponentsCheckResultFun(ev) {
      // console.log('ev===', ev);
      this.allCheckResult.push(ev.data)
      /** 统计当前所有正在使用组件的数量*/
      const currentUserAllComponentsList = this.currentUseComponents.length + this.configComponents.length
      // // console.log('--', currentUserAllComponentsList);
      if (this.allCheckResult.length === currentUserAllComponentsList) {
        // // console.log('已经获得所有的值', this.allCheckResult);
        const $allCheckResult = this.allCheckResult
        for (let i = 0; i < $allCheckResult.length; i++) {
          const cur = $allCheckResult[i]
          if (!cur.isPass) {
            let $type = 0
            if (cur.isHeader) { // 头部的验证规则不通过
              this.configComponents[cur.current]['isCheckMySelf'] = !this.configComponents[cur.current]['isCheckMySelf']
              $type = 1
            } else { // 底部的不通过
              this.currentUseComponents[cur.current]['isCheckMySelf'] = !this.currentUseComponents[cur.current]['isCheckMySelf']
            }
            this.clickComponent({}, cur.current, $type)
            this.isStartCheckFieldRules = false
            // 开始通知子组件开始提示用户 ，弹窗等。。。
            // this.isCheckMySelf = !this.isCheckMySelf;
            break
          }
          if (i === $allCheckResult.length - 1) { // 验证完成，可以保存了
            this.savePush()
          }
        }
      }
    },
    // 验证完毕之后发布push
    savePush() {
      const $parameter = this.configComponents.concat(this.currentUseComponents)
      // // console.log($parameter);
      $parameter.map(re => { // 移除isCheckMySelf字段，不能上传数据库
        delete re['isCheckMySelf']
      })
      // //console.log('最后要保存的数据=', $parameter);
      if (this.isNeedReturnSaveData) { // 返回最后保存的值  当前微页面被使用成组件时
        this.$emit('returnData',
          {
            typeDecs: this.saveType === 1 ? this.saveBtn_title_1 : this.saveType === 2 ? this.saveBtn_title_2 : this.saveBtn_title_3,
            type: this.saveType, // 按钮类型
            data: $parameter
          }
        );
        return
      }
      this.saveData($parameter, this.saveType)
    },
    /** 保存到数据库*/
    async saveData($data) {
      this.isSaving = true;
      console.log('保存到数据', $data);
      console.log('保存到数据字符串', JSON.stringify($data));
      const par = {
        pageData: JSON.stringify($data),
        title: $data[0].dataField.title || '微标题'
      };
      if (this.id) {
        par['id'] = this.id
      }
      this.$message.success('正在提交接口')
      setTimeout(() => {
        this.isSaving = false
        this.$message.success('发布成功')
      }, 1000)
    },
    /** todo 获取详情 测试数据*/
    getInfo() {
      let par = {};
      if (this.microKeyWord) {
        par.keyword = this.microKeyWord;
      }
      if (this.id) {
        par.id = this.id;
      }
      let detail = {
        keyword: 'other',
        pageData: '[{"type":"config","dataField":{"title":"页面标题","description":"","category":"","gmtStart":""}},{"type":"notice","dataField":{"content":"最新活动通知","bg_color":"#fff8e9","color":"#666666"}},{"type":"image_ad","dataField":{"indicator":4,"imageList":[{"url":"http://wangzheshike.xxgushi.com/huodong.png","title":"","link":"","type":"","activeBoxs":[{"link":10,"title":"液体颊彩1","width":151,"height":261,"left":0,"top":0,"translateX":9,"translateY":119,"type":1},{"link":10,"title":"液体颊彩1","width":146,"height":259,"left":0,"top":0,"translateX":171,"translateY":120,"type":1},{"link":13,"title":"液体颊彩13","width":155,"height":257,"left":0,"top":0,"translateX":330,"translateY":123,"type":1},{"link":13,"title":"液体颊彩13","width":153,"height":238,"left":0,"top":0,"translateX":14,"translateY":578,"type":1},{"link":13,"title":"液体颊彩13","width":155,"height":244,"left":0,"top":0,"translateX":174,"translateY":577,"type":1},{"link":13,"title":"液体颊彩13","width":151,"height":240,"left":0,"top":0,"translateX":336,"translateY":578,"type":1}]}]}}]'
      };
      if (this.microKeyWord === 'productCatalog') {
        detail = {
          keyword: 'productCatalog',
          pageData: '[{"type":"config","dataField":{"title":"商品分类","description":"","category":"","gmtStart":""}},{"type":"classification_list","dataField":{"categoryList":[{"isSw":true,"title":"热门推荐","subCategoryList":[{"title":"手机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/1.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/2.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/3.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/4.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/5.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/6.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/7.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/8.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/9.png"}],"banner":{"title":"","type":"","link":"","image_url":"http://wangzheshike.xxgushi.com/admin/img_4.jpg"}},{"isSw":true,"title":"手机数码","subCategoryList":[{"title":"手机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/1.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/2.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/3.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/4.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/5.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/6.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/7.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/8.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/9.png"}],"banner":{"title":"","type":"","link":"","image_url":"http://wangzheshike.xxgushi.com/admin/img_4.jpg"}},{"isSw":true,"title":"家用电器","subCategoryList":[{"title":"手机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/1.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/2.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/3.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/4.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/5.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/6.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/7.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/8.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/9.png"}],"banner":{"title":"","type":"","link":"","image_url":"http://wangzheshike.xxgushi.com/admin/img_4.jpg"}},{"isSw":true,"title":"电脑办公","subCategoryList":[{"title":"手机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/1.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/2.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/3.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/4.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/5.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/6.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/7.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/8.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/9.png"}],"banner":{"title":"","type":"","link":"","image_url":"http://wangzheshike.xxgushi.com/admin/img_4.jpg"}},{"isSw":true,"title":"汽车生活","subCategoryList":[{"title":"手机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/1.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/2.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/3.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/4.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/5.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/6.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/7.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/8.png"},{"title":"耳机","type":1,"link":10,"image_url":"http://wangzheshike.xxgushi.com//class/remen/9.png"}],"banner":{"title":"","type":"","link":"","image_url":"http://wangzheshike.xxgushi.com/admin/img_4.jpg"}}]}}]',
        };
      }
      let $data = JSON.parse(detail.pageData);
      if ($data.length) {
        this.configComponents = [];
        $data.map(re => {
          if (re.type.indexOf('config') !== -1) {
            this.configComponents.push(re);
          } else {
            this.currentUseComponents.push(re);
          }
        });
      }
      console.log('获取微页面详情', detail)
    }
  }
}
