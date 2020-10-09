<template>
  <div class="app-container-10 container-f0f2f5 app-main system-sector-container">
    <div class=" container-fff app-container-15 app-ele-border-radius-0">
      <el-form :inline="true">
        <el-form-item label="部门名称">
          <el-input
            @keyup.enter.native="getList"
            clearable
            placeholder="请输入部门名称"
            size="small"
            v-model="searchModel.sectorName"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select clearable placeholder="部门状态" size="small" v-model="searchModel.status">
            <el-option :key="1" :value="1" label="正常"></el-option>
            <el-option :key="2" :value="1" label="停用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getList" icon="el-icon-search" size="small" type="primary">搜索
          </el-button>
          <el-button @click="dialogAddSector=true" icon="el-icon-plus" size="small" type="primary">
            新增
          </el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-table
          :data="tableData"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          default-expand-all
          row-key="id"
          v-loading="loading"
        >
          <el-table-column label="部门名称" prop="name"></el-table-column>
          <el-table-column label="状态" prop="status" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.status === 0 ? '正常':'关闭' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="200"></el-table-column>
          <el-table-column align="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="$message.error('演示不支持该操作')" size="mini" type="text">修改</el-button>
              <el-button @click="$message.error('演示不支持该操作')" size="mini" type="text">新增</el-button>
              <el-button @click="$message.error('演示不支持该操作')" size="mini" type="text" v-if="scope.row.parentId != 0">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>


    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogAddSector"
      custom-class="up-dialog"
      title="添加部门"
      top="5vh"
      width="500px"
    >
      <div class="dialog-content">
        <evue-form :option="addSectorOption" @submit="submit" ref="addSectorForm" v-model="addSectorForm">
          <template v-slot:parent>
            <el-cascader
              :options="tableData"
              :props="{ checkStrictly: true,value:'id',label:'name' }"
              clearable
              v-model="addSectorForm.parentId"></el-cascader>
          </template>
          <el-button @click="cancel" size="small" slot="menuBottom">取消</el-button>
        </evue-form>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Sector from './sector'

  export default Sector
</script>
