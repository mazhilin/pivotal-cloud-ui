<template>
  <div class="app-container-10 container-f0f2f5 app-main system-user-container">
    <div class="container-fff app-container-15 app-ele-border-radius-0">
      <!-- 用户管理盒子-->
      <div class="system-user-box">
        <!--部门管理-->
        <div class="system-user-sector">
          <div class="sector-title">部门机构</div>
          <div class="sector-box">
            <el-tree :data="sectorData" :expand-on-click-node="false" :props="{children: 'children',label: 'name' }"
                     @node-click="handleSectorNodeClick"
                     default-expand-all v-loading="sectorDataLoading"></el-tree>
          </div>
        </div>
        <div class="system-user-content">
          <div class="sys-content-search">
            <el-form :inline="true" :model="userDataSearch" ref="searchFrom" size="small">
              <el-form-item label="用户名称" prop="userName">
                <el-input clearable v-model="userDataSearch.userName"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="mobile">
                <el-input clearable v-model="userDataSearch.mobile"></el-input>
              </el-form-item>
              <el-form-item label="用户状态" prop="status">
                <el-select placeholder="所有" v-model="userDataSearch.status">
                  <el-option label="所有" value=""></el-option>
                  <el-option :value="1" label="正常"></el-option>
                  <el-option :value="0" label="停用"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="userDataFilter" icon="el-icon-search" type="primary">搜索</el-button>
                <el-button @click="$refs.searchFrom.resetFields()" icon="el-icon-refresh">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--用户列表-->
          <div class="sys-content-users">
            <!--操作-->
            <div class="sys-btn-box">
              <el-button @click="addNewUser" icon="el-icon-plus" size="small" type="primary">新增</el-button>
              <!-- 多选后删除-->
              <el-button :disabled="!delUserList.length" @click="isCan" icon="el-icon-delete" size="small"
                         type="danger">删除
              </el-button>
            </div>
            <evue-table :data="userData" :option="userOption" @handleDelete="handleDelete"
                        @handleEdit="handleEdit" @selectionChange="selectionChange">
              <template v-slot:userStatus="props">
                <el-switch
                  :active-value="1"
                  :inactive-value="0"
                  v-model="props.data.status"
                >
                </el-switch>
              </template>
              <template v-slot:menu="props">
                <el-button @click="handleResetPassword(props.data)" size="mini" type="text">重置</el-button>
              </template>
            </evue-table>
          </div>
        </div>
      </div>
    </div>
    <!--重置密码-->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogResetUserPassword"
      custom-class="up-dialog"
      title="重置密码"
      top="5vh"
      width="500px"
    >
      <div class="dialog-content">
        <el-form :model="currentEditUser" ref="resetForm" size="small">
          <el-form-item :rules="[{ required: true, message: '请输入登录名称'}]" label="登录名称" prop="loginName">
            <el-input class="input-box" clearable v-model="currentEditUser.loginName"></el-input>
          </el-form-item>
          <el-form-item :rules="[{ required: true, message: '请输入密码'}]" label="输入密码" prop="password">
            <el-input class="input-box" clearable v-model="currentEditUser.password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" style="text-align: right">
        <el-button @click="resetPasswordFun" size="small" type="primary">确定</el-button>
        <el-button @click="dialogResetUserPassword=false" size="small">取消</el-button>
      </div>
    </el-dialog>
    <!--新增用户-->
    <el-dialog
      :close-on-click-modal="false"
      :title="addUserFormData.id ? '编辑用户':'新增用户'"
      :visible.sync="dialogAddUser"
      custom-class="up-dialog"
      top="5vh"
      width="800px"
    >
      <div class="dialog-content add-user-pop app-ele-border-radius-0">
        <evue-form :option="addUserOption" @submit="handleAddNewUser" ref="eVueForm" v-model="addUserFormData">
          <template v-slot:sectorSlot>
            <el-cascader
              :options="sectorData"
              :props="{ checkStrictly: true,value:'id',label:'name' }"
              clearable>
            </el-cascader>
          </template>
        </evue-form>
      </div>
      <div slot="footer" style="text-align: left">
        <el-button @click="$refs.eVueForm.submit()" size="small" type="primary">确定</el-button>
        <el-button @click="handleDialogAddUserClose" size="small">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import User from './user'

  export default User
</script>
