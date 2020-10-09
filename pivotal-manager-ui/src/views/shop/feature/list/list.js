import './list.scss'

export default {
  name: 'FeatureList',
  components: {},
  data() {
    return {
      list: [
        {
          id: 1,
          title: '店铺主页',
          created_time: '2019-08-21 23:20:19',
          goods_num: 2,
          bro_uvpv: '1/1',
          shop_uvpv: '0/0',
          isHome: true
        },
        {
          id: 2,
          title: '活动页面',
          created_time: '2019-09-21 23:20:19',
          goods_num: 2,
          bro_uvpv: '1/1',
          shop_uvpv: '0/0'
        }
      ],
      option: {
        menuDeleteOption: {
          type: 'text'
        },
        menuEditOption: {
          type: 'text'
        },
        isPagination: true,
        paginationTotal: 5,
        paginationCurrent: 1,
        paginationSize: 20,
        column: [
          {
            label: '标题',
            prop: 'title',
            slotName: 'title'
          },
          {
            label: '创建时间',
            prop: 'created_time'
          },
          {
            label: '商品数',
            prop: 'goods_num'
          },
          {
            label: '访客数/浏览量',
            prop: 'bro_uvpv'
          },
          {
            label: '商品访客数/商品浏览量',
            prop: 'shop_uvpv'
          }
        ]
      }
    }
  },
  computed: {},
  methods: {
    /** 跳转编辑页面*/
    goCreatePage() {
      this.$router.push({
        name: 'featureCreate'
      })
    },
    /** 点击编辑*/
    handleEdit(item) {
      this.$router.push({
        name: 'featureCreate',
        query: {
          id: item.row.id,
          type: 'edit'
        },
      })
    },
    /** 点击删除*/
    handleDelete(item) {
      console.log(item);
      let row = item.row;
      if (row.isHome) {
        this.$message.error('不能删除主页');
        return;
      }
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.$message.error('预览环境不能删除');
      }).catch(() => {
      });
    },
  }
}
