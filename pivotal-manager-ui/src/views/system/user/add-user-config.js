export default {
  addUserOption: {
    itemSize: 'small',
    column: [
      {
        children: [
          {
            itemLabel: '用户名称: ',
            type: 'input',
            model: 'userName',
            clearable: true,
            placeholder: '请输入用户名称',
            itemProp: 'userName',
            itemRules: [
              {required: true, message: '请输入用户名称', trigger: 'blur'}
            ],
          },
          {
            itemLabel: '登录账号: ',
            type: 'input',
            model: 'loginName',
            clearable: true,
            placeholder: '请输入登录账号',
            itemProp: 'loginName',
            itemRules: [
              {required: true, message: '请输入登录账号', trigger: 'blur'}
            ],
          },
        ]
      },
      {
        children: [
          {
            itemLabel: '手机号码: ',
            type: 'input',
            model: 'mobile',
            clearable: true,
            placeholder: '请输入手机号码',
            itemProp: 'mobile',
            itemRules: [
              {required: true, message: '请输入手机号码', trigger: 'blur'}
            ],
          },
          {
            itemLabel: '邮箱: ',
            type: 'input',
            model: 'email',
            clearable: true,
            placeholder: '请输入邮箱',
            itemProp: 'email',
            itemRules: [
              {required: true, message: '请输入邮箱', trigger: 'blur'}
            ],
          },
        ]
      },
      {
        children: [
          {
            itemLabel: '登陆密码: ',
            type: 'input',
            model: 'password',
            eleType: 'password',
            clearable: true,
            placeholder: '请输入邮箱',
            itemProp: 'password',
            itemRules: [
              {required: true, message: '请输入登陆密码', trigger: 'blur'}
            ],
          },
          {
            itemLabel: '用户性别： ',
            type: 'select',
            model: 'sec',
            clearable: true,
            filterable: true,
            data: [
              {
                value: 1,
                label: '男'
              },
              {
                value: 2,
                label: '女'
              },
              {
                value: 3,
                label: '未知'
              },
            ],
          },
        ]
      },
      {
        children: [
          {
            itemLabel: '归属部门: ',
            slotName: 'sectorSlot',
          },
        ]
      },
      {
        children: [
          {
            itemLabel: '岗位: ',
            type: 'select',
            model: 'value1',
            multiple: true,
            data: [
              {
                value: 1,
                label: '前端工程师'
              },
              {
                value: 2,
                label: '后端工程师'
              },
              {
                value: 3,
                label: '设计工程师'
              },
              {
                value: 4,
                label: '测试工程师'
              },
            ],
          },
          {
            itemLabel: '账户状态 :',
            type: 'switch',
            model: 'status',
            inactiveValue: 0,
            activeValue: 1,
          }
        ]
      },
      {
        children: [
          {
            itemLabel: '角色 :',
            type: 'checkbox',
            model: 'role',
            isGroup: true,
            data: [
              {
                value: 1,
                label: '管理员',
              },
              {
                value: 2,
                label: '运营人员',
              },
              {
                value: 3,
                label: '数据报表管理员',
              },
              {
                value: 4,
                label: '财务',
              },
            ],
          }
        ]
      },
      {
        children: [
          {
            itemLabel: '备注 :',
            type: 'input',
            model: 'desc',
            eleType: 'textarea',
            placeholder: '',
            rows: 2,
          },
        ]
      }
    ]
  }
}