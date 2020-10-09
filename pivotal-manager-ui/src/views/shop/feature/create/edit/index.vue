<template>
  <div class="micro-create">
    <div class="micro-box-content" :style="{backgroundColor:setOther.bgColor}">
      <div class="design-page">

        <div class="design-page-content">
          <div class="all-use-components">
            <!--所有可以选择的组件-->
            <allCanUseComponents
              :is-show-all-components="isShowAllComponents"
              :hide-these-components="hideTheseComponents"
              :show-these-components="showTheseComponents"
              @addComponent="addComponent"
              @retAllCanUseComponents="allCanUseComponents"
            />
            <!--end 所有可以选择的组件-->
          </div>
          <div id="scrollbar" class="design-editor">
            <div ref="designBox" class="design-box">
              <div ref="designPreview" class="design-preview">
                <div v-if="componentLists.length" ref="Preview" class="item-list">
                  <!--头部-->
                  <div
                    v-for="(item,index) in configComponents"
                    id="headBox"
                    :key="index"
                    class="preview-item"
                    :index="index"
                    @click.stop="clickComponent(item,index,1)"
                  >
                    <div
                      :is="componentLists.find(x=>x.type === item.type) ? componentLists.find(x=>x.type === item.type).routerPath : ''"
                      :current="index"
                      :is-show-edit="currentEditConfigComponentsShow === index&&configComponentsShow"
                      :index-key="item.type+'_'+index"
                      :data-field="item.dataField || {}"
                      :current-component="item"
                      :is-check-my-self="item.isCheckMySelf"
                      :is-start-check-field-rules="isStartCheckFieldRules"
                      @myCheckResult="everyComponentsCheckResultFun"
                      @componentsValueChance="componentsValueChanceFromConfig"></div>
                  </div>
                  <!--组价-->
                  <SlickList
                    v-model="currentUseComponents"
                    :use-drag-handle="true"
                    axis="y"
                    @input="sortInput"
                    @sort-start="sortStart"
                    @sort-move="sortMove"
                    @sort-end="sortEnd"
                  >
                    <SlickItem
                      v-for="(item,index) in currentUseComponents"
                      :id="'previewItem_'+index"
                      :key="index"
                      :class="['preview-box',{isMoveIng:isMoveIng}]"
                      :index="index"
                      @click.stop="clickComponent(item,index)"
                    >
                      <div class="preview-item">
                        <div
                          :is="componentLists.find(x=>x.type === item.type) ? componentLists.find(x=>x.type === item.type).routerPath : ''"
                          :current="index"
                          :is-show-edit="currentEditComponent === index&&isShowEdit"
                          :index-key="item.type+'_'+index"
                          :data-field="item.dataField || {}"
                          :current-component="item"
                          :is-check-my-self="item.isCheckMySelf"
                          :is-start-check-field-rules="isStartCheckFieldRules"
                          @myCheckResult="everyComponentsCheckResultFun"
                          @componentsValueChance="componentsValueChance"></div>
                        <!--边框、删除、添加-->
                        <div
                          :style="{borderColor:setOther.viewTheme,borderStyle:'solid'}"
                          class="preview-item-border design-hide-class"
                          :class="currentEditComponent === index ? 'show':''"
                        >
                          <div v-handle class="drag-box" :style="{cursor:setOther.dragCursor}"/>
                          <el-popover
                            :ref="'pop_'+index"
                            placement="left"
                            width="160"
                            trigger="click"
                          >
                            <p>确定删除？</p>
                            <div style="text-align: right; margin: 10px 0 0">
                              <el-button
                                size="mini"
                                @click="popBtn(1, item,'pop_'+index,index)"
                              >取消
                              </el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click="popBtn(2, item,'pop_'+index,index)"
                              >确定
                              </el-button>
                            </div>
                            <span
                              v-show="!item.isHeader&&isShowClose"
                              slot="reference"
                              :style="{background:setOther.viewTheme}"
                              class="close-item"
                            >x</span>
                          </el-popover>
                          <span
                            v-show="isShowPushAdd"
                            :id="'appendTopBtn_'+index"
                            :ref="'appendTopBtn_'+index"
                            :style="{background:setOther.viewTheme}"
                            class="circle-plus-top"
                            @click.stop="appendComponents('top',index,'appendTopBtn_'+index,item)"
                          >+</span>
                          <span
                            v-show="isShowPushAdd"
                            :id="'appendBottomBtn_'+index"
                            :ref="'appendBottomBtn_'+index"
                            :style="{background:setOther.viewTheme}"
                            class="circle-plus-bottom"
                            @click.stop="appendComponents('bottom',index,'appendBottomBtn_'+index,item)"
                          >+</span>
                          <!--左边的小部件-->
                          <div class="eVue-widget">
                            <div class="widget-name">
                              <span class="widget-arrow-out"/>
                              <div class="component-name">{{ componentLists.find(x=>x.type === item.type) ?
                                componentLists.find(x=>x.type === item.type).title : '' }} {{ index }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--边框、删除、添加-->
                      </div>
                    </SlickItem>
                  </SlickList>
                  <!--插入-->
                  <div v-if="isShowEditorAllComponents" class="design-editor-item append-component-box">
                    <div class="design-config-editor">
                      <allCanUseComponents
                        :hide-these-components="hideTheseComponents"
                        @addComponent="addComponent"
                        @retAllCanUseComponents="allCanUseComponents"
                      />
                    </div>
                  </div>
                  <!--插入-->
                </div>
              </div>
            </div>

            <!--右侧管理列表-->
            <div class="preview-wrap">
              <div
                class="preview-wrap-item"
                :style="setOther.componentOperation ? 'background-color:'+setOther.viewTheme+';color:#fff;' : ''"
                @click="setOther.componentOperation = true"
              >
                <i class="el-icon-coin"/>组件管理
              </div>
            </div>
            <!--组件管理-->
            <div v-if="setOther.componentOperation" class="design-editor-item">
              <div class="design-config-editor">
                <div class="design-editor-component-title">组件管理</div>
                <div class="components-list-edit">
                  <p class="clear-current-component" :style="[{color:setOther.viewTheme}]"><span
                    @click="currentUseComponents = []"
                  >清空组件</span></p>
                  <SlickList
                    v-model="currentUseComponents"
                    :use-drag-handle="true"
                    axis="y"
                    @input="componentsSortInput"
                  >
                    <SlickItem
                      v-for="(item,index) in currentUseComponents"
                      :key="index"
                      class="components-list-edit-item"
                      :index="index"
                    >
                      <div v-handle class="drag-box"><span/>{{ componentLists.find(x=>x.type === item.type) ?
                        componentLists.find(x=>x.type === item.type).title : '' }} <em>{{ index }}</em>
                      </div>
                      <div class="drag-box-icon">
                        <i title="删除组件" class="el-icon-delete" @click="popBtn(2, item,'pop_'+index,index)"/>
                      </div>
                    </SlickItem>
                  </SlickList>

                </div>
              </div>
            </div>

          </div>

        </div>

        <!--保存按钮-->
        <div class="save-data">
          <div class="inner">
            <el-button
              v-if="isShowSaveBtn_1"
              :loading="isSaving"
              :disabled="isSaving"
              size="mini"
              type="primary"
              @click="save(1)"
            >
              {{ saveBtn_title_1 }}
            </el-button>
            <el-button
              v-if="isShowSaveBtn_2"
              :loading="isSaving"
              :disabled="isSaving"
              @click="save(2)"
              size="mini"
              type="primary"
              plain>{{saveBtn_title_2}}
            </el-button>
          </div>
        </div>
      </div>

      <!--配置弹窗-->
      <right-panel>
        <div class="drawer-container">
          <div>
            <h3 class="drawer-title">系统配置</h3>
            <div class="drawer-item">
              <span>背景颜色</span>
              <el-color-picker v-model="setOther.bgColor"></el-color-picker>
            </div>
            <div class="drawer-item">
              <span>预览区主题</span>
              <el-color-picker v-model="setOther.viewTheme"></el-color-picker>
            </div>

          </div>
        </div>
      </right-panel>
    </div>
  </div>
</template>
<script>
  import Edit from './edit.js'

  export default Edit
</script>
