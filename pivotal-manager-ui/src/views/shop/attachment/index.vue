<template>
  <div class="app-container-10 container-f0f2f5 app-main attachment-container ">
    <div class="container-fff app-container-15 app-ele-border-radius-0">
      <el-button type="primary" size="mini">上传图片</el-button>

      <!-- <div class="attachment-model-demo" data-desc="只做demo预览，放在项目上请删除此段代码">
         <el-switch
           v-model="isChooseModel"
           inactive-text="作为组件的选择模式"></el-switch>
       </div>-->

      <div class="attachment-content">
        <div class="category-container max-height">
          <div class="category-container-list">
            <div
              v-for="(item,index) in group"
              :key="index"
              :class="['category-item',{active:item.id === listQuery.categoryId}]"
              @click="searchList(item)"
            >
              <em>{{ item.name }}</em>
              <span>{{ item.number }}</span>
            </div>
            <div v-if="!isChooseModel" class="category-menu">
              <el-popover
                v-model="isShowPushGroupPop"
                placement="bottom"
                trigger="click"
              >
                <div class="attachment-pop-box">
                  <div class="attachment-pop-content">
                    <p class="title">添加分组</p>
                    <el-input v-model="newGroupName" size="mini" placeholder="请输入分组名称" />
                  </div>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="primary" @click="pushGroup(2)">确定</el-button>
                    <el-button size="mini" @click="pushGroup(1)">取消</el-button>
                  </div>
                </div>
                <el-button slot="reference" size="mini" icon="el-icon-plus">添加分组</el-button>
              </el-popover>
            </div>
          </div>
        </div>
        <div class="attachment-container">
          <div class="attachment-container-content">
            <div v-if="!isChooseModel && group.length">
              <p class="attachment-title">
                <span :class="['attachment-title-span',{active:!isShowSetGroupName}]">
                  <el-button type="text">{{ group.find(x=>x.id === listQuery.categoryId)['name'] }}</el-button>
                  <el-button class="re-name" type="text" @click="isShowSetGroupName=true">修改名称</el-button>
                </span>
                <span :class="['attachment-title-span',{active:isShowSetGroupName}]">
                  <el-input
                    v-model="newGroupName"
                    maxlength="6"
                    style="width: 100px;margin-right: 10px"
                    size="mini"
                  />
                  <el-button type="text" @click="setGroupName(2)">保存</el-button>
                  <el-button type="text" @click="setGroupName(1)">取消</el-button>
                </span>
              </p>
              <div v-if="list.length" class="action-bar">
                <el-checkbox>全选</el-checkbox>
              </div>
            </div>
            <div v-if="list.length" class="image-list">
              <div v-for="(item,index) in list" :key="index" class="image-item">
                <div
                  :style="{backgroundImage:'url('+item.coverUrl+')'}"
                  class="image-box"
                  @click="lookBigImgCover=true;imagesUrl=item.coverUrl"
                >
                  <!--@click.stop=""-->
                  <div v-if="isChooseModel" class="attachment-selected">
                    <i class="selected-index el-icon-check" />
                  </div>
                </div>
                <div :class="['image-title',{whiteSpace:isChooseModel}]">
                  <el-checkbox v-if="!isChooseModel" v-model="item.isChoose">{{ item.title }}</el-checkbox>
                  <span v-else>{{ item.title }}</span>
                </div>
                <div v-if="!isChooseModel" class="image-opt">
                  <div class="image-opt-item">
                    <el-popover
                      v-model="visibleList.title[index]"
                      placement="bottom"
                      trigger="click"
                    >
                      <div class="attachment-pop-box">
                        <div class="attachment-pop-content">
                          <p class="title">修改名称</p>
                          <el-input
                            v-model="item.title"
                            size="mini"
                            placeholder="请输入标题"
                          />
                        </div>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="primary" @click="setVisible('title', index)">确定</el-button>
                          <el-button size="mini" @click="setVisible('title', index)">取消</el-button>
                        </div>
                      </div>
                      <a slot="reference" href="javascript:">改名</a>
                    </el-popover>
                  </div>
                  <div class="image-opt-item">
                    <el-popover
                      placement="bottom"
                      trigger="click"
                    >
                      <div class="attachment-pop-box">
                        <div class="attachment-pop-url">
                          <div class="attachment-pop-url-input">
                            <el-input v-model="item.coverUrl" size="mini" disabled />
                            <el-button
                              v-clipboard:copy="item.coverUrl"
                              v-clipboard:success="onCopy"
                              size="mini"
                            >复制
                            </el-button>
                          </div>
                        </div>
                      </div>
                      <a slot="reference" href="javascript:">链接</a>
                    </el-popover>
                  </div>
                  <div class="image-opt-item">
                    <el-popover
                      v-model="visibleList.group[index]"
                      placement="bottom"
                      trigger="click"
                    >
                      <div class="attachment-pop-box">
                        <div class="attachment-pop-content">
                          <p class="title">修改分组</p>
                          <el-radio-group v-model="item.categoryId">
                            <el-radio v-for="(gItem,gIndex) in group" :key="gIndex" :label="gItem.id">{{ gItem.name }}
                            </el-radio>
                          </el-radio-group>
                        </div>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="primary" @click="setVisible('group', index)">确定</el-button>
                          <el-button size="mini" @click="setVisible('group', index)">取消</el-button>
                        </div>
                      </div>
                      <a slot="reference" href="javascript:">分组</a>
                    </el-popover>
                  </div>
                  <div class="image-opt-item">
                    <a href="javascript:">删除</a>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              暂无素材
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--查看大图-->
    <el-dialog
      :visible.sync="lookBigImgCover"
      width="40%"
    >
      <img style="display: block;margin: 0 auto;max-width: 100%;" :src="imagesUrl">
    </el-dialog>
  </div>
</template>

<script>
  import Attachment from './attachment'

  export default Attachment
</script>
