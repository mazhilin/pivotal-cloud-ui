<template>
  <div class="app-container-10 container-f0f2f5 app-main coupon-list-container">
    <div class="container-fff app-container-15 app-ele-border-radius-0">
      <div class="card-wrap">
        <div class="card-wrap-item" v-for="(item,index) in cards" :key="index">
          <div>
            <div class="card-title">{{item.title}}</div>
            <div class="card-desc" v-html="item.desc"></div>
          </div>
          <el-button type="primary" size="small" @click="commonPushPage('couponCreate')">立即新建</el-button>
        </div>
      </div>

      <!--搜索-->
      <div class="coupon-search">
        <evue-form v-model="formObj" :option="formOption">
          <template v-slot:btnList>
            <div class="coupon-btn">
              <el-button type="primary" size="mini">确定</el-button>
              <el-button size="mini">导出</el-button>
              <el-button size="mini">查看已导出报表</el-button>
              <el-button type="text" size="mini">重置筛选条件</el-button>
            </div>
          </template>
        </evue-form>
      </div>

      <!--商品列表-->
      <div class="content-box">
        <evue-table
          :data="list"
          :option="option"
          @paginationChance="paginationChance"
          @handleEdit="handleEdit"
          @handleDelete="handleDelete"
        >
          <!--最右边操作-->
          <template v-slot:menu="props">
            <el-button size="mini" type="text" @click="handleCopy(props.data)">复制</el-button>
          </template>
        </evue-table>
      </div>
    </div>
  </div>
</template>

<script>
  import List from './list'

  export default List
</script>
