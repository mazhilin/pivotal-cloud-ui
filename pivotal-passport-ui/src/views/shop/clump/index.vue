<template>
  <div class="app-container-10 container-f0f2f5 app-main feature-clump-container">
    <div class=" container-fff app-container-15 app-ele-border-radius-0">
      <div v-if="clumpType">
        <div class="clump-tabs">
          <el-tabs type="border-card" v-model="clumpType">
            <el-tab-pane v-for="(item,index) in tabs" :key="index" :name="item.name" :label="item.label"></el-tab-pane>
          </el-tabs>
        </div>
        <!--描述-->
        <div class="content-box">
          <div class="clump-desc">
            <div class="clump-desc-detail">
              <div class="switch-title">{{tabFind()['title']}}
                <div class="switchBox" v-show="isHasOwnProperty(tabFind(),'isSwitch') && isSwitch">
                  <el-switch
                    size="mini"
                    style="display: block"
                    v-model="tabFind()['isSwitch']"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="开启"
                    inactive-text="关闭"
                    @change="changeSwitch"
                  >
                  </el-switch>
                </div>
                <div class="clump-set" v-if="isHasOwnProperty(tabFind(),'set')&&isSwitch">
                  <el-button type="text" @click="clumpClick(tabFind())">{{tabFind()['set']}}</el-button>
                </div>
              </div>
              <div class="switch-desc"><p>{{tabFind()['desc']}}</p></div>
            </div>

          </div>
        </div>
      </div>
      <!--微页面编辑页-->
      <div v-if="clumpType !== 'service'" class="showcase-design">

        <microCreate :isNeedReturnSaveData="true"
                     :saveBtn_title_1="'保存'"
                     :isShowSaveBtn_2="false"
                     :microKeyWord="clumpType"
                     :currentConfigComponents="clumpType | configComponents"
                     :showTheseComponents="clumpType | showTheseComponents"
                     :hideTheseComponents="clumpType | hideTheseComponents"
                     @returnData="returnData"
                     @returnInfo="returnInfo"></microCreate>
      </div>
      <div v-show="clumpType === 'service'" class="showcase-design">
        <p>服务广告</p>
      </div>
    </div>
  </div>
</template>

<script>
  import clump from './clump'

  export default clump
</script>
