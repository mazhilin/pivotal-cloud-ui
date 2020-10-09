<template>
  <div class="micro-goods-box">
    <div class="design-preview-controller">
      <div class="goods-list">
        <div v-for="(item,index) in goodLists" :key="index" class="goods-li" :class="{isGoodCell3:formData.size === 3}">
          <div
            class="goods-li-box"
            :class="{'no-goods-price':!formData.show_content.find(x=>x===3)&&formData.show_content.find(x=>x===4)}"
          >
            <div class="goods-item">
              <!--图片-->
              <div class="goods-img-one" :style="{backgroundImage:'url('+item.mainImage+')'}"></div>
              <!--end 图片-->
              <div class="goods-box-info">
                <div v-if="formData.show_content.find(x=>x===1)" class="goods-info-title">{{ item.productName }}
                </div>
                <div v-if="formData.show_content.find(x=>x===2)" class="goods-info-desc">
                  {{ item.subTitle }}
                </div>
                <div
                  v-if="formData.show_content.find(x=>x===3)||formData.show_content.find(x=>x===4)"
                  class="goods-info-price "
                  :class="{'goods-cell-3':formData.show_content.find(x=>x===4)}"
                >
                  <div v-if="formData.show_content.find(x=>x===3)" class="price-info"><span>¥</span>{{ item.price }}
                  </div>
                  <div
                    v-if="formData.show_content.find(x=>x===4)"
                    :class="['goods-info-buy-btn','btn-type-'+formData.buy_btn_type]"
                  >
                    <i v-if="formData.buy_btn_type===1" :class="['btn-type-'+formData.buy_btn_type]"></i>
                    <i v-if="formData.buy_btn_type===2" class="el-icon-circle-plus-outline"></i>
                    <i v-if="formData.buy_btn_type===3" class="el-icon-goods"></i>
                    <i v-if="formData.buy_btn_type===4" class="el-icon-s-goods"></i>
                    <el-button
                      v-if="formData.buy_btn_type>=5"
                      :round="formData.buy_btn_type>=7"
                      size="mini"
                      :type="formData.buy_btn_type | buy_btn_type"
                    >{{ formData.button_text || '马上抢' }}
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isShowEdit" class="design-editor-item design-hide-class">
      <div class="design-config-editor">
        <div class="design-editor-component-title">商品</div>
        <!--选择商品-->
        <div class="goods-select-shops">
          <div class="goods-select-control-group">
            <div class="goods-select-label">商品:</div>
            <div class="goods-select-list">
              <div v-for="(item,index) in goodLists" :key="index" class="goods-select-item">
                <div
                  class="goods-select-item-img"
                  :style="{backgroundImage:'url('+item.mainImage+')'}"></div>
                <span class="close-item" @click="goodLists.splice(index,1)">x</span>
              </div>
              <div class="goods-select-item">
                <div
                  :style="{cursor:'pointer'}"
                  class="goods-select-item-img"
                  @click="dialogChooseGoods=true"
                >+
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="padding: 20px 0;background: #fff">
          <evue-form v-model="formData" :option="formOption"></evue-form>
          <div v-if="formData.show_content.includes(4)" class="btn-style">
            <el-radio v-for="(item,index) in 8" :key="index" v-model="formData.buy_btn_type" :label="item">
              样式{{ item }}
            </el-radio>

            <div v-if="formData.buy_btn_type>=5" class="btn-type-input">
              <el-input v-model="formData.button_text" maxlength="4"></el-input>
            </div>

          </div>
        </div>
      </div>
    </div>
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
