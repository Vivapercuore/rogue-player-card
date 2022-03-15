<script setup lang="ts">
import _ from "lodash";
import { ref, reactive, computed, getCurrentInstance } from "vue";
import store from "src/store";
import router from "src/router";

const backHome = () => {
  router.push({ name: "home" });
}


// const instance = getCurrentInstance();
// defineProps<{ msg: string  }>()

// const count = ref(0);
</script>

<template>
  <div class="header">
    <el-button v-if="router.currentRoute.value.name !== 'home'" size="small" @click="backHome">回到首页</el-button>
    {{ store.state.projectName }}
    <span class="version">v{{ store.state.version }}</span>
  </div>
</template>

<style scoped lang="less">
.header {
  text-align: center;
  font-size: 30px;
}
.version {
  font-size: 15px;
}
</style>
