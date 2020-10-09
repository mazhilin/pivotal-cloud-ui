import './user.scss'
import {sectorList} from '@/api/system/sector';
// 新增用户的form 配置
import addUserConfig from './add-user-config';

/**
 * 下面的静态指的没有对接api
 * */
let copyUserData = [];//复制一份用户数据,为了下面的筛选用户列表，如果接入api数据，就不需要
export default {
  name: 'systemUser',
  components: {},
  data() {
    return {
      //用户数据
      userData: [
        {
          id: 1,
          loginName: 'admin',
          userName: 'EVue',
          sector: 'IT部',
          email: '2052021114@qq.com',
          mobile: '15766666666',
          status: 1,
          createTime: '2020-03-01',
        },
        {
          id: 2,
          loginName: 'me',
          userName: 'EVue',
          sector: '市场部',
          email: '2052021114@qq.com',
          mobile: '15766666666',
          status: 1,
          createTime: '2020-03-01',
        },
      ],
      // 用户列表搜索
      userDataSearch: {
        sector: '',//部门
        userName: '',//用户名
        mobile: '',//手机号
        status: '',//用户状态
      },
      currentChooseSector: {}, // 当前选择的部门，为了静态过滤用户数据
      delUserList: [],//需要删除的列表
      // table的配置
      userOption: {
        isPagination: true,
        paginationTotal: 0,
        paginationCurrent: 1,
        paginationSize: 20,
        isSelection: true,
        selectionKey: 'id', // 唯一值,为了分页选中用户
        menuDeleteOption: {
          type: 'text'
        },
        menuEditOption: {
          type: 'text'
        },
        column: [
          {
            label: '用户ID',
            prop: 'id',
            width: '70',
          },
          {
            label: '登录名称',
            prop: 'loginName',
            width: '100',
          },
          {
            label: '用户名称',
            prop: 'userName'
          },
          {
            label: '部门',
            prop: 'sector'
          },
          {
            label: '邮箱',
            prop: 'email'
          },
          {
            label: '手机',
            prop: 'mobile'
          },
          {
            label: '用户状态',
            prop: 'status',
            slotName: 'userStatus',
            width: '70',
          },
          {
            label: '创建时间',
            prop: 'createTime'
          },
        ]
      },
      //部门信息
      sectorData: [],
      // 获取部门信息列表加载状态
      sectorDataLoading: false,
      dialogResetUserPassword: false,//是否显示重置用户密码的弹窗
      currentEditUser: {},// 当前需要重置的用户
      dialogAddUser: false,//添加用户的弹窗
      addUserFormData: {
        role: [],//角色数组
      }, // 新增用户表单数据
      addUserOption: addUserConfig.addUserOption,
    }
  },
  computed: {},
  mounted() {
    copyUserData = this.userData;
    this.userOption.isPagination = this.userData.length > this.userOption.paginationSize;
    this.fetchSectorDataList();
  },
  filters: {},
  methods: {
    /** 多选*/
    selectionChange(ev) {
      console.log('多选返回的结果(将要删除的数据)：', ev);
      this.delUserList = ev;
    },
    /** 点击新增新用户*/
    addNewUser() {
      this.addUserFormData = {
        role: [],//角色数组
      }; // 初始化新增的表单数据
      this.dialogAddUser = true;
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
      this.addUserFormData = ev.row; // 赋值当前需要更新的数据
      this.dialogAddUser = true; //显示编辑的弹窗
    },
    /**拉取部门信息列表*/
    fetchSectorDataList() {
      this.sectorDataLoading = true;
      sectorList().then(res => {
        if (res.code === 20000) {
          this.sectorData = res.data.items;
        }
        this.sectorDataLoading = false;
      }).catch(() => {
        this.sectorDataLoading = false;
      })
    },
    /** 点击部门节点*/
    handleSectorNodeClick(data) {
      console.log('点击部门节点:', data);
      /**
       * 静态用户列表过滤
       * 目前id=1的是全部的
       * */
      this.currentChooseSector = data.id === 1 ? '' : data;
      // this.userDataSearch.sector = data.id === 1 ? '' : data.name;
      this.userDataFilter();
    },
    /** 静态用户过滤的方法*/
    userDataFilter() {
      let {mobile, userName, status} = this.userDataSearch;
      this.userData = copyUserData.filter(item => {
        if (this.currentChooseSector.name) { // 已经选择了部门
          if (this.currentChooseSector.children && this.currentChooseSector.children.find(ci => item.sector.includes(ci.name))) {
            return true;
          } else if (!item.sector.includes(this.currentChooseSector.name)) {
            return false;
          }
        }
        if (mobile && !item.mobile.includes(mobile)) return false;
        if (userName && !item.userName.includes(userName)) return false;
        if (status !== '' && item.status !== status) return false;
        return true;
      });
    },
    /** 演示环境不能操作次动作*/
    isCan() {
      this.$message.error('演示环境不能操作次动作');
    },
    /** 点击重置密码*/
    handleResetPassword(data) {
      console.log('data:', data);
      this.currentEditUser = data;
      this.dialogResetUserPassword = true;
    },
    /** 点击保存*/
    resetPasswordFun() {
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          this.$message.success('重置成功');
          this.dialogResetUserPassword = false;
        } else {
          return false;
        }
      });
    },
    /** 新增弹窗操作以下*/
    /** 点击取消*/
    handleDialogAddUserClose() {
      this.dialogAddUser = false;
    },
    /** 点击保存*/
    handleAddNewUser(ev) {
      console.log('点击保存:', ev);
      if (ev.status === 1) {
        let data = ev.data;
        /** 以下方法为静态的方法，如需上线，应该联调接口*/
        if (data.id) { // 如果有id，则为编辑的状态
          let isIndex = this.userData.findIndex(ui => ui.id === data.id);
          if (isIndex >= 0) { // 存在
            this.userData[isIndex] = data;
            this.$message.success('编辑成功');
          }
        } else {
          ev.data['id'] = this.userData[this.userData.length - 1]['id'] + 1;
          this.userData.push(data);
          this.$message.success('新增成功');
        }
        this.handleDialogAddUserClose();
      }
    },
  }
}
