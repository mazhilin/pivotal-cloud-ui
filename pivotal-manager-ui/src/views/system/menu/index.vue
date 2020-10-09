<template>
  <div class="app-container-10 container-f0f2f5 app-main system-menu-container">
    <div class="container-fff app-container-15 app-ele-border-radius-0">
      <el-form :inline="true">
        <el-form-item label="菜单名称">
          <el-input
            @keyup.enter.native="getList"
            clearable
            placeholder="请输入菜单名称"
            size="small"
            v-model="searchModel.sectorName"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select clearable placeholder="菜单状态" size="small" v-model="searchModel.status">
            <el-option :key="1" :value="1" label="隐藏"></el-option>
            <el-option :key="2" :value="1" label="显示"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getList" icon="el-icon-search" size="small" type="primary">搜索
          </el-button>
          <el-button @click="dialogAddMenu=true" icon="el-icon-plus" size="small" type="primary">
            新增
          </el-button>
        </el-form-item>
      </el-form>

      <div>
        <el-table
          :data="menuList"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          row-key="menuId"
          v-loading="loading"
        >
          <el-table-column :show-overflow-tooltip="true" label="菜单名称" prop="menuName"></el-table-column>
          <el-table-column label="图标" prop="icon">
            <template slot-scope="scope">
              <svg-icon :icon-class="scope.row.icon"/>
            </template>
          </el-table-column>
          <el-table-column label="排序" prop="orderNum"></el-table-column>
          <el-table-column label="类型" prop="menuType">
            <template slot-scope="scope">
              <!--目录 D,菜单M,B按钮-->
              <span>{{ scope.row.menuType === 'D' ? '目录':scope.row.menuType === 'M' ? '菜单':'按钮' }}</span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" label="权限标识" prop="perms"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" label="组件路径" prop="component"></el-table-column>
          <el-table-column label="可见" prop="visible">
            <template slot-scope="scope">
              <span>{{ scope.row.visible === 1 ? '可见':'隐藏' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="$message.error('演示不支持该操作')" size="mini" type="text">修改</el-button>
              <el-button @click="$message.error('演示不支持该操作')" size="mini" type="text">新增</el-button>
              <el-button @click="$message.error('演示不支持该操作')" size="mini" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>

    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogAddMenu"
      custom-class="up-dialog"
      title="添加菜单"
      top="5vh"
      width="600px"
    >
      <div class="dialog-content">
        <evue-form :option="addMenuOption" @submit="submit" ref="addMenuForm" v-model="addMenuForm">
          <template v-slot:parent>
            <el-cascader
              :options="menuList"
              :props="{ checkStrictly: true,value:'id',label:'name' }"
              clearable
              v-model="addMenuForm.parentId"></el-cascader>
          </template>
          <!--菜单图标-->
          <template v-slot:menuIcon>

            <el-popover
              placement="bottom-start"
              trigger="click"
              width="460"
            >
              <div class="menu-icon-box">
                <div :key="item" @click="handleClipboard(item,$event)" v-for="item of svgIcons">
                  <svg-icon :icon-class="item" class-name="disabled"/>
                  <span>{{ item }}</span>
                </div>
              </div>
              <el-input placeholder="点击选择图标" readonly slot="reference" v-model="addMenuForm.icon">
                <svg-icon
                  :icon-class="addMenuForm.icon"
                  class="el-input__icon"
                  slot="prefix"
                  style="height: 32px;width: 16px;"
                  v-if="addMenuForm.icon"
                />
                <i class="el-icon-search el-input__icon" slot="prefix" v-else></i>
              </el-input>
            </el-popover>


          </template>
          <el-button @click="cancel" size="small" slot="menuBottom">取消</el-button>
        </evue-form>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import Menu from './menu'

  export default Menu
</script>
