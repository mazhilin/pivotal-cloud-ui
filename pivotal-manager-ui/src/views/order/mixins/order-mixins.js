/**
 * order-mixins
 * */
import {orderClose} from '@/api/order'

export const orderMixins = {
  name: 'order-mixins',
  props: {},
  data() {
    return {}
  },
  mounted() {
  },
  filters: {
    orderStatus(val) {
      /** orderShowStatus 0等待买家付款 1未发货、2已发货、3完成、4已关闭 5已取消*/
      let str = '';
      switch (val) {
        case 0:
          str = '等待买家付款';
          break;
        case 1:
          str = '等待商家发货';
          break;
        case 2:
          str = '商家已发货';
          break;
        case 3:
          str = '已完成';
          break;
        case 4:
          str = '已关闭';
          break;
        case 5:
          str = '已取消';
          break;
      }
      return str;
    },
    /** 规格*/
    skuSpec(val) {
      let text = '';
      let skuSpec = JSON.parse(val);
      for (let ol in skuSpec) {
        text = text ? text + " " + skuSpec[ol] : skuSpec[ol];
      }
      return text;
    },
    refundStatusFilter(val) {
      let str = '';
      switch (val) {
        case 0:
          str = '买家发起维权';
          break;
        case 1:
          str = '商家拒绝维权';
          break;
        case 2:
          str = '商家接受维权';
          break;
        case 3:
          str = '买家发货';
          break;
        case 4:
          str = '商家没有收到货';
          break;
        case 5:
          str = '商家换货中';
          break;
        case 6:
          str = '商家接受维权';
          break;
        case 7:
          str = '维权结束';
          break;
        case 8:
          str = '维权关闭';
          break;
      }
      return str;
    },
  },
  methods: {
    /** 取消订单*/
    orderClose($id, $getFun) {
      if (!$id) return;
      this.$confirm('确定要取消该订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.closeOrderStart($id, $getFun);
      }).catch(() => {
      });
    },
    closeOrderStart($id, $getFun, resMsg = '', isNeedMsg = true) {
      orderClose({id: $id}).then(res => {
        if (res.msg && isNeedMsg) {
          let resMsgContent = '';
          if (resMsg) {
            resMsgContent = res.code === 1 ? resMsg + '成功' : resMsg + '失败';
          }
          this.$message[res.code === 1 ? 'success' : 'error'](resMsgContent || res.msg);
        }
        if (res.code === 1) {
          if ($getFun) {
            this[$getFun]();
          }
        }
      })
    },
    /**
     * 时间转换
     * micro_second  秒数
     * $isHr 是否需要放回小时
     * */
    dateFormat(micro_second, $isHr = false) {
      // 秒数
      let second = Math.floor(micro_second / 1000);
      // 小时位
      let hr = Math.floor(second / 3600);
      // 分钟位
      let min = this.fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
      // 秒位
      let sec = this.fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
      let time = min + ":" + sec;
      if ($isHr) {
        time = hr + ":" + min + ":" + sec;
      }
      return time;
    },
    /** 位数不足补零*/
    fill_zero_prefix(num) {
      return num < 10 ? "0" + num : num
    },
  }
};
