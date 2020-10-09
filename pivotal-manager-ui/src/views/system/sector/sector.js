import './sector.scss'
import {sectorList} from '@/api/system/sector'

/** 系统管理-部门管理*/
export default {
  name: 'systemSector',
  components: {},
  data() {
    return {
      /** 搜索配置*/
      searchModel: {
        sectorName: '',
        status: '',
      },
      tableData: [],
      /** 显示新增部门弹窗*/
      dialogAddSector: false,
      addSectorForm: {
        status: 1,//默认状态为正常
        parentId: null,
      },
      addSectorOption: {
        itemSize: 'small',
        submitBtn: true,
        submitType: 'primary',
        labelWidth: '80px',
        menuAlign: 'right',
        column: [
          {
            children: [
              {
                itemLabel: '上级部门',
                slotName: 'parent',
                itemProp: 'parentId',
                itemRules: [
                  {required: true, message: '请选择上级部门', trigger: 'blur'}
                ],
              },
            ]
          },
          {
            children: [
              {
                itemLabel: '部门名称',
                type: 'input',
                model: 'sectorName',
                clearable: true,
                placeholder: '请输入部门名称',
                itemProp: 'sectorName',
                itemRules: [
                  {required: true, message: '请输入部门名称', trigger: 'blur'}
                ],
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '负责人',
                type: 'input',
                model: 'userName',
                clearable: true,
                placeholder: '请输入负责人名称',
                /*  itemProp: 'userName',
                  itemRules: [
                    {required: true, message: '请输入负责人名称', trigger: 'blur'}
                  ],*/
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '联系电话',
                type: 'input',
                model: 'mobile',
                clearable: true,
                /*      placeholder: '请输入联系电话',
                      itemProp: 'mobile',
                      itemRules: [
                        {required: true, message: '请输入联系电话', trigger: 'blur'}
                      ],*/
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '邮箱',
                type: 'input',
                model: 'email',
                clearable: true,
                placeholder: '请输入邮箱',
                /*   itemProp: 'email',
                   itemRules: [
                     {required: true, message: '请输入邮箱', trigger: 'blur'}
                   ],*/
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '状态',
                type: 'radio',
                model: 'status',
                inline: true,
                data: [
                  {
                    value: 1,
                    label: '正常',
                  },
                  {
                    value: 2,
                    label: '停用',
                  },
                ],
              }
            ]
          },
        ]
      },
    }
  },
  computed: {},
  mounted() {
    this.getList();
  },
  filters: {},
  methods: {
    /** 获取部门列表*/
    getList() {
      this.loading = true;
      sectorList().then(res => {
        console.log('获取部门列表', res)
        if (res.code === 20000) {
          this.tableData = res.data.items;
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
      this.dialogAddSector = false;
      this.$refs.addSectorForm.resetFields();
    },
  }
}
