const list = [{
  "id": 1,
  "name": "加购与付款",
  "title": "加入购物车通知",
  "type": 1,
  "switch": 1,
  "access_token": "632fa2e3069131654a40480cc1dbcc8b87337f0f79a4be1b8bd6bf6feed1e32f",
  "tenant_id": 99,
  "user_id": 3,
  "create_time": "2019-12-25 23:56:24",
  "modified_name": "n年",
  "modified_id": 3,
  "modified_time": 1577293221
}, {
  "id": 2,
  "name": "董事会",
  "title": "加购通知",
  "type": 1,
  "switch": 0,
  "access_token": "68998dcb2b42ff0a3937d451eb96b0few87b9d176b3b705195",
  "tenant_id": 99,
  "user_id": 3,
  "create_time": "2019-12-26 00:39:37",
  "modified_name": "n年",
  "modified_id": 3,
  "modified_time": 1577326914
}, {
  "id": 5,
  "name": "加购与付款",
  "title": "下单通知",
  "type": 2,
  "switch": 1,
  "access_token": "632fa2e3069131654a40480cc1dbcc8b8ew1b8bd6bf6feed1e32f",
  "tenant_id": 99,
  "user_id": 3,
  "create_time": "2019-12-26 10:22:22",
  "modified_name": "",
  "modified_id": 0,
  "modified_time": 0
}, {
  "id": 6,
  "name": "加购与付款",
  "title": "付款成功通知",
  "type": 3,
  "switch": 1,
  "access_token": "632fa2e3069131654a40480cc1dbccewbe1b8bd6bf6feed1e32f",
  "tenant_id": 99,
  "user_id": 3,
  "create_time": "2019-12-26 10:22:51",
  "modified_name": "",
  "modified_id": 0,
  "modified_time": 0
}];

export default [
  {
    url: '/ding',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: list
      }
    }
  },
]
