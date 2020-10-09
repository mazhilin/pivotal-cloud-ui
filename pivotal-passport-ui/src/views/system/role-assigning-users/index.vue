<template>
  <div class="app-container-10 container-f0f2f5 app-main system-role-assigning-users-container">
    <div class="container-fff app-container-15 app-ele-border-radius-0">
      <div class="system-user-content">
        <div class="sys-content-search">
          <el-form :inline="true" :model="userDataSearch" ref="searchFrom" size="small">
            <el-form-item label="用户名称" prop="userName">
              <el-input clearable v-model="userDataSearch.userName"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
              <el-input clearable v-model="userDataSearch.mobile"></el-input>
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
            <el-button @click="dialogAddUser=true" icon="el-icon-plus" size="small" type="primary">添加用户</el-button>
            <!-- 多选后删除-->
            <el-button :disabled="!delUserList.length" @click="isCan" icon="el-icon-delete" size="small" type="danger">
              批量取消授权
            </el-button>
          </div>
          <evue-table :data="userData" :option="userOption" @handleDelete="handleDelete"
                      @selectionChange="selectionChange">
            <template v-slot:userStatus="props">
              <el-tag :type="props.data.status?'success':'danger'" effect="dark">{{props.data.status?'正常':'关闭'}}
              </el-tag>
            </template>
          </evue-table>
        </div>
      </div>
    </div>
    <!--添加用户-->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogAddUser"
      custom-class="up-dialog"
      title="新增用户"
      top="5vh"
      width="1100px"
    >
      <div class="dialog-content add-user-pop app-ele-border-radius-0">
        <evue-table :data="userData" :option="addUserPopOption" @handleDelete="handleDelete"
                    @selectionChange="selectionAddUserChange">
          <template v-slot:userStatus="props">
            <el-tag :type="props.data.status?'success':'danger'" effect="dark">{{props.data.status?'正常':'关闭'}}</el-tag>
          </template>
        </evue-table>
      </div>
      <div slot="footer" style="text-align: left">
        <el-button @click="addUserFun" size="small" type="primary">确定</el-button>
        <el-button @click="dialogAddUser=false" size="small">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import User from './role-assigning-users'

  export default User
</script>
