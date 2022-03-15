<script setup lang="ts">
import _ from "lodash";
import { ref, reactive, computed, getCurrentInstance } from "vue";
import store from "src/store";
import router from "src/router";

import { Skill } from "src/data/profession";
import { Rarity } from "src/data/definition"
// const instance = getCurrentInstance();

type Props = {
  skills: Array<Skill>
}
const props = defineProps<Props>()

// const count = ref(0);
</script>

<template>
  <el-table :data="props.skills" style="width: 100%">
    <el-table-column prop="name" label="技能名称" width="100"></el-table-column>
    <el-table-column prop="rarity" label="稀有度" width="100">
      <template #default="scope">{{ scope.rarity || Rarity.normal }}</template>
    </el-table-column>
    <el-table-column prop="description" label="技能描述"></el-table-column>
  </el-table>
</template>

<style scoped lang="less">
</style>
