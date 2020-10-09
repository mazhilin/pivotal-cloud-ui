<template>
  <div class="app-container-10 container-f0f2f5 app-main system-role-container">
    <div class=" container-fff app-container-15 app-ele-border-radius-0">
      <!--角色列表-->
      <div class="sys-content-role">
        <!--操作-->
        <div class="sys-btn-box">
          <el-button @click="addNewRole" icon="el-icon-plus" size="small" type="primary">新增</el-button>
          <!-- 多选后删除-->
          <el-button :disabled="!delRoleList.length" @click="isCan" icon="el-icon-delete" size="small" type="danger">删除
          </el-button>
        </div>
        <evue-table :data="roleData" :option="roleOption" @handleDelete="handleDelete"
                    @handleEdit="handleEdit" @selectionChange="selectionChange">
          <template v-slot:roleStatus="props">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="props.data.status"
            >
            </el-switch>
          </template>
          <template v-slot:menu="props">
            <el-button @click="$router.push({name:'systemRoleAssigningUsers',query:{id:props.data.id}})" size="mini"
                       type="text">分配用户
            </el-button>
          </template>
        </evue-table>
      </div>
    </div>
    <!--新增角色-->
    <el-dialog
      :close-on-click-modal="false"
      :title="addRoleFormData.id ? '编辑用户':'添加用户'"
      :visible.sync="dialogAddRole"
      custom-class="up-dialog"
      top="5vh"
      width="800px"
    >
      <div class="dialog-content add-user-pop app-ele-border-radius-0">
        <evue-form :option="addRoleOption" @submit="handleAddNewRole" ref="eVueForm" v-model="addRoleFormData">
          <template v-slot:menuPower>
            <div class="menu-box">
              <el-tree
                :data="menuList"
                :default-checked-keys="defaultCheckedMenuKeys"
                :props="{children: 'children',label: 'menuName'}"
                node-key="menuId"
                ref="menuTree"
                show-checkbox
                v-loading="menuLoading"
              >
              </el-tree>
            </div>
          </template>
          <template v-slot:roleStatus="props">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="props.data.status"
            >
            </el-switch>
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
  import Role from './role'

  export default Role
</script>
