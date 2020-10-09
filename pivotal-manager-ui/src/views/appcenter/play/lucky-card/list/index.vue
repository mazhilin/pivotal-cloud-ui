<template>
  <div class="app-container-10 container-f0f2f5 app-main lucky-card-list-container">
    <div class="container-fff app-container-15 app-ele-border-radius-0">

      <div class="create-new-lucky-btn">
        <el-button type="primary" size="small" @click="commonPushPage('luckyCardCreate')">新建活动</el-button>
        <div class="lucky-input">
          <el-input
                  placeholder="请输入活动名称"
                  prefix-icon="el-icon-search"
                  v-model="formObj.keyword">
          </el-input>
        </div>
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
          <template v-slot:title="props">
            <el-button size="mini" type="text" @click="commonPushPage('luckyCardCreate',{id:props.data.id})">
              {{props.data.title}}
            </el-button>
          </template>
          <!--最右边操作-->
          <template v-slot:menu="props">
            <el-button size="mini" type="text" @click="$message.success('模拟数据')">数据</el-button>
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
