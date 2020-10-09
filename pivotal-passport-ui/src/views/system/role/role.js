import './role.scss'
import {getMenuList} from '@/api/system/menu'
// 新增用户的form 配置
import addRoleConfig from './add-role-config';

export default {
  name: 'systemRole',
  components: {},
  data() {
    return {
      //角色数据
      roleData: [
        {
          id: 1, // 角色编号
          roleName: '管理员', // 角色名称
          roleKey: 'admin', // 权限字符
          roleSort: 1,
          status: 1,
          createTime: '2020-03-03',
          menuPower: [2, 21, 24, 22, 23, 41, 42]
        },
        {
          id: 2, // 角色编号
          roleName: '运营人员', // 角色名称
          roleKey: 'operationalPeople', // 权限字符
          roleSort: 2,
          status: 1,
          createTime: '2020-03-03',
          menuPower: [2, 21, 24]
        },
        {
          id: 2, // 角色编号
          roleName: '数据报表管理员', // 角色名称
          roleKey: 'dataReport', // 权限字符
          roleSort: 3,
          status: 1,
          createTime: '2020-03-03',
          menuPower: [2, 21, 24, 22]
        },
        {
          id: 2, // 角色编号
          roleName: '财务', // 角色名称
          roleKey: 'finance', // 权限字符
          roleSort: 4,
          status: 1,
          createTime: '2020-03-03',
          menuPower: [2, 21, 24, 22, 42]
        },
      ],
      // table的配置
      roleOption: {
        isPagination: true,
        paginationTotal: 0,
        paginationCurrent: 1,
        paginationSize: 20,
        isSelection: true,
        selectionKey: 'id', // 唯一值
        menuDeleteOption: {
          type: 'text'
        },
        menuEditOption: {
          type: 'text'
        },
        column: [
          {
            label: '角色编号',
            prop: 'id',
          },
          {
            label: '角色名称',
            prop: 'roleName',
          },
          {
            label: '权限字符',
            prop: 'roleKey'
          },
          {
            label: '显示顺序',
            prop: 'roleSort'
          },
          {
            label: '角色状态',
            prop: 'status',
            slotName: 'roleStatus',
          },
          {
            label: '创建时间',
            prop: 'createTime'
          },
        ]
      },
      delRoleList: [],//需要删除的列表
      dialogAddRole: false, // 新增角色弹窗
      addRoleFormData: {}, // 新增角色的表单字段
      addRoleOption: addRoleConfig.addRoleOption,
      defaultCheckedMenuKeys: [],// 编辑状态下默认选中的菜单列表
      menuList: [], // 菜单列表
      menuLoading: false, // 拉取菜单列表loading
    }
  },
  watch: {
    /** 监听编辑以及新增弹窗的变化*/
    dialogAddRole(val) {
      if (val) { // 如果弹窗显示，请求menu
        this.fetchMenuList();
      } else {
        this.defaultCheckedMenuKeys = [];
      }
    },

  },
  computed: {},
  mounted() {
    this.roleOption.isPagination = this.roleData.length > this.roleOption.paginationSize;
  },
  filters: {},
  methods: {
    /** 拉取菜单列表*/
    fetchMenuList() {
      this.menuLoading = true;
      getMenuList().then(res => {
        console.log('获取菜单列表', res);
        if (res.code === 20000) {
          this.menuList = res.data;
        }
        this.menuLoading = false;
      }).catch(() => {
        this.menuLoading = false;
      })
    },
    /** 多选*/
    selectionChange(ev) {
      console.log('多选返回的结果：', ev)
      this.delRoleList = ev;
    },
    /** 点击新增新用户*/
    addNewRole() {
      this.addRoleFormData = {}; // 初始化新增的表单数据
      this.dialogAddRole = true;
    },
    /** 点击删除*/
    handleDelete(ev) {
      console.log('点击删除', ev);
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.isCan();
      }).catch(() => {
      });
    },
    /** 点击编辑*/
    handleEdit(ev) {
      console.log('点击编辑', ev);
      if (ev.row.menuPower) {
        this.defaultCheckedMenuKeys = ev.row.menuPower || [];
      }
      this.addRoleFormData = ev.row; // 赋值当前需要更新的数据
      this.dialogAddRole = true; //显示编辑的弹窗
    },
    /** 演示环境不能操作次动作*/
    isCan() {
      this.$message.error('演示环境不能操作次动作');
    },
    /** 新增弹窗操作以下*/
    /** 选中的菜单列表*/
    getCheckedKeys() {
      console.log(this.$refs.menuTree.getCheckedKeys());
    },
    /** 点击取消*/
    handleDialogAddUserClose() {
      this.dialogAddRole = false;
    },
    /** 点击保存*/
    handleAddNewRole(ev) {
      console.log('点击保存:', ev);
      if (ev.status === 1) {
        let data = ev.data;
        /** 以下方法为静态的方法，如需上线，应该联调接口*/
        // 选中的菜单列表
        data['menuPower'] = this.$refs.menuTree.getCheckedKeys();
        //如果有id，则为编辑的状态
        if (data.id) {
          let isIndex = this.roleData.findIndex(ui => ui.id === data.id);
          if (isIndex >= 0) { // 存在
            this.roleData[isIndex] = data;
            this.$message.success('编辑成功');
          }
        } else {
          let time = new Date();
          ev.data['createTime'] = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
          ev.data['id'] = this.roleData[this.roleData.length - 1]['id'] + 1;
          this.roleData.push(data);
          this.$message.success('新增成功');
        }
        this.handleDialogAddUserClose();
      }
    },
  }
}
