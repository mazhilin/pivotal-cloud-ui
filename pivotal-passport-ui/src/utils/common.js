export default {
  /** 判断是否为json格式*/
  isJson(str) {
    if (typeof str === 'string') {
      try {
        let obj = JSON.parse(str);
        return !!(typeof obj === 'object' && obj);
      } catch (e) {
        return false;
      }
    }
  },
}
