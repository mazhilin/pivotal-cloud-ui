<template>
  <div class="app-container-10 container-f0f2f5 app-main customer-tag-create-container">
    <div class=" container-fff app-container-15 app-ele-border-radius-0">
      <div>
        <!--新增标签-->
        <div class="content-box">
          <evue-form v-model="formObj" :option="formOption">
            <!--自动标签-->
            <template v-slot:isAutoTag>
              <div v-if="formObj.isAutoTag === 2" class="isAutoTag">
                <div class="autoTag-rule">
                  <span>满足条件:</span>
                  <el-radio v-model="formRule.logic2And" :label="1">满足任意一个被选中的条件即可</el-radio>
                  <el-radio v-model="formRule.logic2And" :label="2">必须满足所有被选中的条件</el-radio>
                </div>
                <!--规格配置-->
                <div class="autoTag-rule-set">
                  <evue-form v-model="formRule" :option="formRuleOption" />
                </div>
              </div>
            </template>
          </evue-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Create from './create'

  export default Create
</script>
