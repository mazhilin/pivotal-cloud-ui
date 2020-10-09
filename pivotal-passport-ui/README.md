<p align="center">
  <img width="120" src="http://git.evue.top/avatars/1">
</p>

## 
<p>有疑问请，咨询QQ:2025021114</p>
<p>系统内的图片，以及设计来源于网络，如果侵犯了您的权利，请联系QQ:2025021114进行删除处理，谢谢</p>

## 商品模块
- 仿有赞商城后台系统的商品模块。
- 功能：跟有赞商城后台系统店铺模块里的微页面一样。
- sku算法：笛卡尔积算法，具体看里面的源码。


```javascript
 /** 笛卡尔积算法*/
    calcDescartes(array) {
      if (array.length < 2) return array[0] || []
      return [].reduce.call(array, function(col, set) {
        const res = []
        col.forEach(function(c) {
          set.forEach(function(s) {
            const t = [].concat(Array.isArray(c) ? c : [c])
            t.push(s)
            res.push(t)
          })
        })
        return res
      })
    }
```

## 微页面1.0
- 仿有赞商城后台系统的店铺模块里的微页面。
- 功能：跟有赞商城后台系统店铺模块里的微页面一样。
- 技术：运用于vue + element-ui 编写的商城系统里面。
- 灵活度：运用微页面里面的组件完成可以做到设计稿的百分之百还原度。可以做到活动、季节性、618活动、双11活动的自定义首页随时换肤功能，足以应付限时折扣等营销活动。
- 用途：可创建商城店铺主页、活动页、公共广告、商品详情等功能，可以用在微信小程序、百度小程序、h5商城、混合式的app等商城里。
- 数据结构：以有赞一样，前端程序员以数据库创建的思想，自定义创建相应组件的数据结构。往后，前端程序员再以接口的形式对接即可。
- 扩张性：由于主要逻辑以及判断都已经写好，所以稍微有vue + element-ui 基础的前端程序便可以自定义添加自己商城系统所需要的组件。
- 组件：当前微页面1.0组件里面含有以下：
- 标题文本：可用于商城首页或者活动页的标题描述。
- 公告：可用于通告、或者活动公告等。
- 商品：首页、活动页、商品详情页的推荐商品等，有两种显示模式、后期可以自己添加。
- 商品分类：用于商城的商品分类页。
- 图片广告：可以说不管有赞还是其他商城系统，绘制热区的功能使用是最频繁的，可以做完和任何设计稿一模一样的效果。

## 如何新建组件
<p>shop\feature\create\index\components 在这个目录中添加新的组件文件夹</p>
<p>请参考header组件、有疑问请，咨询QQ:1125093590</p>

## js文件的基础结构如下

```javascript
import './index.scss'
/**
 * 创建新组件之后，在all-can-use-components中添加
 * 必须应用 microCreateMinis
 * 数据必须以formData包含
 * */
import {microCreateMinis} from '../../minis'

/** 新组件*/
export default {
  name: 'newComponentName',
  mixins: [microCreateMinis],
  props: {},
  data() {
    return {
      // 数据结构以formData包含
      formData: {},
      commonCheckFieldRules: 'checkData', // 当前组件默认的规则判断函数 具体方法查看../../minis文件
      mySelfCheckRules: 'mySelfCheckFun'// 当前的验证规则函数  比如弹窗之类的
    }
  },
  watch: {},
  components: {},
  computed: {},
  mounted() {
  },
  methods: {
    /**
     * 开始验证 this.myCheckResult 是minis.js 里面的方法，需要出入Boolean
     * */
    checkData() {
      this.myCheckResult((this.formData.title !== ''))
    },
    /** 弹窗*/
    mySelfCheckFun() { // 可以选择调用默认规则判断
      this.$message.error('请填写完整信息')
    }
  }
}
```

## .vue 的数据结构如下

```html
<div class="自定义class">
  <div class="design-preview-controller">
     预览区域
  </div>
  <div class="design-editor-item design-hide-class" v-show="isShowEdit">
      <div class="design-config-editor">
      <div class="design-editor-component-title">组件名称(如果为顶部配置组件可以不要该dom)</div>
      编辑区域
      </div>
  </div>
</div>
```



## License

Copyright (c) 2019-present EVUE
