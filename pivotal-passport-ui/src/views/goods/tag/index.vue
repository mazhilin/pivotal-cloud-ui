<template>
  <div class="app-container-10 container-f0f2f5 app-main goods-tag-container">
    <div class="container-fff app-container-15 app-ele-border-radius-0">
      <el-popover
        v-model="isCreateTag"
        placement="bottom"
        trigger="click"
      >
        <div class="goods-tag-pop-box">
          <div class="goods-tag-pop-content">
            <p class="title">新增分组</p>
            <el-input v-model="tagName" maxlength="6" size="mini" placeholder="最长六个字符" />
          </div>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="primary" @click="startCreate('',true)">确定</el-button>
            <el-button size="mini" @click="startCreate('',false)">取消</el-button>
          </div>
        </div>
        <el-button slot="reference" type="primary" size="mini">新建商品分组</el-button>
      </el-popover>
      <!--微页面列表-->
      <div class="content-box">
        <evue-table
          :data="list"
          :option="option"
        >
          <!--标题-->
          <template v-slot:categoryName="props">
            <div>
              {{ props.data.categoryName }}
            </div>
          </template>
          <!--编辑-->
          <template v-slot:menu="props">
            <el-popover
              v-model="visible[props.index]"
              placement="left"
              trigger="click"
              @show="popEditShow(props)"
            >
              <div class="goods-tag-pop-box">
                <div class="goods-tag-pop-content">
                  <p class="title">重命名</p>
                  <el-input v-model="tagName" maxlength="6" size="mini" placeholder="最长六个字符" />
                </div>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="primary" @click="startCreate(props,true,true)">确定</el-button>
                  <el-button size="mini" @click="startCreate(props,false,true)">取消</el-button>
                </div>
              </div>
              <el-button slot="reference" size="mini" type="text">编辑</el-button>
            </el-popover>
            <el-button size="mini" type="text" @click="del(props)">删除</el-button>
          </template>
        </evue-table>
      </div>
    </div>
  </div>
</template>

<script>
  import Tag from './tag'

  export default Tag
</script>
