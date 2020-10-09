<template>
  <div class="micro-tab-nav-box">
    <!--预览控制区-->
    <div class="design-preview-controller">
      <!--文本-->
      <div class="nav-list" v-if="formData.set.type === 3"
           :style="{color:formData.set.font_color,backgroundColor:formData.set.bg_color}">
        <div :class="['nav-item-item text_overFlow_1' ,{active:index === 0}]" v-for="(item,index) in showNav.slice(0,4)"
             :key="index">
          <span :style="{color:formData.set.font_color}">{{item.title}}</span>
        </div>
      </div>
      <!--模式 图文-->
      <div v-else class="nav-item-image" :style="{color:formData.set.font_color,backgroundColor:formData.set.bg_color}">
        <div :class="['nav-item-image-li' ,{active:index === 0}]" v-for="(item,index) in showNav.slice(0,4)" :key="index">
          <img :src="item.img" alt="">
          <!--图文模式-->
          <p v-if="item.title&&formData.set.type !==1" class="text_overFlow_1" :style="{color:formData.set.font_color}">
            {{item.title}}</p>
        </div>
      </div>
      <div class="nav-content">
        显示内容，客户端才能展示
      </div>
    </div>
    <!--编辑工作区-->
    <div class="design-editor-item design-hide-class" v-if="isShowEdit">
      <div class="design-config-editor">
        <div class="design-editor-component-title">导航分类</div>
        <div class="tab-nav-set">
          <!-- 配置-->
          <div class="tab-set-box">
            <div class="tab-set">
              <div :class="['tab-set-item',{active:item.type === formData.set.type}]"
                   v-for="(item,index) in setTypeList"
                   :key="index" @click="formData.set.type=item.type">
                <div class="set-item-list">{{item.title}}</div>
              </div>
            </div>
            <div class="color-set">
              <div class="color-set-title">背景颜色</div>
              <el-color-picker v-model="formData.set.bg_color" show-alpha></el-color-picker>
            </div>
            <div class="color-set">
              <div class="color-set-title">字体颜色</div>
              <el-color-picker v-model="formData.set.font_color"></el-color-picker>
            </div>
          </div>

          <div class="tab-nav-set-item" v-for="(item,index) in formData.nav" :key="index">
            <div class="set-box">
              <!--图片-->
              <div class="set-image" v-if="formData.set.type !==3&&item.id" @click="choosePage(index,'img')"
                   :style="{backgroundImage:'url('+item.img+')'}">
                <span v-if="!item.img">+</span>
                <div class="set-image-add">{{item.img?'更改图片':'添加图片'}}</div>
              </div>
              <!-- 标题信息-->
              <div class="set-info">
                <div class="set-item-title" v-if="formData.set.type !==1&&item.id">
                  标题：
                  <p>
                    <el-input maxlength="8" size="mini" placeholder="标题" v-model="item.title">
                    </el-input>
                  </p>
                </div>
                <!-- :class="{show:item.title}"-->
                <div class="set-item-title choose-micro show">
                  微页面：
                  <p>
                    <el-button @click="choosePage(index)" type="text" size="mini">{{item.microTitle ||'点击选择'}}
                    </el-button>
                  </p>
                </div>
              </div>
            </div>
            <span class="set-close" @click="formData.nav.splice(index,1)">X</span>
          </div>
          <div class="tab-nav-add" @click="addNav">增加导航</div>
        </div>
      </div>
    </div>
    <!--选择微页面-->
    <el-dialog
            custom-class="up-dialog"
            :close-on-click-modal="false"
            top="5vh"
            title="微页面"
            :visible.sync="dialogChoosePages"
            width="42%">
      <div class="choose-goods-compent">
        <choose-feature :isGetChooseData="isGetChooseFeature"
                        @chooseChooseFeaturesFun="chooseChooseFeaturesFun"></choose-feature>
        <div slot="footer" style="text-align: right;margin-top: 20px;">
          <el-button size="mini" type="primary" @click="isGetChooseFeature=!isGetChooseFeature">确定</el-button>
          <el-button size="mini" @click="dialogChoosePages = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <!--我的图片-->
    <el-dialog
            custom-class="up-dialog"
            :close-on-click-modal="false"
            top="5vh"
            title="我的图片"
            :visible.sync="dialogChooseImgVisible"
            width="42%"
    >
      <div class="choose-goods-compent">
        <chooseImages
                :can-choose-images-num="1"
                :is-get-choose-images="isGetChooseImages"
                @chooseImagesEnd="chooseImagesEnd"
        />
        <div slot="footer" style="text-align: right;margin-top: 20px;">
          <el-button size="mini" type="primary" @click="isGetChooseImages=!isGetChooseImages">确定</el-button>
          <el-button size="mini" @click="dialogChooseImgVisible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import index from './index.js';

  export default index;
</script>
