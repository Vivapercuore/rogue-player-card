<script setup lang="ts">
import _ from "lodash";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import router from "src/router";
import store from "src/store";
import PageHead from "src/components/pageHead.vue";
import PageFoot from "src/components/pageFoot.vue";
import AttributeState from "src/components/attributeState.vue";
import Creater from "src/components/creater/index.vue";


//检查是否传入了CardName
const load = await store.dispatch("loadCard", router?.currentRoute?.value?.params?.cardName)
console.log({ load, cardName: router?.currentRoute?.value?.params?.cardName })

if (!store.state.card?.currentCard) {
  store.dispatch('loadCard')
}

// defineProps<{ msg: string  }>()

// const count = ref(0);
</script>

<template>
  <el-container class="page">
    <el-header>
      <PageHead />
    </el-header>
    <el-main>
      <div v-if="!load">没有找到角色卡,请尝试返回首页重新选择或重新建卡</div>
      <div v-else>
        <h1 class="title">{{ store.state.card?.currentCard?.name }}</h1>
        <Creater />
        <AttributeState :card="store.state.card?.currentCard" />
      </div>
    </el-main>
    <el-footer>
      <PageFoot />
    </el-footer>
  </el-container>
</template>
<style lang="less" scoped>
.page {
  min-height: 100vh;
  background-color: #fff;
}
.title {
  text-align: center;
}

:deep(.el-main) {
  display: flex;
  overflow: visible;
  flex-direction: column;
  justify-content: center;
}
</style>
