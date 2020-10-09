<template>
  <div class="micro-image-ad-box">
    <!--预览区-->
    <div class="design-preview-controller">
      <div v-if="formData.imageList.length" class="ad-view-box" :class="'ad-view-'+formData.indicator">
        <div v-if="formData.indicator ===1 || formData.indicator ===4 ">
          <img
            v-for="(item,index) in formData.imageList"
            :key="index"
            style="display: block"
            :src="item.url"
            alt=""
          >
        </div>
        <div
          v-for="(item,index) in formData.imageList"
          v-else
          :key="index"
          class="image-ad-view"
          :style="{backgroundImage: `url(${item.url})`}"
        />
        <div v-if="formData.indicator === 2" class="ad-po">
          <span />
          <span />
          <span />
        </div>

      </div>
      <div v-else class="image-ad-view">
        <div class="image-ad-title">
          建议宽度为750像素
        </div>
      </div>
    </div>
    <!--编辑区-->
    <div v-show="isShowEdit" class="design-editor-item design-hide-class">
      <div class="design-config-editor">
        <div class="design-editor-component-title">图片广告</div>
        <div class="image-ad-edit">
          <div class="ad-edit-item">
            <div class="ad-edit-item-title">
              选择模板：
            </div>
            <div class="ad-edit-item-content">
              <div
                v-for="(item,index) in typeList"
                :key="index"
                :class="['item-box-type',{active:index + 1 === formData.indicator}]"
                @click="changeIndicator(index)"
              >
                <img src="/img/micro-page/ad-1.png">
                <p>{{ item.title }}</p>
              </div>
              <p style="color:#b7b7b7;">注意：切换模板时会清空热区</p>
            </div>
          </div>

          <p style="margin-top: 20px;">添加图片：<span style="color:#b7b7b7;">最多添加10个广告</span></p>

          <div v-if="formData.indicator !== 4">
            <draggable
              :list="formData.imageList"
              ghost-class="ghost"
              handle=".ad-handle"
            >
              <div v-for="(item,index) in formData.imageList" :key="index" class="ad-image-list">
                <div class="ad-image-list-img ad-handle" :style="{backgroundImage:`url(${item.url})`}">
                  <p class="re-choose-img" @click="changeImg(index)">更换图片</p>
                </div>
                <div class="ad-image-list-content">
                  <div>
                    <div class="ad-image-title">
                      <span>图片标题</span>
                      <el-input v-model="item.title" size="mini" placeholder="输入标题" />
                    </div>
                    <div class="ad-image-link">
                      <span>跳转路径：</span>

                      <el-dropdown trigger="click" size="small" @command="command">

                        <div class="cursor color">
                          <span v-if="item.type" class="typeName">{{ item.type | typeNameFilter }}</span>{{
                            item.title||'请选择跳转到的页面' }}
                        </div>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            v-for="(linkItem,linkIndex) in linkList"
                            :key="linkIndex"
                            :command="({linkItem,index,currentEditIndex:index})"
                          >
                            <span style="font-size: 12px;">{{ linkItem.title }}</span>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>

                    </div>
                  </div>
                  <i class="el-icon-error close-icon" @click="formData.imageList.splice(index, 1)" />
                </div>
              </div>
            </draggable>
          </div>

          <!--hot model-->
          <div v-else>

            <draggable
              :list="formData.imageList"
              ghost-class="ghost"
              handle=".ad-handle"
            >

              <div v-for="(item,index) in formData.imageList" :key="index" class="ad-image-hot">
                <div class="add-ad-image" @click="showHotAreaPop(index)">点击添加热区</div>
                <div class="add-ad-image" @click="changeImg(index)">更换图片</div>
                <div class="ad-image-hot-box">
                  <div v-show="item.activeBoxs.length" class="ad-image-hot-content ad-handle">
                    <span
                      v-for="(hotItem,hotIndex) in item.activeBoxs"
                      :key="hotIndex"
                      class="ad-hot-box-item"
                      :style="`transform: translate(${hotItem.translateX * hotScale}px,${hotItem.translateY * hotScale}px);width:${hotItem.width * hotScale}px;height:${hotItem.height * hotScale}px`"
                    >

                      <el-dropdown trigger="click" size="small" @command="command">
                        <div class="cursor">
                          <p>{{ hotItem.type | typeNameFilter }}</p>
                          <p>{{ hotItem.title||'设置跳转' }}</p>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            v-for="(linkItem,linkIndex) in linkList"
                            :key="linkIndex"
                            :command="({linkItem,currentHotEditIndex:hotIndex,currentEditIndex:index})"
                          >
                            <span style="font-size: 12px;">{{ linkItem.title }}</span>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>

                      <i class="el-icon-close close-icon" @click="item.activeBoxs.splice(hotIndex, 1)" />
                    </span>
                  </div>
                  <img class="ad-handle" :src="item.url">
                  <i class="el-icon-error close-icon" @click="formData.imageList.splice(index, 1)" />
                </div>
              </div>
            </draggable>
          </div>

          <!--选择图片框-->
          <div
            v-if="10 - formData.imageList.length !== 0"
            class="ad-add-image"
            @click="canChooseImagesNum = 10 - formData.imageList.length;isChangeImg = false;dialogChooseImgVisible = true;"
          >
            <p>
              <i class="el-icon-plus" /> 添加一个背景图
            </p>
            <p style="color: #b7b7b7;">建议宽度 750 像素</p>
          </div>

        </div>
      </div>
    </div>

    <el-dialog
      custom-class="up-dialog"
      :close-on-click-modal="false"
      top="5vh"
      title="添加热区"
      :visible.sync="dialogHot"
      width="550px"
    >
      <div class="ad-hot-box">
        <div v-if="dialogHot&&formData.imageList.length">
          <img :src="formData.imageList[currentEditIndex].url" class="box-img">
          <div
            v-for="(item,index) in cacheImageActiveBox"
            :key="index"
            v-drag="{cacheImageActiveBox,index}"
            class="ad-drag"
          >
            <el-dropdown trigger="click" size="small" @command="command">

              <div class="cursor">
                <p>{{ item.type | typeNameFilter }}</p>
                <p>{{ item.title||'设置跳转' }}</p>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(linkItem,linkIndex) in linkList"
                  :key="linkIndex"
                  :command="({linkItem,currentHotEditIndex:index,isCacheImage:true})"
                >
                  <span style="font-size: 12px;">{{ linkItem.title }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <i class="el-icon-close close-icon" @click="cacheImageActiveBox.splice(index, 1)" />
          </div>
        </div>
      </div>
      <div slot="footer" style="text-align: right;margin-top: 20px;">
        <el-button size="mini" type="primary" @click="addHotArea">添加热区</el-button>
        <el-button size="mini" @click="saveHotBox">保存</el-button>
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
          :can-choose-images-num="canChooseImagesNum"
          :is-get-choose-images="isGetChooseImages"
          @chooseImagesEnd="chooseImagesEnd"
        />
        <div slot="footer" style="text-align: right;margin-top: 20px;">
          <el-button size="mini" type="primary" @click="isGetChooseImages=!isGetChooseImages">确定</el-button>
          <el-button size="mini" @click="dialogChooseImgVisible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      custom-class="up-dialog"
      :close-on-click-modal="false"
      top="5vh"
      title="已上架商品"
      :visible.sync="dialogChooseGoods"
      width="70%"
    >
      <div class="dialog-content">
        <chooseGoods :is-get-choose-data="isGetChooseData" @chooseGoodsFun="chooseGoodsFun" />
        <div slot="footer" style="text-align: right;margin-top: 20px;">
          <el-button size="mini" type="primary" @click="isGetChooseData=!isGetChooseData">确定</el-button>
          <el-button size="mini" @click="dialogChooseGoods = false">取消</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import index from './index.js'

  export default index
</script>
