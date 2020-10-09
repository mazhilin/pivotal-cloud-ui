<template>
  <div class="app-container-10 container-f0f2f5 app-main feature-dingDing-container">
    <div class=" container-fff app-container-15 app-ele-border-radius-0">
      <el-button type="primary" size="small" @click="dialogDingDing=true">新建钉钉通知</el-button>
      <!--微页面列表-->
      <div class="content-box" v-loading="loading">
        <evue-table
          :data="list"
          :option="option"
          @paginationChance="paginationChance"
          @handleEdit="handleEdit"
          @handleDelete="handleDelete"
        >
          <!--access_token-->
          <template v-slot:accessToken="props">
            <div class="text">
              {{ props.data.access_token }}
            </div>
          </template>
          <!--类型-->
          <template v-slot:type="props">
            <div class="text">
              {{ props.data.type | theType}}
            </div>
          </template>
          <!--状态-->
          <template v-slot:switch="props">
            <div class="text">
              <el-switch
                @change="switchChange(props.data)"
                v-model="props.data.switch"
                :active-value="1"
                :inactive-value="0"
                active-text="显示"
                inactive-text="隐藏">
              </el-switch>
            </div>
          </template>

          <!-- 添加测试按钮-->
          <template v-slot:menu="props">
            <el-button size="mini" type="text" @click="testMessage">测试</el-button>
          </template>
        </evue-table>
      </div>

      <!--添加钉钉通知配置-->
      <el-dialog
        custom-class="up-dialog"
        :close-on-click-modal="false"
        top="10vh"
        title="钉钉通知"
        :visible.sync="dialogDingDing"
        @closed="hideOrShowFun"
        width="600px">
        <div class="up-video-comment">
          <!-- 添加钉钉通知-->
          <div class="ding-add-box">
            <evue-form ref="form" v-model="formObj" :option="formOption" @submit="submitFun">
            </evue-form>
          </div>
          <div slot="footer">
            <el-button size="mini" type="primary" @click="saveFun">保存</el-button>
            <el-button size="mini" @click="cancel">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import DialogDingDing from './dingding'

  export default DialogDingDing
</script>
