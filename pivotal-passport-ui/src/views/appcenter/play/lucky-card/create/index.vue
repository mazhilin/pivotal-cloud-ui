<template>
  <div class="app-container-10 container-f0f2f5 app-main lucky-card-create-container">
    <div class="container-fff app-container-15 app-ele-border-radius-0">
      <div class="box-steps">
        <div class="box-steps-item is-finish">
          <div class="box-steps-step">1. 创建活动</div>
        </div>
        <div :class="['box-steps-item',{'is-finish':steps ===2}]">
          <div class="box-steps-step">2. 奖项设置</div>
        </div>
      </div>
      <div class="lucky-card-box">
        <div class="lucky-card-view">
          <img src="https://img.yzcdn.cn/public_files/02a7c187859432f5fa894918acd9c609.png" alt="">
        </div>
        <div class="lucky-card-edit">
          <div v-if="steps===1">
            <evue-form ref="eVueForm" v-model="obj" :option="option" @submit="eSteps1pushData">
              <template v-slot:otherUser>
                <div>
                  <el-button type="text">选择用户</el-button>
                </div>
              </template>
              <!--参与次数-->
              <template v-slot:dayN>
                <div>
                  每人每天抽
                  <el-input
                          placeholder="请输入整数"
                          v-model="obj.dayNum">
                  </el-input>
                  次
                </div>
              </template>
              <template v-slot:onesN>
                <div>
                  每人一共可抽
                  <el-input
                          placeholder="请输入整数"
                          v-model="obj.onesNum">
                  </el-input>
                  次
                </div>
              </template>
            </evue-form>
          </div>
          <div v-else>
            <evue-form ref="eSteps2" v-model="obj" :option="steps2" @submit="eSteps2PushData">
              <template v-slot:prizesSlotName>
                <div class="add-gift">
                  <el-button type="text">添加奖品</el-button>
                </div>
              </template>

              <template v-slot:pointSlotName>
                <div style="margin-bottom: 10px;">
                  送
                  <el-input size="small" style="display: inline-block;width: 70px;margin: 0 10px;"
                          placeholder="请输入整数"
                          v-model="obj.point">
                  </el-input>
                  积分
                </div>
                <el-checkbox v-model="obj.noLuckUser" :true-label="1" :false-label="0">仅送给未中奖用户</el-checkbox>
              </template>

            </evue-form>
          </div>
        </div>
      </div>
    </div>
    <div class="create-save-btn app-ele-border-radius-0">
      <div class="create-save-btn-box">
        <el-button size="mini" @click="submit">{{steps===1?'取消':'上一步'}}</el-button>
        <el-button size="mini" type="primary" @click="nextBtn">{{steps === 2 ? '完成':'下一步'}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Create from './create'

  export default Create
</script>
