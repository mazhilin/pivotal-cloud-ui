export default {
  addRoleOption: {
    itemSize: 'small',
    column: [
      {
        children: [
          {
            itemLabel: '角色名称: ',
            type: 'input',
            model: 'roleName',
            clearable: true,
            placeholder: '请输入角色名称',
            itemProp: 'roleName',
            itemRules: [
              {required: true, message: '请输入角色名称', trigger: 'blur'}
            ],
          }
        ]
      },
      {
        children: [
          {
            itemLabel: '权限字符: ',
            type: 'input',
            model: 'roleKey',
            clearable: true,
            placeholder: '请输入权限字符',
            itemProp: 'roleKey',
            itemRules: [
              {required: true, message: '请输入权限字符', trigger: 'blur'}
            ],
            desc: '控制器中定义的权限字符'
          },
        ]
      },
      {
        children: [
          {
            itemLabel: '显示顺序 :',
            type: 'inputNumber',
            model: 'roleSort',
            min: 1
          }
        ]
      },
      {
        children: [
          {
            itemLabel: '状态 :',
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
            itemLabel: '菜单权限 :',
            slotName: 'menuPower',
          }
        ]
      },
    ]
  }
}