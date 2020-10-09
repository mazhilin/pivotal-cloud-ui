import './dingding.scss'
import {getList} from '@/api/ding';

export default {
  name: 'MessageDingDing',
  components: {},
  data() {
    return {
      /** 请求列表加载*/
      loading: false,
      dialogDingDing: false,
      list: [],
      option: {
        menuDeleteOption: {
          type: 'text'
        },
        menuEditOption: {
          type: 'text'
        },
        isPagination: true,
        paginationTotal: 0,
        paginationCurrent: 1,
        paginationSize: 10,
        menuWidth: 150,
        menuFixed: 'right',
        column: [
          {
            label: '标题',
            prop: 'title',
            width: 200,
          },
          {
            label: '群名称',
            prop: 'name',
            width: 200,
          },
          {
            label: '类型',
            prop: 'type',
            slotName: 'type',
            width: 150,
          },
          {
            label: '状态',
            prop: 'switch',
            width: 200,
            slotName: 'switch'
          },
          {
            label: 'accessToken',
            prop: 'access_token',
            slotName: 'accessToken',
          },
          {
            label: '创建时间',
            prop: 'create_time',
            width: 150,
          },
        ]
      },
      //添加配置
      id: null,
      formObj: {
        type: 1, // 默认类型是添加购物车
        title: '',//标题
        name: '',//群名称
        switch: 0,//状态
        access_token: '',//钉钉token
      },
      formOption: {
        labelWidth: '120px',
        itemSize: 'mini',
        column: [
          {
            children: [
              {
                itemLabel: '标题: ',
                type: 'input',
                model: 'title',
                clearable: true,
                placeholder: '通知标题',
                itemProp: 'title',
                itemRules: [
                  {required: true, message: '请输入通知标题', trigger: 'blur'}
                ],
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '群名称: ',
                type: 'input',
                model: 'name',
                clearable: true,
                placeholder: '输入群名称方便记忆',
              }
            ]
          },
          {
            children: [
              {
                itemLabel: '类型： ',
                type: 'select',
                model: 'type',
                data: [
                  {
                    value: 1,
                    label: '加入购物车'
                  },
                  {
                    value: 2,
                    label: '创建订单',
                    disabled: true,
                  },
                  {
                    value: 3,
                    label: '付款下单'
                  },
                ],
              },
            ]
          },
          {
            children: [
              {
                itemLabel: '开关: ',
                type: 'switch',
                model: 'switch',
                activeValue: 1,
                inactiveValue: 0,
              }
            ]
          },
          {
            children: [
              {
                itemLabel: 'accessToken: ',
                type: 'input',
                model: 'access_token',
                itemProp: 'access_token',
                itemRules: [
                  {required: true, message: '请输入钉钉的access_token', trigger: 'blur'}
                ],
                clearable: true,
                placeholder: '钉钉的access_token',
              }
            ]
          },
        ]
      },
    }
  },
  computed: {},
  filters: {
    theType(val) {
      let text = '';
      switch (val) {
        case 1: // 加入购物车
          text = '加入购物车';
          break;
        case 2:
          text = '创建订单';
          break;
        case 3:
          text = '付款下单';
          break;
      }
      return text;
    },
  },
  mounted() {
    this.getList();
  },
  watch: {},
  methods: {
    /** 钉钉配置列表*/
    /** 分页回调*/
    paginationChance(ev) {
      let current = ev.data.current;
      if (ev.data.size !== this.option.paginationSize) {
        current = 1
      }
      this.option.paginationSize = ev.data.size;
      this.option.paginationCurrent = current;
    },
    /** 获取配置列表*/
    getList() {
      const par = {
        page: this.option.paginationCurrent,
        size: this.option.paginationSize
      };
      this.loading = true;
      getList(par).then(res => {
        console.log('res===', res)
        this.loading = false;
        if (res.code === 20000) {
          this.list = res.data;
          this.option.paginationTotal = 4;
        }
      }).catch(() => {
        this.loading = false;
      })
    },
    /** 隐藏或显示dialogDingDing*/
    hideOrShowFun($isHide = false) {
      this.dialogDingDing = $isHide;
      if (!$isHide) {
        // 隐藏时，清除ID
        this.id = null;
        // 初始化表单数据
        this.formObj = {
          type: 1, // 默认类型是添加购物车
          title: '',//标题
          name: '',//群名称
          switch: 0,//状态
          access_token: '',//钉钉token
        }
      }
      this.getList();
    },
    /** 弹窗的取消按钮*/
    cancel() {
      this.hideOrShowFun();
    },
    /** 弹窗的保存按钮*/
    saveFun() {
      this.$refs.form.submit();
    },
    /** eVue form 返回的数据*/
    submitFun(ev) {
      console.log('返回的数据', ev);
      if (ev.status === 1) {
        let par = JSON.parse(JSON.stringify(ev.data));
        if (this.id) {
          par['id'] = this.id;
        }
        this.pushData(par);
      } else {
        this.$message.error(res.msg);
      }
    },
    /** 发送信息*/
    pushData(par, cb) {
      console.log('保存', par);
      this.$message.error('演示不能操作');
    },
    /** 点击编辑*/
    handleEdit(ev) {
      const data = ev.row;
      this.id = data.id;
      for (let ol in data) {
        if (this.formObj.hasOwnProperty(ol)) {
          this.formObj[ol] = data[ol];
        }
      }
      this.hideOrShowFun(true);
    },
    /** 点击删除*/
    handleDelete() {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.error('演示不能操作');
      }).catch(() => {
      });
    },
    /** 显示隐藏*/
    switchChange(val) {
      console.log('显示隐藏', val);
    },
    /** 测试通知*/
    testMessage() {
      this.$message.error('当前环境为演示，请链接后端接口进行测试');
    },
  }
}
