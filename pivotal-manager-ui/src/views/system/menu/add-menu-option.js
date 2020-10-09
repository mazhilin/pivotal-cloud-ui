/**
 * 添加菜单的配置
 * */
export const addMenuOption = {
  name: 'add-menu-option',
  props: {},
  data() {
    return {}
  },
  watch: {
    /** 监听当前新建菜单的类型*/
    currentMenuType(val) {
      this.setAddMenuOption();
    },
  },
  mounted() {
  },
  methods: {
    /** 根据菜单类型组装配置*/
    setAddMenuOption() {
      let column = [
        {
          children: [
            {
              itemLabel: '上级菜单',
              slotName: 'parent',
              itemProp: 'parentId',
              itemRules: [
                {required: true, message: '请选择上级菜单', trigger: 'blur'}
              ],
            },
          ]
        },
        {
          children: [
            {
              itemLabel: '菜单类型',
              type: 'radio',
              model: 'menuType',
              inline: true,
              data: [
                {
                  value: 'D',
                  label: '目录',
                },
                {
                  value: 'M',
                  label: '菜单',
                },
                {
                  value: 'B',
                  label: '按钮',
                },
              ],
            }
          ]
        },
        {
          children: [
            {
              itemLabel: '菜单名称',
              type: 'input',
              model: 'menuName',
              clearable: true,
              placeholder: '请输入菜单名称',
              itemProp: 'menuName',
              itemRules: [
                {required: true, message: '请输入菜单名称', trigger: 'blur'}
              ],
            }
          ]
        },
        {
          children: [
            {
              itemLabel: '显示排序',
              model: 'order',
              type: 'inputNumber',
              min: 0,
              controlsPosition: 'right'
            }
          ]
        },
      ];
      // 目录 D,菜单 M,B 按钮
      const menuTye = this.addMenuForm.menuType;
      if (menuTye === 'D' || menuTye === 'M') {
        let menuTypeDOrM = [
          {
            children: [
              {
                itemLabel: '路由地址',
                type: 'input',
                model: 'path',
                clearable: true,
                placeholder: '请输入路由地址',
                itemProp: 'path',
                itemRules: [
                  {required: true, message: '请输入路由地址', trigger: 'blur'}
                ],
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '是否外链',
                type: 'radio',
                model: 'isFrame',
                inline: true,
                data: [
                  {
                    value: 1,
                    label: '是',
                  },
                  {
                    value: 0,
                    label: '否',
                  },
                ],
              }
            ]
          },
        ];
        if (menuTye === 'M') {
          menuTypeDOrM = menuTypeDOrM.concat([
            {
              children: [
                {
                  itemLabel: '组件路径',
                  type: 'input',
                  model: 'component',
                  clearable: true,
                  placeholder: '请输入组件路径',
                }
              ]
            },
            {
              children: [
                {
                  itemLabel: '权限标识',
                  type: 'input',
                  model: 'perms',
                  clearable: true,
                  placeholder: '请输入权限标识',
                }
              ]
            }
          ]);
        }
        menuTypeDOrM.push({
          children: [
            {
              itemLabel: '菜单状态',
              type: 'radio',
              model: 'visible',
              inline: true,
              data: [
                {
                  value: 1,
                  label: '显示',
                },
                {
                  value: 0,
                  label: '隐藏',
                },
              ],
            }
          ]
        })
        column = column.concat(menuTypeDOrM);
      }
      if (menuTye === 'B') {
        column.push({
          children: [
            {
              itemLabel: '权限标识',
              type: 'input',
              model: 'perms',
              clearable: true,
              placeholder: '请输入权限标识',
            }
          ]
        },)
      }
      this.addMenuOption.column = column;
      this.$forceUpdate();
    },
  }
};
