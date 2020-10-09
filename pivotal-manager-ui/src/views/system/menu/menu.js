import './menu.scss'
import {getMenuList} from '@/api/system/menu'
import svgIcons from './svg-icons'
import {addMenuOption} from './add-menu-option';

export default {
  name: 'systemMenu',
  mixins: [addMenuOption],
  components: {},
  data() {
    return {
      // 获取菜单列表加载状态
      loading: false,
      svgIcons,
      menuList: [],
      /** 搜索配置*/
      searchModel: {
        sectorName: '',
        status: '',
      },
      /** 显示新增菜单弹窗*/
      dialogAddMenu: false,
      addMenuForm: {
        parentId: null,
        icon: '',//菜单图标
        menuType: 'D', // 默认目录 D,菜单M,B按钮
        isFrame: 0, // 默认不是外链
        visible: 1, // 默认显示
      },
      addMenuOption: {
        itemSize: 'small',
        submitBtn: true,
        submitType: 'primary',
        labelWidth: '80px',
        menuAlign: 'right',
        column: [],
      },
    }
  },
  computed: {
    currentMenuType() {
      return this.addMenuForm.menuType;
    }
  },
  mounted() {
    this.fetchMenuList();
    this.setAddMenuOption();
  },
  filters: {},
  methods: {
    /** 获取菜单列表*/
    fetchMenuList() {
      this.loading = true;
      getMenuList().then(res => {
        console.log('获取菜单列表', res);
        if (res.code === 20000) {
          this.menuList = res.data;
        }
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      })
    },
    // 保存按钮
    submit(ev) {
      console.log('保存按钮', ev);
      if (ev.status === 1) {
        this.$message.success('模拟提交数据成功，请查看浏览器控制台');
        this.cancel();
      }
    },
    // 取消按钮
    cancel() {
      this.dialogAddMenu = false;
      this.$refs.addMenuForm.resetFields();
    },
    // 选择菜单图标
    handleClipboard(text, event) {
      this.addMenuForm.icon = text;
      console.log('选择菜单图标', text, event);
    },
  }
}
