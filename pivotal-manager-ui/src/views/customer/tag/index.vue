<template>
  <div class="app-container-10 container-f0f2f5 app-main customer-tag-container">
    <div class=" container-fff app-container-15 app-ele-border-radius-0">
      <div>
        <el-button type="primary" size="mini" @click="goCreatePage">新建</el-button>
        <!--标签列表-->
        <div class="content-box">
          <evue-table
            :data="list"
            :option="option"
            @paginationChance="paginationChance"
          >
            <!--标签类型-->
            <template v-slot:autoTag="props">
              <span>{{ props.data.isAutoTag ? '自动标签' : '手动标签' }}</span>
            </template>
            <!--标签类型-->
            <template v-slot:ruleTag="props">
              <span>{{ props.data.rule ? `最后消费时间在${props.data.rule.buyTimeStart}至${props.data.rule.buyTimeEnd}` : '未设置' }}</span>
            </template>
            <!--最右边操作-->
            <template v-slot:menu="props">
              <el-button size="mini" type="text">编辑</el-button>
              <el-button size="mini" type="text">删除</el-button>
            </template>
            <!--底部最左边-->
            <template v-slot:slotPagination>
              <div class="slotPagination">
                <el-checkbox v-model="chooseAll">当前页全选</el-checkbox>
                <el-button size="mini">批量删除</el-button>
              </div>
            </template>
          </evue-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tag from './tag'

  export default Tag
</script>
