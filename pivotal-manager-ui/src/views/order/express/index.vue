<template>
  <div class="app-container-10 container-f0f2f5 app-main order-express-container">
    <div class=" container-fff app-container-15 app-ele-border-radius-0">
      <noTo />
      <div v-if="false">
        <div class="order-tabs">
          <el-tabs type="border-card">
            <el-tab-pane label="销售中" />
            <el-tab-pane label="已售罄" />
            <el-tab-pane label="仓库中" />
          </el-tabs>
        </div>
        <el-button type="primary" size="mini" @click="goCreatePage">发布商品</el-button>
        <!--搜索-->
        <div class="order-search">
          <evue-form v-model="formObj" :option="formOption">
            <template v-slot:btnList>
              <el-button type="primary" size="mini">确定</el-button>
              <el-button size="mini">导出报表</el-button>
              <el-button size="mini">查看已生成报表</el-button>
              <el-button type="text" size="mini">清空筛选条件</el-button>
            </template>
          </evue-form>
        </div>
        <!--商品列表-->
        <div class="content-box">
          <evue-table
            :data="list"
            :option="option"
          >
            <!--商品 价格-->
            <template v-slot:title="props">
              <div class="order-name">
                <img :src="props.data.imageUrl" alt="">
                <div class="order-name-item">
                  <p>
                    {{ props.data.title }}
                    <span class="title-edit" />
                  </p>
                  <span>￥ {{ props.data.price }}</span>
                </div>
              </div>
            </template>

            <!--访问量-->
            <template v-slot:visitCountUv="props">
              <p>访客数:{{ props.data.visitCountUv }}</p>
              <p>浏览量:{{ props.data.visitCountPv }}</p>
            </template>

            <!--最右边操作-->
            <template v-slot:menu="props">
              <el-button size="mini" type="text">复制</el-button>
            </template>
          </evue-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Express from './express'

  export default Express
</script>
