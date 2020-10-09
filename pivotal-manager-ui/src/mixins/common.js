/**
 * 全局mixins
 *  tags的一些方法
 *  menuTag  关闭某个tab窗口
 *  this.menuTag(this.$route.pathFull, 'remove', "/shop/micro");
 * */
export default {
  name: 'commonMixins',
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    myTagsRouter() { //获取当前的标签列表
      return this.$store.state.tagsView
    },
  },
  mounted() {
  },
  methods: {
    /**
     * 跳转页面
     * $page 路径名称
     * $obj 参数
     * */
    /**
     * 例如：
     * this.commonPushPage('couponCreate', {
        id: ev.id,
        copy: 1,
      });
     * */
    commonPushPage($page, $obj = {}) {
      if (!$page) return;
      let par = {name: $page, query: {}};
      if ($obj) {
        for (let ol in $obj) {
          par['query'][ol] = $obj[ol];
        }
      }
      this.$router.push(par)
    },
    /** 查看某些标签*/
    findTag(path, rename = '') {
      let tag, key;
      this.myTagsRouter.visitedViews.map((item, index) => {
        if (item.path === path) {
          tag = item;
          key = index;
          if (rename) {
            item.label = rename;
          }
        }
      });
      return {tag: tag, key: key};
    },
    /**
     * path 要关闭的路径
     * action = 'remove'
     * isPath 是否要挑转到该路径
     * isGo 跳转
     * */
    menuTag(path, action, isPath = '', isGo = true) {
      if (action === "remove") {
        if (path === '') {
          path = this.myTagsRouter.currentTag.path;
        }
        let {tag, key} = this.findTag(path);
        this.$store.commit("DEL_VISITED_VIEW", tag);
        if (tag.path === this.myTagsRouter.currentTag.path && isGo) {
          tag = this.myTagsRouter.visitedViews[key === 0 ? key : key - 1]; //如果关闭本标签让前推一个
          if (isPath === '') {
            this.openTag(tag);
          } else {
            this.$router.push({path: isPath});
          }
        }
      }
    },
    /** 打开某个标签*/
    openTag(item) {
      let tag;
      if (item.name) {
        tag = this.findTag(item.name).tag;
      } else {
        tag = item;
      }
      this.$router.push({
        path: tag.path,
        query: tag.query
      });
    },
    /**
     * 重命名某个路由tab
     * option.name = ''
     * option.path = '' //路由全路径，如果没有则默认选中当前的
     * 例如将标签名（A）改为 (B) 那么：this.reNameRouterTag('B')
     * */
    reNameRouterTag(option) {
      if (!option.name) return;
      if (!option.path) {
        option.path = this.myTagsRouter.currentTag.path;
      }
      let {tag, key} = this.findTag(option.path, option.name);
      if (tag) {
        this.$store.dispatch('tagsView/resetNameTagList', this.myTagsRouter.visitedViews);
      }
    },
    /**
     * 关闭当前标签，跳转到其他的path前需要询问
     * option:
     * title 页面名称
     * path 判断路径
     * */
    isRemovePage(option) {
      if (!option) return;
      if (!option.path) return;
      let is = this.myTagsRouter.visitedViews.find(x => x.path.indexOf(option.path) !== -1);
      if (is) {
        this.$confirm(`将会关闭其他的${option.title}页面哦，确定跳转?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.reTheTag(option);
        }).catch(() => {
        });
      } else {
        if (option.callback) option.callback(true);
      }
    },
    reTheTag(option) {
      this.myTagsRouter.visitedViews.map((res, index) => {
        if (option.isNo !== res.path && res.path.indexOf(option.path) !== -1) {
          this.menuTag(res.path, 'remove', "", false)
        }
        if (index === this.myTagsRouter.visitedViews.length) {
          if (option.callback) option.callback(true);
        }
      });
    },
    /**
     * 一般使用在编辑页面
     * goToPage
     * 例如：
     * this.goToPage({
        removePath: 'marketing/---',//关闭的路径
        toPath: '/marketing/---', //需要跳转的路径
        query: {
          type: 2,
        }
      });
     * */
    goToPage(option) {
      if (!option) return;
      if (!option.removePath) return;
      if (!option.toPath) return;
      console.log('option=', option)
      this.myTagsRouter.visitedViews.map((re, index) => {
        if (re.path.indexOf(option.removePath) !== -1) {
          this.menuTag(re.path, 'remove', "", false)
        }
        if (index === this.myTagsRouter.visitedViews.length) {
          let push = {
            path: option.toPath
          };
          if (option.query) {
            push['query'] = option.query;
          }
          this.$router.push(push);
        }
      });
    },
  },
};
