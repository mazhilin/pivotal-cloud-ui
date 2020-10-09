import './role-assigning-users.scss';
// 角色分配的用户列表
//下面的静态指的没有对接api
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
      delUserList: [],//需要删除的列表
      // table的配置
      userOption: {
        isPagination: true,
        paginationTotal: 0,
        paginationCurrent: 1,
        paginationSize: 20,
        isSelection: true,
        isMenuEdit: false,
        menuEditOption: {
          type: 'text'
        },
        menuDeleteTitle: '取消授权',
        column: [
          {
            label: '登录名称',
            prop: 'loginName',
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
          },
          {
            label: '创建时间',
            prop: 'createTime'
          },
        ]
      },
      dialogAddUser: false,//添加用户的弹窗
      // 添加用戶弹窗table的配置
      addUserPopOption: {
        isPagination: true,
        paginationTotal: 0,
        paginationCurrent: 1,
        paginationSize: 20,
        isSelection: true,
        isMenu: false,
        column: [
          {
            label: '登录名称',
            prop: 'loginName',
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
          },
          {
            label: '创建时间',
            prop: 'createTime'
          },
        ]
      },
      addUserList: [],//需要添加的用户列表
    }
  },
  watch: {
    dialogAddUser(val) {
      if (!val) {
        this.addUserList = []; // 初始化添加用户列表
      }
    }
  },
  computed: {},
  mounted() {
    copyUserData = this.userData;
    this.userOption.isPagination = this.userData.length > this.userOption.paginationSize;
  },
  filters: {},
  methods: {
    /** 多选*/
    selectionChange(ev) {
      console.log('多选返回的结果(将要删除的数据)：', ev);
      this.delUserList = ev;
    },
    /** 点击删除*/
    handleDelete(ev) {
      console.log('点击取消授权', ev);
      this.$confirm('确定要对用户取消授权吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.isCan();
      }).catch(() => {
      });
    },
    /** 静态用户过滤的方法*/
    userDataFilter() {
      let {mobile, userName, status} = this.userDataSearch;
      this.userData = copyUserData.filter(item => {
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
    /** 添加弹窗操作以下*/
    selectionAddUserChange(ev) {
      console.log('需要添加的用户列表：', ev);
      this.addUserList = ev;
    },
    /** 添加用户*/
    addUserFun() {
      console.log('添加用户:', this.addUserList);
    },
  }
}
