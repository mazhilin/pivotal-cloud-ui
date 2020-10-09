<template>
  <!--所有可以选择的组件-->
  <div v-show="isShowAllComponents" id="allComponents" class="all-grouped all-can-use-components">
    <div class="add-component-grouped">
      <div class="add-component-grouped-item">
        <div class="add-grouped-item-title">基础组件</div>
        <div class="add-grouped-item-list">
          <draggable
            :list="componentLists"
            :group="{ name: 'people', pull: 'clone', put: false }"
            :clone="cloneDog"
            ghost-class="ghost"
            :disabled="!isDrag"
          >
            <div v-for="(item,index) in componentLists" :key="index"
                 class="add-grouped-item-list-btn">
              <div @click="addComponent(item)" v-if="!item.isHide">
                <div class="add-grouped-item-list-btn-title">{{ item.title }}</div>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
  <!--end 所有可以选择的组件-->
</template>
<script>
  import index from './index.js'

  export default index
</script>
