<template>
  <div class="app-container-10 container-f0f2f5 app-main feature-list-container">
    <div class="feature-list-content container-fff app-container-15 app-ele-border-radius-0">
      <el-button type="primary" size="small" @click="goCreatePage">新建微页面</el-button>
      <!--微页面列表-->
      <div class="content-box">
        <evue-table
          :data="list"
          :option="option"
          @handleEdit="handleEdit"
          @handleDelete="handleDelete"
        >
          <!--标题-->
          <template v-slot:title="props">
            <div>
              {{ props.data.title }}
              <el-tag v-if="props.data.isHome" effect="dark" size="mini" style="margin-left: 10px;">店铺主页</el-tag>
            </div>
          </template>
          <!--最右边操作-->
          <template v-slot:menu="props">
            <el-button size="mini" type="text">复制</el-button>
            <el-button size="mini" type="text">设为主页</el-button>
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
