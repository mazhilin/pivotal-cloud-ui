<template>
  <div class="app-container-10 container-f0f2f5 app-main customer-list-container">
    <div class=" container-fff app-container-15 app-ele-border-radius-0">
      <div>
        <el-button type="primary" size="small" @click="addNewCustomer=true">添加客户</el-button>
        <!--搜索-->
        <div class="customer-search">
          <!--客戶类型-->
          <div class="customer-type">
            <div
              v-for="(item,index) in customerType"
              :key="index"
              :class="['customer-type-item',{active:index === currentCustomerType}]"
              @click="currentCustomerType = index"
            >
              <span>{{ item.name }}
                <el-tooltip class="item" effect="light" :content="item.tooltip" placement="top">
                  <i v-if="item.tooltip" class="el-icon-question" />
                </el-tooltip>
              </span>
              <p>{{ item.number }}位</p>
            </div>
          </div>
          <evue-form v-model="formObj" :option="formOption" />
        </div>
        <!--客户列表-->
        <div class="content-box">
          <evue-table
            :data="list"
            :option="option"
            @paginationChance="paginationChance"
          >
            <!--客户-->
            <template v-slot:name="props">
              <div class="customer-name">
                <img
                  :src="props.data.fansPicture || 'http://wangzheshike.xxgushi.com/admin/default-avatar.png'"
                  alt=""
                  @click="lookBigImgCover=true;imagesUrl=props.data.fansPicture"
                >
                <div class="customer-name-item">
                  <div>
                    <!--客户名称-->
                    <router-link to="./detail">
                      <p>
                        {{ props.data.name }}
                        <span class="title-edit" />
                      </p>
                    </router-link>
                    <span>{{ props.data.mobile }}</span>
                  </div>
                </div>
              </div>
            </template>
            <!--最右边操作-->
            <template v-slot:menu="props">
              <el-button size="mini" type="text">设置权益卡</el-button>
              <el-popover
                v-model="visibleList.tag[props.index]"
                placement="left"
                trigger="click"
                width="220"
              >
                <div class="customer-tab-top">
                  <span>添加标签</span>
                  <span>刷新</span>
                  <span>标签管理</span>
                </div>
                <div>
                  <el-select
                    v-model="props.data.tag"
                    multiple
                    filterable
                    default-first-option
                    placeholder="请选择"
                  >
                    <el-option
                      label="标签1"
                      value="1"
                    />
                    <el-option
                      label="标签2"
                      value="2"
                    />
                  </el-select>
                </div>
                <!--  <div class="coupon-tab-box"  style="text-align: center;font-size: 12px;">
                    没有标签数据
                  </div>-->
                <div class="customer-tab-btn">
                  <el-button type="primary" size="mini" @click="setVisible('tag', props.index)">确定</el-button>
                  <el-button size="mini" @click="setVisible('tag', props.index)">取消</el-button>
                </div>
                <el-button slot="reference" type="text">加标签</el-button>
              </el-popover>
              <el-button size="mini" type="text">更多</el-button>
            </template>
          </evue-table>
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

    <!--新增客户-->
    <el-dialog
      custom-class="up-dialog"
      :close-on-click-modal="false"
      top="5vh"
      title="添加客户"
      :visible.sync="addNewCustomer"
      width="480px"
    >
      <div class="dialog-content">
        <evue-form
          ref="addForm"
          v-model="addObj"
          :option="addOption"
          @submit="addSubmit"
          @emptyChange="addEmptyChange"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import List from './list'

  export default List
</script>
