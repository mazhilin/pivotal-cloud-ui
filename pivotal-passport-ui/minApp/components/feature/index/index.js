/**
 * 使用
 * <feature bind:myFun="myFun"></feature>
 * @code
 * @data
 * */
Component({
  properties: {
    isShowMicro: {
      type: Boolean,
      value: true,
    },
    wid: { // ID
      type: String,
      value: ''
    },
    pageLoad: {
      type: Boolean,
      value: false,
      observer: function () {
        this.getInfo()
      }
    }
  },
  data: {
    list: []
  },
  methods: {
    /**开始获取详情*/
    getInfo() {
      /** 模拟数据*/
      let getAPiData = '[{"type":"config","dataField":{"title":"页面标题","description":"","category":"","gmtStart":""}},{"type":"notice","dataField":{"content":"公告","bg_color":"#fff8e9","color":"#666666"}},{"type":"title_text"},{"type":"goods","dataField":{"size":2,"show_content":[1,3,4],"goods":[10,11,13,13],"buy_btn_type":1,"button_text":"马上抢"}},{"type":"image_ad","dataField":{"indicator":4,"imageList":[{"url":"http://cdn.ifnav.com/evue/huodong.png","title":"","link":"","type":"","activeBoxs":[{"link":10,"title":"液体颊彩1","width":151,"height":261,"left":0,"top":0,"translateX":9,"translateY":119,"type":1},{"link":10,"title":"液体颊彩1","width":146,"height":259,"left":0,"top":0,"translateX":171,"translateY":120,"type":1},{"link":13,"title":"液体颊彩13","width":155,"height":257,"left":0,"top":0,"translateX":330,"translateY":123,"type":1},{"link":13,"title":"液体颊彩13","width":153,"height":238,"left":0,"top":0,"translateX":14,"translateY":578,"type":1},{"link":13,"title":"液体颊彩13","width":155,"height":244,"left":0,"top":0,"translateX":174,"translateY":577,"type":1},{"link":13,"title":"液体颊彩13","width":151,"height":240,"left":0,"top":0,"translateX":336,"translateY":578,"type":1}]}]}}]';
      let pageData = JSON.parse(getAPiData);
      this.setData({
        list: pageData,
      });
      this.triggerEvent('myFun', {
        code: 0,
        data: '通知父级已经完成',
      }, {});
    },

  },
  ready() {
    //this.getInfo();
  }
});
